/* Tabla periódica y estructuras · Laboratorio MACEDONIA (es / en)
   Página interactiva sin dependencias. El idioma se toma de data-lang del contenedor #tpe. */
(function(){
'use strict';
var root=document.getElementById('tpe');
if(!root) return;
var EN=root.getAttribute('data-lang')==='en', LI=EN?1:0;
var tr=function(a){return a[LI];};
var fmt=function(s){s=String(s);return EN?s:s.replace('.',',');};
var $=function(id){return document.getElementById('tpe-'+id);};

/* ================= textos de la interfaz ================= */
var S={
 tabs:[['Tabla periódica','configuración electrónica'],['Grupos funcionales','estructuras generales'],['Aminoácidos','los 20 proteinogénicos'],['Nucleótidos y bases','ADN y ARN'],['Modelo Estándar','partículas elementales'],['Magnitudes y unidades','Sistema Internacional']],
 tabsEn:[['Periodic table','electron configuration'],['Functional groups','general structures'],['Amino acids','the 20 standard ones'],['Nucleotides and bases','DNA and RNA'],['Standard Model','elementary particles'],['Quantities and units','SI']],
 h2:['Tabla periódica de los elementos','Grupos funcionales de la química orgánica','Aminoácidos proteinogénicos','Nucleótidos y bases nitrogenadas','Modelo Estándar de partículas','Magnitudes y unidades del Sistema Internacional'],
 h2En:['Periodic table of the elements','Functional groups in organic chemistry','Standard protein amino acids','Nucleotides and nitrogenous bases','Standard Model of particles','Quantities and units of the International System'],
 search:['Buscar por nombre, símbolo o número','Search by name, symbol or number'],
 searchLabel:['Buscar elemento','Search element'],
 tileLabel:['Casilla:','Tile shows:'],
 tileOpts:[['Nombre','Atomic name'],['Masa atómica','Atomic mass']],
 play:['▶ Recorrer por número atómico','▶ Step through atomic numbers'],
 stop:['⏸ Detener recorrido','⏸ Stop'],
 speed:['Velocidad','Speed'],
 speedOpts:[['Lenta','Slow'],['Normal','Normal'],['Rápida','Fast']],
 legendLabel:['Filtrar por categoría','Filter by category'],
 propLabel:['Iluminar por propiedad:','Light up by property:'],
 propNone:['Categorías','Categories'],
 sweepLabel:['Recorrido','Sweep'],
 sweepModes:[['Por valor','By value'],['Por período','By period'],['Por grupo','By group']],
 sweepGo:['✦ Iluminar la tendencia','✦ Light up the trend'],
 sweepBusy:['✦ Iluminando…','✦ Lighting up…'],
 noData:['sin dato fiable','no reliable data'],
 noAnion:['no forma anión estable (≤ 0)','no stable anion (≤ 0)'],
 lowest:['Menor','Lowest'],highest:['Mayor','Highest'],
 perTrend:['En un período →','Across a period →'],grpTrend:['En un grupo ↓','Down a group ↓'],
 up:['aumenta','increases'],down:['disminuye','decreases'],
 prev:['Elemento anterior','Previous element'],
 next:['Elemento siguiente','Next element'],
 block:['Bloque','Block'],group:['Grupo','Group'],period:['Período','Period'],state:['Estado','State'],
 fblock:['— (bloque f)','— (f-block)'],
 states:{gas:['gas','gas'],liq:['líquido','liquid'],sol:['sólido','solid'],unk:['desconocido','unknown']},
 kvShort:['Resumida','Condensed'],kvFull:['Completa','Full'],kvShells:['Electrones por capa','Electrons per shell'],kvMass:['Masa atómica (u)','Atomic mass (u)'],
 orbHead:['Cajas cuánticas','Orbital boxes'],orbSub:[' (una flecha por electrón, regla de Hund)',' (one arrow per electron, Hund’s rule)'],
 orbDim:['Atenuado: orbitales del núcleo','Dimmed: core orbitals'],orbDim2:['Normal: capas de valencia.','Normal: valence shells.'],
 shells:[['capa','capas'],['shell','shells']],
 outer:[['electrón','electrones'],['electron','electrons']],
 inOuter:[' en la capa externa',' in the outer shell'],
 pause:['⏸ Pausar electrones','⏸ Pause electrons'],move:['▶ Mover electrones','▶ Move electrons'],
 atomAlt:['Modelo de capas de ','Shell model of '],
 flip:['Girar ↻','Flip ↻'],back:['Volver ↻','Back ↻'],flipLabel:[': girar tarjeta',': flip card'],
 name:['Nombre','Name'],example:['Ejemplo','Example'],
 gStruct:['Estructura','Structure'],gProp:['Propiedades','Properties'],gRx:['Reacciones','Reactions'],gUse:['Dónde aparece','Where it occurs'],
 aSide:['Cadena lateral (R)','Side chain (R)'],aClass:['Clase','Class'],aCharge:['Carga a pH 7','Charge at pH 7'],aPk:['pKa de R','R-group pKa'],aPi:['pI · esencial','pI · essential'],aKey:['Dato clave','Key fact'],
 yes:['sí','yes'],no:['no','no'],
 gFilters:[['all','Todos','All'],['hc','Hidrocarburos','Hydrocarbons'],['ox','Con oxígeno','Oxygen-containing'],['nit','Con nitrógeno','Nitrogen-containing'],['hal','Con halógeno o azufre','Halogen or sulfur']],
 gLegend:[['grupo funcional','functional group'],['resto de la molécula (R = cadena carbonada)','rest of the molecule (R = carbon chain)']],
 aLegend:[['esqueleto común (H<sub>2</sub>N–CH–COOH)','common backbone (H<sub>2</sub>N–CH–COOH)'],['cadena lateral (R), con el color de su clase','side chain (R), colored by class']],
 aAll:['Todos','All'],
 noteTable:[
  'Masas atómicas abreviadas (CIAAW/IUPAC, tabla 2024). En los elementos sin masa estándar se indica entre corchetes el número de masa de un isótopo representativo. Las configuraciones son las de estado fundamental de NIST (Z 1–104), con sus excepciones al orden de llenado (Cr, Cu, Nb, Mo, Ru, Rh, Pd, Ag, La, Ce, Gd, Pt, Au, Ac, Th, Pa, U, Np, Cm, Lr); de 105 a 118 son predicciones. El estado físico es el de condiciones ambientales; «desconocido» indica que no se ha observado. Lu y Lr se ubican en el grupo 3 (recomendación IUPAC 2021). Propiedades periódicas: radio atómico calculado de Clementi et al. (hasta Z = 86, sin La ni Ce); carácter metálico como índice relativo (0 a 100) derivado de la primera energía de ionización, no medido; electronegatividad en la escala de Pauling (sin valores fiables para He, Ne, Ar, Rn, Pm, Eu, Tb, Yb ni para Z ≥ 104; los de Fr y Lr son estimados); radio covalente de enlace sencillo de Cordero et al. (2008), hasta Z = 96; primera energía de ionización de NIST en kJ/mol (hasta Z = 103); afinidad electrónica en kJ/mol como energía liberada al formar el anión (hasta Z = 88, sin dato para la mayoría de lantánidos y actínidos; «≤ 0» indica que el anión no es estable). El color de cada casilla es relativo al mínimo y al máximo de la propiedad; las casillas rayadas no tienen dato.',
  'Abridged atomic weights (CIAAW/IUPAC, 2024 table). For elements with no standard atomic weight, the mass number of a representative isotope is given in square brackets. Configurations are the NIST ground-state ones (Z 1–104), including the exceptions to the filling order (Cr, Cu, Nb, Mo, Ru, Rh, Pd, Ag, La, Ce, Gd, Pt, Au, Ac, Th, Pa, U, Np, Cm, Lr); those of 105–118 are predictions. The physical state is the one at ambient conditions; “unknown” means it has not been observed. Lu and Lr are placed in group 3 (IUPAC 2021 recommendation). Periodic properties: calculated atomic radius from Clementi et al. (up to Z = 86, without La and Ce); metallic character as a relative index (0 to 100) derived from the first ionization energy, not measured; electronegativity on the Pauling scale (no reliable values for He, Ne, Ar, Rn, Pm, Eu, Tb, Yb or for Z ≥ 104; those of Fr and Lr are estimates); single-bond covalent radius from Cordero et al. (2008), up to Z = 96; first ionization energy from NIST in kJ/mol (up to Z = 103); electron affinity in kJ/mol as the energy released when the anion forms (up to Z = 88, no data for most lanthanides and actinides; “≤ 0” means the anion is not stable). Each tile’s color is relative to the minimum and maximum of the property; hatched tiles have no data.'],
 noteGroups:[
  'Toca una tarjeta para girarla y ver los datos principales. Prioridad del grupo principal al nombrar (IUPAC 2013, de mayor a menor): ácido carboxílico, anhídrido, éster, haluro de acilo, amida, nitrilo, aldehído, cetona, alcohol, tiol, amina. Los dobles y triples enlaces C–C no son grupos característicos: se indican con -eno e -ino en la cadena. Éteres, haluros de alquilo y nitro se nombran como prefijos.',
  'Tap a card to flip it and see the key facts. Seniority of the principal characteristic group when naming (IUPAC 2013, highest first): carboxylic acid, anhydride, ester, acyl halide, amide, nitrile, aldehyde, ketone, alcohol, thiol, amine. C–C double and triple bonds are not characteristic groups: they are shown as -ene and -yne in the chain. Ethers, alkyl halides and nitro groups are named as prefixes.'],
 noteAmino:[
  'Se dibujan en forma neutra (sin zwitterión). Todos son de la serie L: el carbono α es (S), salvo en la cisteína (R); la glicina no es quiral. Clasificación de las cadenas laterales según Lehninger. pI y pKa de tablas de referencia (Sigma-Aldrich). Toca una tarjeta para girarla y ver los datos principales.',
  'Shown in neutral form (no zwitterion). All belong to the L series: the α-carbon is (S), except in cysteine (R); glycine is not chiral. Side-chain classification follows Lehninger. pI and pKa values from reference tables (Sigma-Aldrich). Tap a card to flip it and see the key facts.'],
 sources:['Fuentes: ','Sources: ']
};
function T(key){var v=S[key]; return EN&&S[key+'En']?S[key+'En']:v;}

/* ================= motor de moléculas (SVG esqueletal) ================= */
var U=34, FS=18, R3=0.866, a=R3;
function parseLabel(s){
  var out=[], re=/(\^.)|(\d)|([^\d^]+)/g, m;
  while((m=re.exec(s))){
    if(m[1]) out.push({t:m[1][1],sh:-7,sz:.7,w:.6});
    else if(m[2]) out.push({t:m[2],sh:4,sz:.7,w:.6});
    else out.push({t:m[3],sh:0,sz:1,w:m[3].length});
  }
  return out;
}
function labelW(s){return parseLabel(s).reduce(function(x,p){return x+p.w;},0);}
function labelSVG(x,y,s,cls){
  var prev=0;
  var inner=parseLabel(s).map(function(q){var dy=q.sh-prev;prev=q.sh;return '<tspan dy="'+dy+'"'+(q.sz<1?' font-size="'+Math.round(FS*q.sz)+'"':'')+'>'+q.t+'</tspan>';}).join('');
  return '<text x="'+x.toFixed(1)+'" y="'+(y+FS*0.35).toFixed(1)+'" text-anchor="middle" class="'+cls+'">'+inner+'</text>';
}
function bondList(str){
  return str.trim().split(/\s+/).map(function(t){
    var m=t.match(/^(\w+)([-=#])(\w+)(?:@(\w+))?$/);
    return {a:m[1],b:m[3],o:m[2]==='-'?1:m[2]==='='?2:3,rc:m[4]};
  });
}
function molBounds(def){
  var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  for(var k in def.atoms){var p=def.atoms[k];x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1]);}
  return [x0*U,y0*U,x1*U,y1*U];
}
function molSVG(def,vb){
  var A=def.atoms, hiSet={}; (def.hi||[]).forEach(function(k){hiSet[k]=1;});
  var isR=function(id){return /^R/.test(id);};
  var out='';
  bondList(def.bonds).forEach(function(bd){
    var pa=[A[bd.a][0]*U,A[bd.a][1]*U], pb=[A[bd.b][0]*U,A[bd.b][1]*U];
    var dx=pb[0]-pa[0], dy=pb[1]-pa[1], L=Math.hypot(dx,dy); dx/=L; dy/=L;
    var la=A[bd.a][2], lb=A[bd.b][2];
    var ga=la?10+labelW(la)*4.8*Math.abs(dx):0, gb=lb?10+labelW(lb)*4.8*Math.abs(dx):0;
    var s=[pa[0]+dx*ga,pa[1]+dy*ga], e=[pb[0]-dx*gb,pb[1]-dy*gb];
    var nx=-dy, ny=dx, hi;
    if(def.mode==='fg') hi=(hiSet[bd.a]&&!isR(bd.b))||(hiSet[bd.b]&&!isR(bd.a));
    else hi=hiSet[bd.a]||hiSet[bd.b];
    var cls='b'+(hi?' hi':'');
    var line=function(p,q){return '<line class="'+cls+'" x1="'+p[0].toFixed(1)+'" y1="'+p[1].toFixed(1)+'" x2="'+q[0].toFixed(1)+'" y2="'+q[1].toFixed(1)+'"/>';};
    var o;
    if(bd.o===1) out+=line(s,e);
    else if(bd.o===2&&bd.rc){
      var c=def.rc[bd.rc], mx=(s[0]+e[0])/2, my=(s[1]+e[1])/2;
      var sign=((c[0]*U-mx)*nx+(c[1]*U-my)*ny)>=0?1:-1, off=5, tr2=0.14*Math.hypot(e[0]-s[0],e[1]-s[1]);
      out+=line(s,e)+line([s[0]+dx*tr2+nx*off*sign,s[1]+dy*tr2+ny*off*sign],[e[0]-dx*tr2+nx*off*sign,e[1]-dy*tr2+ny*off*sign]);
    } else if(bd.o===2){
      o=3.3; out+=line([s[0]+nx*o,s[1]+ny*o],[e[0]+nx*o,e[1]+ny*o])+line([s[0]-nx*o,s[1]-ny*o],[e[0]-nx*o,e[1]-ny*o]);
    } else {
      o=4.4; out+=line(s,e)+line([s[0]+nx*o,s[1]+ny*o],[e[0]+nx*o,e[1]+ny*o])+line([s[0]-nx*o,s[1]-ny*o],[e[0]-nx*o,e[1]-ny*o]);
    }
  });
  for(var id in A){
    var at=A[id]; if(!at[2]) continue;
    out+=labelSVG(at[0]*U,at[1]*U,at[2],isR(id)?'r':(hiSet[id]?'hi':''));
  }
  return '<svg viewBox="'+vb.join(' ')+'" role="img" aria-label="'+(def.alt||'')+'" xmlns="http://www.w3.org/2000/svg">'+out+'</svg>';
}
function unionVB(defs){
  var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  defs.forEach(function(d){var b=molBounds(d);x0=Math.min(x0,b[0]);y0=Math.min(y0,b[1]);x1=Math.max(x1,b[2]);y1=Math.max(y1,b[3]);});
  var pad=28; return [Math.floor(x0-pad),Math.floor(y0-pad),Math.ceil(x1-x0+2*pad),Math.ceil(y1-y0+2*pad)];
}
function centerVB(def,vb){var b=molBounds(def);return [Math.round((b[0]+b[2])/2-vb[2]/2),Math.round((b[1]+b[3])/2-vb[3]/2),vb[2],vb[3]];}
function tightVB(g){var v=unionVB([{atoms:g.atoms}]),W=190,H=120;if(v[2]<W){v[0]-=(W-v[2])/2;v[2]=W;}if(v[3]<H){v[1]-=(H-v[3])/2;v[3]=H;}return v.map(Math.round);}

/* ================= elementos ================= */
var RAW='1 H Hidrógeno 1.008|2 He Helio 4.0026|3 Li Litio 6.94|4 Be Berilio 9.0122|5 B Boro 10.81|6 C Carbono 12.011|7 N Nitrógeno 14.007|8 O Oxígeno 15.999|9 F Flúor 18.998|10 Ne Neón 20.180|11 Na Sodio 22.990|12 Mg Magnesio 24.305|13 Al Aluminio 26.982|14 Si Silicio 28.085|15 P Fósforo 30.974|16 S Azufre 32.06|17 Cl Cloro 35.45|18 Ar Argón 39.95|19 K Potasio 39.098|20 Ca Calcio 40.078|21 Sc Escandio 44.956|22 Ti Titanio 47.867|23 V Vanadio 50.942|24 Cr Cromo 51.996|25 Mn Manganeso 54.938|26 Fe Hierro 55.845|27 Co Cobalto 58.933|28 Ni Níquel 58.693|29 Cu Cobre 63.546|30 Zn Zinc 65.38|31 Ga Galio 69.723|32 Ge Germanio 72.630|33 As Arsénico 74.922|34 Se Selenio 78.971|35 Br Bromo 79.904|36 Kr Kriptón 83.798|37 Rb Rubidio 85.468|38 Sr Estroncio 87.62|39 Y Itrio 88.906|40 Zr Circonio 91.222|41 Nb Niobio 92.906|42 Mo Molibdeno 95.95|43 Tc Tecnecio 97|44 Ru Rutenio 101.07|45 Rh Rodio 102.91|46 Pd Paladio 106.42|47 Ag Plata 107.87|48 Cd Cadmio 112.41|49 In Indio 114.82|50 Sn Estaño 118.71|51 Sb Antimonio 121.76|52 Te Telurio 127.60|53 I Yodo 126.90|54 Xe Xenón 131.29|55 Cs Cesio 132.91|56 Ba Bario 137.33|57 La Lantano 138.91|58 Ce Cerio 140.12|59 Pr Praseodimio 140.91|60 Nd Neodimio 144.24|61 Pm Prometio 145|62 Sm Samario 150.36|63 Eu Europio 151.96|64 Gd Gadolinio 157.25|65 Tb Terbio 158.93|66 Dy Disprosio 162.50|67 Ho Holmio 164.93|68 Er Erbio 167.26|69 Tm Tulio 168.93|70 Yb Iterbio 173.05|71 Lu Lutecio 174.97|72 Hf Hafnio 178.49|73 Ta Tántalo 180.95|74 W Wolframio 183.84|75 Re Renio 186.21|76 Os Osmio 190.23|77 Ir Iridio 192.22|78 Pt Platino 195.08|79 Au Oro 196.97|80 Hg Mercurio 200.59|81 Tl Talio 204.38|82 Pb Plomo 207.2|83 Bi Bismuto 208.98|84 Po Polonio 209|85 At Astato 210|86 Rn Radón 222|87 Fr Francio 223|88 Ra Radio 226|89 Ac Actinio 227|90 Th Torio 232.04|91 Pa Protactinio 231.04|92 U Uranio 238.03|93 Np Neptunio 237|94 Pu Plutonio 244|95 Am Americio 243|96 Cm Curio 247|97 Bk Berkelio 247|98 Cf Californio 251|99 Es Einstenio 252|100 Fm Fermio 257|101 Md Mendelevio 258|102 No Nobelio 259|103 Lr Lawrencio 266|104 Rf Rutherfordio 267|105 Db Dubnio 268|106 Sg Seaborgio 269|107 Bh Bohrio 270|108 Hs Hasio 277|109 Mt Meitnerio 278|110 Ds Darmstadtio 281|111 Rg Roentgenio 282|112 Cn Copernicio 285|113 Nh Nihonio 286|114 Fl Flerovio 289|115 Mc Moscovio 290|116 Lv Livermorio 293|117 Ts Teneso 294|118 Og Oganesón 294';
var NAMES_EN='Hydrogen|Helium|Lithium|Beryllium|Boron|Carbon|Nitrogen|Oxygen|Fluorine|Neon|Sodium|Magnesium|Aluminium|Silicon|Phosphorus|Sulfur|Chlorine|Argon|Potassium|Calcium|Scandium|Titanium|Vanadium|Chromium|Manganese|Iron|Cobalt|Nickel|Copper|Zinc|Gallium|Germanium|Arsenic|Selenium|Bromine|Krypton|Rubidium|Strontium|Yttrium|Zirconium|Niobium|Molybdenum|Technetium|Ruthenium|Rhodium|Palladium|Silver|Cadmium|Indium|Tin|Antimony|Tellurium|Iodine|Xenon|Caesium|Barium|Lanthanum|Cerium|Praseodymium|Neodymium|Promethium|Samarium|Europium|Gadolinium|Terbium|Dysprosium|Holmium|Erbium|Thulium|Ytterbium|Lutetium|Hafnium|Tantalum|Tungsten|Rhenium|Osmium|Iridium|Platinum|Gold|Mercury|Thallium|Lead|Bismuth|Polonium|Astatine|Radon|Francium|Radium|Actinium|Thorium|Protactinium|Uranium|Neptunium|Plutonium|Americium|Curium|Berkelium|Californium|Einsteinium|Fermium|Mendelevium|Nobelium|Lawrencium|Rutherfordium|Dubnium|Seaborgium|Bohrium|Hassium|Meitnerium|Darmstadtium|Roentgenium|Copernicium|Nihonium|Flerovium|Moscovium|Livermorium|Tennessine|Oganesson'.split('|');
var CATS={
 alk:['Metales alcalinos','Alkali metals'],alke:['Alcalinotérreos','Alkaline earth metals'],trans:['Metales de transición','Transition metals'],post:['Otros metales','Post-transition metals'],
 meta:['Semimetales','Metalloids'],nom:['No metales','Nonmetals'],hal:['Halógenos','Halogens'],nob:['Gases nobles','Noble gases'],lan:['Lantánidos','Lanthanides'],act:['Actínidos','Actinides']
};
function catOf(z){
  if([3,11,19,37,55,87].indexOf(z)>=0)return'alk';
  if([4,12,20,38,56,88].indexOf(z)>=0)return'alke';
  if(z>=57&&z<=71)return'lan';
  if(z>=89&&z<=103)return'act';
  if([9,17,35,53,85,117].indexOf(z)>=0)return'hal';
  if([2,10,18,36,54,86,118].indexOf(z)>=0)return'nob';
  if([5,14,32,33,51,52].indexOf(z)>=0)return'meta';
  if([1,6,7,8,15,16,34].indexOf(z)>=0)return'nom';
  if([13,31,49,50,81,82,83,84,113,114,115,116].indexOf(z)>=0)return'post';
  return'trans';
}
function stateOf(z){
  if([1,2,7,8,9,10,17,18,36,54,86].indexOf(z)>=0)return'gas';
  if(z===35||z===80)return'liq';
  if(z===85||z===87||z>=100)return'unk';
  return'sol';
}
function periodOf(z){return z<=2?1:z<=10?2:z<=18?3:z<=36?4:z<=54?5:z<=86?6:7;}
function posOf(z){
  var r=periodOf(z),c,f=false;
  if(z===1)c=1;else if(z===2)c=18;
  else if(z<=4)c=z-2;else if(z<=10)c=z+8;
  else if(z<=12)c=z-10;else if(z<=18)c=z;
  else if(z<=36)c=z-18;else if(z<=54)c=z-36;
  else if(z<=56)c=z-54;else if(z<=70){c=z-54;f=true;}
  else if(z===71)c=3;else if(z<=86)c=z-68;
  else if(z<=88)c=z-86;else if(z<=102){c=z-86;f=true;}
  else if(z===103)c=3;else c=z-100;
  return {r:f?(r===6?9:10):r,c:c,f:f,p:r,g:f?null:c};
}
var ORB=[[1,0],[2,0],[2,1],[3,0],[3,1],[4,0],[3,2],[4,1],[5,0],[4,2],[5,1],[6,0],[4,3],[5,2],[6,1],[7,0],[5,3],[6,2],[7,1]];
var LET='spdf';
function madelung(Z){var f={},r=Z;for(var i=0;i<ORB.length;i++){if(r<=0)break;var o=ORB[i],k=Math.min(2*(2*o[1]+1),r);f[o[0]+LET[o[1]]]=k;r-=k;}return f;}
var CORES=[[2,'He'],[10,'Ne'],[18,'Ar'],[36,'Kr'],[54,'Xe'],[86,'Rn']];
var OVR={24:'3d5 4s1',29:'3d10 4s1',41:'4d4 5s1',42:'4d5 5s1',44:'4d7 5s1',45:'4d8 5s1',46:'4d10',47:'4d10 5s1',57:'5d1 6s2',58:'4f1 5d1 6s2',64:'4f7 5d1 6s2',78:'4f14 5d9 6s1',79:'4f14 5d10 6s1',89:'6d1 7s2',90:'6d2 7s2',91:'5f2 6d1 7s2',92:'5f3 6d1 7s2',93:'5f4 6d1 7s2',96:'5f7 6d1 7s2',103:'5f14 7s2 7p1'};
function sortOrb(x,y){return (x[0]-y[0])||(LET.indexOf(x[1])-LET.indexOf(y[1]));}
function configOf(Z){
  var core=null; CORES.forEach(function(c){if(c[0]<Z)core=c;});
  var coreFill=core?madelung(core[0]):{}, fill=madelung(Z);
  if(OVR[Z]){
    fill={}; for(var k0 in coreFill) fill[k0]=coreFill[k0];
    OVR[Z].split(' ').forEach(function(t){var m=t.match(/^(\d[spdf])(\d+)$/);fill[m[1]]=+m[2];});
  }
  var keys=Object.keys(fill).filter(function(k){return fill[k]>0;}).sort(sortOrb);
  var val=keys.filter(function(k){return fill[k]>(coreFill[k]||0);}).map(function(k){return k+fill[k];}).join(' ');
  var full=keys.map(function(k){return k+fill[k];}).join(' ');
  var shells=[]; keys.forEach(function(k){var n=+k[0];shells[n-1]=(shells[n-1]||0)+fill[k];});
  var orbs=ORB.map(function(o){return o[0]+LET[o[1]];}).filter(function(k){return fill[k]>0;}).map(function(k){return {k:k,c:fill[k],l:LET.indexOf(k[1]),core:fill[k]<=(coreFill[k]||0)};});
  return {core:core?core[1]:null,val:val,full:full,orbs:orbs,shells:shells.map(function(x){return x||0;})};
}
var sup=function(s){return s.replace(/(\d[spdf])(\d+)/g,'$1<sup>$2</sup>');};
var EL=RAW.split('|').map(function(l,i){
  var p=l.split(' '), Z=+p[0], pos=posOf(Z), cat=catOf(Z);
  var blk=pos.f?'f':(Z===2||pos.g<=2)?'s':pos.g>=13?'p':'d';
  return {z:Z,s:p[1],n:[p[2],NAMES_EN[i]],m:p[3],pos:pos,cat:cat,blk:blk,st:stateOf(Z),cfg:configOf(Z)};
});

/* ================= propiedades periódicas ================= */
/* Cadenas de 118 valores (Z = 1…118) separados por «|»; vacío = sin dato fiable; «x» = no forma anión estable (afinidad ≤ 0).
   en: electronegatividad (Pauling) · rc: radio covalente, pm (Cordero et al., 2008) · ei: 1.ª energía de ionización, kJ/mol · ea: afinidad electrónica, kJ/mol */
var PD={
 en:'2.20||0.98|1.57|2.04|2.55|3.04|3.44|3.98||0.93|1.31|1.61|1.90|2.19|2.58|3.16||0.82|1.00|1.36|1.54|1.63|1.66|1.55|1.83|1.88|1.91|1.90|1.65|1.81|2.01|2.18|2.55|2.96|3.00|0.82|0.95|1.22|1.33|1.60|2.16|1.90|2.20|2.28|2.20|1.93|1.69|1.78|1.96|2.05|2.10|2.66|2.60|0.79|0.89|1.10|1.12|1.13|1.14||1.17||1.20||1.22|1.23|1.24|1.25||1.27|1.30|1.50|2.36|1.90|2.20|2.20|2.28|2.54|2.00|1.62|2.33|2.02|2.00|2.20||0.70|0.90|1.10|1.30|1.50|1.38|1.36|1.28|1.30|1.30|1.30|1.30|1.30|1.30|1.30|1.30|1.30|||||||||||||||',
 rc:'31|28|128|96|84|76|71|66|57|58|166|141|121|111|107|105|102|106|203|176|170|160|153|139|139|132|126|124|132|122|122|120|119|120|120|116|220|195|190|175|164|154|147|146|142|139|145|144|142|139|139|138|139|140|244|215|207|204|203|201|199|198|198|196|194|192|192|189|190|187|187|175|170|162|151|144|141|136|136|132|145|146|148|140|150|150|260|221|215|206|200|196|190|187|180|169||||||||||||||||||||||',
 ei:'1312|2372.3|520.2|899.5|800.6|1086.5|1402.3|1313.9|1681|2080.7|495.8|737.7|577.5|786.5|1011.8|999.6|1251.2|1520.6|418.8|589.8|633.1|658.8|650.9|652.9|717.3|762.5|760.4|737.1|745.5|906.4|578.8|762.2|944.5|941|1139.9|1350.8|403|549.5|599.9|640.1|652.1|684.3|686.9|710.2|719.7|804.4|731|867.8|558.3|708.6|830.6|869.3|1008.4|1170.4|375.7|502.8|538.1|534.4|527.8|533.1|538.6|544.5|547.1|593.4|565.8|573|581|589.3|596.7|603.4|523.5|658.5|728.4|758.8|755.8|814.2|865.2|864.4|890.1|1007.1|589.4|715.6|702.9|812.2|899|1037.1|393|509.3|519.1|608.5|568.3|597.6|604.5|581.4|576.4|578.2|598|606.1|614.5|627.2|634.9|639.3|478.6|||||||||||||||',
 ra:'53|31|167|112|87|67|56|48|42|38|190|145|118|111|98|88|79|71|243|194|184|176|171|166|161|156|152|149|145|142|136|125|114|103|94|88|265|219|212|206|198|190|183|178|173|169|165|161|156|145|133|123|115|108|298|253|||247|206|205|238|231|233|225|228|226|226|222|222|217|208|200|193|188|185|180|177|174|171|156|154|143|135|127|120||||||||||||||||||||||||||||||||',
 ea:'72.769|x|59.6326|x|26.989|121.776|x|140.976|328.165|x|52.867|x|41.762|134.068|72.037|200.41|348.575|x|48.383|2.37|17.3076|7.289|50.911|65.2172|x|14.785|63.8979|111.65|119.235|x|29.0581|118.935|77.6211|194.965|324.537|x|46.884|5.023|30.035|41.806|88.516|72.097|53|100.95|110.27|54.24|125.862|x|37.043|107.298|101.059|190.161|295.153|x|45.5023|13.954|53.795|57.9067|92.8||||||||||99||23.04|17.18|31.7301|78.7803|5.8273|103.978|150.909|205.041|222.747|x|30.8804|34.4183|90.924|136|233.087|x|46.89|9.6485||||||||||||||||||||||||||||||'
};
/* tp / tg: tendencia por período (→) y por grupo (↓); dt / dp: decimales en la casilla y en el panel; ramp: tres colores (bajo, medio, alto) */
var PR=[
 {k:'en',n:['Electronegatividad','Electronegativity'],u:['escala de Pauling','Pauling scale'],lab:['Electronegatividad (Pauling)','Electronegativity (Pauling)'],unit:'',dt:2,dp:2,tp:1,tg:-1,gam:1,ramp:['#fff0b8','#f7873f','#7b1650'],
  d:['Qué tan fuerte atrae un átomo los electrones de un enlace.','How strongly an atom pulls on the electrons of a bond.'],
  w:['Aumenta hacia el flúor: más carga nuclear efectiva y menos capas. Los gases nobles ligeros no tienen valor.','Rises toward fluorine: higher effective nuclear charge and fewer shells. The light noble gases have no value.']},
 {k:'rc',n:['Radio covalente','Covalent radius'],u:['enlace sencillo, pm','single bond, pm'],lab:['Radio covalente','Covalent radius'],unit:'pm',dt:0,dp:0,tp:-1,tg:1,gam:1,ramp:['#e4f5fc','#4aa6de','#0c3b7c'],
  d:['Tamaño del átomo en un enlace covalente sencillo.','Size of the atom in a single covalent bond.'],
  w:['Disminuye a lo largo del período (la carga nuclear efectiva contrae la nube) y aumenta al bajar en un grupo (más capas).','Shrinks across a period (effective nuclear charge pulls the cloud in) and grows down a group (more shells).']},
 {k:'ei',n:['Energía de ionización','Ionization energy'],u:['primera, kJ/mol','first, kJ/mol'],lab:['1.ª energía de ionización','1st ionization energy'],unit:'kJ/mol',dt:0,dp:1,tp:1,tg:-1,gam:1,ramp:['#f3e9fb','#a56fdc','#3f1478'],
  d:['Energía para arrancar el electrón más externo de un átomo gaseoso.','Energy needed to remove the outermost electron of a gaseous atom.'],
  w:['Aumenta hacia el helio. En cada período hay caídas (por ejemplo, Be → B y N → O) por la subcapa p y por los electrones apareados.','Rises toward helium. Each period has dips (for example Be → B and N → O) because of the p subshell and paired electrons.']},
 {k:'ra',n:['Radio atómico','Atomic radius'],u:['calculado, pm','calculated, pm'],lab:['Radio atómico','Atomic radius'],unit:'pm',dt:0,dp:0,tp:-1,tg:1,gam:1,ramp:['#eaf7f4','#2fb5a3','#0a5a52'],
  d:['Tamaño del átomo aislado: distancia al máximo de densidad electrónica externa.','Size of the isolated atom: distance to the outer electron-density maximum.'],
  w:['Disminuye a lo largo del período (más carga nuclear efectiva) y aumenta al bajar (más capas). Valores calculados de Clementi et al., hasta Z = 86.','Shrinks across a period (higher effective nuclear charge) and grows down a group (more shells). Calculated values from Clementi et al., up to Z = 86.']},
 {k:'mc',n:['Carácter metálico','Metallic character'],u:['índice relativo, 0 a 100','relative index, 0 to 100'],lab:['Carácter metálico (índice)','Metallic character (index)'],unit:'',dt:0,dp:0,tp:-1,tg:1,gam:1,ramp:['#f1f3f6','#8f9fb5','#26344d'],
  d:['Tendencia de un átomo a perder electrones y formar cationes.','Tendency of an atom to lose electrons and form cations.'],
  w:['Disminuye a lo largo del período y aumenta al bajar: los más metálicos son Cs y Fr. Es un índice relativo calculado a partir de la 1.ª energía de ionización, no una magnitud medida.','Falls across a period and rises down a group: Cs and Fr are the most metallic. It is a relative index calculated from the first ionization energy, not a measured quantity.']},
 {k:'ea',n:['Afinidad electrónica','Electron affinity'],u:['kJ/mol, energía liberada','kJ/mol, energy released'],lab:['Afinidad electrónica','Electron affinity'],unit:'kJ/mol',dt:0,dp:1,tp:1,tg:-1,gam:.7,ex:1,ramp:['#e6f6e2','#4dbd78','#0a5f38'],
  d:['Energía liberada cuando un átomo gaseoso captura un electrón.','Energy released when a gaseous atom gains an electron.'],
  w:['Tiende a crecer hacia los halógenos y el máximo es el cloro, no el flúor (por su tamaño). Los gases nobles, Be, Mg, N, Zn, Cd y Hg no forman un anión estable.','It tends to grow toward the halogens, and the maximum is chlorine, not fluorine (because of its size). The noble gases, Be, Mg, N, Zn, Cd and Hg do not form a stable anion.']}
];
/* carácter metálico: índice relativo derivado de la 1.ª energía de ionización (0 = He, 100 = Cs); no es una magnitud medida */
PD.mc=PD.ei.split('|').map(function(x){x=parseFloat(x);return isNaN(x)?'':String(Math.round(100*(1-(x-375.7)/(2372.3-375.7))));}).join('|');
var PM={}, PF=[1,3,11,19,37,55,87], PC=[2,8,8,18,18,32,32];
function hex2rgb(h){return [parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)];}
function colorAt(p,t){
  var r=p.ramp.map(hex2rgb), k=t<.5?0:1, u=t<.5?t*2:(t-.5)*2, a=r[k], b=r[k+1];
  return [0,1,2].map(function(i){return Math.round(a[i]+(b[i]-a[i])*u);});
}
function rgbCss(c){return 'rgb('+c[0]+','+c[1]+','+c[2]+')';}
function lumOf(c){var f=function(x){x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4);};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);}
PR.forEach(function(p){
  PM[p.k]=p;
  var lo=1e9,hi=-1e9;
  PD[p.k].split('|').forEach(function(v,i){
    var x=v===''?null:v==='x'?'x':parseFloat(v);
    (EL[i].p=EL[i].p||{})[p.k]=x;
    if(typeof x==='number'){if(x<lo){lo=x;p.loZ=i+1;}if(x>hi){hi=x;p.hiZ=i+1;}}
  });
  p.lo=lo;p.hi=hi;
});
function fnum(v,dec){return fmt(dec===0?String(Math.round(v)):v.toFixed(dec));}
function tileVal(p,e){var v=e.p[p.k];return v===null?'—':v==='x'?'≤ 0':fnum(v,p.dt);}
function panelVal(p,e){var v=e.p[p.k];return v===null?'—':v==='x'?tr(S.noAnion):fnum(v,p.dp)+(p.unit?' '+p.unit:'');}

