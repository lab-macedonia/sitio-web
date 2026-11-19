#!/usr/bin/env python3
"""Accesibilidad de la página de noticias (listado de Quarto): orden de encabezados y landmark del panel lateral."""
import sys
from pathlib import Path
p = Path(sys.argv[1] if len(sys.argv) > 1 else '_site') / 'noticias.html'
h = p.read_text(encoding='utf-8')
h = h.replace('<h5 class="no-anchor card-title listing-title">', '<h2 class="no-anchor card-title listing-title">')
# cierre del h5 de cada tarjeta: solo dentro de las tarjetas del listado
import re
h = re.sub(r'(<h2 class="no-anchor card-title listing-title">.*?)</h5>', r'\1</h2>', h, flags=re.S)
h = h.replace('<h5 class="quarto-listing-category-title">Categorías</h5>', '<h2 class="quarto-listing-category-title">Categorías</h2>')
h = h.replace('<div id="quarto-margin-sidebar" class="sidebar margin-sidebar">', '<div id="quarto-margin-sidebar" class="sidebar margin-sidebar" role="complementary" aria-label="Categorías de noticias">')
p.write_text(h, encoding='utf-8')
print('noticias.html: encabezados y landmark ajustados')
