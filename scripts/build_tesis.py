"""Regenera tesistas.qmd (catálogo filtrable) desde data/tesis.json.

Formato: una ficha <article class="catalog-record"> por tesis, con filtros por
año y área. Los datos prevalecen sobre cualquier edición manual del .qmd:
corrija data/tesis.json y vuelva a ejecutar este script.
"""
import json
from html import escape
from pathlib import Path

root = Path(__file__).resolve().parents[1]
raw = json.loads((root / 'data/tesis.json').read_text(encoding='utf8'))
items = raw if isinstance(raw, list) else next(v for v in raw.values() if isinstance(v, list))

PREFIJO = 'Síntesis descriptiva basada en el título y la fuente disponible (no equivale al resumen de la tesis): '
e = lambda s: escape(str(s), quote=True)

def clave(t):
    return (t.get('anio') or 9999, t['id'])

anios = sorted({t['anio'] for t in items if t.get('anio')}, reverse=True)
lineas = sorted({t['linea'] for t in items if t.get('linea')})

def select(etiqueta, campo, valores):
    opts = '<option value="">Todos</option>' + ''.join(f'<option value="{e(v)}">{e(v)}</option>' for v in valores)
    return f'<label>{etiqueta}<select data-filter-field="{campo}" aria-label="Filtrar por {etiqueta}">{opts}</select></label>'

out = ['---', 'title: "Tesis y trabajos de titulación"', 'subtitle: "Formación de investigadores y profesores"', '---', '',
       'Fichas elaboradas a partir del CV de 2026 y Google Sites. Los títulos y fechas se conservan con su fuente; '
       '**las descripciones no constituyen resúmenes validados de las memorias completas**.', '',
       '<div data-catalog>', '<div class="catalog-filters">',
       '<label>Buscar en el catálogo<input type="search" placeholder="Título, autoría, tema…" data-filter-text aria-label="Buscar en el catálogo"></label>',
       select('Año', 'anio', anios), select('Área de investigación', 'linea', lineas), '</div>',
       '<p class="catalog-count" role="status" aria-live="polite" data-count></p>', '<div class="catalog-records">']

for t in sorted(items, key=clave):
    titulo = t.get('titulo') or 'Título por definir'
    anio = t.get('anio') or ''
    sub = ' · '.join(x for x in [t['autoria'], str(anio) if anio else '', t.get('estado') or ''] if x)
    defensa = t.get('fecha_defensa') or ('pendiente' if t.get('estado') == 'En desarrollo' else 'no documentada')
    if t.get('titulo'):
        cuerpo = PREFIJO + (t.get('descripcion') or 'sin descripción disponible')
    else:
        cuerpo = 'Trabajo de tesis en desarrollo; el título y el resumen se publicarán cuando estén definidos.'
    out.append(f'<article class="catalog-record" data-record data-anio="{anio}" data-linea="{e(t.get("linea") or "Por informar")}">'
               f'<h3>{e(titulo)}</h3><p class="record-sub">{e(sub)}</p><p>{e(cuerpo)} · Defensa: {e(defensa)}</p></article>')

out += ['</div>', '</div>', '']
(root / 'tesistas.qmd').write_text('\n'.join(out), encoding='utf8')
print('Generadas', len(items), 'fichas')
