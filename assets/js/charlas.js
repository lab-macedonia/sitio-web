/* Solicitud de charlas y actividades experimentales en colegios · Laboratorio MACEDONIA.
   Se envía por FormSubmit al correo del laboratorio (DESTINO). */
(function(){
'use strict';
var DESTINO='german.barriga@umce.cl';
function $(id){return document.getElementById(id)}
function v(id){return ($(id).value||'').trim()}
function fdate(s){if(!s)return '';var p=s.split('-');return p[2]+'-'+p[1]+'-'+p[0]}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
/* envío por FormSubmit (https://formsubmit.co): el correo sale del servicio, no del navegador */
function enviar(btn,msg,destino,asunto,campos,cc,replyto){
  /* un campo por dato: FormSubmit los muestra como tabla ordenada en el correo */
  var data={_subject:asunto,_captcha:'false',_template:'table'};
  campos.forEach(function(c){data[c[0]]=c[1]||'—'});
  if(cc)data._cc=cc;
  if(replyto)data.email=replyto;
  btn.disabled=true;msg.className='vc-note';msg.textContent='Enviando…';
  fetch('https://formsubmit.co/ajax/'+destino,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
    .then(function(r){return r.json()})
    .then(function(d){
      if(d.success!==true&&d.success!=='true')throw new Error(d.message||'error');
      msg.className='vc-note vc-note--ok';msg.textContent='Solicitud enviada. Recibirás respuesta en el correo que indicaste.';
    })
    .catch(function(){
      btn.disabled=false;msg.className='vc-note vc-note--warn';
      msg.textContent='No se pudo enviar. Usa «Abrir en el correo» o copia el texto y envíalo a '+destino+'.';
    });
}
function tipo(){return $('t_charla').checked?'charla':($('t_exp').checked?'exp':'')}
function actividad(){var a=v('act');return a==='otra'?v('otra_txt'):a}

$('para').textContent=DESTINO;

function aplicaTipo(){var t=tipo();$('s_charla').hidden=t!=='charla';$('s_exp').hidden=t!=='exp'}
$('t_charla').addEventListener('change',aplicaTipo);$('t_exp').addEventListener('change',aplicaTipo);
$('act').addEventListener('change',function(){$('s_otra').hidden=v('act')!=='otra'});

function selectText(el){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}
function showErrs(list){
  $('errs').innerHTML=list.length?'<div class="vc-note vc-note--warn"><strong>Falta completar:</strong><ul>'+list.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>':'';
}

$('gen').addEventListener('click',function(){
  var e=[],t=tipo(),d0=new Date(),hoy=d0.getFullYear()+'-'+String(d0.getMonth()+1).padStart(2,'0')+'-'+String(d0.getDate()).padStart(2,'0');
  if(!v('cole'))e.push('Nombre del establecimiento');
  if(!v('comuna'))e.push('Comuna');
  if(!v('dir'))e.push('Dirección del establecimiento');
  if(!v('prof'))e.push('Nombre del profesor/a');
  if(!v('mail'))e.push('Correo electrónico');
  else if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('mail')))e.push('El correo electrónico no parece válido');
  if(!t)e.push('Tipo de actividad (charla o actividad experimental)');
  if(t==='charla'&&!v('tema'))e.push('Tema de la charla');
  if(t==='exp'){if(!v('act'))e.push('Actividad experimental');else if(!actividad())e.push('Indicar cuál es la otra actividad')}
  if(!v('curso'))e.push('Curso(s) o nivel');
  if(!v('nest'))e.push('N.º de estudiantes');
  if(!v('f1'))e.push('Fecha preferente');
  else if(v('f1')<=hoy)e.push('La fecha preferente debe ser posterior a hoy');
  if(v('f2')&&v('f2')<=hoy)e.push('La fecha alternativa debe ser posterior a hoy');
  if(!v('hini'))e.push('Horario');
  showErrs(e);
  if(e.length){$('out').hidden=true;$('errs').scrollIntoView({behavior:'smooth'});return}

  var L=[];
  L.push('Estimados/as: junto con saludar, solicito una '+(t==='charla'?'charla':'actividad experimental')+' del Laboratorio MACEDONIA en mi establecimiento.','');
  L.push('ESTABLECIMIENTO');
  L.push('Nombre: '+v('cole'));
  L.push('Comuna: '+v('comuna'));
  L.push('Dirección: '+v('dir'),'');
  L.push('PROFESOR/A QUE SOLICITA');
  L.push('Nombre: '+v('prof'));
  L.push('Correo: '+v('mail'));
  if(v('tel'))L.push('Teléfono: '+v('tel'));
  if(v('asig'))L.push('Asignatura: '+v('asig'));
  L.push('');
  L.push('ACTIVIDAD SOLICITADA');
  L.push('Tipo: '+(t==='charla'?'Charla':'Actividad experimental'));
  L.push((t==='charla'?'Tema: '+v('tema'):'Actividad: '+actividad()));
  L.push('Curso(s) o nivel: '+v('curso'));
  L.push('N.º de estudiantes: '+v('nest'));
  if(v('obs'))L.push('Detalles: '+v('obs'));
  L.push('');
  L.push('FECHA Y HORARIO');
  L.push('Fecha preferente: '+fdate(v('f1')));
  if(v('f2'))L.push('Fecha alternativa: '+fdate(v('f2')));
  L.push('Horario: '+v('hini')+(v('hfin')?' a '+v('hfin'):'')+' h','');
  L.push('CONDICIONES EN EL ESTABLECIMIENTO');
  var cond=[['e_lab','Laboratorio de ciencias'],['e_sala','Sala de clases'],['e_agua','Acceso a agua y lavamanos'],['e_proy','Proyector o pantalla'],['e_net','Computador e internet']]
    .filter(function(c){return $(c[0]).checked}).map(function(c){return c[1]});
  L.push('Disponibles: '+(cond.length?cond.join(', '):'No se indicaron'));
  if(v('e_otro'))L.push('Otras condiciones o limitaciones: '+v('e_otro'));
  L.push('','Quedo atento/a a su respuesta. Saludos cordiales,',v('prof'));

  var asunto='Solicitud de '+(t==='charla'?'charla':'actividad experimental')+' en colegio – '+v('cole'),cuerpo=L.join('\n');
  var campos=[
    ['Solicitud',t==='charla'?'Charla en colegio':'Actividad experimental en colegio'],
    ['Establecimiento',v('cole')],['Comuna',v('comuna')],['Dirección',v('dir')],
    ['Profesor/a',v('prof')],['Correo',v('mail')],['Teléfono',v('tel')],['Asignatura',v('asig')],
    [t==='charla'?'Tema de la charla':'Actividad experimental',t==='charla'?v('tema'):actividad()],
    ['Curso(s) o nivel',v('curso')],['N.º de estudiantes',v('nest')],['Detalles',v('obs')],
    ['Fecha preferente',fdate(v('f1'))],['Fecha alternativa',v('f2')?fdate(v('f2')):''],
    ['Horario',v('hini')+(v('hfin')?' a '+v('hfin'):'')+' h'],
    ['Condiciones disponibles',cond.length?cond.join(', '):'No se indicaron'],['Otras condiciones o limitaciones',v('e_otro')]
  ];
  $('asunto').textContent=asunto;$('body').textContent=cuerpo;$('out').hidden=false;
  $('mailto').href='mailto:'+DESTINO+'?subject='+encodeURIComponent(asunto)+'&body='+encodeURIComponent(cuerpo);
  var msg=$('msg');
  $('send').disabled=false;$('send').onclick=function(){enviar($('send'),msg,DESTINO,asunto,campos,'',v('mail'))};
  $('copy').onclick=function(){
    var ok=function(){msg.className='vc-note vc-note--ok';msg.textContent='Texto copiado. Pégalo en un correo a '+DESTINO+'.'};
    var fail=function(){selectText($('body'));msg.className='vc-note vc-note--warn';msg.textContent='No se pudo copiar automáticamente: el texto quedó seleccionado, cópialo manualmente.'};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(cuerpo).then(ok,fail);else fail();
  };
  $('dl').onclick=function(){
    var blob=new Blob(['﻿'+cuerpo],{type:'text/plain;charset=utf-8'});
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='solicitud_actividad_colegio.txt';
    document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},1000);
  };
  $('out').scrollIntoView({behavior:'smooth'});
});
})();
