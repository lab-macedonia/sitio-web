"""Utilidades compartidas para generar los catálogos (ES/EN) desde data/*.json."""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def load(name):
    return json.loads((ROOT / 'data' / f'{name}.json').read_text(encoding='utf8'))

def split_pub(ref):
    """Devuelve (autores, año, título, fuente) a partir de la referencia APA."""
    m = re.match(r'^(.*?)\((\d{4})[a-z]?\)\.\s+(.*)$', ref, re.S)
    if not m:
        return '', '', ref, ''
    autores, anio, rest = m.group(1).strip(), m.group(2), m.group(3)
    for mm in re.finditer(r'\.\s+', rest):
        tail = rest[mm.end():]
        if re.match(r'^(En |[A-ZÁÉÍÓÚ][^.]{3,90}?, \d)', tail):
            return autores, anio, rest[:mm.start()].strip(), tail.strip()
    return autores, anio, rest.strip(), ''

MESES = {m: i + 1 for i, m in enumerate('enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre'.split())}

def fecha_congreso(txt):
    """(año, mes, día) aproximado del congreso; mes/día 0 si no consta."""
    ms = re.findall(r'(\d{1,2})?\s*(?:y \d{1,2}\s*)?de (' + '|'.join(MESES) + r') de (\d{4})', txt)
    if ms:
        d, mes, a = ms[-1]
        return int(a), MESES[mes], int(d or 0)
    return 0, 0, 0

def split_congreso(txt):
    """(título, resto) heurístico para registros de congresos."""
    q = re.search(r'[“"]([^”"]+)[”"]', txt)
    if q:
        return q.group(1).strip().rstrip(',.'), txt
    partes = re.split(r'(?<=[a-záéíóúñ\)\?])\.\s+', txt)
    if ';' in partes[0] and len(partes) > 1:
        return partes[1].strip().rstrip('.'), txt
    return partes[0].strip().rstrip('.'), txt

def fecha_defensa(s):
    if not s:
        return (9999, 99, 99)
    d, m, a = s.split('/')
    return (int(a), int(m), int(d))
