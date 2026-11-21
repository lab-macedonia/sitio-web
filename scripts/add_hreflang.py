#!/usr/bin/env python3
"""Inserta <link rel="alternate" hreflang> entre páginas equivalentes es/en en _site/.
Solo enlaza pares con equivalencia clara; el resto queda sin alternate."""
import re, sys
from pathlib import Path
BASE = 'https://lab-macedonia.github.io/sitio-web/'
PAIRS = {  # español -> inglés
 'index.html':'index.html','presentacion.html':'about.html','historia.html':'history.html',
 'proposito.html':'purpose.html','investigacion.html':'research.html','proyectos.html':'projects.html',
 'publicaciones.html':'publications.html','congresos.html':'conferences.html','tesistas.html':'theses.html',
 'perfil.html':'profile.html','contacto.html':'contact.html',
 'animaciones.html':'animations.html','tabla-periodica.html':'periodic-table.html','laboratorio-digital.html':'resources.html',
 'colaboradores.html':'team.html',
}
def url(rel):
    return BASE + (rel[:-len('index.html')] if rel.endswith('index.html') else rel)
site = Path(sys.argv[1] if len(sys.argv) > 1 else '_site')
def inject(path, es, en):
    if not path.exists(): return 0
    h = path.read_text(encoding='utf-8')
    if 'hreflang=' in h: return 0
    tags = (f'<link rel="alternate" hreflang="es" href="{url(es)}">\n'
            f'<link rel="alternate" hreflang="en" href="{url("en/"+en)}">\n'
            f'<link rel="alternate" hreflang="x-default" href="{url(es)}">\n')
    h2 = h.replace('</head>', tags + '</head>', 1)
    path.write_text(h2, encoding='utf-8'); return 1
n = 0
for es, en in PAIRS.items():
    n += inject(site / es, es, en)
    n += inject(site / 'en' / en, es, en)
print(f'hreflang añadido en {n} páginas')
