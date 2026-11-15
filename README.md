# Laboratorio MACEDONIA — Quarto v7 (fases 3–5)

Sitio académico bilingüe parcial con filtros para catálogos, perfiles de colaboración, laboratorio digital, RSS y flujos de GitHub Actions.

## Puesta en marcha

1. Crear el repositorio `lab-macedonia/sitio-web` (o ajustar `website.site-url` y el nombre del repositorio en el workflow de sincronización).
2. Subir estos archivos a la rama `main`.
3. Activar **Settings → Pages → Source: GitHub Actions**.
4. Verificar el flujo `Publicar sitio Quarto` (compila y publica `_site`).
5. Revisar en navegador, móvil y lector de pantalla antes de desactivar Google Sites.

## Desarrollo local

Instalar Quarto desde https://quarto.org/docs/get-started/ y ejecutar:

```bash
python scripts/validate_site.py
bash scripts/build_site.sh   # español + inglés (genera _site/ y _site/en/)
quarto preview
```

## Instagram

La cuenta vinculada es https://www.instagram.com/labmacedonia/ (debe ser profesional). La importación usa **Behold** (plan gratuito: hasta 6 publicaciones por feed), que gestiona la autorización con Meta y la renovación de tokens; no hace falta cuenta de desarrollador de Meta.

1. Crear cuenta en behold.so, conectar `@labmacedonia` y crear un feed de tipo **JSON**.
2. Copiar la URL del feed (`https://feeds.behold.so/...`).
3. En GitHub: Settings → Secrets and variables → Actions → New repository secret → nombre `BEHOLD_FEED_URL`.
4. Ejecutar manualmente el flujo `Sincronizar Instagram autorizado` (Actions → Run workflow) y comprobar que aparecen carpetas `noticias/ig-*`.

El flujo se ejecuta cada seis horas (UTC), guarda únicamente noticias nuevas y no sobrescribe las que ya fueron editadas. Tras un commit con noticias nuevas solicita explícitamente el workflow de publicación (los commits con `GITHUB_TOKEN` no desencadenan otros workflows). Alternativa sin intermediario: definir `INSTAGRAM_ACCESS_TOKEN` (API de Instagram con app de Meta; el token caduca cada 60 días). **La importación todavía no se ha probado con una cuenta real.**

## Noticias y RSS

La página `noticias.qmd` usa las listas nativas de Quarto y genera `noticias.xml` al construir el sitio. El artículo de ejemplo permanece como borrador (`draft: true`) y no es una noticia real.

## Catálogos

Las páginas `publicaciones.qmd`, `congresos.qmd`, `proyectos.qmd` y `tesistas.qmd` se generan a partir de los archivos JSON de `data/`; los filtros en `assets/js/catalog.js` se ejecutan localmente en el navegador. El buscador general de Quarto opera en el resto del sitio. Todas se ordenan de más reciente a más antigua. Las versiones en inglés (`en/publications.qmd`, `en/conferences.qmd`, `en/projects.qmd`, `en/theses.qmd`) usan las traducciones de títulos de `data/traducciones_en.json`. Para regenerar los catálogos tras cambios en los JSON: `python3 scripts/build_catalogos.py` (o `bash scripts/build_site.sh`, que además compila todo el sitio). La versión en inglés es un subproyecto Quarto (`en/_quarto.yml`) que se publica en `/en/`.

## Privacidad y fuentes

El archivo PDF del CV **no forma parte del proyecto**. Los textos académicos se basan en el CV de 2026 y el Google Sites del laboratorio; el documento la conciliación editorial interna resume la verificación contra el CV y lo que sigue pendiente. Las fotografías de actividades reales aún están pendientes. No se han generado testimonios, citas, fotografías ni métricas ficticias.

## Limitaciones de validación

Se han comprobado sintaxis de YAML/JSON/Python y enlaces locales mediante script. La compilación real de Quarto, auditoría WCAG 2.2 AA y despliegue público requieren Quarto instalado y acceso autorizado a GitHub. No deben marcarse como completados hasta ejecutarlos y confirmar sus resultados.


## Notas internas

Las notas internas de control editorial se mantienen fuera de este repositorio público (carpeta `docs/` ignorada por Git).
