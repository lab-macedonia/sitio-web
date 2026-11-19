"""Genera los catálogos filtrables (ES y EN) desde data/*.json.

Páginas: publicaciones, congresos, proyectos, tesistas (+ en/publications,
en/conferences, en/projects, en/theses). Corrija los JSON o
data/traducciones_en.json y vuelva a ejecutar: python scripts/build_catalogos.py
Todo se ordena de más reciente a más antiguo.
"""
import json, re, sys
from html import escape
sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent))
from catalogo_lib import *

TR = json.loads((ROOT / 'data/traducciones_en.json').read_text(encoding='utf8'))
e = lambda s: escape(str(s), quote=True)
faltan = set()

def en(txt, tabla='titulos'):
    t = TR[tabla]
    if txt in t:
        return t[txt]
    low = txt.lower()
    for k, v in t.items():
        if low.startswith(k.lower()) or k.lower().startswith(low):
            return v
    return None

def lab(txt):  # etiqueta EN
    return TR['etiquetas'].get(txt, txt)

def select(etiqueta, campo, valores, todos, aria):
    opts = f'<option value="">{todos}</option>' + ''.join(f'<option value="{e(v)}">{e(v if lang=="es" else lab(v) if not str(v).isdigit() else v)}</option>' for v in valores)
    return f'<label>{etiqueta}<select data-filter-field="{campo}" aria-label="{aria} {etiqueta}">{opts}</select></label>'

DESC = {
 'Producción científica': 'Artículos y capítulos de libro del Laboratorio MACEDONIA en investigación química y educación química.',
 'Scientific output': 'Articles and book chapters from the MACEDONIA Laboratory in chemical research and chemical education.',
 'Congresos y comunicaciones': 'Congresos y comunicaciones del Laboratorio MACEDONIA (UMCE) en investigación química y educación química.',
 'Conferences and presentations': 'Conferences and presentations of the MACEDONIA Laboratory (UMCE) in chemical research and chemical education.',
 'Proyectos de investigación e innovación': 'Proyectos de investigación e innovación del Laboratorio MACEDONIA (UMCE), con su estado, rol y duración.',
 'Research and innovation projects': 'Research and innovation projects of the MACEDONIA Laboratory (UMCE), with their status, role and duration.',
 'Tesis y trabajos de titulación': 'Tesis y trabajos de titulación dirigidos en el Laboratorio MACEDONIA (UMCE).',
 'Theses and degree projects': 'Theses and degree projects supervised at the MACEDONIA Laboratory (UMCE).',
}

def page(titulo, sub, intro, filtros, registros, lg):
    global lang
    lang = lg
    es = lg == 'es'
    buscar = 'Buscar en el catálogo' if es else 'Search the catalog'
    ph = 'Título, autoría, tema…' if es else 'Title, author, topic…'
    cnt = '{v} de {t} registros' if es else '{v} of {t} records'
    head = ['---', f'title: "{titulo}"', f'subtitle: "{sub}"', f'description: "{DESC[titulo]}"', '---', '', intro, '',
            f'<div data-catalog data-count-text="{cnt}">', '<div class="catalog-filters">',
            f'<label>{buscar}<input type="search" placeholder="{ph}" data-filter-text aria-label="{buscar}"></label>']
    head += filtros
    head += ['</div>', '<p class="catalog-count" role="status" aria-live="polite" data-count></p>', '<div class="catalog-records">']
    return '\n'.join(head + registros + ['</div>', '</div>', ''])

def art(attrs, h3, sub, cuerpo):
    a = ' '.join(f'data-{k}="{e(v)}"' for k, v in attrs.items())
    return f'<article class="catalog-record" data-record {a}><h2>{h3}</h2><p class="record-sub">{sub}</p>{cuerpo}</article>'

def filtro(lg, etiqueta_es, etiqueta_en, campo, valores):
    global lang
    lang = lg
    es = lg == 'es'
    return select(etiqueta_es if es else etiqueta_en, campo, valores, 'Todos' if es else 'All', 'Filtrar por' if es else 'Filter by')

def escribir(ruta, txt):
    (ROOT / ruta).write_text(txt, encoding='utf8')