/* ================= grupos funcionales ================= */
var GRUPOS=[
 {tags:['hc'],n:['Alcano','Alkane'],gen:'C<sub>n</sub>H<sub>2n+2</sub>',suf:['-ano','-ane'],ej:['propano, CH<sub>3</sub>CH<sub>2</sub>CH<sub>3</sub>','propane, CH<sub>3</sub>CH<sub>2</sub>CH<sub>3</sub>'],
  atoms:{C1:[0,.5],C2:[a,0],C3:[2*a,.5],C4:[3*a,0]},bonds:'C1-C2 C2-C3 C3-C4',hi:[],mode:'fg',
  geo:['C sp³, tetraédrico (≈109,5°). Enlaces σ simples con giro libre.','sp³ carbon, tetrahedral (≈109.5°). Single σ bonds with free rotation.'],
  prop:['Apolares e insolubles en agua; el punto de ebullición crece con la cadena.','Nonpolar and insoluble in water; the boiling point rises with chain length.'],
  rx:['Combustión y halogenación radicalaria; poco reactivos.','Combustion and radical halogenation; fairly unreactive.'],
  uso:['Gas natural, gasolina, parafinas.','Natural gas, gasoline, paraffin waxes.']},
 {tags:['hc'],n:['Alqueno','Alkene'],gen:'R–CH=CH–R′',suf:['-eno','-ene'],ej:['propeno, CH<sub>2</sub>=CHCH<sub>3</sub>','propene, CH<sub>2</sub>=CHCH<sub>3</sub>'],
  atoms:{R1:[0,.5,'R'],C1:[a,0],C2:[2*a,.5],R2:[3*a,0,'R′']},bonds:'R1-C1 C1=C2 C2-R2',hi:['C1','C2'],mode:'fg',
  geo:['C sp², plano (≈120°). El enlace π impide girar: isomería cis/trans.','sp² carbon, planar (≈120°). The π bond blocks rotation: cis/trans isomerism.'],
  prop:['Apolares; más reactivos que los alcanos por el enlace π.','Nonpolar; more reactive than alkanes because of the π bond.'],
  rx:['Adición electrofílica (HX, X<sub>2</sub>, H<sub>2</sub>O) e hidrogenación.','Electrophilic addition (HX, X<sub>2</sub>, H<sub>2</sub>O) and hydrogenation.'],
  uso:['Eteno (etileno): polietileno y hormona de maduración.','Ethene (ethylene): polyethylene and a fruit-ripening hormone.']},
 {tags:['hc'],n:['Alquino','Alkyne'],gen:'R–C≡C–R′',suf:['-ino','-yne'],ej:['propino, HC≡CCH<sub>3</sub>','propyne, HC≡CCH<sub>3</sub>'],
  atoms:{R1:[0,0,'R'],C1:[1,0],C2:[2,0],R2:[3,0,'R′']},bonds:'R1-C1 C1#C2 C2-R2',hi:['C1','C2'],mode:'fg',
  geo:['C sp, lineal (180°). Un enlace σ y dos π.','sp carbon, linear (180°). One σ and two π bonds.'],
  prop:['El H terminal es débilmente ácido (pKa ≈ 25).','The terminal H is weakly acidic (pKa ≈ 25).'],
  rx:['Adición (H<sub>2</sub>, HX, X<sub>2</sub>) e hidratación a cetona.','Addition (H<sub>2</sub>, HX, X<sub>2</sub>) and hydration to a ketone.'],
  uso:['Etino (acetileno) en soldadura y síntesis.','Ethyne (acetylene) in welding and synthesis.']},
 {tags:['hc'],n:['Areno (benceno)','Arene (benzene)'],gen:'Ar–R',suf:['-benceno','-benzene'],ej:['metilbenceno (tolueno), C<sub>6</sub>H<sub>5</sub>CH<sub>3</sub>','methylbenzene (toluene), C<sub>6</sub>H<sub>5</sub>CH<sub>3</sub>'],
  atoms:{R1:[-2,0,'R'],a0:[-1,0],a1:[-.5,-R3],a2:[.5,-R3],a3:[1,0],a4:[.5,R3],a5:[-.5,R3]},bonds:'R1-a0 a0=a5@c a5-a4 a4=a3@c a3-a2 a2=a1@c a1-a0',rc:{c:[0,0]},hi:['a0','a1','a2','a3','a4','a5'],mode:'fg',
  geo:['Anillo plano de 6 C sp² con 6 e⁻ π deslocalizados (aromático).','Planar ring of six sp² carbons with 6 delocalized π electrons (aromatic).'],
  prop:['Muy estable por resonancia; apolar.','Very stable thanks to resonance; nonpolar.'],
  rx:['Sustitución electrofílica aromática (no adición).','Electrophilic aromatic substitution (not addition).'],
  uso:['Tolueno, aminoácidos Phe, Tyr y Trp, fármacos.','Toluene, the amino acids Phe, Tyr and Trp, drugs.']},
 {tags:['hal'],n:['Haluro de alquilo','Alkyl halide'],gen:'R–X',suf:['prefijo fluoro-, cloro-, bromo-, yodo-','prefix fluoro-, chloro-, bromo-, iodo-'],ej:['cloroetano, CH<sub>3</sub>CH<sub>2</sub>Cl','chloroethane, CH<sub>3</sub>CH<sub>2</sub>Cl'],
  atoms:{R1:[0,.5,'R'],X:[2*a,0,'X']},bonds:'R1-X',hi:['X'],mode:'fg',
  geo:['Enlace C–X polar; se debilita de F a I (C–F es el más fuerte).','Polar C–X bond; it weakens from F to I (C–F is the strongest).'],
  prop:['La ebullición sube con la masa de X; poco solubles en agua.','Boiling point rises with the mass of X; poorly soluble in water.'],
  rx:['Sustitución nucleofílica (S<sub>N</sub>1, S<sub>N</sub>2) y eliminación (E1, E2).','Nucleophilic substitution (S<sub>N</sub>1, S<sub>N</sub>2) and elimination (E1, E2).'],
  uso:['Disolventes e intermediarios de síntesis.','Solvents and synthetic intermediates.']},
 {tags:['ox'],n:['Alcohol','Alcohol'],gen:'R–OH',suf:['-ol','-ol'],ej:['etanol, CH<sub>3</sub>CH<sub>2</sub>OH','ethanol, CH<sub>3</sub>CH<sub>2</sub>OH'],
  atoms:{R1:[0,.5,'R'],O:[2*a,0,'OH']},bonds:'R1-O',hi:['O'],mode:'fg',
  geo:['O sp³ angular; el O–H polar forma puentes de hidrógeno.','Bent sp³ oxygen; the polar O–H forms hydrogen bonds.'],
  prop:['Ebullición alta; los de pocos C son solubles en agua (pKa ≈ 16–18).','High boiling point; those with few carbons dissolve in water (pKa ≈ 16–18).'],
  rx:['Oxidación (1.º → aldehído o ácido; 2.º → cetona), deshidratación y esterificación.','Oxidation (1° → aldehyde or acid; 2° → ketone), dehydration and esterification.'],
  uso:['Etanol, glicerol, azúcares y serina.','Ethanol, glycerol, sugars and serine.']},
 {tags:['ox'],n:['Éter','Ether'],gen:'R–O–R′',suf:['prefijo alcoxi- (también éter dialquílico)','prefix alkoxy- (also dialkyl ether)'],ej:['etoxietano (éter dietílico), CH<sub>3</sub>CH<sub>2</sub>OCH<sub>2</sub>CH<sub>3</sub>','ethoxyethane (diethyl ether), CH<sub>3</sub>CH<sub>2</sub>OCH<sub>2</sub>CH<sub>3</sub>'],
  atoms:{R1:[0,0,'R'],O:[a,.5,'O'],R2:[2*a,0,'R′']},bonds:'R1-O O-R2',hi:['O'],mode:'fg',
  geo:['C–O–C angular (≈110°); sin O–H.','Bent C–O–C (≈110°); no O–H.'],
  prop:['No forman puentes de H entre sí: ebullición baja; buenos disolventes.','They cannot hydrogen-bond to each other: low boiling point; good solvents.'],
  rx:['Poco reactivos; se rompen con HI o HBr; forman peróxidos con el aire.','Fairly unreactive; cleaved by HI or HBr; form peroxides in air.'],
  uso:['Éter dietílico, THF, éteres corona.','Diethyl ether, THF, crown ethers.']},
 {tags:['hal'],n:['Tiol','Thiol'],gen:'R–SH',suf:['-tiol','-thiol'],ej:['etanotiol, CH<sub>3</sub>CH<sub>2</sub>SH','ethanethiol, CH<sub>3</sub>CH<sub>2</sub>SH'],
  atoms:{R1:[0,.5,'R'],S:[2*a,0,'SH']},bonds:'R1-S',hi:['S'],mode:'fg',
  geo:['S–H poco polar; puentes de H débiles.','Weakly polar S–H; weak hydrogen bonds.'],
  prop:['Más ácidos que los alcoholes (pKa ≈ 10); olor intenso.','More acidic than alcohols (pKa ≈ 10); strong smell.'],
  rx:['Oxidación reversible a disulfuro (R–S–S–R).','Reversible oxidation to a disulfide (R–S–S–R).'],
  uso:['Cisteína y puentes disulfuro de proteínas.','Cysteine and protein disulfide bridges.']},
 {tags:['nit'],n:['Amina (primaria)','Amine (primary)'],gen:'R–NH<sub>2</sub>',suf:['-amina','-amine'],ej:['etanamina, CH<sub>3</sub>CH<sub>2</sub>NH<sub>2</sub>','ethanamine, CH<sub>3</sub>CH<sub>2</sub>NH<sub>2</sub>'],
  atoms:{R1:[0,.5,'R'],N:[2*a,0,'NH2']},bonds:'R1-N',hi:['N'],mode:'fg',
  geo:['N piramidal con par libre (sp³).','Pyramidal nitrogen with a lone pair (sp³).'],
  prop:['Básicas y nucleofílicas; las primarias y secundarias forman puentes de H.','Basic and nucleophilic; primary and secondary amines form hydrogen bonds.'],
  rx:['Protonación a sal de amonio; alquilación y acilación (→ amidas).','Protonation to an ammonium salt; alkylation and acylation (→ amides).'],
  uso:['Aminoácidos, alcaloides, neurotransmisores.','Amino acids, alkaloids, neurotransmitters.']},
 {tags:['ox'],n:['Aldehído','Aldehyde'],gen:'R–CHO',suf:['-al','-al'],ej:['etanal, CH<sub>3</sub>CHO','ethanal, CH<sub>3</sub>CHO'],
  atoms:{C:[0,0],O:[0,-1,'O'],R1:[-a,.5,'R'],H:[a,.5,'H']},bonds:'C=O C-R1 C-H',hi:['C','O','H'],mode:'fg',
  geo:['C=O plano (≈120°), C sp²; carbono carbonílico muy electrófilo.','Planar C=O (≈120°), sp² carbon; a strongly electrophilic carbonyl carbon.'],
  prop:['Polares, sin puentes de H entre sí; se oxidan con facilidad.','Polar, no hydrogen bonding between molecules; easily oxidized.'],
  rx:['Adición nucleofílica; oxidación a ácido; reducción a alcohol primario.','Nucleophilic addition; oxidation to an acid; reduction to a primary alcohol.'],
  uso:['Formaldehído, benzaldehído, glucosa (aldosa).','Formaldehyde, benzaldehyde, glucose (an aldose).']},
 {tags:['ox'],n:['Cetona','Ketone'],gen:'R–CO–R′',suf:['-ona','-one'],ej:['propan-2-ona (acetona), CH<sub>3</sub>COCH<sub>3</sub>','propan-2-one (acetone), CH<sub>3</sub>COCH<sub>3</sub>'],
  atoms:{C:[0,0],O:[0,-1,'O'],R1:[-a,.5,'R'],R2:[a,.5,'R′']},bonds:'C=O C-R1 C-R2',hi:['C','O'],mode:'fg',
  geo:['C=O plano (≈120°) flanqueado por dos carbonos.','Planar C=O (≈120°) flanked by two carbons.'],
  prop:['Polares; más resistentes a la oxidación que los aldehídos.','Polar; more resistant to oxidation than aldehydes.'],
  rx:['Adición nucleofílica; reducción a alcohol secundario; tautomería ceto-enólica.','Nucleophilic addition; reduction to a secondary alcohol; keto–enol tautomerism.'],
  uso:['Acetona (disolvente), fructosa (cetosa).','Acetone (a solvent), fructose (a ketose).']},
 {tags:['ox'],n:['Ácido carboxílico','Carboxylic acid'],gen:'R–COOH',suf:['ácido -oico','-oic acid'],ej:['ácido etanoico (acético), CH<sub>3</sub>COOH','ethanoic acid (acetic acid), CH<sub>3</sub>COOH'],
  atoms:{C:[0,0],O:[0,-1,'O'],R1:[-a,.5,'R'],OH:[a,.5,'OH']},bonds:'C=O C-R1 C-OH',hi:['C','O','OH'],mode:'fg',
  geo:['C sp² plano; el carboxilato se estabiliza por resonancia.','Planar sp² carbon; the carboxylate is stabilized by resonance.'],
  prop:['Forman dímeros por puentes de H; ácidos débiles (pKa ≈ 4–5).','Form hydrogen-bonded dimers; weak acids (pKa ≈ 4–5).'],
  rx:['Desprotonación, esterificación de Fischer, paso a derivados de ácido.','Deprotonation, Fischer esterification, conversion to acid derivatives.'],
  uso:['Vinagre, ácidos grasos, extremo C de aminoácidos.','Vinegar, fatty acids, the C-terminus of amino acids.']},
 {tags:['ox'],n:['Éster','Ester'],gen:'R–COO–R′',suf:['-oato de alquilo','alkyl -oate'],ej:['etanoato de etilo, CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>','ethyl ethanoate, CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>'],
  atoms:{C:[0,0],O:[0,-1,'O'],R1:[-a,.5,'R'],O2:[a,.5,'O'],R2:[2*a,0,'R′']},bonds:'C=O C-R1 C-O2 O2-R2',hi:['C','O','O2'],mode:'fg',
  geo:['C=O plano unido a O–R′.','Planar C=O bonded to O–R′.'],
  prop:['Sin O–H: ebullición baja; suelen oler a fruta.','No O–H: low boiling point; often smell fruity.'],
  rx:['Hidrólisis (en medio básico, saponificación); reducción a alcoholes.','Hydrolysis (saponification in base); reduction to alcohols.'],
  uso:['Triglicéridos, aromas, poliésteres.','Triglycerides, flavors and fragrances, polyesters.']},
 {tags:['ox','nit'],n:['Amida','Amide'],gen:'R–CONH<sub>2</sub>',suf:['-amida','-amide'],ej:['etanamida (acetamida), CH<sub>3</sub>CONH<sub>2</sub>','ethanamide (acetamide), CH<sub>3</sub>CONH<sub>2</sub>'],
  atoms:{C:[0,0],O:[0,-1,'O'],R1:[-a,.5,'R'],N:[a,.5,'NH2']},bonds:'C=O C-R1 C-N',hi:['C','O','N'],mode:'fg',
  geo:['Plana: la resonancia N–C=O da carácter parcial de doble enlace al C–N.','Planar: N–C=O resonance gives the C–N bond partial double-bond character.'],
  prop:['Neutras (no básicas); forman puentes de H; ebullición alta.','Neutral (not basic); form hydrogen bonds; high boiling point.'],
  rx:['Hidrólisis lenta (calor con ácido o base); el derivado más estable.','Slow hydrolysis (heat with acid or base); the most stable acid derivative.'],
  uso:['Enlace peptídico de proteínas; nailon.','The peptide bond in proteins; nylon.']},
 {tags:['ox','hal'],n:['Haluro de acilo','Acyl halide'],gen:'R–COX',suf:['haluro de -oílo','-oyl halide'],ej:['cloruro de etanoílo, CH<sub>3</sub>COCl','ethanoyl chloride, CH<sub>3</sub>COCl'],
  atoms:{C:[0,0],O:[0,-1,'O'],R1:[-a,.5,'R'],X:[a,.5,'X']},bonds:'C=O C-R1 C-X',hi:['C','O','X'],mode:'fg',
  geo:['C=O plano con un buen grupo saliente (X).','Planar C=O with a good leaving group (X).'],
  prop:['El derivado de ácido más reactivo; se hidroliza con la humedad.','The most reactive acid derivative; hydrolyzes with moisture.'],
  rx:['Con alcoholes → ésteres; con aminas → amidas; con agua → ácido.','With alcohols → esters; with amines → amides; with water → acid.'],
  uso:['Reactivos de laboratorio e industriales; se hidrolizan con la humedad del aire.','Laboratory and industrial reagents; they hydrolyze with moisture in the air.']},
 {tags:['ox'],n:['Anhídrido de ácido','Acid anhydride'],gen:'(RCO)<sub>2</sub>O',suf:['anhídrido -oico','-oic anhydride'],ej:['anhídrido etanoico (acético), (CH<sub>3</sub>CO)<sub>2</sub>O','ethanoic anhydride (acetic anhydride), (CH<sub>3</sub>CO)<sub>2</sub>O'],
  atoms:{R1:[-a,.5,'R'],C1:[0,0],O1:[0,-1,'O'],Ob:[a,.5,'O'],C2:[2*a,0],O2:[2*a,-1,'O'],R2:[3*a,.5,'R′']},bonds:'R1-C1 C1=O1 C1-Ob Ob-C2 C2=O2 C2-R2',hi:['C1','O1','Ob','C2','O2'],mode:'fg',
  geo:['Dos grupos acilo unidos por un oxígeno.','Two acyl groups joined by an oxygen.'],
  prop:['Muy reactivo (menos que el haluro de acilo); se hidroliza con agua.','Very reactive (less than an acyl halide); hydrolyzes with water.'],
  rx:['Acilación: con alcoholes → éster; con aminas → amida; con agua → 2 ácidos.','Acylation: with alcohols → ester; with amines → amide; with water → 2 acids.'],
  uso:['Anhídrido acético en la síntesis de aspirina.','Acetic anhydride in the synthesis of aspirin.']},
 {tags:['nit'],n:['Nitrilo','Nitrile'],gen:'R–C≡N',suf:['-nitrilo','-nitrile'],ej:['etanonitrilo (acetonitrilo), CH<sub>3</sub>C≡N','ethanenitrile (acetonitrile), CH<sub>3</sub>C≡N'],
  atoms:{R1:[0,0,'R'],C:[1,0],N:[2,0,'N']},bonds:'R1-C C#N',hi:['C','N'],mode:'fg',
  geo:['C sp, lineal (180°); triple enlace C≡N polar.','sp carbon, linear (180°); polar C≡N triple bond.'],
  prop:['Polares; ebullición relativamente alta para su masa.','Polar; relatively high boiling point for their mass.'],
  rx:['Hidrólisis a ácido carboxílico; reducción a amina primaria.','Hydrolysis to a carboxylic acid; reduction to a primary amine.'],
  uso:['Acetonitrilo (disolvente en HPLC); alarga la cadena en un carbono.','Acetonitrile (an HPLC solvent); lengthens the chain by one carbon.']},
 {tags:['nit'],n:['Nitro','Nitro'],gen:'R–NO<sub>2</sub>',suf:['prefijo nitro-','prefix nitro-'],ej:['nitrometano, CH<sub>3</sub>NO<sub>2</sub>','nitromethane, CH<sub>3</sub>NO<sub>2</sub>'],
  atoms:{R1:[-1,0,'R'],N:[0,0,'N^+'],O1:[.5,-R3,'O'],O2:[.5,R3,'O^-']},bonds:'R1-N N=O1 N-O2',hi:['N','O1','O2'],mode:'fg',
  geo:['N⁺ con resonancia entre los dos O; grupo plano.','N⁺ with resonance between the two O atoms; planar group.'],
  prop:['Fuertemente atractor de electrones; muy polar.','Strongly electron-withdrawing; very polar.'],
  rx:['Se reduce a amina (–NH<sub>2</sub>).','Reduced to an amine (–NH<sub>2</sub>).'],
  uso:['Síntesis de anilinas; el TNT es un nitroderivado explosivo.','Synthesis of anilines; TNT is an explosive nitro compound.']}
];

