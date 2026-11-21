# Laboratorio MACEDONIA — Sitio web

Portal web del Laboratorio MACEDONIA (UMCE): investigación en química orgánica y general, educación química e innovación para la formación docente.

Sitio: https://lab-macedonia.github.io/sitio-web/

## Qué incluye
- Sitio en español, con versión parcial en inglés (`/en/`).
- Catálogos de publicaciones, congresos, proyectos y tesistas, generados desde JSON en `data/`, con filtros en JavaScript.
- Noticias con feed RSS (`noticias.xml`), alimentadas desde Instagram vía Behold.
- Formularios de visitas de colegios y de charlas (solo en español).

## Desarrollo local
1. Instalar Quarto 1.11.9 (versión fijada para publicar).
2. Ejecutar los scripts de validación y compilación.
3. `quarto preview`

## Publicación
Cada cambio en `main` se publica con GitHub Actions en GitHub Pages.

## Instagram
Un flujo se ejecuta cada seis horas e importa solo las publicaciones nuevas, con el secreto `BEHOLD_FEED_URL`.