# ---------- Publicaciones ----------
pubs = sorted(load('publicaciones'), key=lambda p: -p['anio'])
for lg in ('es', 'en'):
    es = lg == 'es'
    regs = []
    for p in pubs:
        autores, anio, titulo, fuente = split_pub(p['referencia'])
        tit_en = en(titulo) if not es else None
        h3 = e(tit_en or titulo) if not es else e(titulo)
        if not es and tit_en is None and re.search(r'[áéíóúñ]| (de|la|para|del|los|las) ', titulo):
            faltan.add(titulo)
        tipo = p['tipo'] if es else lab(p['tipo'])
        area = p['area'] if es else lab(p['area'])
        sub = f"{p['anio']} · {tipo.capitalize() if es else tipo} · {area}"
        fuente = re.sub(r'\s*https?://\S+\s*$', '', fuente)
        cuerpo = f'<p class="record-authors">{e(autores)} ({anio})</p>'
        if not es and tit_en:
            cuerpo += f'<p class="record-orig"><em>Original title (Spanish): {e(titulo)}</em></p>'
        cuerpo += f'<p class="record-source">{e(fuente)}</p>' if fuente else ''
        enlace = p.get('doi') or p.get('url')
        if enlace:
            txt = ('Consultar DOI' if p.get('doi') else 'Consultar artículo en la revista') if es else ('View DOI' if p.get('doi') else 'View article at the journal')
            cuerpo = cuerpo.replace('record-source', 'record-source') + f'<p class="record-link"><a href="{e(enlace)}" rel="noopener">{txt}</a></p>'
        regs.append(art({'anio': p['anio'], 'area': area, 'tipo': tipo}, h3, sub, cuerpo))
    anios = sorted({p['anio'] for p in pubs}, reverse=True)
    areas = sorted({p['area'] for p in pubs})
    tipos = sorted({p['tipo'] for p in pubs})
    fl = [filtro(lg, 'Año', 'Year', 'anio', anios), filtro(lg, 'Área', 'Area', 'area', areas), filtro(lg, 'Tipo', 'Type', 'tipo', tipos)]
    if not es:  # los valores de data-area/tipo en EN deben coincidir con los de los selects traducidos
        fl = [f.replace('value="Educación química"', 'value="Chemical education"').replace('value="Investigación química"', 'value="Chemical research"').replace('value="artículo"', 'value="Article"').replace('value="capítulo"', 'value="Book chapter"') for f in fl]
    if es:
        intro = 'Artículos científicos y capítulos de libro.'
        escribir('publicaciones.qmd', page('Producción científica', 'Artículos y capítulos de libro', intro, fl, regs, 'es'))
    else:
        intro = 'Scientific articles and book chapters.'
        escribir('en/publications.qmd', page('Scientific output', 'Articles and book chapters', intro, fl, regs, 'en'))

# ---------- Congresos ----------
cong = sorted(load('congresos'), key=lambda c: (c['anio'],) + fecha_congreso(c['registro'])[1:], reverse=True)
for lg in ('es', 'en'):
    es = lg == 'es'
    regs = []
    for c in cong:
        titulo, texto = split_congreso(c['registro'])
        tit_en = None if es else en(titulo)
        if not es and tit_en is None and re.search(r'[áéíóúñ]| (de|la|para|del|los|las) ', titulo):
            faltan.add(titulo)
        mod = c['modalidad'] if es else lab(c['modalidad'])
        h3 = e(titulo if es else (tit_en or titulo))
        sub = f"{c['anio']} · {mod}" if c['modalidad'] != 'No explicitada' else str(c['anio'])
        cuerpo = ''
        if not es and tit_en:
            cuerpo += f'<p class="record-orig"><em>Original title (Spanish): {e(titulo)}</em></p>'
        cuerpo += f'<p>{e(texto)}</p>'
        regs.append(art({'anio': c['anio'], 'modalidad': mod}, h3, sub, cuerpo))
    anios = sorted({c['anio'] for c in cong}, reverse=True)
    mods = sorted({c['modalidad'] for c in cong})
    fl = [filtro(lg, 'Año', 'Year', 'anio', anios), filtro(lg, 'Modalidad', 'Format', 'modalidad', mods)]
    if not es:
        fl = [f.replace('value="Ponencia"', 'value="Oral presentation"').replace('value="No explicitada"', 'value="Not specified"') for f in fl]
    if es:
        intro = 'Participaciones en congresos, jornadas y simposios.'
        escribir('congresos.qmd', page('Congresos y comunicaciones', 'Participaciones académicas', intro, fl, regs, 'es'))
    else:
        intro = 'Participation in conferences, symposia and workshops.'
        escribir('en/conferences.qmd', page('Conferences and presentations', 'Academic participation', intro, fl, regs, 'en'))