/* ================= aminoácidos ================= */
var BB={N:[0,0,'H2N'],CA:[a,.5],C:[2*a,0],O:[2*a,-1,'O'],OH:[3*a,.5,'OH']};
var BBb='N-CA CA-C C=O C-OH';
var ACLS={apo:[['Apolares alifáticos','Nonpolar aliphatic'],'var(--tpe-apo)'],aro:[['Aromáticos','Aromatic'],'var(--tpe-aro)'],pol:[['Polares sin carga','Polar uncharged'],'var(--tpe-pol)'],aci:[['Ácidos (carga −)','Acidic (charge −)'],'var(--tpe-aci)'],bas:[['Básicos (carga +)','Basic (charge +)'],'var(--tpe-bas)']};
var Q0=['0 (neutra)','0 (neutral)'];
var AA=[
 {n:['Glicina','Glycine'],t:'Gly',o:'G',c:'apo',r:['–H','–H'],pi:'5.97',q:Q0,d:['La más pequeña; única sin carbono quiral. Aporta flexibilidad (colágeno).','The smallest; the only one with no chiral carbon. Adds flexibility (collagen).'],side:{H:[a,1.5,'H']},b:'CA-H'},
 {n:['Alanina','Alanine'],t:'Ala',o:'A',c:'apo',r:['–CH<sub>3</sub>','–CH<sub>3</sub>'],pi:'6.00',q:Q0,d:['Pequeña y apolar; abundante en hélices α.','Small and nonpolar; abundant in α-helices.'],side:{B:[a,1.5]},b:'CA-B'},
 {n:['Valina','Valine'],t:'Val',o:'V',c:'apo',r:['–CH(CH<sub>3</sub>)<sub>2</sub>','–CH(CH<sub>3</sub>)<sub>2</sub>'],pi:'5.96',es:1,q:Q0,d:['Ramificada (BCAA); hidrofóbica.','Branched-chain (BCAA); hydrophobic.'],side:{B:[a,1.5],G1:[0,2],G2:[2*a,2]},b:'CA-B B-G1 B-G2'},
 {n:['Leucina','Leucine'],t:'Leu',o:'L',c:'apo',r:['–CH<sub>2</sub>CH(CH<sub>3</sub>)<sub>2</sub>','–CH<sub>2</sub>CH(CH<sub>3</sub>)<sub>2</sub>'],pi:'5.98',es:1,q:Q0,d:['Ramificada (BCAA); muy frecuente en el interior de las proteínas.','Branched-chain (BCAA); very common in protein interiors.'],side:{B:[a,1.5],G:[2*a,2],D1:[2*a,3],D2:[3*a,1.5]},b:'CA-B B-G G-D1 G-D2'},
 {n:['Isoleucina','Isoleucine'],t:'Ile',o:'I',c:'apo',r:['–CH(CH<sub>3</sub>)CH<sub>2</sub>CH<sub>3</sub>','–CH(CH<sub>3</sub>)CH<sub>2</sub>CH<sub>3</sub>'],pi:'6.02',es:1,q:Q0,d:['Ramificada (BCAA); dos carbonos quirales (2S,3S).','Branched-chain (BCAA); two chiral carbons (2S,3S).'],side:{B:[a,1.5],G1:[2*a,2],D:[2*a,3],G2:[0,2]},b:'CA-B B-G1 G1-D B-G2'},
 {n:['Prolina','Proline'],t:'Pro',o:'P',c:'apo',r:['–CH<sub>2</sub>CH<sub>2</sub>CH<sub>2</sub>– (cíclica, unida al N)','–CH<sub>2</sub>CH<sub>2</sub>CH<sub>2</sub>– (cyclic, bonded to N)'],pi:'6.30',pro:1,q:Q0,d:['Amina secundaria cíclica; rompe hélices α y forma giros.','Cyclic secondary amine; breaks α-helices and forms turns.'],side:{B:[.658,1.478],G:[-.337,1.583],D:[-.744,.669]},b:'CA-B B-G G-D D-N'},
 {n:['Metionina','Methionine'],t:'Met',o:'M',c:'apo',r:['–CH<sub>2</sub>CH<sub>2</sub>SCH<sub>3</sub>','–CH<sub>2</sub>CH<sub>2</sub>SCH<sub>3</sub>'],pi:'5.74',es:1,q:Q0,d:['Contiene azufre (tioéter); las proteínas nuevas parten con Met (codón AUG).','Contains sulfur (a thioether); new proteins start with Met (AUG codon).'],side:{B:[a,1.5],G:[2*a,2],S:[2*a,3,'S'],E:[3*a,3.5]},b:'CA-B B-G G-S S-E'},
 {n:['Fenilalanina','Phenylalanine'],t:'Phe',o:'F',c:'aro',r:['–CH<sub>2</sub>C<sub>6</sub>H<sub>5</sub>','–CH<sub>2</sub>C<sub>6</sub>H<sub>5</sub>'],pi:'5.48',es:1,q:Q0,d:['Aromática hidrofóbica; precursora de la tirosina.','Hydrophobic aromatic; precursor of tyrosine.'],side:{B:[a,1.5],G:[2*a,2],D1:[3*a,1.5],E1:[4*a,2],Z:[4*a,3],E2:[3*a,3.5],D2:[2*a,3]},b:'CA-B B-G G=D1@c D1-E1 E1=Z@c Z-E2 E2=D2@c D2-G',rc:{c:[3*a,2.5]}},
 {n:['Tirosina','Tyrosine'],t:'Tyr',o:'Y',c:'aro',r:['–CH<sub>2</sub>C<sub>6</sub>H<sub>4</sub>OH','–CH<sub>2</sub>C<sub>6</sub>H<sub>4</sub>OH'],pi:'5.66',q:Q0,pk:'10.07',d:['OH fenólico; se fosforila; precursora de melanina, adrenalina y hormonas tiroideas.','Phenolic OH; gets phosphorylated; precursor of melanin, epinephrine and thyroid hormones.'],side:{B:[a,1.5],G:[2*a,2],D1:[3*a,1.5],E1:[4*a,2],Z:[4*a,3],E2:[3*a,3.5],D2:[2*a,3],OH2:[5*a,3.5,'OH']},b:'CA-B B-G G=D1@c D1-E1 E1=Z@c Z-E2 E2=D2@c D2-G Z-OH2',rc:{c:[3*a,2.5]}},
 {n:['Triptófano','Tryptophan'],t:'Trp',o:'W',c:'aro',r:['–CH<sub>2</sub>–indol','–CH<sub>2</sub>–indole'],pi:'5.89',es:1,q:Q0,d:['Indol; es la que más absorbe UV (≈ 280 nm); precursora de serotonina.','Indole; the strongest UV absorber (≈ 280 nm); precursor of serotonin.'],side:{B:[a,1.5],G:[2*a,2],D1:[1.144,2.809],E1:[2*a,3.618,'NH'],E2:[2.683,3.309],D2:[2.683,2.309],Z2:[3.549,1.809],H2:[4.415,2.309],Z3:[4.415,3.309],Z4:[3.549,3.809]},b:'CA-B B-G G=D1@p D1-E1 E1-E2 E2-D2 D2-G D2=Z2@c Z2-H2 H2=Z3@c Z3-Z4 Z4=E2@c',rc:{p:[1.995,2.809],c:[3.549,2.809]}},
 {n:['Serina','Serine'],t:'Ser',o:'S',c:'pol',r:['–CH<sub>2</sub>OH','–CH<sub>2</sub>OH'],pi:'5.68',q:Q0,d:['OH primario; sitio frecuente de fosforilación.','Primary OH; a common phosphorylation site.'],side:{B:[a,1.5],OG:[2*a,2,'OH']},b:'CA-B B-OG'},
 {n:['Treonina','Threonine'],t:'Thr',o:'T',c:'pol',r:['–CH(OH)CH<sub>3</sub>','–CH(OH)CH<sub>3</sub>'],pi:'5.60',es:1,q:Q0,d:['OH secundario; dos carbonos quirales (2S,3R); se fosforila.','Secondary OH; two chiral carbons (2S,3R); gets phosphorylated.'],side:{B:[a,1.5],G2:[0,2],OG:[2*a,2,'OH']},b:'CA-B B-G2 B-OG'},
 {n:['Cisteína','Cysteine'],t:'Cys',o:'C',c:'pol',r:['–CH<sub>2</sub>SH','–CH<sub>2</sub>SH'],pi:'5.07',q:Q0,pk:'8.18',d:['Tiol que forma puentes disulfuro (cistina); única (R) por prioridad CIP.','Thiol that forms disulfide bridges (cystine); the only (R) one, by CIP priority.'],side:{B:[a,1.5],S:[2*a,2,'SH']},b:'CA-B B-S'},
 {n:['Asparagina','Asparagine'],t:'Asn',o:'N',c:'pol',r:['–CH<sub>2</sub>CONH<sub>2</sub>','–CH<sub>2</sub>CONH<sub>2</sub>'],pi:'5.41',q:Q0,d:['Amida; sitio de N-glicosilación en proteínas.','Amide; N-glycosylation site in proteins.'],side:{B:[a,1.5],G:[2*a,2],OD:[2*a,3,'O'],ND:[3*a,1.5,'NH2']},b:'CA-B B-G G=OD G-ND'},
 {n:['Glutamina','Glutamine'],t:'Gln',o:'Q',c:'pol',r:['–CH<sub>2</sub>CH<sub>2</sub>CONH<sub>2</sub>','–CH<sub>2</sub>CH<sub>2</sub>CONH<sub>2</sub>'],pi:'5.65',q:Q0,d:['Amida; transporta nitrógeno entre tejidos.','Amide; carries nitrogen between tissues.'],side:{B:[a,1.5],G:[2*a,2],D:[2*a,3],OE:[a,3.5,'O'],NE:[3*a,3.5,'NH2']},b:'CA-B B-G G-D D=OE D-NE'},
 {n:['Ácido aspártico','Aspartic acid'],t:'Asp',o:'D',c:'aci',r:['–CH<sub>2</sub>COOH','–CH<sub>2</sub>COOH'],pi:'2.77',q:['−1 (carboxilato)','−1 (carboxylate)'],pk:'3.65',d:['Cargada a pH 7; presente en sitios activos y en el ciclo de la urea.','Charged at pH 7; found in active sites and in the urea cycle.'],side:{B:[a,1.5],G:[2*a,2],OD:[2*a,3,'O'],OH2:[3*a,1.5,'OH']},b:'CA-B B-G G=OD G-OH2'},
 {n:['Ácido glutámico','Glutamic acid'],t:'Glu',o:'E',c:'aci',r:['–CH<sub>2</sub>CH<sub>2</sub>COOH','–CH<sub>2</sub>CH<sub>2</sub>COOH'],pi:'3.22',q:['−1 (carboxilato)','−1 (carboxylate)'],pk:'4.25',d:['Cargada a pH 7; neurotransmisor excitador y precursora de GABA.','Charged at pH 7; an excitatory neurotransmitter and precursor of GABA.'],side:{B:[a,1.5],G:[2*a,2],D:[2*a,3],OE:[a,3.5,'O'],OH2:[3*a,3.5,'OH']},b:'CA-B B-G G-D D=OE D-OH2'},
 {n:['Lisina','Lysine'],t:'Lys',o:'K',c:'bas',r:['–(CH<sub>2</sub>)<sub>4</sub>NH<sub>2</sub>','–(CH<sub>2</sub>)<sub>4</sub>NH<sub>2</sub>'],pi:'9.74',es:1,q:['+1 (amonio)','+1 (ammonium)'],pk:'10.53',d:['Amina primaria en la cadena (ε); se acetila en las histonas.','Primary amine in the chain (ε); acetylated in histones.'],side:{B:[a,1.5],G:[2*a,2],D:[2*a,3],E:[3*a,3.5],Z:[3*a,4.5,'NH2']},b:'CA-B B-G G-D D-E E-Z'},
 {n:['Arginina','Arginine'],t:'Arg',o:'R',c:'bas',r:['–(CH<sub>2</sub>)<sub>3</sub>NHC(=NH)NH<sub>2</sub>','–(CH<sub>2</sub>)<sub>3</sub>NHC(=NH)NH<sub>2</sub>'],pi:'10.76',q:['+1 (guanidinio)','+1 (guanidinium)'],pk:'12.48',d:['Guanidinio siempre cargado a pH fisiológico; precursora de óxido nítrico.','Guanidinium always charged at physiological pH; precursor of nitric oxide.'],side:{B:[a,1.5],G:[2*a,2],D:[2*a,3],NE:[3*a,3.5,'NH'],CZ:[3*a,4.5],N1:[2*a,5,'NH2'],N2:[4*a,5,'NH']},b:'CA-B B-G G-D D-NE NE-CZ CZ-N1 CZ=N2'},
 {n:['Histidina','Histidine'],t:'His',o:'H',c:'bas',r:['–CH<sub>2</sub>–imidazol','–CH<sub>2</sub>–imidazole'],pi:'7.59',es:1,q:['≈ 0, parcialmente +','≈ 0, partly +'],pk:'6.00',d:['Imidazol: cede o acepta H⁺ a pH fisiológico; frecuente en sitios activos.','Imidazole: donates or accepts H⁺ at physiological pH; common in active sites.'],side:{B:[a,1.5],G:[2*a,2],D2:[2.646,1.593],NE2:[3.315,2.336,'N'],CE1:[2.815,3.202],ND1:[1.837,2.994,'NH']},b:'CA-B B-G G=D2@c D2-NE2 NE2=CE1@c CE1-ND1 ND1-G',rc:{c:[2.469,2.425]}}
];
AA.forEach(function(x){
  x.atoms={}; var k;
  for(k in BB) x.atoms[k]=BB[k];
  for(k in x.side) x.atoms[k]=x.side[k];
  if(x.pro) x.atoms.N=[0,0,'NH'];
  x.hi=Object.keys(x.side); x.bonds=BBb+' '+x.b; x.mode='sc'; x.alt=tr(x.n);
});
var aVB=unionVB(AA);

