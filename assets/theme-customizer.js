/* Shared lightweight Pacific Dentworks live theme picker. Works offline on file:// and GitHub Pages. */
(() => {
  'use strict';
  const KEY = 'pacific-dentworks-color-v1';
  const DEFAULT = '#F44336';
  const root = document.documentElement;
  const norm = v => {
    if (typeof v !== 'string') return null;
    let s=v.trim().replace(/^#/, '').toUpperCase();
    if (/^[0-9A-F]{3}$/.test(s)) s=s.split('').map(x=>x+x).join('');
    return /^[0-9A-F]{6}$/.test(s) ? '#'+s : null;
  };
  const rgb = hex => [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
  const hexOf = a => '#' + a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('').toUpperCase();
  const mix = (a,b,t) => hexOf(rgb(a).map((v,i)=>v*(1-t)+rgb(b)[i]*t));
  const srgbLum = hex => rgb(hex).map(v=>v/255).map(v=>v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4))
    .reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
  const textOn = hex => srgbLum(hex)>.179 ? '#17203A' : '#FFFFFF';
  const hsl = hex => {const [r,g,b]=rgb(hex).map(x=>x/255),max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;
    let h=0,s=0,l=(min+max)/2;if(d){s=d/(1-Math.abs(2*l-1));switch(max){case r:h=((g-b)/d)%6;break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4}h*=60}
    return [(h+360)%360, s*100, l*100];};
  const hs=(h,s,l)=>`hsl(${Math.round(h)} ${Math.round(Math.max(0,Math.min(100,s)))}% ${Math.round(Math.max(0,Math.min(100,l)))}%)`;
  function load(){try{return norm(localStorage.getItem(KEY))||DEFAULT}catch(_){return DEFAULT}}
  function store(value){try{if(value===DEFAULT)localStorage.removeItem(KEY);else localStorage.setItem(KEY,value)}catch(_){}}
  let current=load();
  function apply(input,save){
    const c=norm(input);if(!c)return false;current=c;
    const [h,s]=hsl(c);const sat=Math.max(42,Math.min(80,s));
    const dark=mix(c,'#101820',.42);
    const vars={
      '--theme-primary':c,'--theme-hover':mix(c,'#000000',.18),'--theme-on-primary':textOn(c),
      '--theme-on-hover':textOn(mix(c,'#000000',.18)),'--blue':c,'--blue-hover':mix(c,'#000000',.18),
      '--theme-navy':mix(c,'#101820',.76),'--theme-navy-light':mix(c,'#202A34',.58),
      '--theme-950':mix(c,'#080F17',.88),'--theme-900':mix(c,'#101820',.75),
      '--theme-800':mix(c,'#172438',.54),'--theme-600':mix(c,'#FFFFFF',.17),
      '--theme-sky':mix(c,'#FFFFFF',.66),'--theme-sky-secondary':mix(c,'#FFFFFF',.73),
      '--theme-mid':mix(c,'#FFFFFF',.43),'--theme-line':mix(c,'#FFFFFF',.78),
      '--theme-line-strong':mix(c,'#FFFFFF',.65),'--theme-pale':mix(c,'#FFFFFF',.91),
      '--theme-100':mix(c,'#FFFFFF',.86),'--theme-50':mix(c,'#FFFFFF',.955)
    };
    if(c===DEFAULT){Object.assign(vars,{'--theme-navy':'#172027','--theme-navy-light':'#403136','--theme-950':'#141a20','--theme-900':'#27262c','--theme-800':'#67353a','--theme-600':'#fc665e','--theme-sky':'#ffbab3','--theme-sky-secondary':'#ffd0c9','--theme-mid':'#f89d95','--theme-line':'#f4cdc9','--theme-line-strong':'#ecada5','--theme-pale':'#fff3f1','--theme-100':'#ffe7e3','--theme-50':'#fff9f8'});}
    Object.entries(vars).forEach(([name,val])=>root.style.setProperty(name,val));
    root.classList.toggle('pacific-theme-light',textOn(c)!=='#FFFFFF');
    const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=c;
    if(save)store(c);return true;
  }
  apply(current,false);
  function init(){
    const wrap=document.querySelector('[data-theme-customizer]');if(!wrap)return;
    const trigger=wrap.querySelector('[data-theme-trigger]');
    const panel=wrap.querySelector('[data-theme-panel]');
    const close=wrap.querySelector('[data-theme-close]');
    const picker=wrap.querySelector('[data-theme-picker]');
    const hex=wrap.querySelector('[data-theme-hex]');
    const reset=wrap.querySelector('[data-theme-reset]');
    const msg=wrap.querySelector('[data-theme-feedback]');
    const swatches=Array.from(wrap.querySelectorAll('[data-theme-swatch]'));
    const sync=(str)=>{picker.value=current;hex.value=current;hex.setAttribute('aria-invalid','false');
      swatches.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeSwatch===current)));
      msg.textContent=str||'Color saved on this device.';};
    const open = v => {panel.hidden=!v;trigger.setAttribute('aria-expanded',String(v));if(v)picker.focus();};
    trigger.addEventListener('click',()=>open(panel.hidden));
    close.addEventListener('click',()=>open(false));
    picker.addEventListener('input',()=>{apply(picker.value,true);sync()});
    const accept=()=>{const c=norm(hex.value);if(!c){hex.setAttribute('aria-invalid','true');msg.textContent='Please enter a valid hex color, such as #2563EB.';return}apply(c,true);sync()};
    hex.addEventListener('change',accept);
    hex.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();accept();}});
    swatches.forEach(b=>b.addEventListener('click',()=>{apply(b.dataset.themeSwatch,true);sync()}));
    reset.addEventListener('click',()=>{apply(DEFAULT,true);sync('Original Pacific red restored.');});
    document.addEventListener('pointerdown',e=>{if(!panel.hidden&&!wrap.contains(e.target)){panel.hidden=true;trigger.setAttribute('aria-expanded','false');}});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)open(false)});
    window.addEventListener('storage',e=>{if(e.key===KEY){apply(load(),false);sync('Updated in another tab.');}});
    sync('Choose a color to preview it instantly.');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
