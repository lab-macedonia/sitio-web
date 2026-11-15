/* Formulario de visitas de colegios · Departamento de Química UMCE.
   Funciona solo en el navegador: no envía ni guarda datos. */
(function(){
'use strict';
var MAIL_DEPTO='quimica@umce.cl', MAIL_TEC='rodrigo.castro_m@umce.cl';
function $(id){return document.getElementById(id)}
function v(id){return ($(id).value||'').trim()}
function fdate(s){if(!s)return '';var p=s.split('-');return p[2]+'-'+p[1]+'-'+p[0]}
function hrs(a,b){return a&&b?a+' a '+b+' h':(a?'desde '+a+' h':'')}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

/* pestañas */
var tabs=[$('vc-t1'),$('vc-t2')],panels=[$('vc-p1'),$('vc-p2')];
function tab(i,focus){
  tabs.forEach(function(t,k){t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1;panels[k].hidden=k!==i});
  if(focus)tabs[i].focus();
}
tabs.forEach(function(t,i){
  t.addEventListener('click',function(){tab(i)});
  t.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();tab(1-i,true)}
  });
});

/* actividad */
function actividad(){var a=v('act');return a==='otra'?v('otra_txt'):a}
function actividadFull(){var t=actividad(),d=v('tipo');return t+(d?' – '+d:'')}
$('act').addEventListener('change',function(){$('s_otra').hidden=v('act')!=='otra'});

/* fecha de hoy */
(function(){var d=new Date();$('fsol').value=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})();

/* secciones condicionales */
[['c_lab','s_lab'],['c_sala','s_sala'],['c_reac','s_reac'],['c_est','s_est'],['c_otro','s_otro']].forEach(function(p){
  $(p[0]).addEventListener('change',function(){$(p[1]).hidden=!$(p[0]).checked});
});

/* días hábiles: lunes a viernes, sin descontar feriados */
function diasHabiles(desde,hasta){
  var n=0,d=new Date(desde+'T12:00:00'),h=new Date(hasta+'T12:00:00');
  while(d<h){d.setDate(d.getDate()+1);var w=d.getDay();if(w!==0&&w!==6)n++}
  return n;
}
function checkPlazo(){
  var a=v('fsol'),b=v('fact'),el=$('plazo');
  if(!a||!b){el.innerHTML='';return null}
  if(b<=a){el.innerHTML='<p class="vc-note vc-note--warn">La fecha de la actividad debe ser posterior a la fecha de solicitud.</p>';return 0}
  var n=diasHabiles(a,b);
  el.innerHTML=n<15
    ?'<p class="vc-note vc-note--warn">Hay solo '+n+' días hábiles entre la solicitud y la actividad. El instructivo exige <strong>al menos 15</strong>; las solicitudes sin esa antelación no pueden realizarse. Considera otra fecha.</p>'
    :'<p class="vc-note vc-note--ok">Antelación adecuada ('+n+' días hábiles; no se descuentan feriados).</p>';
  return n;
}
$('fsol').addEventListener('change',checkPlazo);$('fact').addEventListener('change',checkPlazo);

/* tabla de reactivos */
function addReac(){
  var tr=document.createElement('tr');
  tr.innerHTML='<td><input aria-label="Reactivo"></td><td><input aria-label="Solución"></td><td><input aria-label="Material"></td><td><input aria-label="Otros"></td><td><button type="button" class="vc-btn vc-btn--sec vc-btn--sm" aria-label="Quitar fila">×</button></td>';
  tr.querySelector('button').addEventListener('click',function(){tr.remove()});
  $('treac').tBodies[0].appendChild(tr);
}
for(var i=0;i<3;i++)addReac();
$('addreac').addEventListener('click',addReac);

/* RUT */
function rutLimpio(s){return s.replace(/[^0-9kK]/g,'').toUpperCase()}
function dv(c){var s=0,m=2;for(var i=c.length-1;i>=0;i--){s+=+c[i]*m;m=m===7?2:m+1}var r=11-(s%11);return r===11?'0':r===10?'K':String(r)}
function rutValido(s){var r=rutLimpio(s);if(r.length<8||r.length>9)return false;return dv(r.slice(0,-1))===r.slice(-1)}
function rutFmt(s){var r=rutLimpio(s);if(r.length<2)return r;return r.slice(0,-1).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+'-'+r.slice(-1)}