/* ================= construcción de la interfaz ================= */
var tabsT=T('tabs'), h2T=T('h2');
var ids=['tabla','grupos','aminoacidos','nucleo','estandar','unidades'];
var AREAS=[[['Química','Chemistry'],[0,1],'var(--tpe-bas)'],[['Biología','Biology'],[2,3],'var(--tpe-pol)'],[['Física','Physics'],[4,5],'var(--tpe-aro)']];
var html='<div class="tpe-tabs" role="tablist">';
AREAS.forEach(function(g){
  html+='<div class="tpe-tg" role="presentation"><span class="tpe-tgl" aria-hidden="true"><i style="background:'+g[2]+'"></i>'+tr(g[0])+'</span><div class="tpe-tgt" role="presentation">';
  g[1].forEach(function(i){var id=ids[i];html+='<button class="tpe-tab" role="tab" type="button" id="tpe-t-'+id+'" aria-controls="tpe-p-'+id+'" aria-selected="'+(i===0)+'" data-tab="'+id+'" aria-label="'+tr(g[0])+': '+tabsT[i][0]+'">'+tabsT[i][0]+'<small>'+tabsT[i][1]+'</small></button>';});
  html+='</div></div>';
});
html+='</div>';
html+='<section id="tpe-p-tabla" role="tabpanel" aria-labelledby="tpe-t-tabla"><h2 class="visually-hidden">'+h2T[0]+'</h2>'+
 '<div class="tpe-panel" id="tpe-panel" aria-live="polite"></div>'+
 '<div class="tpe-search"><input id="tpe-q" type="search" placeholder="'+tr(S.search)+'" aria-label="'+tr(S.searchLabel)+'" autocomplete="off">'+
 '<label for="tpe-show">'+tr(S.tileLabel)+'</label><select id="tpe-show"><option value="n">'+S.tileOpts[0][LI]+'</option><option value="m">'+S.tileOpts[1][LI]+'</option></select></div>'+
 '<div class="tpe-ctrl"><button class="tpe-chip" id="tpe-play" type="button" aria-pressed="false">'+tr(S.play)+'</button><label for="tpe-speed">'+tr(S.speed)+'</label>'+
 '<select id="tpe-speed"><option value="900">'+S.speedOpts[0][LI]+'</option><option value="550" selected>'+S.speedOpts[1][LI]+'</option><option value="250">'+S.speedOpts[2][LI]+'</option></select></div>'+
 '<div class="tpe-propsrow"><span class="tpe-lbl" id="tpe-proplbl">'+tr(S.propLabel)+'</span><div class="tpe-chips" id="tpe-props" role="group" aria-labelledby="tpe-proplbl"></div></div>'+
 '<p class="tpe-why" id="tpe-why" aria-live="polite" hidden></p>'+
 '<div class="tpe-chips" id="tpe-legend" role="group" aria-label="'+tr(S.legendLabel)+'"></div>'+
 '<div class="tpe-ptwrap"><div class="tpe-pcard" id="tpe-pcard" hidden></div><div class="tpe-pt" id="tpe-pt"></div></div>'+
 '<p class="tpe-note">'+tr(S.noteTable)+'</p></section>';
