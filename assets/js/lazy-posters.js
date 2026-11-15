(function(){
  var vids=[].slice.call(document.querySelectorAll('video[data-poster]'));
  function load(v){var p=v.getAttribute('data-poster');if(p){v.setAttribute('poster',p);v.removeAttribute('data-poster');}}
  if(!('IntersectionObserver' in window)){vids.forEach(load);return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){load(e.target);io.unobserve(e.target);}});},{rootMargin:'400px 0px'});
  vids.forEach(function(v){io.observe(v);});
})();