/* nómina */
function renum(){Array.prototype.forEach.call($('tn').tBodies[0].rows,function(r,i){r.cells[0].textContent=i+1})}
function addEst(){
  var tr=document.createElement('tr');
  tr.innerHTML='<td class="vc-num"></td><td><input aria-label="Nombre estudiante"></td><td><input aria-label="RUT" placeholder="12.345.678-5"></td><td><button type="button" class="vc-btn vc-btn--sec vc-btn--sm" aria-label="Quitar estudiante">×</button></td>';
  var r=tr.querySelectorAll('input')[1];
  r.addEventListener('blur',function(){
    if(r.value)r.value=rutFmt(r.value);
    var bad=!!r.value&&!rutValido(r.value);
    r.classList.toggle('vc-invalid',bad);r.setAttribute('aria-invalid',bad);
  });
  tr.querySelector('button').addEventListener('click',function(){tr.remove();renum()});
  $('tn').tBodies[0].appendChild(tr);renum();
}
for(var j=0;j<14;j++)addEst();
$('addest').addEventListener('click',addEst);

/* ficha: rellenar con los datos de la solicitud */
$('prefill').addEventListener('click',function(){
  $('f_cole').value=v('cole');$('f_fecha').value=v('fact');$('f_hini').value=v('hini');$('f_hfin').value=v('hfin');
  $('f_act').value=actividad();$('f_n').value=v('nest');$('f_prof').value=v('prof');$('f_mail').value=v('mail');$('f_acad').value=v('encarg')||v('acad');
});

/* salida */
function selectText(el){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}
function showErrs(id,list){
  $(id).innerHTML=list.length?'<div class="vc-note vc-note--warn"><strong>Falta completar:</strong><ul>'+list.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>':'';
}
function setupOut(k,asunto,cuerpo,cc){
  $('asunto'+k).textContent=asunto;$('body'+k).textContent=cuerpo;$('out'+k).hidden=false;
  $('mailto'+k).href='mailto:'+MAIL_DEPTO+'?subject='+encodeURIComponent(asunto)+(cc?'&cc='+encodeURIComponent(cc):'')+'&body='+encodeURIComponent(cuerpo);
  var msg=$('msg'+k);
  $('copy'+k).onclick=function(){
    var ok=function(){msg.className='vc-note vc-note--ok';msg.textContent='Texto copiado. Pégalo en un correo a '+MAIL_DEPTO+'.'};
    var fail=function(){selectText($('body'+k));msg.className='vc-note vc-note--warn';msg.textContent='No se pudo copiar automáticamente: el texto quedó seleccionado, cópialo manualmente.'};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(cuerpo).then(ok,fail);else fail();
  };
  $('dl'+k).onclick=function(){
    var blob=new Blob(['﻿'+cuerpo],{type:'text/plain;charset=utf-8'});
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);
    a.download=(k==='1'?'solicitud_visita':'ficha_identificacion_visita')+'.txt';
    document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},1000);
  };
  $('out'+k).scrollIntoView({behavior:'smooth'});
}

