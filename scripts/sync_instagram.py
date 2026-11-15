"""Sincroniza publicaciones del perfil profesional de Instagram con Quarto.

Dos fuentes posibles (se usa la primera que esté configurada):
  1. Behold (recomendada): variable BEHOLD_FEED_URL con la URL del feed JSON
     (https://feeds.behold.so/...). Behold gestiona la autorización y la
     renovación de tokens de Meta; no se necesita cuenta de desarrollador.
  2. API de Instagram directa: INSTAGRAM_ACCESS_TOKEN (opcional INSTAGRAM_USER_ID).
     Requiere app de Meta y renovar el token cada 60 días.
"""
import json
import os
import re
import sys
import unicodedata
from pathlib import Path
from urllib.parse import urlparse

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "noticias"
BASE = "https://graph.instagram.com"
TOKEN = os.environ.get("INSTAGRAM_ACCESS_TOKEN", "").strip()
USER = os.environ.get("INSTAGRAM_USER_ID", "me").strip()
BEHOLD_URL = os.environ.get("BEHOLD_FEED_URL", "").strip()
BEHOLD_PREFIX = "https://feeds.behold.so/"
FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp"


def slugify(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:70] or "publicacion"


def get_media():
    user = USER or "me"
    url = f"{BASE}/{user}/media"
    params = {"fields": FIELDS, "limit": 50, "access_token": TOKEN}
    items = []
    while url and len(items) < 500:
        response = requests.get(url, params=params, timeout=35)
        response.raise_for_status()
        payload = response.json()
        items.extend(payload.get("data", []))
        url = payload.get("paging", {}).get("next")
        params = None
    return items[:500]


def get_behold_media():
    """Lee el feed JSON de Behold y lo normaliza al formato de la API de Instagram."""
    if not BEHOLD_URL.startswith(BEHOLD_PREFIX):
        raise SystemExit("BEHOLD_FEED_URL debe comenzar con " + BEHOLD_PREFIX)
    response = requests.get(BEHOLD_URL, timeout=35)
    response.raise_for_status()
    items = []
    for post in response.json().get("posts", []):
        sizes = post.get("sizes") or {}
        best = (sizes.get("large") or sizes.get("full") or sizes.get("medium") or {}).get("mediaUrl")
        media_type = post.get("mediaType", "")
        # sizes.* son imágenes WebP alojadas por Behold (estables); mediaUrl de un video no es imagen.
        fallback = None if media_type == "VIDEO" else post.get("mediaUrl")
        items.append({
            "id": post.get("id"),
            "caption": post.get("caption") or "",
            "media_type": media_type,
            "media_url": best or fallback,
            "thumbnail_url": best or post.get("thumbnailUrl"),
            "permalink": post.get("permalink", ""),
            "timestamp": post.get("timestamp", ""),
        })
    return items


def save_image(url, folder):
    if not url:
        return None
    # Only download media from HTTPS URLs provided by the authenticated API.
    if urlparse(url).scheme != "https":
        return None
    for path in folder.glob("imagen.*"):
        return path.name
    try:
        r = requests.get(url, timeout=45)
        r.raise_for_status()
        ctype = r.headers.get("content-type", "").split(";")[0].lower()
        ext = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}.get(ctype)
        if not ext or len(r.content) > 15_000_000:
            return None
        filename = "imagen" + ext
        (folder / filename).write_bytes(r.content)
        return filename
    except requests.RequestException as e:
        print(f"Advertencia: imagen no disponible: {e}", file=sys.stderr)
        return None


def make_post(item):
    identifier = str(item["id"])
    caption = item.get("caption") or "Actividad del laboratorio."
    first = next((line.strip() for line in caption.splitlines() if line.strip()), "Actividad del laboratorio")
    title = first[:105].rstrip() or "Actividad del laboratorio"
    folder = OUT / f"ig-{identifier}"
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / "index.qmd"
    # Never overwrite editorial revisions to an existing Quarto article.
    if path.exists():
        return False
    media_type = item.get("media_type", "")
    image_url = item.get("thumbnail_url") if media_type == "VIDEO" else item.get("media_url")
    image_url = image_url or item.get("thumbnail_url")
    image_name = save_image(image_url, folder)
    timestamp = item.get("timestamp", "")
    if not re.match(r"\d{4}-\d{2}-\d{2}", timestamp):
        print(f"Aviso: entrada {identifier} sin fecha válida; omitida", file=sys.stderr)
        return False
    date = timestamp[:10]
    link = item.get("permalink", "")
    # json.dumps safely quotes frontmatter string values (JSON strings are valid YAML scalars).
    front = ["---", f"title: {json.dumps(title, ensure_ascii=False)}", f"date: {date}",
             "categories: [Instagram, Actividades]", "author: Lab Macedonia",
             f"description: {json.dumps(caption[:170].replace(chr(10), ' '), ensure_ascii=False)}"]
    if image_name:
        front.append(f"image: {image_name}")
        front.append("image-alt: " + json.dumps("Imagen de la publicación de Instagram: " + title, ensure_ascii=False))
    front += ["---", ""]
    body = "\n".join("> " + line for line in caption.splitlines())
    if link.startswith("https://"):
        body += "\n\n[Ver publicación original en Instagram](" + link + ")"
    path.write_text("\n".join(front) + body + "\n", encoding="utf-8")
    return True


def main():
    if not BEHOLD_URL and not TOKEN:
        raise SystemExit("Falta BEHOLD_FEED_URL (o INSTAGRAM_ACCESS_TOKEN) en el entorno")
    OUT.mkdir(exist_ok=True)
    media = get_behold_media() if BEHOLD_URL else get_media()
    created = sum(make_post(item) for item in media if item.get("id"))
    print(f"Publicaciones obtenidas: {len(media)}; noticias nuevas: {created}")


if __name__ == "__main__":
    main()
