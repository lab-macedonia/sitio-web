#!/usr/bin/env bash
# Genera el sitio completo: español (raíz) + inglés (en/) en _site/
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/build_catalogos.py
quarto render
rm -rf en/assets en/styles en/_site
cp -r assets en/assets && cp -r styles en/styles
(cd en && quarto render)
rm -rf _site/en && mv en/_site _site/en
rm -rf en/assets en/styles