html+='<section id="tpe-p-grupos" role="tabpanel" aria-labelledby="tpe-t-grupos" hidden><h2 class="visually-hidden">'+h2T[1]+'</h2>'+
 '<div class="tpe-chips" id="tpe-gchips" role="group"></div>'+
 '<div class="tpe-legend"><span><i style="border-color:var(--accent-text)"></i>'+S.gLegend[0][LI]+'</span><span><i style="border-color:var(--muted)"></i>'+S.gLegend[1][LI]+'</span></div>'+
 '<div class="tpe-cards" id="tpe-gcards"></div><p class="tpe-note">'+tr(S.noteGroups)+'</p></section>';
html+='<section id="tpe-p-aminoacidos" role="tabpanel" aria-labelledby="tpe-t-aminoacidos" hidden><h2 class="visually-hidden">'+h2T[2]+'</h2>'+
 '<div class="tpe-chips" id="tpe-achips" role="group"></div>'+
 '<div class="tpe-legend"><span><i style="border-color:var(--muted)"></i>'+S.aLegend[0][LI]+'</span><span><i style="border-color:var(--accent-text)"></i>'+S.aLegend[1][LI]+'</span></div>'+
 '<div class="tpe-cards" id="tpe-acards"></div><p class="tpe-note">'+tr(S.noteAmino)+'</p></section>';
