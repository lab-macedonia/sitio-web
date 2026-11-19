#!/usr/bin/env bash
# Genera el sitio completo: español (raíz) + inglés (en/) en _site/
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/build_catalogos.py
python3 scripts/build_animaciones.py
quarto render
rm -rf en/assets en/styles en/_site
cp -r assets en/assets && cp -r styles en/styles
(cd en && quarto render)
rm -rf _site/en && mv en/_site _site/en
rm -rf en/assets en/styles
python3 scripts/add_hreflang.py _site
rm -f _site/assets/backtotop.html _site/assets/catalog-filters.html _site/assets/goatcounter.html _site/assets/preload-fonts.html _site/assets/search-console.html _site/en/assets/search-console.html _site/en/assets/backtotop.html _site/en/assets/catalog-filters.html _site/en/assets/goatcounter.html _site/en/assets/preload-fonts.html
python3 scripts/fix_noticias_a11y.py _site
