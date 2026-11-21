/* Pacific Dentworks — JS enhancements. Offline safe, no fetch/remote dependencies. */
(()=>{'use strict';
 const animated=new WeakSet();
 function animatePage(){
  const nodes=document.querySelectorAll('main .reveal,main .story-media,main .svc-detail, main .gal-item, #fs-reviews .rev-card, #fs-contact .contact-left, footer .footer-grid>*, #showtime-about .value-card');
  if(!('IntersectionObserver' in window)||!Element.prototype.animate)return;
  const io=new IntersectionObserver((entries)=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   io.unobserve(entry.target);
   const el=entry.target;
   if(animated.has(el)||el.closest('.hero'))return;
   animated.add(el);
   const rect=el.getBoundingClientRect();
   const delay=rect.top<window.innerHeight?Math.min(Array.from(el.parentNode.children).indexOf(el)*52,230):0;
   el.animate([{opacity:0,transform:'translateY(24px) scale(.989)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:700,delay:Math.max(0,delay),easing:'cubic-bezier(.18,.72,.22,1)'});
  }),{threshold:.09,rootMargin:'0px 0px -25px 0px'});
  nodes.forEach(n=>io.observe(n));
 }
 function clearOldActive(){document.querySelectorAll('[data-nav-key]').forEach(a=>a.removeAttribute('aria-current'));
  const page=(location.pathname.split('/').pop()||'index.html').replace('.html','');
  document.querySelectorAll('[data-nav-key="'+page+'"]').forEach(a=>a.setAttribute('aria-current','page'));
 }
 function protectForms(){document.querySelectorAll('form[data-estimate], #showtimeEstimate').forEach(f=>{
  f.removeAttribute('data-netlify');f.removeAttribute('action');f.removeAttribute('netlify');
  f.addEventListener('submit',e=>{e.preventDefault();e.stopImmediatePropagation();
   let n=f.querySelector('[data-form-notice], .pacific-form-notice');
   if(!n){n=document.createElement('p');n.className='pacific-form-notice';f.prepend(n)}
   n.innerHTML='Online submissions are not configured yet. Please call <a href="tel:+16049703368"><strong>604-970-3368</strong></a> to discuss your dent.';
   n.scrollIntoView({behavior:'smooth',block:'center'});
  },true)
 });}
 function addGalleryFallback(){
  document.querySelectorAll('[data-repair-slider]').forEach(box=>{
   const input=box.querySelector('input[type="range"]');if(!input)return;
   input.disabled=false;
   input.removeAttribute('disabled');
   const update=()=>{const v=Number(input.value);box.style.setProperty('--pos',v+'%');input.setAttribute('aria-valuetext',v+'% before, '+(100-v)+'% after')};
   input.addEventListener('input',update);update();
  });
 }
 function init(){clearOldActive();protectForms();addGalleryFallback();animatePage();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();