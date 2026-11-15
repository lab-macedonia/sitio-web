"""Genera la galería de animaciones (ES/EN). Los videos (assets/animaciones/NN-*.mp4, con portada .jpg)
se alojan en el propio sitio. Autoría: Mauricio Cortés · Licencia CC BY-NC-SA 4.0."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
VID = ROOT / 'assets/animaciones'
def _f(n, ext):
    return next(VID.glob(f'{n:02d}-*.{ext}')).name
LIC = 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es'
LIC_EN = 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
# (grupo_es, grupo_en, [(n, titulo_es, titulo_en, drive_id)])
G = [
 ('Isómeros de posición, función y cadena', 'Positional, functional and chain isomers', [
  (1,'Isómeros de cadena','Chain isomers','10RzI3d5HbcjQaA9ejN9yjNfp4HF7d4dQ'),
  (2,'Isómeros de función','Functional isomers','10XmMAiGZjtAWNZ5B3L_QXn7nTLs-R4Qk'),
  (3,'Isómeros de posición','Positional isomers','10V7uoJG9IgppmXPPneOLxzZw0VcZCWDV')]),
 ('Estructuras de caballete y Newman', 'Sawhorse and Newman projections', [
  (4,'Caballete: etano','Sawhorse: ethane','10v_ymaKTAeloQt1I_Z5zpRJJZo-7xp35'),
  (5,'Caballete: butano','Sawhorse: butane','10rKtDL7pRC6Fa4ejB0u7CKp3u_01f2lK'),
  (6,'Newman: etano','Newman: ethane','11E1RbW2HDHJBsV5NLsgOZUohNDK_tYLX'),
  (7,'Newman: butano','Newman: butane','114sPtbCwpL03wXYfqbmPHMLZVrjicwKx'),
  (8,'Caballete y Newman: etano','Sawhorse and Newman: ethane','11HEj2mixe_nzGiz6JuOS4x-eScjSg-z8'),
  (9,'Caballete y Newman: butano','Sawhorse and Newman: butane','11M1VnvWY-dJb6FFWmVkbyuQZ5CkJ61Dz')]),
 ('Conformaciones tipo silla e isómeros cis y trans', 'Chair conformations and cis/trans isomers', [
  (10,'Construcción de la silla del ciclohexano','Building the cyclohexane chair','11MSbx-Jo8oDvK1x0KlokDVRyWL7pEvcH'),
  (11,'Conformaciones del ciclohexano','Cyclohexane conformations','11moMr2_-tjcjfavdYHUgpIpy5W_c0zAF'),
  (12,'Conformaciones del metilciclohexano','Methylcyclohexane conformations','11hdgSJKd5SPLzLFsUPRg18ypqSzi0XdA'),
  (13,'Conformaciones del cis-1-isopropil-3-metilciclohexano','Conformations of cis-1-isopropyl-3-methylcyclohexane','11_GL9ZOhicsFY2wQ3ELXe9yLfOwJLvBZ'),
  (14,'Conformaciones del trans-1-isopropil-3-metilciclohexano','Conformations of trans-1-isopropyl-3-methylcyclohexane','11XqmJ5HeYZh_OW-meQgJRsE-C7zdiLpk'),
  (15,'Conformaciones del cis-1,2-dietilciclohexano','Conformations of cis-1,2-diethylcyclohexane','11VGSmEPLxoAdO35uC_SqsJn1mUvNI86p'),
  (16,'Conformaciones del trans-1,2-dietilciclohexano','Conformations of trans-1,2-diethylcyclohexane','11y7IBWNXpJVYv9wMSbzDVORbx54Yda9d')]),
 ('Estereoisómeros, nomenclatura (R) y (S) y proyección de Fischer', 'Stereoisomers, (R) and (S) nomenclature and Fischer projection', [
  (17,'Espejo del limoneno','Limonene mirror image','11vId5WOoyTGroLmtB-G84oQdI8Roytld'),
  (18,'(R)-limoneno (2D y 3D)','(R)-limonene (2D and 3D)','11q4X2CDM0W3-nr-n880iqhW03JpaC0Ft'),
  (19,'(S)-limoneno (2D y 3D)','(S)-limonene (2D and 3D)','123TdRdZilIdmDcwleWDe5me5UfBuTWfd'),
  (20,'Espejo del 2-bromo-2-clorobutano (superposición)','2-Bromo-2-chlorobutane mirror image (superposition)','1252Wnqih8ABLCoyUKiArb6ZLCw77Qxnc'),
  (21,'Espejo del 2-bromo-2-clorobutano','2-Bromo-2-chlorobutane mirror image','1298YEz-FylhCQTzgQ6Ghm10dilXAuTUo'),
  (22,'(2R)-2-bromo-2-clorobutano','(2R)-2-bromo-2-chlorobutane','12D9ys4XYA0OFkO9ulp0a5_-ABB9ucw1-'),
  (23,'(2S)-2-bromo-2-clorobutano','(2S)-2-bromo-2-chlorobutane','12ArtNxldXu0EzfI6LsQxrVzm7HG7I0yj'),
  (24,'(R)-valina (proyección de Fischer)','(R)-valine (Fischer projection)','12IDVhpzF6HEo1B2Hk_o2O5ZXlmC_GbuI'),
  (25,'(S)-valina (proyección de Fischer)','(S)-valine (Fischer projection)','12DHjK1ZqtrGNeUMj5yI9s0eDuDbzsGP0')]),
]
def build(lg):
    es = lg == 'es'
    out = ['---', f'title: "{"Animaciones de química orgánica" if es else "Organic chemistry animations"}"',
           f'subtitle: "{"Estereoquímica e isomería · Ciencias Naturales 2.º medio, eje Química" if es else "Stereochemistry and isomerism · Natural Sciences, grade 10, Chemistry strand"}"', '---', '']
    if es:
        out.append(f'Animaciones desarrolladas por **Mauricio Cortés** en su trabajo de titulación (Unidad 4: química orgánica, estereoquímica e isomería). Todas están licenciadas bajo [Creative Commons CC BY-NC-SA 4.0]({LIC}): puedes compartirlas y adaptarlas citando la autoría, sin fines comerciales y con la misma licencia.')
    else:
        out.append(f'Animations developed by **Mauricio Cortés** in his degree thesis (Unit 4: organic chemistry, stereochemistry and isomerism). All are licensed under [Creative Commons CC BY-NC-SA 4.0]({LIC_EN}): you may share and adapt them with attribution, for non-commercial purposes and under the same license.')
    out.append('')
    for ges, gen, items in G:
        out += [f'## {ges if es else gen}', '', '<div class="anim-grid">']
        for n, t_es, t_en, vid in sorted(items):
            t = t_es if es else t_en
            lic = (f'{t} de Mauricio Cortés, licencia <a href="{LIC}" rel="license noopener">CC BY-NC-SA 4.0</a>.' if es
                   else f'{t} by Mauricio Cortés, licensed under <a href="{LIC_EN}" rel="license noopener">CC BY-NC-SA 4.0</a>.')
            descargar = 'Descargar video (MP4)' if es else 'Download video (MP4)'
            pre = '' if es else '../'
            mp4, jpg = _f(n, 'mp4'), _f(n, 'jpg')
            out.append(f'<figure class="anim"><div class="anim-frame"><video controls preload="none" playsinline data-poster="{pre}assets/animaciones/{jpg}" src="{pre}assets/animaciones/{mp4}" aria-label="{t}"></video></div>'
                       f'<figcaption><strong>{t}</strong><span>{lic}</span><a href="{pre}assets/animaciones/{mp4}" download>{descargar}</a></figcaption></figure>')
        out += ['</div>', '']
    out.append('<script defer src="/assets/js/lazy-posters.js"></script>')
    return '\n'.join(out)
(ROOT / 'animaciones.qmd').write_text(build('es'), encoding='utf8')
(ROOT / 'en/animations.qmd').write_text(build('en'), encoding='utf8')
print('OK', sum(len(g[2]) for g in G))
