/* Códigos de visita firmados (ECDSA P-256 con WebCrypto) · Laboratorio MACEDONIA.
   El laboratorio firma cada código con una llave privada que solo conoce el responsable; el sitio
   lo verifica con la llave pública. No hay servidor ni base de datos: el código lleva dentro el
   establecimiento, la fecha de la visita y su vencimiento.
   Formato:  MAC1.<carga en base64url>.<firma en base64url>   (carga = JSON UTF-8)  */
(function(root){
'use strict';

/* Llave pública del laboratorio (JWK sin el campo «d»). Mientras sea null, la etapa 2 queda cerrada.
   Se obtiene con la página assets/herramientas/codigos-visita.html. */
var CLAVE_PUBLICA=null;

var PREFIJO='MAC1';
var DIAS_VIGENCIA=30; /* días de vigencia posteriores a la fecha de la visita */
var ALFABETO='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; /* sin 0/O/1/I para evitar confusiones */
var ALG={name:'ECDSA',namedCurve:'P-256'};
var FIRMA={name:'ECDSA',hash:'SHA-256'};

function subtle(){
  var c=root.crypto;
  if(!c||!c.subtle)throw new Error('Este navegador no permite verificar códigos (se requiere una conexión segura).');
  return c.subtle;
}
function b64u(buf){
  var b=new Uint8Array(buf),s='';
  for(var i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function deB64u(s){
  s=s.replace(/-/g,'+').replace(/_/g,'/');
  while(s.length%4)s+='=';
  var bin=atob(s),b=new Uint8Array(bin.length);
  for(var i=0;i<bin.length;i++)b[i]=bin.charCodeAt(i);
  return b;
}
function utf8(s){return new TextEncoder().encode(s)}
function deUtf8(b){return new TextDecoder().decode(b)}
function hoyISO(){
  var d=new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function sumarDias(iso,n){
  var d=new Date(iso+'T12:00:00');d.setDate(d.getDate()+n);
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function idAleatorio(){
  var r=new Uint8Array(6),s='';
  root.crypto.getRandomValues(r);
  for(var i=0;i<r.length;i++)s+=ALFABETO[r[i]%ALFABETO.length];
  return s;
}
/* acepta el enlace completo (…#codigo=MAC1.…) o solo el código, con espacios o saltos de línea intercalados */
function limpiar(texto){
  var t=String(texto||'').trim(),m=t.match(/codigo=([^&\s]+)/);
  if(m)t=m[1];
  try{t=decodeURIComponent(t)}catch(e){}
  return t.replace(/\s+/g,'');
}

/* crea el par de llaves (se hace una sola vez) */
function crearLlaves(){
  return subtle().generateKey(ALG,true,['sign','verify']).then(function(kp){
    return Promise.all([subtle().exportKey('jwk',kp.privateKey),subtle().exportKey('jwk',kp.publicKey)]);
  }).then(function(r){
    var pub={kty:r[1].kty,crv:r[1].crv,x:r[1].x,y:r[1].y};
    return {privada:r[0],publica:pub};
  });
}

/* firma un código. datos: {colegio, fecha:'AAAA-MM-DD'} */
function crear(jwkPrivada,datos){
  var carga={i:idAleatorio(),c:String(datos.colegio||'').trim(),f:datos.fecha,e:sumarDias(datos.fecha,DIAS_VIGENCIA)};
  var cargaB64=b64u(utf8(JSON.stringify(carga)));
  return subtle().importKey('jwk',jwkPrivada,ALG,false,['sign']).then(function(k){
    return subtle().sign(FIRMA,k,utf8(PREFIJO+'.'+cargaB64));
  }).then(function(sig){
    return {datos:carga,codigo:PREFIJO+'.'+cargaB64+'.'+b64u(sig)};
  });
}

/* verifica un código; resuelve {ok:true,datos} o {ok:false,motivo} */
function verificar(texto,jwkPublica){
  jwkPublica=jwkPublica||CLAVE_PUBLICA;
  if(!jwkPublica)return Promise.resolve({ok:false,motivo:'sin-clave'});
  var partes=limpiar(texto).split('.');
  if(partes.length!==3||partes[0]!==PREFIJO)return Promise.resolve({ok:false,motivo:'formato'});
  var carga,firma;
  try{carga=JSON.parse(deUtf8(deB64u(partes[1])));firma=deB64u(partes[2])}catch(e){return Promise.resolve({ok:false,motivo:'formato'})}
  if(!carga||typeof carga.i!=='string'||typeof carga.f!=='string'||typeof carga.e!=='string')return Promise.resolve({ok:false,motivo:'formato'});
  return subtle().importKey('jwk',jwkPublica,ALG,false,['verify']).then(function(k){
    return subtle().verify(FIRMA,k,firma,utf8(PREFIJO+'.'+partes[1]));
  }).then(function(valida){
    if(!valida)return {ok:false,motivo:'firma'};
    if(carga.e<hoyISO())return {ok:false,motivo:'vencido',datos:carga};
    return {ok:true,datos:carga};
  },function(){return {ok:false,motivo:'firma'}});
}

root.VisitasCodigo={crearLlaves:crearLlaves,crear:crear,verificar:verificar,limpiar:limpiar,
  claveConfigurada:function(){return !!CLAVE_PUBLICA},DIAS_VIGENCIA:DIAS_VIGENCIA};
})(typeof window!=='undefined'?window:globalThis);
