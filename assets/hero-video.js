/* Hero video: independent of the three slide text layers; mobile-compatible autoplay. */
(() => { 'use strict';
const init = () => {
  const video=document.querySelector('.hero .showtime-hero-video');
  if(!video)return;
  const button=document.querySelector('.hero [data-hero-video-toggle]');
  let stopped=false;
  const state=()=>{
    if(!button)return;
    const need=video.paused || !!video.error;
    button.classList.toggle('needs-play',need);
    button.setAttribute('aria-label',need?'Play background video':'Pause background video');
    button.setAttribute('title',need?'Play background video':'Pause background video');
    button.setAttribute('aria-pressed',String(!need));
    button.innerHTML=need?'▶':'Ⅱ';
  };
  function play(){
    if(stopped)return;
    video.muted=true;
    video.defaultMuted=true;
    video.playsInline=true;
    video.loop=true;
    video.setAttribute('muted','');
    video.setAttribute('playsinline','');
    try{const promise=video.play();if(promise&&promise.catch)promise.catch(state);}catch(_){state();}
  }
  // Backstop for older browsers that do not support <source media> reliably.
  const mobile=window.matchMedia('(max-width:700px)').matches;
  const chosen=mobile?'assets/videos/hero-mobile.mp4':'assets/videos/hero-desktop.mp4';
  const actual=video.currentSrc || '';
  if(mobile && actual.includes('hero-desktop.mp4')){
    video.src=chosen;video.load();
  }
  ['playing','pause','waiting','error','canplay'].forEach(name=>video.addEventListener(name,()=>{state();if(name==='canplay'&&!stopped&&video.paused)play();}));
  if(button){button.addEventListener('click',()=>{if(!video.paused){stopped=true;video.pause();}else{stopped=false;play();}state();});}
  window.addEventListener('pageshow',()=>{if(!stopped)play();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!stopped&&video.paused)play();});
  play();state();
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