html+='<section id="tpe-p-nucleo" role="tabpanel" aria-labelledby="tpe-t-nucleo" hidden><h2 class="visually-hidden">'+h2T[3]+'</h2>'+
 '<div class="tpe-chips" id="tpe-nsub" role="group"></div>'+
 '<div id="tpe-n-bases"><div class="tpe-chips" id="tpe-nchips" role="group"></div><div class="tpe-legend"><span><i style="border-color:var(--muted)"></i>'+(EN?'R = pentose (ribose or deoxyribose) bonded at N1 (pyrimidines) or N9 (purines)':'R = pentosa (ribosa o desoxirribosa) unida en N1 (pirimidinas) o N9 (purinas)')+'</span></div><div class="tpe-cards" id="tpe-ncards"></div></div>'+
 '<div id="tpe-n-sug" hidden><div class="tpe-cards" id="tpe-scards"></div><div id="tpe-ntab"></div></div>'+
 '<div id="tpe-n-seq" hidden><div class="tpe-seq"><h3 class="tpe-h3">'+(EN?'Complementary strand and transcript':'Hebra complementaria y transcrito')+'</h3><p class="tpe-meta">'+(EN?'Type the coding (sense) strand of DNA, 5\u2032\u21923\u2032, using A, T, G and C.':'Escribe la hebra codificante (sentido) del ADN, de 5\u2032 a 3\u2032, con A, T, G y C.')+'</p><div class="fis-row"><input id="tpe-seq" type="text" value="ATGGCCATTGTAATGGGC" aria-label="'+(EN?'DNA sequence':'Secuencia de ADN')+'" autocomplete="off" spellcheck="false" style="flex:1 1 260px;font-family:ui-monospace,Menlo,Consolas,monospace;text-transform:uppercase"></div><div class="tpe-seqout" id="tpe-seqout" aria-live="polite"></div></div></div>'+
 '<p class="tpe-note" id="tpe-nnote"></p></section>';
html+='<section id="tpe-p-estandar" role="tabpanel" aria-labelledby="tpe-t-estandar" hidden><h2 class="visually-hidden">'+h2T[4]+'</h2><div class="fis" data-fis data-lang="'+(EN?'en':'es')+'" data-tool="sm"></div></section>';
html+='<section id="tpe-p-unidades" role="tabpanel" aria-labelledby="tpe-t-unidades" hidden><h2 class="visually-hidden">'+h2T[5]+'</h2><div class="fis" data-fis data-lang="'+(EN?'en':'es')+'" data-tool="si"></div></section>';
root.innerHTML=html;
root.classList.add('tpe');

/* pestañas */
var tabs=[].slice.call(root.querySelectorAll('.tpe-tab'));
var timer=null;
function showTab(id){
  tabs.forEach(function(t){t.setAttribute('aria-selected',String(t.getAttribute('data-tab')===id));});
  ids.forEach(function(k){$('p-'+k).hidden=(k!==id);});
  if(id!=='tabla'&&timer)stopPlay();
  if(id==='tabla')replayWave();
}
tabs.forEach(function(t,i){
  t.addEventListener('click',function(){showTab(t.getAttribute('data-tab'));});
  t.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];n.focus();showTab(n.getAttribute('data-tab'));}
  });
});

/* ---- tabla periódica ---- */
var sel=6, activeCat=null, activeProp=null, query='', atomPaused=false;
var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var ptEl=$('pt'), panel=$('panel');
(function buildTable(){
  var h='';
  EL.forEach(function(e){
    h+='<button class="tpe-el" type="button" data-z="'+e.z+'" style="--c:var(--'+e.cat+');--d:'+((e.pos.c+e.pos.r*2)*22)+';grid-row:'+e.pos.r+';grid-column:'+e.pos.c+'" aria-pressed="false" aria-label="'+tr(e.n)+', '+(EN?'atomic number ':'número atómico ')+e.z+'"><span class="z">'+e.z+'</span><span class="s">'+e.s+'</span><span class="n"></span></button>';
  });
  h+='<div style="grid-row:8;grid-column:1/-1;height:10px"></div>';
  h+='<div class="tpe-fl" style="grid-row:9;grid-column:1/3">'+(EN?'Lanthanides (period 6)':'Lantánidos (período 6)')+'</div><div class="tpe-fl" style="grid-row:10;grid-column:1/3">'+(EN?'Actinides (period 7)':'Actínidos (período 7)')+'</div>';
  ptEl.innerHTML=h;
  ptEl.classList.add('wave');
})();
function fillSmall(){
  var mode=$('show').value, p=activeProp?PM[activeProp]:null;
  [].forEach.call(ptEl.querySelectorAll('.tpe-el'),function(b){
    var e=EL[+b.getAttribute('data-z')-1];
    b.querySelector('.n').textContent=p?tileVal(p,e):(mode==='m'?fmt(e.m):tr(e.n));
  });
}
function orbBlock(e){
  return e.cfg.orbs.map(function(o){
    var n=2*o.l+1, up=Math.min(o.c,n), dn=Math.max(0,o.c-n), bx='';
    for(var i=0;i<n;i++) bx+='<span class="tpe-bx">'+(i<up?'<i>↑</i>':'')+(i<dn?'<i>↓</i>':'')+'</span>';
    return '<span class="tpe-sub'+(o.core?' core':'')+'"><span class="tpe-bxs">'+bx+'</span><span class="lb">'+o.k+'</span></span>';
  }).join('');
}
function atomBlock(e){
  var sh=e.cfg.shells, n=sh.length, step=n>1?Math.min(22,72/(n-1)):0, g='';
  sh.forEach(function(cnt,i){
    var r=28+i*step, out=(i===n-1), dir=i%2?-1:1, dur=(6+i*3.2).toFixed(1);
    g+='<circle class="orb" cx="110" cy="110" r="'+r.toFixed(1)+'"/>';
    var es='';
    for(var k=0;k<cnt;k++){
      var ang=2*Math.PI*k/cnt-Math.PI/2;
      es+='<circle class="e'+(out?' out':'')+'" style="'+(timer?'':'animation-delay:'+(i*140+k*28)+'ms')+'" cx="'+(110+r*Math.cos(ang)).toFixed(1)+'" cy="'+(110+r*Math.sin(ang)).toFixed(1)+'" r="3.4"/>';
    }
    g+='<g>'+(reduced?'':'<animateTransform attributeName="transform" type="rotate" from="0 110 110" to="'+(360*dir)+' 110 110" dur="'+dur+'s" repeatCount="indefinite"/>')+es+'</g>';
  });
  var nuc='<circle class="nuc" cx="110" cy="110" r="16" style="fill:var(--'+e.cat+')"/><text x="110" y="113.5" text-anchor="middle">'+e.z+'+</text>';
  var last=sh[n-1], nm=tr(e.n);
  return '<div class="tpe-atomwrap"><svg class="tpe-atom'+(timer?' quick':'')+'" viewBox="0 0 220 220" role="img" aria-label="'+tr(S.atomAlt)+nm+': '+sh.join(', ')+'">'+g+nuc+'</svg>'+
    '<div class="tpe-atomcap">'+n+' '+S.shells[LI][n===1?0:1]+' · <b>'+last+'</b> '+S.outer[LI][last===1?0:1]+tr(S.inOuter)+'</div>'+
    (reduced?'':'<button class="tpe-mini" id="tpe-pauseatom" type="button"></button>')+'</div>';
}
function propRows(e){
  return PR.map(function(p){
    var act=activeProp===p.k, v=e.p[p.k], meter='';
    if(act&&typeof v==='number') meter='<span class="tpe-meter" aria-hidden="true"><i style="width:'+((v-p.lo)/(p.hi-p.lo)*100).toFixed(1)+'%;background:'+rgbCss(colorAt(p,Math.pow((v-p.lo)/(p.hi-p.lo),p.gam)))+'"></i></span>';
    return '<dt'+(act?' class="act"':'')+'>'+tr(p.lab)+'</dt><dd'+(act?' class="act"':'')+'>'+panelVal(p,e)+meter+'</dd>';
  }).join('');
}
function renderPanel(){
  var e=EL[sel-1], c=e.cfg;
  var cond=(c.core?'[<b>'+c.core+'</b>] ':'')+sup(c.val);
  var group=e.pos.g?e.pos.g:tr(S.fblock);
  panel.innerHTML=
   '<div class="tpe-big" style="--c:var(--'+e.cat+')"><span class="bz">'+e.z+'</span><span class="bs">'+e.s+'</span><span class="bm">'+fmt(e.m)+'</span></div>'+
   '<div class="tpe-info"><h3 class="tpe-name">'+tr(e.n)+'<button class="tpe-step" type="button" id="tpe-prev" aria-label="'+tr(S.prev)+'"'+(sel===1?' disabled':'')+'>‹</button><button class="tpe-step" type="button" id="tpe-next" aria-label="'+tr(S.next)+'"'+(sel===118?' disabled':'')+'>›</button></h3>'+
   '<div class="tpe-tags"><span class="tpe-tag"><b>'+tr(CATS[e.cat])+'</b></span><span class="tpe-tag">'+tr(S.block)+' <b>'+e.blk+'</b></span><span class="tpe-tag">'+tr(S.group)+' <b>'+group+'</b></span><span class="tpe-tag">'+tr(S.period)+' <b>'+e.pos.p+'</b></span><span class="tpe-tag">'+tr(S.state)+' <b>'+tr(S.states[e.st])+'</b></span></div>'+
   '<dl class="tpe-kv"><dt>'+tr(S.kvShort)+'</dt><dd>'+cond+'</dd><dt>'+tr(S.kvFull)+'</dt><dd>'+sup(c.full)+'</dd><dt>'+tr(S.kvShells)+'</dt><dd>'+c.shells.join(' · ')+'</dd><dt>'+tr(S.kvMass)+'</dt><dd>'+fmt(e.m)+'</dd>'+propRows(e)+'</dl>'+
   '<div class="tpe-orbhead"><b>'+tr(S.orbHead)+'</b>'+tr(S.orbSub)+(c.core?'<small>'+tr(S.orbDim)+' [<b>'+c.core+'</b>]. '+tr(S.orbDim2)+'</small>':'')+'</div><div class="tpe-orbs">'+orbBlock(e)+'</div></div>'+atomBlock(e);
  var asvg=panel.querySelector('.tpe-atom'), pb=panel.querySelector('#tpe-pauseatom');
  if(pb){
    var setTxt=function(){pb.textContent=atomPaused?tr(S.move):tr(S.pause);};
    if(atomPaused&&asvg.pauseAnimations) asvg.pauseAnimations();
    setTxt();
    pb.addEventListener('click',function(){atomPaused=!atomPaused;if(asvg.pauseAnimations){if(atomPaused)asvg.pauseAnimations();else asvg.unpauseAnimations();}setTxt();});
  }
  panel.querySelector('#tpe-prev').addEventListener('click',function(){select(sel-1);});
  panel.querySelector('#tpe-next').addEventListener('click',function(){select(sel+1);});
}
function select(z){
  if(z<1||z>118)return; sel=z;
  var building=ptEl.classList.contains('building');
  [].forEach.call(ptEl.querySelectorAll('.tpe-el'),function(b){
    var bz=+b.getAttribute('data-z');
    b.setAttribute('aria-pressed',String(bz===z));
    b.classList.toggle('pending',building&&bz>z);
  });
  renderPanel(); updatePin();
  if(building){var w=root.querySelector('.tpe-ptwrap'),t=ptEl.querySelector('[data-z="'+z+'"]');if(t)w.scrollLeft=t.offsetLeft-w.clientWidth/2;}
}
function applyDim(){
  var q=query.trim().toLowerCase();
  [].forEach.call(ptEl.querySelectorAll('.tpe-el'),function(b){
    var e=EL[+b.getAttribute('data-z')-1], ok=true;
    if(activeCat&&e.cat!==activeCat) ok=false;
    if(q&&!(e.n[0].toLowerCase().indexOf(q)>=0||e.n[1].toLowerCase().indexOf(q)>=0||e.s.toLowerCase()===q||String(e.z)===q)) ok=false;
    b.classList.toggle('dim',!ok);
  });
}
function replayWave(){ptEl.classList.remove('wave');void ptEl.offsetWidth;ptEl.classList.add('wave');}
var playBtn=$('play');
function stopPlay(){
  if(timer){clearInterval(timer);timer=null;}
  ptEl.classList.remove('building');
  [].forEach.call(ptEl.querySelectorAll('.pending'),function(b){b.classList.remove('pending');});
  playBtn.textContent=tr(S.play);playBtn.setAttribute('aria-pressed','false');
}
function tick(){if(sel>=118){stopPlay();return;}select(sel+1);}
function startPlay(){
  ptEl.classList.add('building');
  playBtn.textContent=tr(S.stop);playBtn.setAttribute('aria-pressed','true');
  if(sel>=118) sel=0;
  timer=setInterval(tick,+$('speed').value);
  select(Math.max(1,sel));
}
playBtn.addEventListener('click',function(){if(timer)stopPlay();else startPlay();});
$('speed').addEventListener('change',function(){if(timer){clearInterval(timer);timer=setInterval(tick,+$('speed').value);}});
fillSmall(); select(6);
ptEl.addEventListener('click',function(ev){var b=ev.target.closest('.tpe-el');if(b)select(+b.getAttribute('data-z'));});
$('show').addEventListener('change',fillSmall);

