/* Progressive enhancement: full quotes remain readable without JavaScript. */
(function(){
  function init(){
    var cards=document.querySelectorAll('.pd-customer-card');
    if(!cards.length)return;
    document.documentElement.classList.add('pd-review-js');
    cards.forEach(function(card){
      var quote=card.querySelector('.pd-review-quote');
      var button=card.querySelector('[data-pd-review-toggle]');
      if(!quote||!button)return;
      if(quote.textContent.trim().length<=235)return;
      quote.classList.add('is-collapsed');
      button.hidden=false;
      button.addEventListener('click',function(){
        var expanded=button.getAttribute('aria-expanded')==='true';
        quote.classList.toggle('is-collapsed',expanded);
        button.setAttribute('aria-expanded',String(!expanded));
        button.textContent=expanded?'Read More':'Read Less';
      });
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
