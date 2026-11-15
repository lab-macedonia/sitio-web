"""Static validation without requiring Quarto, for use in CI."""
from pathlib import Path
import json, re, sys
import yaml
root=Path(__file__).resolve().parents[1]
errors=[]
config=yaml.safe_load((root/'_quarto.yml').read_text(encoding='utf-8'))
for name in ['publicaciones','congresos','proyectos','tesis']:
    items=json.loads((root/'data'/f'{name}.json').read_text(encoding='utf-8'))
    if not isinstance(items,list) or not items:errors.append(f'Catálogo vacío: {name}')
for page in root.rglob('*.qmd'):
    text=page.read_text(encoding='utf-8')
    if not text.startswith('---\n'):errors.append(f'Frontmatter ausente: {page.relative_to(root)}')
    for href in re.findall(r'\]\(([^)#]+)(?:#[^)]+)?\)',text):
        if re.match(r'^(https?://|mailto:)',href):continue
        if href.startswith('#') or href == 'noticias.xml':continue
        target=(page.parent/href.split('#')[0]).resolve()
        if not target.exists():errors.append(f'Enlace local roto: {page.relative_to(root)} -> {href}')
for item in config['website']['navbar']['left']:
    targets=[item]+item.get('menu',[])
    for t in targets:
        if t.get('href') and not re.match(r'https?://',t['href']):
            if not (root/t['href']).exists():errors.append('Navegación rota: '+str(t['href']))
if list(root.rglob('CV_*.pdf')):errors.append('El CV privado está incluido en el repositorio')
for err in errors: print('ERROR:',err)
print('Resultado:', 'OK' if not errors else f'{len(errors)} error(es)')
sys.exit(bool(errors))