/* ---- propiedades periódicas: color relativo, brillo y recorrido animado (sin atenuar la tabla) ---- */
var tiles=[].slice.call(ptEl.querySelectorAll('.tpe-el')), pcard=$('pcard'), whyEl=$('why');
var ignT=null, sweepT=null, sweepMode='val', SPAN=6200;
var INK_L=.0168;
function textFor(c){var L=lumOf(c);return (1.05/(L+.05))>((L+.05)/(INK_L+.05))?'#fff':'#10243a';}
function rampStops(p){var a=[];for(var i=0;i<=8;i++){var s=i/8;a.push(rgbCss(colorAt(p,Math.pow(s,p.gam)))+' '+(s*100).toFixed(1)+'%');}return a.join(',');}
function updatePin(){
  var pin=$('pin'); if(!pin||!activeProp)return;
  var p=PM[activeProp], e=EL[sel-1], v=e.p[p.k];
  if(typeof v!=='number'){pin.style.visibility='hidden';return;}
  pin.style.visibility='visible';
  pin.style.left=((v-p.lo)/(p.hi-p.lo)*100).toFixed(2)+'%';
  pin.querySelector('b').textContent=e.s;
}
function renderCard(){
  var p=activeProp?PM[activeProp]:null;
  pcard.hidden=!p; whyEl.hidden=!p;
  if(!p){pcard.innerHTML='';whyEl.textContent='';return;}
  var lo=EL[p.loZ-1], hi=EL[p.hiZ-1], exc=p.ex?' ('+(EN?'with exceptions':'con excepciones')+')':'';
  var modes=S.sweepModes.map(function(m,i){var k=['val','per','grp'][i];return '<option value="'+k+'"'+(k===sweepMode?' selected':'')+'>'+m[LI]+'</option>';}).join('');
  pcard.innerHTML=
   '<div class="pc-top"><span class="pc-title"><b>'+tr(p.n)+'</b> <small>'+tr(p.u)+'</small></span>'+
    '<span class="pc-trs"><span class="pc-t"><b>'+tr(S.perTrend)+'</b> '+(p.tp>0?tr(S.up):tr(S.down))+exc+'</span><span class="pc-t"><b>'+tr(S.grpTrend)+'</b> '+(p.tg>0?tr(S.up):tr(S.down))+exc+'</span></span></div>'+
   '<p class="pc-d">'+tr(p.d)+'</p>'+
   '<div class="pc-barwrap"><span class="pc-pin" id="tpe-pin"><b></b></span><div class="pc-bar" style="background:linear-gradient(90deg,'+rampStops(p)+')"></div><span class="pc-run" id="tpe-run"></span></div>'+
   '<div class="pc-lbl"><span>'+tr(S.lowest)+': <b>'+lo.s+'</b> '+fnum(p.lo,p.dp)+'</span><span>'+tr(S.highest)+': <b>'+hi.s+'</b> '+fnum(p.hi,p.dp)+'</span></div>'+
   '<div class="pc-foot">'+(reduced?'':'<label for="tpe-sweep">'+tr(S.sweepLabel)+'</label><select id="tpe-sweep">'+modes+'</select><button class="tpe-chip pc-go" id="tpe-go" type="button">'+tr(S.sweepGo)+'</button>')+'<span class="pc-nd"><i></i>'+tr(S.noData)+'</span></div>';
  whyEl.textContent=tr(p.w);
}
function cancelSweep(){
  clearTimeout(sweepT);sweepT=null;
  ptEl.classList.remove('sweeping');
  tiles.forEach(function(b){b.classList.remove('lit');b.style.removeProperty('--sd');});
  var go=$('go'), run=$('run');
  if(go){go.disabled=false;go.textContent=tr(S.sweepGo);}
  if(run)run.classList.remove('on');
}
function startSweep(){
  var p=activeProp?PM[activeProp]:null; if(!p||reduced)return;
  if(timer)stopPlay();
  cancelSweep(); ptEl.classList.remove('wave');
  var lit=[];
  tiles.forEach(function(b){
    var e=EL[+b.getAttribute('data-z')-1], v=e.p[p.k], t;
    if(sweepMode==='val'){ if(typeof v!=='number')return; t=(v-p.lo)/(p.hi-p.lo); }
    else if(sweepMode==='per'){ t=(e.pos.p-1+(e.z-PF[e.pos.p-1])/PC[e.pos.p-1])/7; }
    else { t=((e.pos.g||3)-1+(e.pos.p-1)/8)/18; }
    b.style.setProperty('--sd',Math.round(t*SPAN)); lit.push(b);
  });
  void ptEl.offsetWidth;
  ptEl.classList.add('sweeping');
  lit.forEach(function(b){b.classList.add('lit');});
  var run=$('run'); if(run&&sweepMode==='val'){run.style.animationDuration=SPAN+'ms';run.classList.add('on');}
  var go=$('go'); if(go){go.disabled=true;go.textContent=tr(S.sweepBusy);}
  sweepT=setTimeout(cancelSweep,SPAN+1100);
}
function applyProp(){
  var p=activeProp?PM[activeProp]:null;
  cancelSweep();
  ptEl.classList.remove('wave');
  ptEl.classList.toggle('prop',!!p);
  clearTimeout(ignT);
  ptEl.classList.toggle('igniting',!!p&&!reduced);
  if(p&&!reduced) ignT=setTimeout(function(){ptEl.classList.remove('igniting');},2000);
  $('show').disabled=!!p;
  tiles.forEach(function(b){
    var e=EL[+b.getAttribute('data-z')-1], v=p?e.p[p.k]:null;
    if(!p){b.style.setProperty('--c','var(--'+e.cat+')');b.style.color='';b.classList.remove('nodata');b.removeAttribute('title');return;}
    if(typeof v==='number'){
      var c=colorAt(p,Math.pow((v-p.lo)/(p.hi-p.lo),p.gam));
      b.style.setProperty('--c',rgbCss(c)); b.style.color=textFor(c); b.classList.remove('nodata');
      b.title=tr(e.n)+': '+fnum(v,p.dp)+(p.unit?' '+p.unit:'');
    } else {
      b.style.color=''; b.classList.add('nodata');
      b.title=tr(e.n)+': '+(v==='x'?tr(S.noAnion):tr(S.noData));
    }
  });
  fillSmall(); renderCard(); renderPanel(); updatePin();
}
pcard.addEventListener('click',function(ev){if(ev.target.closest('#tpe-go'))startSweep();});
pcard.addEventListener('change',function(ev){if(ev.target.id==='tpe-sweep')sweepMode=ev.target.value;});
(function propChips(){
  var box=$('props');
  var items=[['',tr(S.propNone)]].concat(PR.map(function(p){return [p.k,tr(p.n)];}));
  box.innerHTML=items.map(function(it){return '<button class="tpe-chip" type="button" data-k="'+it[0]+'" aria-pressed="'+(it[0]===''?'true':'false')+'">'+it[1]+'</button>';}).join('');
  box.addEventListener('click',function(ev){
    var b=ev.target.closest('.tpe-chip');if(!b)return;
    activeProp=b.getAttribute('data-k')||null;
    [].forEach.call(box.querySelectorAll('.tpe-chip'),function(x){x.setAttribute('aria-pressed',String((x.getAttribute('data-k')||null)===activeProp));});
    applyProp();
  });
})();
$('q').addEventListener('input',function(ev){query=ev.target.value;applyDim();});
$('q').addEventListener('keydown',function(ev){
  if(ev.key==='Enter'){var f=ptEl.querySelector('.tpe-el:not(.dim)');if(f&&query.trim())select(+f.getAttribute('data-z'));}
});
(function legend(){
  var box=$('legend');
  box.innerHTML=Object.keys(CATS).map(function(k){return '<button class="tpe-chip" type="button" data-k="'+k+'" aria-pressed="false"><span class="tpe-dot" style="--c:var(--'+k+')"></span>'+tr(CATS[k])+'</button>';}).join('');
  box.addEventListener('click',function(ev){
    var b=ev.target.closest('.tpe-chip');if(!b)return;
    activeCat=activeCat===b.getAttribute('data-k')?null:b.getAttribute('data-k');
    [].forEach.call(box.querySelectorAll('.tpe-chip'),function(x){x.setAttribute('aria-pressed',String(x.getAttribute('data-k')===activeCat));});
    applyDim();
  });
})();

/* ---- tarjetas giratorias ---- */
function flipCard(el){
  var f=el.getAttribute('aria-pressed')==='true';
  el.setAttribute('aria-pressed',String(!f));
  el.querySelector('.front').setAttribute('aria-hidden',String(!f));
  el.querySelector('.back').setAttribute('aria-hidden',String(f));
}
function makeCard(front,back,hi,label){
  var d=document.createElement('div');
  d.className='tpe-card'; if(hi) d.style.setProperty('--hi',hi);
  d.setAttribute('role','button'); d.tabIndex=0; d.setAttribute('aria-pressed','false'); d.setAttribute('aria-label',label+tr(S.flipLabel));
  d.innerHTML='<div class="tpe-inner"><div class="tpe-face front">'+front+'<div class="tpe-hint">'+tr(S.flip)+'</div></div><div class="tpe-face back" aria-hidden="true">'+back+'<div class="tpe-hint">'+tr(S.back)+'</div></div></div>';
  d.addEventListener('click',function(){flipCard(d);});
  d.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();flipCard(d);}});
  return d;
}
function chipRow(id,items,cb){
  var box=$(id);
  box.innerHTML=items.map(function(it,i){return '<button class="tpe-chip" type="button" data-k="'+it[0]+'" aria-pressed="'+(i===0)+'">'+(it[2]?'<span class="tpe-dot" style="--c:'+it[2]+'"></span>':'')+it[1]+'</button>';}).join('');
  box.addEventListener('click',function(ev){
    var b=ev.target.closest('.tpe-chip');if(!b)return;
    [].forEach.call(box.querySelectorAll('.tpe-chip'),function(x){x.setAttribute('aria-pressed',String(x===b));});
    cb(b.getAttribute('data-k'));
  });
}
function drawGrupos(filter){
  var box=$('gcards'); box.innerHTML='';
  GRUPOS.filter(function(g){return filter==='all'||g.tags.indexOf(filter)>=0;}).forEach(function(g){
    var nm=tr(g.n);
    var front='<h3 class="tpe-h3">'+nm+'</h3><div class="tpe-mol">'+molSVG({atoms:g.atoms,bonds:g.bonds,hi:g.hi,mode:g.mode,rc:g.rc,alt:nm},tightVB(g))+'</div>'+
      '<div class="tpe-gen">'+g.gen+'</div><div class="tpe-meta"><b>'+tr(S.name)+':</b> '+tr(g.suf)+'<br><b>'+tr(S.example)+':</b> '+tr(g.ej)+'</div>';
    var back='<h3 class="tpe-h3">'+nm+'</h3><dl class="tpe-back-dl"><div><dt>'+tr(S.gStruct)+'</dt><dd>'+tr(g.geo)+'</dd></div><div><dt>'+tr(S.gProp)+'</dt><dd>'+tr(g.prop)+'</dd></div><div><dt>'+tr(S.gRx)+'</dt><dd>'+tr(g.rx)+'</dd></div><div><dt>'+tr(S.gUse)+'</dt><dd>'+tr(g.uso)+'</dd></div></dl>';
    box.appendChild(makeCard(front,back,null,nm));
  });
}
function drawAmino(filter){
  var box=$('acards'); box.innerHTML='';
  AA.filter(function(x){return filter==='all'||x.c===filter;}).forEach(function(x){
    var nm=tr(x.n), cls=tr(ACLS[x.c][0]);
    var head='<h3 class="tpe-h3">'+nm+'<small>'+x.t+' · '+x.o+'</small></h3>';
    var front=head+'<div class="tpe-mol">'+molSVG(x,centerVB(x,aVB))+'</div><span class="tpe-badge">'+cls+'</span><div class="tpe-meta"><b>R:</b> '+tr(x.r)+'</div>';
    var back=head+'<dl class="tpe-back-dl">'+
      '<div><dt>'+tr(S.aSide)+'</dt><dd>'+tr(x.r)+'</dd></div>'+
      '<div><dt>'+tr(S.aClass)+'</dt><dd>'+cls+'</dd></div>'+
      '<div><dt>'+tr(S.aCharge)+'</dt><dd>'+tr(x.q)+'</dd></div>'+
      (x.pk?'<div><dt>'+tr(S.aPk)+'</dt><dd>'+fmt(x.pk)+'</dd></div>':'')+
      '<div><dt>'+tr(S.aPi)+'</dt><dd>'+fmt(x.pi)+' · '+(x.es?tr(S.yes):tr(S.no))+'</dd></div>'+
      '<div><dt>'+tr(S.aKey)+'</dt><dd>'+tr(x.d)+'</dd></div></dl>';
    box.appendChild(makeCard(front,back,ACLS[x.c][1],nm));
  });
}
chipRow('gchips',S.gFilters.map(function(f){return [f[0],f[LI+1]];}),drawGrupos); drawGrupos('all');
chipRow('achips',[['all',tr(S.aAll)]].concat(Object.keys(ACLS).map(function(k){return [k,tr(ACLS[k][0]),ACLS[k][1]];})),drawAmino); drawAmino('all');