/* generar solicitud */
$('gen1').addEventListener('click',function(){
  var e=[];
  if(!v('acad'))e.push('Académico/a que realiza la solicitud');
  if(!v('fsol'))e.push('Fecha de solicitud');
  if(!v('encarg'))e.push('Académicos encargados de la actividad');
  if(!v('cole'))e.push('Nombre del establecimiento');
  if(!v('nest'))e.push('N.º de estudiantes');
  if(!v('prof'))e.push('Profesor/a encargado/a');
  if(!v('act'))e.push('Actividad que desea desarrollar');else if(!actividad())e.push('Indicar cuál es la otra actividad');
  if(!v('fact')||!v('hini'))e.push('Fecha y horario de la actividad');
  var esp=['c_lab','c_sala','c_reac','c_est','c_otro'].some(function(i){return $(i).checked});
  if(!esp)e.push('Al menos un espacio o recurso (o marca «Otros» e indica que no requiere ninguno)');
  if($('c_lab').checked&&!v('lab_txt'))e.push('Laboratorio y horario');
  if($('c_sala').checked&&!v('sala_txt'))e.push('Sala y horario');
  if($('c_est').checked&&(!v('transp')||!v('hllega')))e.push('Transporte y hora de llegada (estacionamiento)');
  var n=checkPlazo();
  if(n!==null&&n<15)e.push('Antelación mínima de 15 días hábiles');
  showErrs('errs',e);
  if(e.length){$('out1').hidden=true;$('errs').scrollIntoView({behavior:'smooth'});return}

  var L=[];
  L.push('Estimados/as: junto con saludar, solicito autorización para realizar una visita de un establecimiento educacional al Departamento de Química, según el protocolo vigente.','');
  L.push('FICHA PARA VISITAS DE COLEGIOS AL DEPARTAMENTO DE QUÍMICA','');
  L.push('I. ACADÉMICO/A QUE REALIZA LA SOLICITUD');
  L.push('1. Académico/a que realiza la solicitud: '+v('acad'));
  L.push('2. Fecha de solicitud: '+fdate(v('fsol')));
  L.push('3. Académicos encargados de la actividad: '+v('encarg'),'');
  L.push('II. ESTABLECIMIENTO EDUCACIONAL');
  L.push('4. Nombre del establecimiento: '+v('cole'));
  L.push('5. N.º de estudiantes que asistirían: '+v('nest'));
  L.push('6. Profesor/a encargado/a (quien acompaña a los estudiantes): '+v('prof')+(v('mail')?' – '+v('mail'):''),'');
  L.push('III. TIPO DE ACTIVIDAD');
  L.push('7. Tipo de actividad: '+actividadFull());
  L.push('8. Fecha y horario: '+fdate(v('fact'))+', '+hrs(v('hini'),v('hfin')),'');
  L.push('IV. ESPACIOS QUE SOLICITA USAR');
  L.push('9. Laboratorio: '+($('c_lab').checked?'SÍ – '+v('lab_txt'):'No'));
  L.push('10. Sala de clases: '+($('c_sala').checked?'SÍ – '+v('sala_txt'):'No'));
  L.push('11. Reactivos: '+($('c_reac').checked?'SÍ':'No'));
  if($('c_reac').checked){
    Array.prototype.map.call($('treac').tBodies[0].rows,function(r){return Array.prototype.map.call(r.querySelectorAll('input'),function(i){return i.value.trim()})})
      .filter(function(r){return r.some(function(x){return x})})
      .forEach(function(r,i){L.push('    '+(i+1)+') Reactivo: '+(r[0]||'-')+' | Solución: '+(r[1]||'-')+' | Material: '+(r[2]||'-')+' | Otros: '+(r[3]||'-'))});
  }
  L.push('12. Estacionamiento: '+($('c_est').checked?'SÍ':'No'));
  if($('c_est').checked){L.push('    Tipo de transporte: '+v('transp'));L.push('    Horario aproximado: llegada '+v('hllega')+(v('hsale')?', salida '+v('hsale'):'')+' h')}
  L.push('13. Otros: '+($('c_otro').checked&&v('otro_txt')?v('otro_txt'):'No'),'');
  L.push('Quedo atento/a a la confirmación por escrito. Saludos cordiales,',v('acad'));
  var cc=$('c_reac').checked?MAIL_TEC:'';
  $('ccline').textContent=cc?'· CC: '+cc:'';
  setupOut('1','Solicitud de visita de colegio – '+v('cole')+' – '+fdate(v('fact')),L.join('\n'),cc);
});

/* generar ficha de identificación */
$('gen2').addEventListener('click',function(){
  var e=[];
  [['f_cole','Establecimiento'],['f_fecha','Fecha'],['f_hini','Horario'],['f_act','Actividad'],['f_n','N.º de estudiantes'],['f_prof','Profesor/a'],['f_mail','Correo del profesor/a'],['f_acad','Académico/a encargado/a']]
    .forEach(function(p){if(!v(p[0]))e.push(p[1])});
  var filas=Array.prototype.map.call($('tn').tBodies[0].rows,function(r){return Array.prototype.map.call(r.querySelectorAll('input'),function(i){return i.value.trim()})})
    .filter(function(r){return r[0]||r[1]});
  if(!filas.length)e.push('Al menos un estudiante');
  filas.forEach(function(r,i){
    if(!r[0])e.push('Nombre del estudiante '+(i+1));
    else if(!r[1])e.push('RUT de '+r[0]);
    else if(!rutValido(r[1]))e.push('El RUT de '+r[0]+' no es válido');
  });
  if(v('f_n')&&filas.length&&+v('f_n')!==filas.length)e.push('La nómina tiene '+filas.length+' estudiantes, pero el N.º declarado es '+v('f_n'));
  showErrs('errs2',e);
  if(e.length){$('out2').hidden=true;$('errs2').scrollIntoView({behavior:'smooth'});return}
  var L=['FICHA DE IDENTIFICACIÓN DE VISITAS – DEPARTAMENTO DE QUÍMICA UMCE','(Visita ratificada por la Dirección del Departamento de Química)',''];
  L.push('Establecimiento educacional: '+v('f_cole'));
  L.push('Fecha y horario: '+fdate(v('f_fecha'))+', '+hrs(v('f_hini'),v('f_hfin')));
  L.push('Actividad: '+v('f_act'));
  L.push('N.º de estudiantes: '+v('f_n'));
  L.push('Profesor/a (establecimiento educacional): '+v('f_prof'));
  L.push('Correo profesor/a: '+v('f_mail'));
  L.push('Académico/a encargado/a (UMCE): '+v('f_acad'),'');
  L.push('N.º | Nombre estudiante | RUT');
  filas.forEach(function(r,i){L.push((i+1)+' | '+r[0]+' | '+r[1])});
  setupOut('2','Ficha de identificación de visitas – '+v('f_cole')+' – '+fdate(v('f_fecha')),L.join('\n'),'');
});
})();