# ---------- Proyectos ----------
proy = sorted(load('proyectos'), key=lambda p: -p['anio'])
for lg in ('es', 'en'):
    es = lg == 'es'
    regs = []
    for p in proy:
        dur = re.search(r'Duración: ([^.]+)\.', p['detalle'])
        dur = dur.group(1) if dur else ''
        if not es:
            dur = (dur.replace(' años', ' years').replace(' año', ' year').replace(' meses', ' months'))
        est = p['estado'] if es else lab(p['estado'])
        rol = p['participacion'] if es else lab(p['participacion'])
        tit = p['titulo'] if es else (en(p['titulo']) or p['titulo'])
        sub = f"{p['anio']} · {p['codigo']} · {est}"
        cuerpo = f"<p>{'Rol' if es else 'Role'}: {e(rol)} · {'Duración' if es else 'Duration'}: {e(dur)}</p>"
        if not es and en(p['titulo']):
            cuerpo += f'<p class="record-orig"><em>Original title (Spanish): {e(p["titulo"])}</em></p>'
        regs.append(art({'anio': p['anio'], 'estado': est}, e(tit), sub, cuerpo))
    anios = sorted({p['anio'] for p in proy}, reverse=True)
    est = sorted({p['estado'] for p in proy})
    fl = [filtro(lg, 'Año', 'Year', 'anio', anios), filtro(lg, 'Estado', 'Status', 'estado', est)]
    if not es:
        fl = [f.replace('value="Cerrado"', 'value="Closed"').replace('value="En ejecución"', 'value="Ongoing"') for f in fl]
    if es:
        intro = '[Explorar las líneas de investigación](investigacion.qmd).'
        escribir('proyectos.qmd', page('Proyectos de investigación e innovación', 'Proyectos del laboratorio', intro, fl, regs, 'es'))
    else:
        intro = '[Explore the research areas](research.qmd).'
        escribir('en/projects.qmd', page('Research and innovation projects', 'Laboratory projects', intro, fl, regs, 'en'))

# ---------- Tesis ----------
tes = sorted(load('tesis'), key=lambda t: (fecha_defensa(t.get('fecha_defensa')), t['id']), reverse=True)
for lg in ('es', 'en'):
    es = lg == 'es'
    regs = []
    for t in tes:
        pendiente = not t.get('titulo')
        titulo = t.get('titulo') or ('Título por definir' if es else 'Title to be defined')
        tit_en = None if (es or pendiente) else en(titulo)
        anio = t.get('anio') or ''
        est = t['estado'] if es else lab(t['estado'])
        linea = t.get('linea') or 'Por informar'
        linea = linea if es else lab(linea)
        sub = ' · '.join(x for x in [t['autoria'], str(anio) if anio else '', est] if x)
        defensa = t.get('fecha_defensa') or ''
        if pendiente:
            cuerpo = '<p>' + ('Trabajo de tesis en desarrollo; el título y el resumen se publicarán cuando estén definidos.' if es else 'Thesis in progress; the title and summary will be published once defined.') + '</p>'
        else:
            desc = t.get('descripcion') or ''
            if not es:
                desc = en(desc, 'descripciones') or desc
            cuerpo = f'<p>{e(desc)}</p>'
            if not es and tit_en is None:
                faltan.add(titulo)
            if not es:
                cuerpo = f'<p class="record-orig"><em>Original title (Spanish): {e(titulo)}</em></p>' + cuerpo
            if defensa:
                cuerpo += f'<p class="record-source">{"Defensa" if es else "Defended"}: {e(defensa)}</p>'
        regs.append(art({'anio': anio, 'linea': linea}, e(titulo if es else (tit_en or titulo)), sub, cuerpo))
    anios = sorted({t['anio'] for t in tes if t.get('anio')}, reverse=True)
    lineas = sorted({(t.get('linea') or 'Por informar') for t in tes})
    fl = [filtro(lg, 'Año', 'Year', 'anio', anios), filtro(lg, 'Área de investigación', 'Research area', 'linea', lineas)]
    if not es:
        for k, v in TR['etiquetas'].items():
            fl = [f.replace(f'value="{k}"', f'value="{v}"') for f in fl]
    if es:
        intro = 'Trabajos de titulación dirigidos en el laboratorio.'
        escribir('tesistas.qmd', page('Tesis y trabajos de titulación', 'Formación de investigadores y profesores', intro, fl, regs, 'es'))
    else:
        intro = 'Undergraduate and graduate theses supervised in the laboratory.'
        escribir('en/theses.qmd', page('Theses and degree projects', 'Training researchers and teachers', intro, fl, regs, 'en'))

if faltan:
    print('SIN TRADUCCIÓN:', *sorted(faltan), sep='\n  ')
print('OK')

# ---------- Cifras de la portada ----------
def stats(items):
    return '<div class="stats-band">' + ''.join(f'<a class="stat" href="{h}"><strong>{n}</strong><span>{t}</span></a>' for n, t, h in items) + '</div>\n'
escribir('_stats.html', stats([(len(pubs), 'Artículos y capítulos', 'publicaciones.html'), (len(cong), 'Congresos y comunicaciones', 'congresos.html'), (len(tes), 'Tesis dirigidas', 'tesistas.html'), (len(proy), 'Proyectos', 'proyectos.html')]))
escribir('en/_stats.html', stats([(len(pubs), 'Articles and chapters', 'publications.html'), (len(cong), 'Conference presentations', 'conferences.html'), (len(tes), 'Theses supervised', 'theses.html'), (len(proy), 'Projects', 'projects.html')]))