/* ================= nucleótidos y bases ================= */
(function(){
var P6=function(o){return o;};
var h6=a, x5=a+0.951, x8=a+1.539;
function purine(k){ /* k: 'A' o 'G' */
  var at={C6:[0,-1],N1:[-a,-.5,k==='G'?'NH':'N'],C2:[-a,.5],N3:[0,1,'N'],C4:[a,.5],C5:[a,-.5],N7:[x5,-.809,'N'],C8:[x8,0],N9:[x5,.809,'N'],R9:[a+1.26,1.76,'R']};
  var b='N1-C2 N3-C4 C5-C6 C5-N7 C8-N9 N9-C4 N9-R9 C4=C5@r6 N7=C8@r5';
  if(k==='A'){at.EX=[0,-2,'NH2'];b+=' C6=N1@r6 C2=N3@r6 C6-EX';}
  else{at.EX=[0,-2,'O'];at.EY=[-2*a,1,'NH2'];b+=' C6-N1 C6=EX C2=N3@r6 C2-EY';}
  return {atoms:at,bonds:b,hi:[],mode:'sc',rc:{r6:[0,0],r5:[a+.688,0]}};
}
function pyrimidine(k){ /* C, U, T */
  var at={N1:[0,1,'N'],C2:[a,.5],N3:[a,-.5,k==='C'?'N':'NH'],C4:[0,-1],C5:[-a,-.5],C6:[-a,.5],O2:[2*a,1,'O'],R1:[0,2,'R']};
  var b='N1-C2 C2=O2 C2-N3 C4-C5 C5=C6@r C6-N1 N1-R1';
  if(k==='C'){at.X4=[0,-2,'NH2'];b+=' N3=C4@r C4-X4';}
  else{at.X4=[0,-2,'O'];b+=' N3-C4 C4=X4';}
  if(k==='T'){at.ME=[-2*a,-1,'CH3'];b+=' C5-ME';}
  return {atoms:at,bonds:b,hi:[],mode:'sc',rc:{r:[0,0]}};
}
var NB=[
 {k:'A',n:['Adenina','Adenine'],t:'pur',d:purine('A'),f:'C<sub>5</sub>H<sub>5</sub>N<sub>5</sub>',mm:'135.13',par:['con T (ADN) o U (ARN): 2 puentes de hidrógeno','with T (DNA) or U (RNA): 2 hydrogen bonds'],nuc:['adenosina · AMP (en ADN: desoxiadenosina · dAMP)','adenosine · AMP (in DNA: deoxyadenosine · dAMP)'],en:['ADN y ARN','DNA and RNA'],x:['También forma ATP, NAD⁺ y FAD, que transportan energía y electrones.','It also forms ATP, NAD⁺ and FAD, which carry energy and electrons.']},
 {k:'G',n:['Guanina','Guanine'],t:'pur',d:purine('G'),f:'C<sub>5</sub>H<sub>5</sub>N<sub>5</sub>O',mm:'151.13',par:['con C: 3 puentes de hidrógeno','with C: 3 hydrogen bonds'],nuc:['guanosina · GMP (en ADN: desoxiguanosina · dGMP)','guanosine · GMP (in DNA: deoxyguanosine · dGMP)'],en:['ADN y ARN','DNA and RNA'],x:['Forma GTP, usado en la síntesis de proteínas y en señales celulares.','Forms GTP, used in protein synthesis and in cell signalling.']},
 {k:'C',n:['Citosina','Cytosine'],t:'pir',d:pyrimidine('C'),f:'C<sub>4</sub>H<sub>5</sub>N<sub>3</sub>O',mm:'111.10',par:['con G: 3 puentes de hidrógeno','with G: 3 hydrogen bonds'],nuc:['citidina · CMP (en ADN: desoxicitidina · dCMP)','cytidine · CMP (in DNA: deoxycytidine · dCMP)'],en:['ADN y ARN','DNA and RNA'],x:['Al perder su grupo amino (desaminación) se convierte en uracilo, una fuente común de mutaciones.','When it loses its amino group (deamination) it becomes uracil, a common source of mutations.']},
 {k:'T',n:['Timina','Thymine'],t:'pir',d:pyrimidine('T'),f:'C<sub>5</sub>H<sub>6</sub>N<sub>2</sub>O<sub>2</sub>',mm:'126.11',par:['con A: 2 puentes de hidrógeno','with A: 2 hydrogen bonds'],nuc:['desoxitimidina · dTMP (timidina)','deoxythymidine · dTMP (thymidine)'],en:['solo ADN','DNA only'],x:['Es 5-metiluracilo: el grupo CH₃ la distingue del uracilo.','It is 5-methyluracil: the CH₃ group distinguishes it from uracil.']},
 {k:'U',n:['Uracilo','Uracil'],t:'pir',d:pyrimidine('U'),f:'C<sub>4</sub>H<sub>4</sub>N<sub>2</sub>O<sub>2</sub>',mm:'112.09',par:['con A (en el ARN): 2 puentes de hidrógeno','with A (in RNA): 2 hydrogen bonds'],nuc:['uridina · UMP','uridine · UMP'],en:['principalmente ARN','mainly RNA'],x:['Ocupa en el ARN el lugar de la timina; aparece rara vez en el ADN.','It takes the place of thymine in RNA; it is rarely found in DNA.']}
];
var NBCOL={pur:'var(--tpe-bas)',pir:'var(--tpe-aci)'};
var NBT={pur:['Purina (dos anillos)','Purine (two rings)'],pir:['Pirimidina (un anillo)','Pyrimidine (one ring)']};
var nVB=unionVB(NB.map(function(x){return x.d;}));
function drawNB(f){
  var box=$('ncards'); box.innerHTML='';
  NB.filter(function(x){return f==='all'||x.t===f;}).forEach(function(x){
    var nm=tr(x.n), def=x.d; def.alt=nm;
    var head='<h3 class="tpe-h3">'+nm+'<small>'+x.k+'</small></h3>';
    var front=head+'<div class="tpe-mol">'+molSVG(def,centerVB(def,nVB))+'</div><span class="tpe-badge">'+tr(NBT[x.t])+'</span><div class="tpe-meta"><b>'+(EN?'Found in':'Está en')+':</b> '+tr(x.en)+'</div>';
    var back=head+'<dl class="tpe-back-dl"><div><dt>'+(EN?'Formula · molar mass':'Fórmula · masa molar')+'</dt><dd>'+x.f+' · '+fmt(x.mm)+' g/mol</dd></div>'+
     '<div><dt>'+(EN?'Base pairing':'Apareamiento')+'</dt><dd>'+tr(x.par)+'</dd></div>'+
     '<div><dt>'+(EN?'Nucleoside · nucleotide':'Nucleósido · nucleótido')+'</dt><dd>'+tr(x.nuc)+'</dd></div>'+
     '<div><dt>'+(EN?'Key fact':'Dato clave')+'</dt><dd>'+tr(x.x)+'</dd></div></dl>';
    box.appendChild(makeCard(front,back,NBCOL[x.t],nm));
  });
}
chipRow('nchips',[['all',EN?'All':'Todas'],['pur',EN?'Purines (A, G)':'Purinas (A, G)',NBCOL.pur],['pir',EN?'Pyrimidines (C, T, U)':'Pirimidinas (C, T, U)',NBCOL.pir]],drawNB); drawNB('all');
/* pentosas */
function sugar(deoxy){
  return {atoms:{O:[0,-.851,'O'],C1:[.809,-.263],C2:[.5,.688],C3:[-.5,.688],C4:[-.809,-.263],C5:[-1.76,-.572,'CH2OH'],O3:[-1.088,1.497,'OH'],X2:[1.088,1.497,deoxy?'H':'OH'],R1:[1.76,-.572,EN?'base':'base']},
   bonds:'O-C1 C1-C2 C2-C3 C3-C4 C4-O C4-C5 C3-O3 C2-X2 C1-R1',hi:['X2'],mode:'sc',alt:deoxy?(EN?'Deoxyribose':'Desoxirribosa'):(EN?'Ribose':'Ribosa')};
}
var SG=[
 {n:['Ribosa','Ribose'],dx:false,f:'C<sub>5</sub>H<sub>10</sub>O<sub>5</sub>',mm:'150.13',w:['ARN','RNA'],c2:['OH en C2′','OH on C2′'],x:['El OH de C2′ hace al ARN más reactivo y menos estable que el ADN.','The 2′ OH makes RNA more reactive and less stable than DNA.']},
 {n:['Desoxirribosa','Deoxyribose'],dx:true,f:'C<sub>5</sub>H<sub>10</sub>O<sub>4</sub>',mm:'134.13',w:['ADN','DNA'],c2:['H en C2′ (sin oxígeno)','H on C2′ (no oxygen)'],x:['Al faltarle ese oxígeno, el ADN es más estable y sirve para guardar la información genética.','Lacking that oxygen, DNA is more stable and suited to storing genetic information.']}
];
SG.forEach(function(g){
  var def=sugar(g.dx), nm=tr(g.n);
  var head='<h3 class="tpe-h3">'+nm+'</h3>';
  var front=head+'<div class="tpe-mol">'+molSVG(def,tightVB({atoms:def.atoms}))+'</div><span class="tpe-badge">'+tr(g.w)+'</span><div class="tpe-meta">'+(EN?'Five-carbon sugar (pentose), furanose ring.':'Azúcar de cinco carbonos (pentosa), anillo de furanosa.')+'</div>';
  var back=head+'<dl class="tpe-back-dl"><div><dt>'+(EN?'Formula · molar mass':'Fórmula · masa molar')+'</dt><dd>'+g.f+' · '+fmt(g.mm)+' g/mol</dd></div><div><dt>'+(EN?'Difference':'Diferencia')+'</dt><dd>'+tr(g.c2)+'</dd></div><div><dt>'+(EN?'Found in':'Está en')+'</dt><dd>'+tr(g.w)+'</dd></div><div><dt>'+(EN?'Key fact':'Dato clave')+'</dt><dd>'+tr(g.x)+'</dd></div></dl>';
  $('scards').appendChild(makeCard(front,back,g.dx?'var(--tpe-bas)':'var(--tpe-aci)',nm));
});
var TB=EN?
 {h:['Base','Nucleoside (RNA)','Nucleotide (RNA)','Nucleoside (DNA)','Nucleotide (DNA)'],r:[['Adenine (A)','adenosine','AMP','deoxyadenosine','dAMP'],['Guanine (G)','guanosine','GMP','deoxyguanosine','dGMP'],['Cytosine (C)','cytidine','CMP','deoxycytidine','dCMP'],['Thymine (T)','—','—','deoxythymidine','dTMP'],['Uracil (U)','uridine','UMP','deoxyuridine (rare)','dUMP (rare)']],
  t:'A nucleoside is a base bonded to a pentose; a nucleotide adds one to three phosphate groups on the 5′ carbon (the names here are the monophosphates).'}:
 {h:['Base','Nucleósido (ARN)','Nucleótido (ARN)','Nucleósido (ADN)','Nucleótido (ADN)'],r:[['Adenina (A)','adenosina','AMP','desoxiadenosina','dAMP'],['Guanina (G)','guanosina','GMP','desoxiguanosina','dGMP'],['Citosina (C)','citidina','CMP','desoxicitidina','dCMP'],['Timina (T)','—','—','desoxitimidina','dTMP'],['Uracilo (U)','uridina','UMP','desoxiuridina (raro)','dUMP (raro)']],
  t:'Un nucleósido es una base unida a una pentosa; un nucleótido suma de uno a tres grupos fosfato en el carbono 5′ (aquí se muestran los monofosfatos).'};
$('ntab').innerHTML='<div class="tpe-tblwrap"><table class="tpe-tbl"><thead><tr>'+TB.h.map(function(x){return '<th scope="col">'+x+'</th>';}).join('')+'</tr></thead><tbody>'+TB.r.map(function(r){return '<tr><th scope="row">'+r[0]+'</th>'+r.slice(1).map(function(c){return '<td>'+c+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div><p class="tpe-meta" style="margin:.6rem 0 0">'+TB.t+'</p>';
/* secuencia */
var BC={A:'T',T:'A',G:'C',C:'G'};
function seqCalc(){
  var raw=$('seq').value.toUpperCase().replace(/[\s\d]/g,''), seq=raw.replace(/[^ATGC]/g,''), bad=raw.length-seq.length;
  var span=function(c){return '<span class="nb nb-'+c+'">'+c+'</span>';};
  if(!seq){$('seqout').innerHTML='<p class="tpe-meta">'+(EN?'Type a sequence with A, T, G and C.':'Escribe una secuencia con A, T, G y C.')+'</p>';return;}
  var comp=seq.split('').map(function(c){return BC[c];}), rna=seq.split('').map(function(c){return c==='T'?'U':c;});
  var at=seq.split('').filter(function(c){return c==='A'||c==='T';}).length, gc=seq.length-at;
  var line=function(lab,arr,l,r){return '<div class="tpe-sl"><i>'+lab+'</i><span>'+l+'</span><b>'+arr.map(span).join('')+'</b><span>'+r+'</span></div>';};
  $('seqout').innerHTML=
   line(EN?'coding DNA':'ADN codificante',seq.split(''),'5′','3′')+
   '<div class="tpe-sl tpe-sl-h"><i></i><span></span><b>'+seq.split('').map(function(c){return '<span>'+(c==='A'||c==='T'?'2':'3')+'</span>';}).join('')+'</b><span></span></div>'+
   line(EN?'template DNA':'ADN molde',comp,'3′','5′')+
   line(EN?'mRNA':'ARN mensajero',rna,'5′','3′')+
   '<p class="tpe-meta" style="margin:.6rem 0 0"><b>'+seq.length+'</b> '+(EN?'bases':'bases')+' · <b>'+(Math.round(gc/seq.length*1000)/10).toString().replace('.',EN?'.':',')+' %</b> GC · <b>'+(2*at+3*gc)+'</b> '+(EN?'hydrogen bonds between the two strands (2 per A–T, 3 per G–C)':'puentes de hidrógeno entre las dos hebras (2 por A–T, 3 por G–C)')+(bad?'. '+(EN?bad+' character(s) ignored.':bad+' carácter(es) ignorado(s).'):'')+'</p>';
}
$('seq').addEventListener('input',seqCalc); seqCalc();
$('nnote').innerHTML=EN?
 'Structures drawn in the usual keto/amino form. Molar masses from standard atomic weights. In RNA, uracil takes the place of thymine; the pairs are A–T and G–C in DNA, and A–U and G–C between RNA and DNA or within RNA.':
 'Estructuras dibujadas en la forma habitual ceto/amino. Masas molares calculadas con pesos atómicos estándar. En el ARN el uracilo ocupa el lugar de la timina; los pares son A–T y G–C en el ADN, y A–U y G–C entre ARN y ADN o dentro del ARN.';
var NS=['n-bases','n-sug','n-seq'];
chipRow('nsub',[['n-bases',EN?'Nitrogenous bases':'Bases nitrogenadas'],['n-sug',EN?'Pentoses and nucleotides':'Pentosas y nucleótidos'],['n-seq',EN?'Sequences':'Secuencias']],function(k){NS.forEach(function(id){$(id).hidden=(id!==k);});});
})();
})();
