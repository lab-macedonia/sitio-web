/* Física en tarjetas · Laboratorio MACEDONIA (es / en)
   data-tool="sm"  → Modelo Estándar de partículas
   data-tool="si"  → Magnitudes y unidades (SI) */
(function(){
'use strict';
[].forEach.call(document.querySelectorAll('[data-fis]'),function(root){
var EN=root.getAttribute('data-lang')==='en', LI=EN?1:0, TOOL=root.getAttribute('data-tool');
var tr=function(a){return a[LI];};
var fmt=function(s){return EN?String(s):String(s).replace(/(\d)\.(\d)/g,'$1,$2');};
var $=function(id){return document.getElementById('fis-'+id);};
root.classList.add('fis');

/* ---------- tarjetas giratorias ---------- */
var FLIP=[' : girar tarjeta',': flip card'], HINT=['Girar ↻','Flip ↻'], BACK=['Volver ↻','Back ↻'];
function flipCard(el){
  var f=el.getAttribute('aria-pressed')==='true';
  el.setAttribute('aria-pressed',String(!f));
  el.querySelector('.front').setAttribute('aria-hidden',String(!f));
  el.querySelector('.back').setAttribute('aria-hidden',String(f));
}
function makeCard(front,back,hi,label,cls){
  var d=document.createElement('div');
  d.className='tpe-card'+(cls?' '+cls:''); if(hi) d.style.setProperty('--hi',hi);
  d.setAttribute('role','button'); d.tabIndex=0; d.setAttribute('aria-pressed','false'); d.setAttribute('aria-label',label+(EN?': flip card':': girar tarjeta'));
  d.innerHTML='<div class="tpe-inner"><div class="tpe-face front">'+front+'<div class="tpe-hint">'+tr(HINT)+'</div></div><div class="tpe-face back" aria-hidden="true">'+back+'<div class="tpe-hint">'+tr(BACK)+'</div></div></div>';
  d.addEventListener('click',function(){flipCard(d);});
  d.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();flipCard(d);}});
  return d;
}
function chipRow(box,items,cb){
  box.innerHTML=items.map(function(it,i){return '<button class="tpe-chip" type="button" data-k="'+it[0]+'" aria-pressed="'+(i===0)+'">'+(it[2]?'<span class="tpe-dot" style="--c:'+it[2]+'"></span>':'')+it[1]+'</button>';}).join('');
  box.addEventListener('click',function(ev){
    var b=ev.target.closest('.tpe-chip');if(!b)return;
    [].forEach.call(box.querySelectorAll('.tpe-chip'),function(x){x.setAttribute('aria-pressed',String(x===b));});
    cb(b.getAttribute('data-k'));
  });
}
function dl(rows){return '<dl class="tpe-back-dl">'+rows.map(function(r){return '<div><dt>'+r[0]+'</dt><dd>'+r[1]+'</dd></div>';}).join('')+'</dl>';}

/* =====================================================================
   MODELO ESTÁNDAR
   ===================================================================== */
if(TOOL==='sm'){
  var L={
    gen:[['Generación I','Generation I'],['Generación II','Generation II'],['Generación III','Generation III'],['Bosones de interacción','Force carriers'],['Escalar','Scalar']],
    fam:{q:['Quarks','Quarks'],l:['Leptones','Leptons'],g:['Bosones de gauge','Gauge bosons'],h:['Bosón de Higgs','Higgs boson']},
    legend:['Filtrar por familia','Filter by family'],all:['Todas','All'],
    mass:['Masa','Mass'],charge:['Carga','Charge'],spin:['Espín','Spin'],
    inter:['Interacciones','Interactions'],disc:['Descubrimiento','Discovery'],fact:['Dato','Fact'],
    stable:['estable','stable']
  };
  var STR=['fuerte','strong'],EMF=['electromagnética','electromagnetic'],WK=['débil','weak'],GR=['gravitatoria','gravitational'];
  var I_Q=[['fuerte, electromagnética, débil','strong, electromagnetic, weak']];
  var P=[
   /* quarks */
   {s:'u',f:'q',n:['Quark up (arriba)','Up quark'],m:'2.16',mu:'± 0.07 MeV/c²',c:'+2/3',sp:'1/2',r:1,k:1,i:I_Q[0],d:['1968–1969 (SLAC, dispersión inelástica profunda)','1968–1969 (SLAC, deep inelastic scattering)'],x:['Dos u y un d forman el protón. La masa es un valor MS-barra a 2 GeV.','Two u and one d make a proton. Mass is an MS-bar value at 2 GeV.']},
   {s:'c',f:'q',n:['Quark charm (encanto)','Charm quark'],m:'1.2730',mu:'± 0.0046 GeV/c²',c:'+2/3',sp:'1/2',r:1,k:2,i:I_Q[0],d:['1974 (partícula J/ψ, SLAC y Brookhaven)','1974 (J/ψ particle, SLAC and Brookhaven)'],x:['Aparece en mesones como el J/ψ. Es inestable y decae por interacción débil.','Found in mesons such as the J/ψ. It is unstable and decays by the weak interaction.']},
   {s:'t',f:'q',n:['Quark top (cima)','Top quark'],m:'172.57',mu:'± 0.29 GeV/c²',c:'+2/3',sp:'1/2',r:1,k:3,i:I_Q[0],d:['1995 (Fermilab, CDF y DØ)','1995 (Fermilab, CDF and DØ)'],x:['La partícula elemental más masiva conocida: decae antes de formar hadrones.','The most massive known elementary particle: it decays before it can form hadrons.']},
   {s:'d',f:'q',n:['Quark down (abajo)','Down quark'],m:'4.70',mu:'± 0.07 MeV/c²',c:'−1/3',sp:'1/2',r:2,k:1,i:I_Q[0],d:['1968–1969 (SLAC, dispersión inelástica profunda)','1968–1969 (SLAC, deep inelastic scattering)'],x:['Un u y dos d forman el neutrón.','One u and two d make a neutron.']},
   {s:'s',f:'q',n:['Quark strange (extraño)','Strange quark'],m:'93.5',mu:'± 0.8 MeV/c²',c:'−1/3',sp:'1/2',r:2,k:2,i:I_Q[0],d:['Quark propuesto en 1964; evidencia directa en SLAC (1968–1969)','Quark proposed in 1964; direct evidence at SLAC (1968–1969)'],x:['Da la «extrañeza» a kaones e hiperones.','Gives "strangeness" to kaons and hyperons.']},
   {s:'b',f:'q',n:['Quark bottom (fondo)','Bottom quark'],m:'4.183',mu:'± 0.007 GeV/c²',c:'−1/3',sp:'1/2',r:2,k:3,i:I_Q[0],d:['1977 (Fermilab, mesón Υ)','1977 (Fermilab, Υ meson)'],x:['Forma mesones B, muy usados para estudiar la asimetría materia-antimateria.','Forms B mesons, widely used to study the matter–antimatter asymmetry.']},
   /* leptones */
   {s:'e',f:'l',n:['Electrón','Electron'],m:'0.51099895',mu:'± 0.00000015 MeV/c²',c:'−1',sp:'1/2',r:3,k:1,i:['electromagnética, débil','electromagnetic, weak'],d:['1897 (J. J. Thomson)','1897 (J. J. Thomson)'],x:['Estable. Forma las capas de los átomos y la corriente eléctrica.','Stable. Makes up atomic shells and electric current.']},
   {s:'μ',f:'l',n:['Muón','Muon'],m:'105.6583755',mu:'± 0.0000023 MeV/c²',c:'−1',sp:'1/2',r:3,k:2,i:['electromagnética, débil','electromagnetic, weak'],d:['1936–1937 (Anderson, Neddermeyer, Street y Stevenson; rayos cósmicos)','1936–1937 (Anderson, Neddermeyer, Street and Stevenson; cosmic rays)'],x:['Vida media 2.1969811 µs. Los muones de rayos cósmicos llegan al suelo gracias a la dilatación del tiempo.','Mean life 2.1969811 µs. Cosmic-ray muons reach the ground thanks to time dilation.']},
   {s:'τ',f:'l',n:['Tau','Tau'],m:'1776.93',mu:'± 0.09 MeV/c²',c:'−1',sp:'1/2',r:3,k:3,i:['electromagnética, débil','electromagnetic, weak'],d:['1975 (Perl, SLAC)','1975 (Perl, SLAC)'],x:['Vida media ≈ 2.903×10⁻¹³ s. Es el único leptón que puede decaer en hadrones.','Mean life ≈ 2.903×10⁻¹³ s. The only lepton heavy enough to decay into hadrons.']},
   {s:'ν<sub>e</sub>',f:'l',n:['Neutrino electrónico','Electron neutrino'],m:null,ms:['m < 0.8 eV/c²','m < 0.8 eV/c²'],mu:'',c:'0',sp:'1/2',r:4,k:1,i:['solo débil','weak only'],d:['1956 (Cowan y Reines, reactor nuclear)','1956 (Cowan and Reines, nuclear reactor)'],x:['Límite directo por desintegración del tritio (90 % CL). Las oscilaciones de neutrinos prueban que tienen masa.','Direct limit from tritium decay (90% CL). Neutrino oscillations prove that neutrinos have mass.']},
   {s:'ν<sub>μ</sub>',f:'l',n:['Neutrino muónico','Muon neutrino'],m:null,ms:['masa ≠ 0, muy pequeña','mass ≠ 0, very small'],mu:'',c:'0',sp:'1/2',r:4,k:2,i:['solo débil','weak only'],d:['1962 (Brookhaven)','1962 (Brookhaven)'],x:['Su masa directa es poco conocida, pero las oscilaciones muestran que no es cero.','Its direct mass is poorly known, but oscillations show it is not zero.']},
   {s:'ν<sub>τ</sub>',f:'l',n:['Neutrino tauónico','Tau neutrino'],m:null,ms:['masa ≠ 0, muy pequeña','mass ≠ 0, very small'],mu:'',c:'0',sp:'1/2',r:4,k:3,i:['solo débil','weak only'],d:['2000 (experimento DONUT, Fermilab)','2000 (DONUT experiment, Fermilab)'],x:['El último fermión del Modelo Estándar en observarse directamente.','The last fermion of the Standard Model to be observed directly.']},
   /* bosones */
   {s:'g',f:'g',n:['Gluón','Gluon'],m:'0',mu:'(valor teórico)',c:'0',sp:'1',r:1,k:4,i:['fuerte (porta carga de color)','strong (carries colour charge)'],d:['1979 (PETRA, DESY)','1979 (PETRA, DESY)'],x:['Mantiene unidos los quarks dentro de protones y neutrones. Hay 8 tipos.','Binds quarks inside protons and neutrons. There are 8 kinds.']},
   {s:'γ',f:'g',n:['Fotón','Photon'],m:'0',mu:'límite < 10⁻¹⁸ eV/c²',c:'0',sp:'1',r:2,k:4,i:['electromagnética','electromagnetic'],d:['Propuesto por Einstein en 1905 (cuanto de luz)','Proposed by Einstein in 1905 (light quantum)'],x:['Es la luz y toda la radiación electromagnética. Su alcance es infinito.','It is light and all electromagnetic radiation. Its range is infinite.']},
   {s:'Z',f:'g',n:['Bosón Z','Z boson'],m:'91.1880',mu:'± 0.0020 GeV/c²',c:'0',sp:'1',r:3,k:4,i:['débil (corrientes neutras)','weak (neutral currents)'],d:['1983 (CERN, UA1 y UA2)','1983 (CERN, UA1 and UA2)'],x:['Ancho de decaimiento 2.4955 GeV. Mediador de la interacción débil neutra.','Decay width 2.4955 GeV. Mediator of the neutral weak interaction.']},
   {s:'W',f:'g',n:['Bosón W (±)','W boson (±)'],m:'80.3692',mu:'± 0.0133 GeV/c²',c:'±1',sp:'1',r:4,k:4,i:['débil (corrientes cargadas)','weak (charged currents)'],d:['1983 (CERN, UA1 y UA2)','1983 (CERN, UA1 and UA2)'],x:['Ancho 2.085 GeV. Es responsable de la desintegración beta. Valor de PDG 2024 sin la medida de CDF.','Width 2.085 GeV. Responsible for beta decay. PDG 2024 value, excluding the CDF measurement.']},
   {s:'H',f:'h',n:['Bosón de Higgs','Higgs boson'],m:'125.20',mu:'± 0.11 GeV/c²',c:'0',sp:'0',r:1,k:5,i:['acopla con la masa (campo de Higgs)','couples to mass (Higgs field)'],d:['2012 (CERN, ATLAS y CMS)','2012 (CERN, ATLAS and CMS)'],x:['Único escalar (espín 0). El campo de Higgs da masa a W, Z y a los fermiones. Ancho ≈ 3.7 MeV.','The only scalar (spin 0). The Higgs field gives mass to W, Z and the fermions. Width ≈ 3.7 MeV.']}
  ];
  var CS={q:'fis-q',l:'fis-l',g:'fis-g',h:'fis-h'};
  var html='<div class="tpe-chips" id="fis-leg" role="group" aria-label="'+tr(L.legend)+'"></div><div class="fis-sm" id="fis-grid"></div>'+
    '<div class="fis-build"><h3>'+(EN?'Build a hadron':'Arma un hadrón')+'</h3><p class="tpe-meta" style="margin:0 0 .3rem">'+(EN?'Pick three quarks: the total charge is the sum of their charges, and the combination gives a known particle.':'Elige tres quarks: la carga total es la suma de sus cargas y la combinación da una partícula conocida.')+'</p><div class="fis-row" id="fis-bq"></div><p class="fis-out" id="fis-bout" aria-live="polite"></p></div>'+
    '<p class="tpe-note">'+(EN?
     'Masses and widths from the Particle Data Group (PDG 2024, Phys. Rev. D 110, 030001). The u, d and s masses are MS-bar values at 2 GeV; c and b are MS-bar masses at their own scale; t is a direct measurement. Neutrinos: the electron-neutrino limit is the direct limit from tritium decay (90% CL). Discovery dates are the usual historical ones. Tap a card to flip it.':
     'Masas y anchos del Particle Data Group (PDG 2024, Phys. Rev. D 110, 030001). Las masas de u, d y s son valores MS-barra a 2 GeV; c y b son masas MS-barra en su propia escala; t es una medida directa. Neutrinos: el límite del neutrino electrónico es el directo por desintegración del tritio (90 % CL). Las fechas de descubrimiento son las históricas habituales. Toca una tarjeta para girarla.')+'</p>';
  root.innerHTML=html;
  var grid=$('grid');
  L.gen.forEach(function(g,i){var h=document.createElement('div');h.className='fis-colh';h.style.setProperty('--c',i+1);h.textContent=tr(g);grid.appendChild(h);});
  P.forEach(function(p){
    var mass=p.m===null?fmt(tr(p.ms)):fmt(p.m)+' '+(/GeV/.test(p.mu)?'GeV/c²':'MeV/c²');
    var mshort=p.m===null?fmt(tr(p.ms)):(p.m==='0'?'0':fmt(p.m)+(/GeV/.test(p.mu)?' GeV':' MeV'));
    var front='<div class="fis-top"><span>'+mshort+'</span><span>'+p.c.replace('−','−')+'</span></div><div class="fis-sym">'+p.s+'</div><div class="fis-name">'+tr(p.n)+'</div><div class="fis-sub">'+tr(L.spin)+' '+p.sp+'</div>';
    var back='<h3 class="tpe-h3">'+tr(p.n)+'</h3>'+dl([
      [tr(L.mass),p.m===null?fmt(tr(p.ms)):mass+(p.mu&&p.m!=='0'?' '+fmt(p.mu.replace(' MeV/c²','').replace(' GeV/c²','')):'')+(p.m==='0'&&p.mu?' '+(p.mu.charAt(0)==='('?fmt(p.mu):'('+fmt(p.mu)+')'):'')],
      [tr(L.inter),tr(p.i)],
      [tr(L.disc),tr(p.d)],
      [tr(L.fact),fmt(tr(p.x))]
    ]);
    var card=makeCard(front,back,null,tr(p.n),'fis-card '+CS[p.f]);
    card.setAttribute('data-f',p.f); card.style.setProperty('--r',p.r+1); card.style.setProperty('--c',p.k);
    grid.appendChild(card);
  });
  chipRow($('leg'),[['all',tr(L.all)]].concat(['q','l','g','h'].map(function(k){return [k,tr(L.fam[k]),'var(--'+({q:'nob',l:'nom',g:'alke',h:'alk'}[k])+')'];})),function(k){
    [].forEach.call(grid.querySelectorAll('.fis-card'),function(c){c.classList.toggle('dim',k!=='all'&&c.getAttribute('data-f')!==k);});
  });
  /* constructor de hadrones (cargas en tercios) */
  var QK={u:[2,'u'],d:[-1,'d'],s:[-1,'s']};
  var HAD={uud:['protón (p)','proton (p)'],udd:['neutrón (n)','neutron (n)'],uuu:['Δ⁺⁺','Δ⁺⁺'],ddd:['Δ⁻','Δ⁻'],uus:['Σ⁺','Σ⁺'],dds:['Σ⁻','Σ⁻'],uds:['Λ⁰ (o Σ⁰)','Λ⁰ (or Σ⁰)'],uss:['Ξ⁰','Ξ⁰'],dss:['Ξ⁻','Ξ⁻'],sss:['Ω⁻','Ω⁻']};
  var bq=$('bq'); bq.innerHTML=[0,1,2].map(function(i){return '<select id="fis-q'+i+'" aria-label="'+(EN?'Quark ':'Quark ')+(i+1)+'"><option value="u">u</option><option value="d"'+(i>0?' selected':'')+'>d</option><option value="s">s</option></select>';}).join('');
  var chargeStr=function(t){var w=Math.trunc(t/3),r=Math.abs(t%3);return t===0?'0':(w===0?(t<0?'−':'+')+r+'/3':(t>0?'+':'−')+Math.abs(w));};
  function calc(){
    var v=[0,1,2].map(function(i){return $('q'+i).value;}), t=v.reduce(function(a,k){return a+QK[k][0];},0);
    var key=v.slice().sort(function(a,b){return 'uds'.indexOf(a)-'uds'.indexOf(b);}).join('');
    var nm=HAD[key]?tr(HAD[key]):(EN?'no common name in this resource':'sin nombre común en este recurso');
    $('bout').innerHTML=(EN?'Charge: ':'Carga: ')+'<b>'+chargeStr(t)+' e</b> · '+(EN?'particle: ':'partícula: ')+'<b>'+nm+'</b>';
  }
  [0,1,2].forEach(function(i){$('q'+i).addEventListener('change',calc);}); $('q0').value='u'; $('q1').value='u'; $('q2').value='d'; calc();
}

/* =====================================================================
   MAGNITUDES Y UNIDADES
   ===================================================================== */
if(TOOL==='si'){
  var BASE=[
   {u:'s',n:['segundo','second'],q:['Tiempo','Time'],dim:'T',c:['Frecuencia del cesio-133 · Δν<sub>Cs</sub> = 9 192 631 770 Hz','Caesium-133 frequency · Δν<sub>Cs</sub> = 9 192 631 770 Hz'],def:['Duración de 9 192 631 770 periodos de la radiación de la transición hiperfina del cesio-133.','Duration of 9 192 631 770 periods of the radiation of the caesium-133 hyperfine transition.'],ej:['Un latido en reposo dura cerca de 1 s.','A resting heartbeat lasts about 1 s.']},
   {u:'m',n:['metro','metre'],q:['Longitud','Length'],dim:'L',c:['Velocidad de la luz · c = 299 792 458 m/s','Speed of light · c = 299 792 458 m/s'],def:['Distancia que recorre la luz en el vacío en 1/299 792 458 de segundo.','Distance light travels in vacuum in 1/299 792 458 of a second.'],ej:['La altura de una mesa es cerca de 0.75 m.','A table is about 0.75 m high.']},
   {u:'kg',n:['kilogramo','kilogram'],q:['Masa','Mass'],dim:'M',c:['Constante de Planck · h = 6.626 070 15×10<sup>−34</sup> J·s','Planck constant · h = 6.626 070 15×10<sup>−34</sup> J·s'],def:['Se define fijando h; junto con el metro y el segundo da la masa. Desde 2019 ya no depende del cilindro de platino-iridio de París.','Defined by fixing h; together with the metre and the second it gives mass. Since 2019 it no longer depends on the Paris platinum–iridium cylinder.'],ej:['Un litro de agua tiene cerca de 1 kg.','A litre of water has a mass of about 1 kg.']},
   {u:'A',n:['ampere','ampere'],q:['Corriente eléctrica','Electric current'],dim:'I',c:['Carga elemental · e = 1.602 176 634×10<sup>−19</sup> C','Elementary charge · e = 1.602 176 634×10<sup>−19</sup> C'],def:['Corriente de 1 A = paso de 1/(1.602 176 634×10<sup>−19</sup>) cargas elementales por segundo (≈ 6.24×10<sup>18</sup>).','A current of 1 A = flow of 1/(1.602 176 634×10<sup>−19</sup>) elementary charges per second (≈ 6.24×10<sup>18</sup>).'],ej:['Un cargador de celular entrega 1–2 A.','A phone charger delivers 1–2 A.']},
   {u:'K',n:['kelvin','kelvin'],q:['Temperatura termodinámica','Thermodynamic temperature'],dim:'Θ',c:['Constante de Boltzmann · k = 1.380 649×10<sup>−23</sup> J/K','Boltzmann constant · k = 1.380 649×10<sup>−23</sup> J/K'],def:['Se define fijando k, que relaciona temperatura con energía por partícula. El cero absoluto es 0 K = −273.15 °C.','Defined by fixing k, which links temperature to energy per particle. Absolute zero is 0 K = −273.15 °C.'],ej:['El agua hierve a 373.15 K (1 atm).','Water boils at 373.15 K (1 atm).']},
   {u:'mol',n:['mol','mole'],q:['Cantidad de sustancia','Amount of substance'],dim:'N',c:['Constante de Avogadro · N<sub>A</sub> = 6.022 140 76×10<sup>23</sup> mol<sup>−1</sup>','Avogadro constant · N<sub>A</sub> = 6.022 140 76×10<sup>23</sup> mol<sup>−1</sup>'],def:['Un mol contiene exactamente 6.022 140 76×10<sup>23</sup> entidades elementales (átomos, moléculas, iones…).','One mole contains exactly 6.022 140 76×10<sup>23</sup> elementary entities (atoms, molecules, ions…).'],ej:['Cerca de 18 g de agua son 1 mol.','About 18 g of water is 1 mol.']},
   {u:'cd',n:['candela','candela'],q:['Intensidad luminosa','Luminous intensity'],dim:'J',c:['Eficacia luminosa · K<sub>cd</sub> = 683 lm/W (a 540×10<sup>12</sup> Hz)','Luminous efficacy · K<sub>cd</sub> = 683 lm/W (at 540×10<sup>12</sup> Hz)'],def:['Intensidad en una dirección de una fuente que emite luz de 540×10<sup>12</sup> Hz, ponderada por la sensibilidad del ojo humano.','Intensity in a given direction of a source emitting 540×10<sup>12</sup> Hz light, weighted by the sensitivity of the human eye.'],ej:['Una vela común da cerca de 1 cd.','An ordinary candle gives about 1 cd.']}
  ];
  var DER=[
   {a:'mec',u:'Hz',n:['hertz','hertz'],q:['Frecuencia','Frequency'],e:'s<sup>−1</sup>',ej:['La red eléctrica en Chile oscila a 50 Hz.','The mains supply in Chile oscillates at 50 Hz.']},
   {a:'mec',u:'N',n:['newton','newton'],q:['Fuerza','Force'],e:'kg·m·s<sup>−2</sup>',ej:['El peso de una manzana pequeña es cerca de 1 N.','The weight of a small apple is about 1 N.']},
   {a:'mec',u:'Pa',n:['pascal','pascal'],q:['Presión','Pressure'],e:'N/m² = kg·m<sup>−1</sup>·s<sup>−2</sup>',ej:['La presión atmosférica normal es 101 325 Pa.','Standard atmospheric pressure is 101 325 Pa.']},
   {a:'mec',u:'J',n:['joule','joule'],q:['Energía, trabajo, calor','Energy, work, heat'],e:'N·m = kg·m²·s<sup>−2</sup>',ej:['Subir una manzana 1 m cuesta cerca de 1 J.','Lifting an apple 1 m takes about 1 J.']},
   {a:'mec',u:'W',n:['watt','watt'],q:['Potencia','Power'],e:'J/s = kg·m²·s<sup>−3</sup>',ej:['Una ampolleta LED común usa cerca de 10 W.','A common LED bulb uses about 10 W.']},
   {a:'ele',u:'C',n:['coulomb','coulomb'],q:['Carga eléctrica','Electric charge'],e:'A·s',ej:['1 C equivale a cerca de 6.24×10<sup>18</sup> cargas elementales.','1 C equals about 6.24×10<sup>18</sup> elementary charges.']},
   {a:'ele',u:'V',n:['volt','volt'],q:['Tensión (potencial eléctrico)','Voltage (electric potential)'],e:'J/C = kg·m²·s<sup>−3</sup>·A<sup>−1</sup>',ej:['Una pila AA da 1.5 V; el enchufe en Chile entrega 220 V.','An AA cell gives 1.5 V; a wall socket in Chile delivers 220 V.']},
   {a:'ele',u:'F',n:['farad','farad'],q:['Capacitancia','Capacitance'],e:'C/V = kg<sup>−1</sup>·m<sup>−2</sup>·s<sup>4</sup>·A<sup>2</sup>',ej:['Los condensadores de un circuito suelen medir µF o pF.','Circuit capacitors are usually measured in µF or pF.']},
   {a:'ele',u:'Ω',n:['ohm','ohm'],q:['Resistencia eléctrica','Electrical resistance'],e:'V/A = kg·m²·s<sup>−3</sup>·A<sup>−2</sup>',ej:['Un resistor típico de una placa es de 220 Ω a 10 kΩ.','A typical board resistor is 220 Ω to 10 kΩ.']},
   {a:'ele',u:'S',n:['siemens','siemens'],q:['Conductancia','Conductance'],e:'A/V = Ω<sup>−1</sup>',ej:['La conductividad del agua se mide en S/m, o µS/cm en laboratorio.','Water conductivity is measured in S/m, or µS/cm in the lab.']},
   {a:'ele',u:'Wb',n:['weber','weber'],q:['Flujo magnético','Magnetic flux'],e:'V·s = kg·m²·s<sup>−2</sup>·A<sup>−1</sup>',ej:['Es el flujo que atraviesa una espira y que, al variar, induce tensión.','It is the flux through a loop; when it changes, it induces a voltage.']},
   {a:'ele',u:'T',n:['tesla','tesla'],q:['Campo magnético','Magnetic flux density'],e:'Wb/m² = kg·s<sup>−2</sup>·A<sup>−1</sup>',ej:['Un imán de refrigerador da cerca de 5 mT; un resonador médico, 1.5–3 T.','A fridge magnet gives about 5 mT; a medical MRI scanner, 1.5–3 T.']},
   {a:'ele',u:'H',n:['henry','henry'],q:['Inductancia','Inductance'],e:'Wb/A = kg·m²·s<sup>−2</sup>·A<sup>−2</sup>',ej:['Las bobinas de circuitos suelen ser de mH o µH.','Circuit coils are usually mH or µH.']},
   {a:'ter',u:'°C',n:['grado Celsius','degree Celsius'],q:['Temperatura Celsius','Celsius temperature'],e:'t/°C = T/K − 273.15',ej:['El agua se congela a 0 °C y hierve a 100 °C (1 atm).','Water freezes at 0 °C and boils at 100 °C (1 atm).']},
   {a:'ter',u:'lm',n:['lumen','lumen'],q:['Flujo luminoso','Luminous flux'],e:'cd·sr',ej:['Una ampolleta LED de 10 W emite cerca de 800 lm.','A 10 W LED bulb emits about 800 lm.']},
   {a:'ter',u:'lx',n:['lux','lux'],q:['Iluminancia','Illuminance'],e:'lm/m² = cd·sr·m<sup>−2</sup>',ej:['Una oficina bien iluminada tiene cerca de 500 lx.','A well-lit office has about 500 lx.']},
   {a:'rad',u:'Bq',n:['becquerel','becquerel'],q:['Actividad de un radionúclido','Activity of a radionuclide'],e:'s<sup>−1</sup>',ej:['1 Bq es una desintegración por segundo.','1 Bq is one decay per second.']},
   {a:'rad',u:'Gy',n:['gray','gray'],q:['Dosis absorbida','Absorbed dose'],e:'J/kg = m²·s<sup>−2</sup>',ej:['Mide la energía depositada por kilogramo de tejido.','It measures energy deposited per kilogram of tissue.']},
   {a:'rad',u:'Sv',n:['sievert','sievert'],q:['Dosis equivalente','Equivalent dose'],e:'J/kg = m²·s<sup>−2</sup>',ej:['La radiación natural promedio es cerca de 2.4 mSv al año.','Average natural background radiation is about 2.4 mSv per year.']},
   {a:'rad',u:'kat',n:['katal','katal'],q:['Actividad catalítica','Catalytic activity'],e:'mol·s<sup>−1</sup>',ej:['Se usa para la actividad de enzimas (en la práctica, µkat o nkat).','Used for enzyme activity (in practice, µkat or nkat).']},
   {a:'geo',u:'rad',n:['radián','radian'],q:['Ángulo plano','Plane angle'],e:'m/m = 1',ej:['Una vuelta completa mide 2π rad.','A full turn is 2π rad.']},
   {a:'geo',u:'sr',n:['estereorradián','steradian'],q:['Ángulo sólido','Solid angle'],e:'m²/m² = 1',ej:['Toda la esfera mide 4π sr.','The whole sphere is 4π sr.']}
  ];
  var AREAS=[['all',['Todas','All']],['mec',['Mecánica','Mechanics']],['ele',['Electricidad y magnetismo','Electricity and magnetism']],['ter',['Temperatura y luz','Temperature and light']],['rad',['Radiaciones y catálisis','Radiation and catalysis']],['geo',['Ángulos','Angles']]];
  var ACOL={mec:'var(--tpe-apo)',ele:'var(--tpe-bas)',ter:'var(--tpe-out)',rad:'var(--tpe-aci)',geo:'var(--tpe-aro)'};
  var PFX=[['Q','quetta','quetta',30],['R','ronna','ronna',27],['Y','yotta','yotta',24],['Z','zetta','zetta',21],['E','exa','exa',18],['P','peta','peta',15],['T','tera','tera',12],['G','giga','giga',9],['M','mega','mega',6],['k','kilo','kilo',3],['h','hecto','hecto',2],['da','deca','deca',1],['','—','—',0],['d','deci','deci',-1],['c','centi','centi',-2],['m','mili','milli',-3],['µ','micro','micro',-6],['n','nano','nano',-9],['p','pico','pico',-12],['f','femto','femto',-15],['a','atto','atto',-18],['z','zepto','zepto',-21],['y','yocto','yocto',-24],['r','ronto','ronto',-27],['q','quecto','quecto',-30]];
  var T3=EN?[['Base units','7 units'],['Derived units','22 named units'],['Prefixes','powers of ten']]:[['Unidades base','las 7 del SI'],['Unidades derivadas','22 con nombre propio'],['Prefijos','potencias de diez']];
  var H3=EN?['SI base units','Derived units with special names','SI prefixes']:['Unidades base del SI','Unidades derivadas con nombre propio','Prefijos del SI'];
  var ids=['base','der','pre'];
  var h='<div class="tpe-chips" id="fis-sub" role="group"></div>';
  h+='<section id="fis-p-base"><h2 class="visually-hidden">'+H3[0]+'</h2><div class="fis-cards" id="fis-bc"></div><p class="tpe-note">'+(EN?
    'Since 20 May 2019 the SI is defined by fixing the exact numerical values of seven constants (BIPM, SI Brochure, 9th edition). The unit of mass no longer depends on a physical object. Tap a card to flip it and see the definition, the constant that fixes it and an everyday example.':
    'Desde el 20 de mayo de 2019 el SI se define fijando el valor numérico exacto de siete constantes (BIPM, folleto del SI, 9.ª edición). La unidad de masa ya no depende de un objeto físico. Toca una tarjeta para girarla y ver la definición, la constante que la fija y un ejemplo cotidiano.')+'</p></section>';
  h+='<section id="fis-p-der" hidden><h2 class="visually-hidden">'+H3[1]+'</h2><div class="tpe-chips" id="fis-dch" role="group"></div><div class="fis-cards" id="fis-dc"></div><p class="tpe-note">'+(EN?
    'These are the 22 coherent derived units that have their own name and symbol in the SI. The radian and steradian are dimensionless. The degree Celsius is the only one defined by an offset from the kelvin. Tap a card to flip it.':
    'Son las 22 unidades derivadas coherentes con nombre y símbolo propios en el SI. El radián y el estereorradián son adimensionales. El grado Celsius es la única definida con un desfase respecto del kelvin. Toca una tarjeta para girarla.')+'</p></section>';
  h+='<section id="fis-p-pre" hidden><h2 class="visually-hidden">'+H3[2]+'</h2><div class="fis-pfx" id="fis-pf"></div>'+
    '<div class="fis-build"><h3>'+(EN?'Prefix converter':'Conversor de prefijos')+'</h3><div class="fis-row"><input id="fis-cv" type="text" inputmode="decimal" value="1" aria-label="'+(EN?'Value':'Valor')+'" size="8"><select id="fis-cf" aria-label="'+(EN?'From':'Desde')+'"></select><span aria-hidden="true">→</span><select id="fis-ct" aria-label="'+(EN?'To':'Hasta')+'"></select></div><p class="fis-out" id="fis-co" aria-live="polite"></p></div>'+
    '<p class="tpe-note">'+(EN?'Prefixes ronna, quetta, ronto and quecto were added in 2022 (27th CGPM). Prefixes apply to the gram in the case of mass (milligram, not microkilogram).':'Los prefijos ronna, quetta, ronto y quecto se agregaron en 2022 (27.ª CGPM). En el caso de la masa, los prefijos se aplican al gramo (miligramo, no microkilogramo).')+'</p></section>';
  root.innerHTML=h;
  function showTab(id){ids.forEach(function(k){$('p-'+k).hidden=(k!==id);});}
  chipRow($('sub'),ids.map(function(id,i){return [id,T3[i][0]+' · '+T3[i][1]];}),showTab);
  var LBL=EN?{q:'Quantity',dim:'Dimension',c:'Fixed by',d:'Definition',e:'Example',b:'In base units',n:'Name'}:{q:'Magnitud',dim:'Dimensión',c:'Se fija con',d:'Definición',e:'Ejemplo',b:'En unidades base',n:'Nombre'};
  BASE.forEach(function(b){
    var nm=tr(b.n);
    var front='<div class="fis-bigsym">'+b.u+'</div><div class="fis-qty">'+tr(b.q)+'</div><div class="fis-dim">'+nm+' · '+LBL.dim+' <b>'+b.dim+'</b></div>';
    var back='<h3 class="tpe-h3">'+nm+'<small>'+b.u+'</small></h3>'+dl([[LBL.c,fmt(tr(b.c))],[LBL.d,fmt(tr(b.def))],[LBL.e,fmt(tr(b.ej))]]);
    $('bc').appendChild(makeCard(front,back,'var(--tpe-bas)',nm));
  });
  function drawDer(k){
    var box=$('dc'); box.innerHTML='';
    DER.filter(function(d){return k==='all'||d.a===k;}).forEach(function(d){
      var nm=tr(d.n);
      var front='<div class="fis-bigsym">'+d.u+'</div><div class="fis-qty">'+tr(d.q)+'</div><div class="fis-dim">'+nm+'</div>';
      var back='<h3 class="tpe-h3">'+nm+'<small>'+d.u+'</small></h3>'+dl([[LBL.q,tr(d.q)],[LBL.b,d.e],[LBL.e,fmt(tr(d.ej))]]);
      box.appendChild(makeCard(front,back,ACOL[d.a],nm,'fis-d-'+d.a));
    });
  }
  chipRow($('dch'),AREAS.map(function(a){return [a[0],tr(a[1]),ACOL[a[0]]];}),drawDer); drawDer('all');
  /* prefijos */
  $('pf').innerHTML=PFX.filter(function(p){return p[0]!=='';}).map(function(p){
    return '<div class="fis-p'+(Math.abs(p[3])>=3?' big':'')+'"><b>'+p[0]+'</b><span>'+(EN?p[2]:p[1])+'</span><i>10<sup>'+String(p[3]).replace('-','−')+'</sup></i></div>';
  }).join('');
  var opts=PFX.map(function(p,i){return '<option value="'+i+'">'+(p[0]===''?(EN?'(no prefix)':'(sin prefijo)'):p[0]+' · '+(EN?p[2]:p[1]))+'</option>';}).join('');
  $('cf').innerHTML=opts; $('ct').innerHTML=opts; $('cf').value=String(PFX.findIndex(function(p){return p[0]==='k';})); $('ct').value=String(PFX.findIndex(function(p){return p[0]==='';}));
  function conv(){
    var raw=$('cv').value.trim().replace(',','.'), x=parseFloat(raw);
    if(!isFinite(x)){$('co').textContent=EN?'Enter a number.':'Escribe un número.';return;}
    var df=PFX[+$('cf').value][3], dt=PFX[+$('ct').value][3], e=df-dt;
    var res=Number((x*Math.pow(10,e)).toPrecision(12));
    var s=(Math.abs(res)>=1e6||(res!==0&&Math.abs(res)<1e-4))?res.toExponential().replace('e+','×10<sup>').replace('e-','×10<sup>−')+'</sup>':String(res);
    var pf=function(sel){var p=PFX[+sel];return p[0]===''?'':p[0];};
    $('co').innerHTML=fmt(raw.replace(',','.'))+' '+pf($('cf').value)+'U = <b>'+fmt(s)+'</b> '+pf($('ct').value)+'U';
  }
  ['cv','cf','ct'].forEach(function(i){$(i).addEventListener('input',conv);$(i).addEventListener('change',conv);}); conv();
}
});
})();
