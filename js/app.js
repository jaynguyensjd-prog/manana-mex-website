/* Manana Mex Brekkie: page logic
   Menu items (MENU), restaurants (STORES) and TikTok episodes (EPS) are plain data lists below.
   Pages are switched with the address hash: #home, #menu, #one-hand, #order, #find, #mascot, #faq. */

(function(){
'use strict';

/* ---------- Palette for illustrations (mirrors the CSS tokens) ---------- */
const C={ink:'#1F1611',paper:'#FFFBF2',yolk:'#FFC21A',yolkSoft:'#FFE6A1',salsa:'#D63C23',avo:'#2E7D4A',sun:'#FF8A1F',
  tort:'#F2D39A',tortD:'#E2B66C',toast:'#C98F45',egg:'#FFD84A',bacon:'#B8432B',bean:'#4A2C22',corn:'#F7C948',cornT:'#F0C46A',
  tomato:'#E8503A',avoL:'#7BBF6A',avoP:'#CBE7A8',cheek:'#F4A08A',mouth:'#7A2416',hash:'#E8A93A',hashD:'#B97A1E',churro:'#D9963F',choc:'#5A2E1A'};
const K=C.ink;
const BRAND='Manana Mex', MASCOT='Mananito';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const money=n=>'$'+(Math.round(n*100)/100).toFixed(2);
const reduceMotion=()=>window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mascot: Mananito ---------- */
function mascotSVG(opts){
  const o=Object.assign({item:'card',sil:false,label:''},opts||{});
  const sil=o.sil, s=c=>sil?K:c;
  const aria=o.label?`role="img" aria-label="${esc(o.label)}"`:'aria-hidden="true"';
  let rArm='M221 238 Q250 246 260 266', hand=[262,270], held='';
  if(o.item==='card'){
    held=`<g transform="translate(236 234) rotate(-12)"><rect width="46" height="30" rx="5" fill="${K}"/><rect x="7" y="19" width="18" height="4" rx="2" fill="${s(C.yolk)}"/><circle cx="36" cy="10" r="4.5" fill="none" stroke="${s(C.paper)}" stroke-width="2"/></g>
      <g fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"><path d="M290 222 q7 9 0 18"/><path d="M299 215 q11 15 0 31"/></g>`;
  } else if(o.item==='phone'){
    held=`<g transform="translate(248 214) rotate(8)"><rect width="30" height="52" rx="6" fill="${K}"/><rect x="3.5" y="6" width="23" height="38" rx="3" fill="${s(C.yolkSoft)}"/><rect x="7" y="11" width="13" height="6" rx="3" fill="${s(C.paper)}"/><rect x="10" y="21" width="13" height="6" rx="3" fill="${s(C.salsa)}"/><rect x="7" y="31" width="10" height="6" rx="3" fill="${s(C.paper)}"/></g>`;
  } else if(o.item==='coffee'){
    held=`<g transform="translate(243 208)"><path d="M14 -3 q-5 -6 0 -12 M25 -3 q-5 -6 0 -12" fill="none" stroke="${K}" stroke-width="2.5" stroke-linecap="round" opacity=".45"/><path d="M3 12 H35 L31 58 H7 Z" fill="${s(C.paper)}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/><path d="M4.6 28 H33.4 L32 44 H6 Z" fill="${s(C.salsa)}" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/><rect x="0" y="4" width="38" height="9" rx="3" fill="${s(C.paper)}" stroke="${K}" stroke-width="3"/></g>`;
  } else if(o.item==='backpack'){
    rArm='M221 240 Q248 216 222 192'; hand=[217,188];
  }
  return `<svg viewBox="0 0 320 420" ${aria} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="160" cy="404" rx="94" ry="9" fill="${K}" opacity=".16"/>
    <rect x="198" y="150" width="58" height="150" rx="22" fill="${s(C.salsa)}" stroke="${K}" stroke-width="5"/>
    <path d="M232 196 H252" stroke="${K}" stroke-width="3" stroke-linecap="round" opacity=".5"/>
    <g stroke="${K}" stroke-width="10" stroke-linecap="round"><path d="M138 330 L131 384"/><path d="M182 330 L189 384"/></g>
    <ellipse cx="123" cy="391" rx="23" ry="11" fill="${s(C.salsa)}" stroke="${K}" stroke-width="4"/>
    <ellipse cx="197" cy="391" rx="23" ry="11" fill="${s(C.salsa)}" stroke="${K}" stroke-width="4"/>
    <path d="M104 394 H140 M180 394 H216" stroke="${s(C.paper)}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="160" cy="114" rx="63" ry="18" fill="${s(C.tortD)}" stroke="${K}" stroke-width="5"/>
    <circle cx="138" cy="100" r="15" fill="${s(C.egg)}" stroke="${K}" stroke-width="3"/>
    <path d="M150 106 C156 88 166 98 172 86 C178 76 190 86 196 80 L201 95 C193 103 185 94 179 104 C173 114 161 106 155 117 Z" fill="${s(C.bacon)}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="178" cy="106" r="13" fill="${s(C.egg)}" stroke="${K}" stroke-width="3"/>
    <ellipse cx="122" cy="106" rx="11" ry="5" transform="rotate(-28 122 106)" fill="${s(C.avoL)}" stroke="${K}" stroke-width="2.5"/>
    <ellipse cx="203" cy="106" rx="10" ry="5" transform="rotate(24 203 106)" fill="${s(C.avoL)}" stroke="${K}" stroke-width="2.5"/>
    <circle cx="158" cy="96" r="5" fill="${s(C.tomato)}" stroke="${K}" stroke-width="2"/>
    <path d="M97 114 A63 18 0 0 0 223 114 L223 286 Q223 342 160 342 Q97 342 97 286 Z" fill="${s(C.tort)}" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>
    <g fill="${s(C.toast)}" opacity=".55"><ellipse cx="120" cy="272" rx="8" ry="5"/><ellipse cx="200" cy="304" rx="6" ry="4"/><ellipse cx="192" cy="146" rx="5" ry="3"/><ellipse cx="132" cy="318" rx="5" ry="3"/></g>
    <path d="M100 254 Q160 230 220 238" fill="none" stroke="${s(C.toast)}" stroke-width="4" stroke-linecap="round"/>
    <path d="M106 300 Q140 290 172 297" fill="none" stroke="${s(C.toast)}" stroke-width="3.5" stroke-linecap="round"/>
    <g fill="none" stroke-linecap="round"><path d="M117 132 Q106 212 110 300" stroke="${K}" stroke-width="13"/><path d="M117 132 Q106 212 110 300" stroke="${s(C.salsa)}" stroke-width="7"/><path d="M203 132 Q214 212 210 300" stroke="${K}" stroke-width="13"/><path d="M203 132 Q214 212 210 300" stroke="${s(C.salsa)}" stroke-width="7"/></g>
    <g class="m-eyes">
      <ellipse cx="140" cy="172" rx="13" ry="15" fill="${C.paper}" stroke="${K}" stroke-width="4"/>
      <ellipse cx="182" cy="172" rx="13" ry="15" fill="${C.paper}" stroke="${K}" stroke-width="4"/>
      <circle cx="143" cy="176" r="6.5" fill="${K}"/><circle cx="185" cy="176" r="6.5" fill="${K}"/>
      <circle cx="145.5" cy="172.5" r="2.2" fill="${C.paper}"/><circle cx="187.5" cy="172.5" r="2.2" fill="${C.paper}"/>
    </g>
    ${sil?'':`<g fill="none" stroke="${K}" stroke-width="4" stroke-linecap="round"><path d="M127 148 Q140 141 152 148"/><path d="M170 148 Q182 141 195 148"/></g>
    <ellipse cx="126" cy="198" rx="9" ry="5.5" fill="${C.cheek}" opacity=".9"/><ellipse cx="196" cy="198" rx="9" ry="5.5" fill="${C.cheek}" opacity=".9"/>
    <path d="M146 196 Q161 221 176 196 Z" fill="${C.mouth}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M154 207 Q161 214 168 207 Q161 203 154 207 Z" fill="${C.tomato}"/>`}
    <path d="M99 238 Q72 248 64 268" fill="none" stroke="${K}" stroke-width="8" stroke-linecap="round"/>
    <g transform="translate(30 238) rotate(-14)">
      <rect width="36" height="60" rx="16" fill="${s(C.tort)}" stroke="${K}" stroke-width="3"/>
      <ellipse cx="18" cy="7" rx="13" ry="5" fill="${s(C.tortD)}" stroke="${K}" stroke-width="2.5"/>
      <circle cx="13" cy="5" r="3.5" fill="${s(C.egg)}"/><circle cx="22" cy="5" r="3.5" fill="${s(C.bacon)}"/>
      <path d="M0 22 H36 V44 Q36 60 18 60 Q0 60 0 44 Z" fill="${s(C.yolk)}" stroke="${K}" stroke-width="3"/>
      ${sil?'':`<text x="18" y="44" text-anchor="middle" font-family="Shrikhand, Georgia, serif" font-size="11" fill="${K}">MM</text>`}
    </g>
    <circle cx="62" cy="272" r="12" fill="${s(C.tort)}" stroke="${K}" stroke-width="4"/>
    <path d="${rArm}" fill="none" stroke="${K}" stroke-width="8" stroke-linecap="round"/>
    ${held}
    <circle cx="${hand[0]}" cy="${hand[1]}" r="12" fill="${s(C.tort)}" stroke="${K}" stroke-width="4"/>
  </svg>`;
}

/* ---------- Food illustrations (viewBox 220 x 150) ---------- */
function burritoInner(f,label){
  f=f||[C.egg,C.bacon,C.avoL];
  return `<g transform="rotate(-16 110 75)">
    <rect x="24" y="44" width="160" height="62" rx="31" fill="${C.tort}" stroke="${K}" stroke-width="4"/>
    <g fill="${C.toast}" opacity=".55"><ellipse cx="140" cy="57" rx="5" ry="3"/><ellipse cx="134" cy="93" rx="6" ry="3.5"/></g>
    <path d="M55 44 H122 V106 H55 A31 31 0 0 1 55 44 Z" fill="${C.yolk}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M34 56 H120" stroke="${K}" stroke-width="2" stroke-dasharray="5 4" opacity=".6"/>
    <text x="86" y="86" text-anchor="middle" font-family="Shrikhand, Georgia, serif" font-size="15" fill="${K}">${label||'Manana'}</text>
    <ellipse cx="166" cy="75" rx="14" ry="29" fill="${C.tortD}" stroke="${K}" stroke-width="4"/>
    <circle cx="165" cy="61" r="6.5" fill="${f[0]}" stroke="${K}" stroke-width="2"/>
    <circle cx="168" cy="76" r="7" fill="${f[1]}" stroke="${K}" stroke-width="2"/>
    <circle cx="164" cy="90" r="6" fill="${f[2]}" stroke="${K}" stroke-width="2"/>
  </g>`;
}
function bowlInner(){
  return `<ellipse cx="110" cy="72" rx="80" ry="13" fill="${C.tortD}" stroke="${K}" stroke-width="4"/>
  <circle cx="76" cy="62" r="15" fill="${C.egg}" stroke="${K}" stroke-width="3"/>
  <circle cx="104" cy="56" r="13" fill="${C.egg}" stroke="${K}" stroke-width="3"/>
  <g transform="rotate(-18 142 60)"><ellipse cx="142" cy="60" rx="21" ry="11" fill="${C.avoL}" stroke="${K}" stroke-width="3"/><ellipse cx="142" cy="60" rx="12" ry="5.5" fill="${C.avoP}"/></g>
  <g fill="${C.bean}"><circle cx="92" cy="72" r="5"/><circle cx="120" cy="70" r="5"/><circle cx="111" cy="75" r="4.5"/></g>
  <g fill="${C.corn}" stroke="${K}" stroke-width="1.5"><circle cx="164" cy="70" r="4"/><circle cx="156" cy="75" r="4"/><circle cx="172" cy="66" r="4"/></g>
  <g fill="${C.tomato}"><rect x="58" y="66" width="7" height="7" rx="1.5"/><rect x="128" y="66" width="7" height="7" rx="1.5"/><rect x="84" y="73" width="6" height="6" rx="1.5"/></g>
  <path d="M30 72 A80 58 0 0 0 190 72 Z" fill="${C.salsa}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M46 98 Q110 116 174 98" fill="none" stroke="${C.paper}" stroke-width="4" stroke-linecap="round"/>
  <path d="M64 116 Q110 128 156 116" fill="none" stroke="${C.yolk}" stroke-width="4" stroke-linecap="round"/>`;
}
function tacosInner(f){
  f=f||[C.egg,C.bacon,C.avoL];
  const taco=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r} 52 60)">
    <circle cx="22" cy="44" r="10" fill="${f[0]}" stroke="${K}" stroke-width="2.5"/>
    <circle cx="42" cy="34" r="10" fill="${f[1]}" stroke="${K}" stroke-width="2.5"/>
    <circle cx="62" cy="34" r="10" fill="${f[0]}" stroke="${K}" stroke-width="2.5"/>
    <circle cx="80" cy="44" r="9" fill="${f[2]}" stroke="${K}" stroke-width="2.5"/>
    <path d="M2 86 A50 50 0 0 1 102 86 Z" fill="${C.cornT}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M16 78 A38 38 0 0 1 88 78" fill="none" stroke="${C.toast}" stroke-width="2.5" stroke-dasharray="3 8" stroke-linecap="round"/>
  </g>`;
  return taco(10,36,-8)+taco(104,30,8);
}
function hashInner(){
  return `<g transform="rotate(-8 110 75)">
    <rect x="56" y="34" width="108" height="80" rx="28" fill="${C.hash}" stroke="${K}" stroke-width="4"/>
    <g stroke="${C.hashD}" stroke-width="3" stroke-linecap="round"><path d="M78 56 l12 -4"/><path d="M104 50 l10 3"/><path d="M130 58 l12 -3"/><path d="M84 80 l10 4"/><path d="M112 76 l14 -2"/><path d="M140 86 l8 4"/><path d="M92 100 l12 -3"/><path d="M122 98 l10 3"/></g>
  </g>`;
}
function churroInner(){
  const stick=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><rect x="${x-10}" y="${y-46}" width="20" height="92" rx="10" fill="${C.churro}" stroke="${K}" stroke-width="3.5"/><path d="M${x-3.5} ${y-38} V${y+38} M${x+3.5} ${y-38} V${y+38}" stroke="${C.hashD}" stroke-width="2" stroke-linecap="round"/><g fill="${C.paper}"><circle cx="${x-5}" cy="${y-20}" r="1.6"/><circle cx="${x+5}" cy="${y+4}" r="1.6"/><circle cx="${x-4}" cy="${y+26}" r="1.6"/></g></g>`;
  return stick(46,78,-26)+stick(74,72,-10)+stick(102,76,8)+
  `<path d="M120 96 H196 L190 130 Q158 140 126 130 Z" fill="${C.paper}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
   <ellipse cx="158" cy="96" rx="38" ry="10" fill="${C.choc}" stroke="${K}" stroke-width="4"/>
   <path d="M132 112 H184" stroke="${C.salsa}" stroke-width="5" stroke-linecap="round"/>`;
}
function guacInner(){
  return `<path d="M58 70 L84 18 L104 72 Z" fill="${C.cornT}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M120 72 L150 22 L166 74 Z" fill="${C.cornT}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M62 66 H158 L148 128 H72 Z" fill="${C.paper}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M65.5 90 H154.5 L152.6 102 H67.4 Z" fill="${C.salsa}"/>
  <ellipse cx="110" cy="66" rx="48" ry="11" fill="${C.avo}" stroke="${K}" stroke-width="4"/>
  <g fill="${C.avoP}"><circle cx="94" cy="64" r="3.5"/><circle cx="118" cy="68" r="3"/><circle cx="130" cy="63" r="3.5"/></g>
  <g fill="${C.tomato}"><rect x="104" y="61" width="5" height="5" rx="1"/><rect x="138" y="67" width="5" height="5" rx="1"/></g>`;
}
function coffeeInner(sleeve,steam){
  return `${steam?`<g fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round" opacity=".35"><path d="M98 18 q-6 -7 0 -14"/><path d="M112 20 q-6 -7 0 -14"/><path d="M126 18 q-6 -7 0 -14"/></g>`:''}
  <rect x="88" y="20" width="44" height="10" rx="4" fill="${C.paper}" stroke="${K}" stroke-width="4"/>
  <path d="M80 40 H140 L130 136 H90 Z" fill="${C.paper}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="74" y="28" width="72" height="14" rx="5" fill="${C.paper}" stroke="${K}" stroke-width="4"/>
  <path d="M83.4 70 H136.6 L132.6 108 H87.4 Z" fill="${sleeve}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
  <text x="110" y="96" text-anchor="middle" font-family="Shrikhand, Georgia, serif" font-size="15" fill="${C.paper}">MM</text>`;
}
function icedInner(liquid){
  return `<rect x="120" y="4" width="9" height="66" rx="3" fill="${C.salsa}" stroke="${K}" stroke-width="3" transform="rotate(12 124 40)"/>
  <path d="M80 34 H140 L132 140 H88 Z" fill="${liquid}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
  <g fill="${C.paper}"><rect x="92" y="46" width="16" height="16" rx="3" opacity=".75" transform="rotate(-12 100 54)"/><rect x="112" y="58" width="15" height="15" rx="3" opacity=".7" transform="rotate(14 120 66)"/><rect x="96" y="78" width="14" height="14" rx="3" opacity=".6" transform="rotate(8 103 85)"/></g>
  <path d="M85.6 104 H134.4 L133 120 H87 Z" fill="${C.yolk}" stroke="${K}" stroke-width="2.5"/>
  <ellipse cx="110" cy="34" rx="34" ry="8" fill="${C.paper}" fill-opacity=".55" stroke="${K}" stroke-width="4"/>`;
}
function comboInner(mini){
  return `<g transform="translate(98 6) scale(.74)">${coffeeInner(C.salsa,false)}</g>
  <g transform="translate(-14 26) scale(.74)">${burritoInner(mini?[C.egg,C.corn,C.tomato]:[C.egg,C.bacon,C.avoL],mini?'Mini':'Manana')}</g>
  <g transform="translate(66 72) scale(.5)">${hashInner()}</g>`;
}
const ART={
  burrito:o=>burritoInner(o.fill,'Manana'),
  mini:o=>`<g transform="translate(24 16) scale(.8)">${burritoInner(o.fill,'Mini')}</g>`,
  bowl:()=>bowlInner(), tacos:o=>tacosInner(o.fill), hash:()=>hashInner(), churro:()=>churroInner(), guac:()=>guacInner(),
  coffee:o=>coffeeInner(o.sleeve,true), iced:o=>icedInner(o.liquid), combo:o=>comboInner(o.mini)
};
const art=(type,o)=>`<svg viewBox="0 0 220 150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${ART[type](o||{})}</svg>`;

function mapArt(){
  return `<svg viewBox="0 0 220 150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <g stroke="${K}" stroke-opacity=".14" stroke-width="7" stroke-linecap="round"><path d="M0 38 H220"/><path d="M0 106 H220"/><path d="M58 0 V150"/><path d="M164 0 V150"/></g>
    <path d="M-6 132 C40 124 76 74 130 66 S196 34 226 22" fill="none" stroke="${C.salsa}" stroke-width="7" stroke-linecap="round"/>
    <g fill="${C.paper}" stroke="${K}" stroke-width="3"><circle cx="38" cy="120" r="7"/><circle cx="196" cy="35" r="7"/></g>
    <g transform="translate(118 6)"><path d="M12 0 C26 0 34 10 34 22 C34 38 12 58 12 58 C12 58 -10 38 -10 22 C-10 10 -2 0 12 0 Z" fill="${C.yolk}" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="12" cy="21" r="7" fill="${K}"/></g>
  </svg>`;
}

/* ---------- Packaging diagram ---------- */
function wrapDiagram(withLabel){
  const marker=(x,y,n)=>`<circle cx="${x}" cy="${y}" r="15" fill="${C.salsa}" stroke="${K}" stroke-width="3"/><text x="${x}" y="${y+5}" text-anchor="middle" font-family="DM Mono, monospace" font-size="15" font-weight="500" fill="${C.paper}">${n}</text>`;
  const aria=withLabel?'role="img" aria-label="Diagram of the breakfast wrap: 1 tear strip with a red pull tab, 2 fold-down top, 3 grip sleeve"':'aria-hidden="true"';
  return `<svg viewBox="0 0 360 320" ${aria} xmlns="http://www.w3.org/2000/svg">
    <path d="M112 112 V80 Q112 34 180 34 Q248 34 248 80 V112 Z" fill="${C.tort}" stroke="${K}" stroke-width="4"/>
    <g fill="${C.toast}" opacity=".55"><ellipse cx="150" cy="62" rx="7" ry="4"/><ellipse cx="214" cy="80" rx="6" ry="3.5"/><ellipse cx="186" cy="50" rx="4" ry="2.5"/></g>
    <path d="M104 104 H256 V266 Q256 290 232 290 H128 Q104 290 104 266 Z" fill="${C.yolk}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M104 104 H256 L250 140 H110 Z" fill="${C.yolkSoft}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M122 122 H238" stroke="${K}" stroke-width="2" opacity=".3" stroke-linecap="round"/>
    <path d="M106 162 H254" stroke="${K}" stroke-width="2.5" stroke-dasharray="7 5"/>
    <rect x="250" y="152" width="40" height="20" rx="5" fill="${C.salsa}" stroke="${K}" stroke-width="3"/>
    <text x="270" y="166" text-anchor="middle" font-family="DM Mono, monospace" font-size="9.5" font-weight="500" fill="${C.paper}">PULL</text>
    <text x="180" y="206" text-anchor="middle" font-family="Shrikhand, Georgia, serif" font-size="25" fill="${K}">${BRAND}</text>
    <text x="180" y="226" text-anchor="middle" font-family="DM Mono, monospace" font-size="10.5" letter-spacing="2" fill="${K}">BREKKIE · 6:00–10:30</text>
    <path d="M104 242 H256 V266 Q256 290 232 290 H128 Q104 290 104 266 Z" fill="${C.salsa}" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
    <g stroke="${C.paper}" stroke-width="3" stroke-linecap="round" opacity=".55">${Array.from({length:11},(_,i)=>`<path d="M${120+i*12} 252 V280"/>`).join('')}</g>
    <path d="M292 162 H303" stroke="${K}" stroke-width="2.5"/>${marker(318,162,1)}
    <path d="M67 122 H108" stroke="${K}" stroke-width="2.5"/>${marker(52,122,2)}
    <path d="M67 266 H104" stroke="${K}" stroke-width="2.5"/>${marker(52,266,3)}
  </svg>`;
}

/* ---------- Data ---------- */
const MENU=[
  {id:'742',cat:'burrito',name:'The 7:42',kind:'Bacon & egg burrito',desc:'Free-range scrambled egg, smoky bacon, crispy potato, melted cheese, pico de gallo and chipotle mayo.',price:10.9,kj:2890,tags:[],flag:'Bestseller',art:['burrito',{fill:[C.egg,C.bacon,C.avoL]}]},
  {id:'chorizo',cat:'burrito',name:'Chorizo Alarm Clock',kind:'Chorizo & egg burrito',desc:'Spiced chorizo, scrambled egg, potato, jalapeños and salsa roja. Properly wakes you up.',price:11.5,kj:3120,tags:['Hot'],art:['burrito',{fill:[C.salsa,C.egg,C.bacon]}]},
  {id:'green',cat:'burrito',name:'Green Light',kind:'Veggie brekkie burrito',desc:'Scrambled egg, black beans, smashed avocado, baby spinach, pico de gallo and salsa verde.',price:10.5,kj:2540,tags:['V'],art:['burrito',{fill:[C.avoL,C.egg,C.bean]}]},
  {id:'mini',cat:'burrito',name:'Mini Manana',kind:'Egg & cheese mini burrito',desc:'Fluffy egg, cheese and a little salsa in a small flour tortilla. Breakfast for under six bucks.',price:5.9,kj:1320,tags:['V'],flag:'Under $6',art:['mini',{fill:[C.egg,C.corn,C.tomato]}]},
  {id:'sunrise',cat:'bowl',name:'Sunrise Bowl',kind:'Brekkie bowl',desc:'Scrambled eggs, crispy potato, black beans, charred corn, avocado, pico and chipotle sauce.',price:12.5,kj:2610,tags:['GF'],art:['bowl']},
  {id:'tacos',cat:'bowl',name:'Brekkie Tacos',kind:'2 soft corn tacos',desc:'Egg, bacon, cheese and pico de gallo in two warm corn tortillas.',price:8.9,kj:1980,tags:['GF'],art:['tacos',{fill:[C.egg,C.bacon,C.avoL]}]},
  {id:'ranchero',cat:'bowl',name:'Tofu Ranchero Tacos',kind:'2 vegan tacos',desc:'Smoky tofu scramble, black beans, salsa ranchera and fresh coriander on corn tortillas.',price:8.9,kj:1760,tags:['VG','GF'],art:['tacos',{fill:[C.corn,C.bean,C.avoL]}]},
  {id:'hash',cat:'side',name:'Hash Brown',kind:'Side',desc:'Golden, crunchy and exactly the right size for your free hand.',price:2.9,kj:640,tags:['VG'],art:['hash']},
  {id:'churro',cat:'side',name:'Churro Bites',kind:'5 pieces + choc dip',desc:'Cinnamon-sugar churro bites with a little pot of chocolate for dipping.',price:4.5,kj:1450,tags:['V'],art:['churro']},
  {id:'guac',cat:'side',name:'Guac & Chips',kind:'Side',desc:'Guacamole made fresh each morning, with a handful of corn chips.',price:4.9,kj:1180,tags:['VG','GF'],art:['guac']},
  {id:'flat',cat:'drink',name:'Flat White',kind:'Regular coffee',desc:'Double shot with full cream or oat milk. Lid on, sleeve on, ready for the platform.',price:4.8,kj:520,tags:[],art:['coffee',{sleeve:C.salsa}]},
  {id:'horchata',cat:'drink',name:'Horchata Iced Latte',kind:'Iced coffee',desc:'Cold espresso poured over cinnamon rice horchata and ice.',price:6.5,kj:980,tags:['V'],art:['iced',{liquid:'#E6CFA8'}]},
  {id:'choc',cat:'drink',name:'Mexican Hot Chocolate',kind:'Hot drink',desc:'Dark chocolate with cinnamon and a pinch of chilli warmth.',price:5.5,kj:1150,tags:['V'],art:['coffee',{sleeve:C.avo}]},
  {id:'oj',cat:'drink',name:'Fresh OJ',kind:'Cold drink',desc:'Squeezed oranges and nothing else. Regular size.',price:5.0,kj:460,tags:['VG','GF'],art:['iced',{liquid:C.sun}]},
  {id:'grab',cat:'combo',name:'Grab & Go Combo',kind:'Burrito + hash brown + coffee',desc:'The 7:42, a hash brown and a regular flat white. The full commute kit.',price:15.9,was:18.6,kj:4050,tags:[],flag:'Save $2.70',art:['combo',{}]},
  {id:'uni',cat:'combo',name:'Uni Saver',kind:'Mini + hash brown + coffee',desc:'A Mini Manana, a hash brown and a flat white for less than ten dollars.',price:9.9,was:13.6,kj:2480,tags:['V'],flag:'Save $3.70',art:['combo',{mini:true}]}
];
const byId=Object.fromEntries(MENU.map(d=>[d.id,d]));
const FAV=['742','green','mini','grab'];
const CAT_BG={burrito:'var(--yolk-soft)',bowl:'var(--avo-soft)',side:'var(--tortilla)',drink:'var(--salsa-soft)',combo:'var(--yolk)'};

const STORES=[
  {id:'central',city:'Sydney',name:'Central',near:'1 min walk from Central Station, Eddy Ave exit',drive:false,allday:true},
  {id:'townhall',city:'Sydney',name:'Town Hall',near:'2 min walk from Town Hall Station, George St',drive:false,allday:false},
  {id:'macq',city:'Sydney',name:'Macquarie Centre',near:'3 min walk from Macquarie University Metro',drive:false,allday:false},
  {id:'parra',city:'Sydney',name:'Parramatta',near:'4 min walk from Parramatta Station, Church St',drive:false,allday:false},
  {id:'chatswood',city:'Sydney',name:'Chatswood',near:'2 min walk from Chatswood Interchange',drive:false,allday:false},
  {id:'kensington',city:'Sydney',name:'Kensington',near:'Anzac Pde, next to the UNSW light rail stop',drive:false,allday:false},
  {id:'homebush',city:'Sydney',name:'Homebush Drive-Thru',near:'Parramatta Rd eastbound, near the M4 on-ramp',drive:true,allday:true},
  {id:'rousehill',city:'Sydney',name:'Rouse Hill Drive-Thru',near:'Windsor Rd, opposite the Metro car park',drive:true,allday:false},
  {id:'flinders',city:'Melbourne',name:'Flinders Street',near:'1 min walk from Flinders Street Station',drive:false,allday:true},
  {id:'melbcentral',city:'Melbourne',name:'Melbourne Central',near:'2 min walk from Melbourne Central Station',drive:false,allday:false},
  {id:'southerncross',city:'Melbourne',name:'Southern Cross',near:'Collins St entrance, Southern Cross Station',drive:false,allday:false},
  {id:'clayton',city:'Melbourne',name:'Clayton Drive-Thru',near:'Wellington Rd, 4 min drive from Monash Clayton',drive:true,allday:true}
];

const EPS=[
  {n:'01',when:'Week 1 · Tue 8am',title:"Who's up this early?",sc:'teaser',item:'card',sil:true},
  {n:'02',when:'Week 1 · Thu 4pm',title:'Mananito, reporting for brekkie',sc:'reveal',item:'coffee'},
  {n:'03',when:'Week 2 · Tue 8am',title:'Catching the 7:42',sc:'platform',item:'backpack'},
  {n:'04',when:'Week 3 · Tue 8am',title:'One hand: the group chat',sc:'phone',item:'phone'},
  {n:'05',when:'Week 3 · Thu 4pm',title:'One hand: tap on, no drama',sc:'card',item:'card'},
  {n:'06',when:'Week 4 · Tue 8am',title:'New wrap, who dis?',sc:'wrap',item:'coffee'}
];

/* ---------- Pages (hash routes) ---------- */
const PAGES={
  home:{next:'menu'},
  menu:{label:'Brekkie menu',time:'7:12am',title:'The brekkie menu',next:'one-hand'},
  'one-hand':{label:'One hand',time:'7:28am',title:'One hand for brekkie',next:'order'},
  order:{label:'Order ahead',time:'7:30am',title:'Order ahead',next:'find'},
  find:{label:'Find us',time:'7:41am',title:'Find a restaurant',next:'mascot'},
  mascot:{label:MASCOT,time:'8:00am',title:'Meet '+MASCOT,next:'faq'},
  faq:{label:'FAQ',time:'10:29am',title:'Last call questions',next:'home'}
};

/* ---------- Sydney clock ---------- */
const START=360, END=630; /* 6:00am and 10:30am */
const sydFmt=new Intl.DateTimeFormat('en-AU',{timeZone:'Australia/Sydney',hour:'numeric',minute:'numeric',hourCycle:'h23'});
function sydMins(){
  const p=sydFmt.formatToParts(new Date());
  const h=+(p.find(x=>x.type==='hour')||{value:0}).value%24, m=+(p.find(x=>x.type==='minute')||{value:0}).value;
  return h*60+m;
}
function fmt(mins){const h=Math.floor(mins/60)%24, m=mins%60; return (h%12||12)+':'+String(m).padStart(2,'0')+(h<12?'am':'pm');}
function dur(min){const h=Math.floor(min/60), m=min%60; return h?`${h}h ${m}m`:`${m} min`;}
function slots(){
  const now=sydMins(); let start, day;
  if(now<START){start=START;day='Today';}
  else if(now<=END-10){start=Math.ceil((now+10)/5)*5;day='Today';}
  else {start=START;day='Tomorrow';}
  const out=[]; for(let t=start;t<=END;t+=5) out.push({v:day+'|'+t,label:`${day}, ${fmt(t)}`,day});
  return out;
}

/* ---------- State ---------- */
let bag={};
try{const raw=JSON.parse(localStorage.getItem('mm-bag')||'{}'); if(raw&&typeof raw==='object') for(const k in raw) if(byId[k]&&raw[k]>0) bag[k]=Math.min(20,raw[k]|0);}catch(e){bag={};}
function saveBag(){try{localStorage.setItem('mm-bag',JSON.stringify(bag));}catch(e){}}
const order={method:'pickup',store:'macq',time:null,name:''};
let placed=null, menuFilter='all';

/* ---------- Toast ---------- */
let toastT;
function toast(msg){const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2400);}

/* ---------- Menu ---------- */
function dishCard(d){
  const q=bag[d.id]||0;
  const tags=d.tags.map(t=>`<span class="tag ${t==='V'||t==='VG'?'veg':t==='Hot'?'hot':''}">${t}</span>`).join('');
  return `<article class="dish">
    <div class="dish-art" style="background:${CAT_BG[d.cat]}">${tags?`<div class="dish-tags">${tags}</div>`:''}${d.flag?`<span class="dish-flag">${esc(d.flag)}</span>`:''}${art(d.art[0],d.art[1])}</div>
    <div class="dish-body">
      <span class="dish-kind">${esc(d.kind)}</span>
      <h3>${esc(d.name)}</h3>
      <p>${esc(d.desc)}</p>
      <div class="dish-foot">
        <div class="pricebox"><span class="price">${money(d.price)}${d.was?`<s>${money(d.was)}</s>`:''}</span><span class="kj">${d.kj.toLocaleString('en-AU')} kJ</span></div>
        <button class="add" type="button" data-add="${d.id}" aria-label="Add ${esc(d.name)} to your bag${q?`, ${q} already in bag`:''}">${q?`<span class="q">${q}</span>Add more`:'Add +'}</button>
      </div>
    </div>
  </article>`;
}
function renderMenu(focusId){
  $('#menu-grid').innerHTML=MENU.filter(d=>menuFilter==='all'||d.cat===menuFilter).map(dishCard).join('');
  $('#fav-grid').innerHTML=FAV.map(id=>dishCard(byId[id])).join('');
  if(focusId){const b=$(`.view:not([hidden]) .dish [data-add="${focusId}"]`); if(b) b.focus({preventScroll:true});}
}
function setFilter(f){
  menuFilter=f;
  $$('#menu-filters [data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.filter===f)));
  renderMenu();
}
$('#menu-filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]'); if(b) setFilter(b.dataset.filter);});
document.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]');
  if(add){
    const id=add.dataset.add; bag[id]=Math.min(20,(bag[id]||0)+1); placed=null;
    saveBag(); updateBagBtn(); renderMenu(id);
    toast(`${byId[id].name} added to your bag`);
    return;
  }
  const gf=e.target.closest('[data-goto-filter]');
  if(gf){setFilter(gf.dataset.gotoFilter); location.hash='#menu'; return;}
  if(e.target.closest('[data-open-bag]')) openBag();
});

/* ---------- Bag ---------- */
const bagEl=$('#bag'), scrim=$('#scrim');
function lines(){return MENU.filter(d=>bag[d.id]>0).map(d=>({d,q:bag[d.id]}));}
function totals(){let sub=0,save=0,n=0; lines().forEach(({d,q})=>{sub+=d.price*q;n+=q;if(d.was)save+=(d.was-d.price)*q;}); return {sub,save,n};}
function updateBagBtn(){
  const t=totals();
  $('#bag-count').textContent=t.n;
  $('#bag-btn').setAttribute('aria-label',t.n?`Open bag, ${t.n} item${t.n>1?'s':''}, ${money(t.sub)}`:'Open bag, empty');
}
function docketHTML(p){
  return `<div class="docket" tabindex="-1" id="docket">
    <div class="dk-brand">${BRAND} · Brekkie</div>
    <div class="dk-no">Order ${p.no}</div>
    <hr>
    <div class="dk-row"><span>${p.method==='drive'?'Drive-thru':'Pickup'}</span><span>${esc(p.when)}</span></div>
    <div class="dk-row"><span>Where</span><span>${esc(p.store.name)}</span></div>
    ${p.name?`<div class="dk-row"><span>Name</span><span>${esc(p.name)}</span></div>`:''}
    <hr>
    ${p.lines.map(l=>`<div class="dk-row"><span>${l.q}× ${esc(l.name)}</span><span>${money(l.price)}</span></div>`).join('')}
    <hr>
    <div class="dk-row dk-total"><span>Total</span><span>${money(p.total)}</span></div>
    <hr>
    <div class="dk-foot">Who said burritos sleep in?</div>
  </div>
  <p class="demo-note">This is a demo docket for the campaign concept. In the real app, your order would be waiting ${p.method==='drive'?'at the drive-thru window':'on the pickup shelf'} at ${esc(p.time)}.</p>
  <button type="button" class="btn btn-ghost btn-block" id="new-order">Start a new order</button>`;
}
function renderBag(focusSel){
  const body=$('#bag-body');
  if(placed){body.innerHTML=docketHTML(placed); return;}
  const ls=lines();
  if(!ls.length){
    body.innerHTML=`<div class="bag-empty"><div class="fig">${mascotSVG({item:'phone'})}</div><p class="bag-empty-title">Nothing in here yet</p><p>Add a burrito, a bowl or a flat white from the menu and it'll show up here.</p><a class="btn btn-primary" href="#menu" data-close-bag>See the brekkie menu</a></div>`;
    return;
  }
  const t=totals();
  const stores=STORES.filter(s=>order.method==='drive'?s.drive:true);
  if(!stores.some(s=>s.id===order.store)) order.store=stores[0].id;
  const sl=slots(); if(!sl.some(x=>x.v===order.time)) order.time=sl[0].v;
  const now=sydMins();
  const hint=sl[0].day==='Tomorrow'?"Brekkie's finished for today, so these slots are for tomorrow morning.":now<START?'Brekkie starts at 6:00am. Slots run until 10:30am.':'Slots run until 10:30am, when brekkie finishes.';
  body.innerHTML=`<div class="lines">${ls.map(({d,q})=>`<div class="line">
      <div><div class="line-name">${esc(d.name)}</div><div class="line-kind">${esc(d.kind)}</div></div>
      <div class="qty" role="group" aria-label="Quantity of ${esc(d.name)}"><button type="button" data-dec="${d.id}" aria-label="Remove one ${esc(d.name)}">−</button><span>${q}</span><button type="button" data-inc="${d.id}" aria-label="Add one ${esc(d.name)}">+</button></div>
      <div class="line-price">${money(d.price*q)}</div></div>`).join('')}</div>
    <form id="order-form" class="order-form" novalidate>
      <fieldset class="field"><legend>How are you getting it?</legend>
        <div class="seg">
          <span class="seg-opt"><input type="radio" name="method" id="m-pickup" value="pickup" ${order.method==='pickup'?'checked':''}><label for="m-pickup">Pick up in store</label></span>
          <span class="seg-opt"><input type="radio" name="method" id="m-drive" value="drive" ${order.method==='drive'?'checked':''}><label for="m-drive">Drive-thru</label></span>
        </div>
      </fieldset>
      <div class="field"><label for="o-store">Restaurant</label><select id="o-store">${stores.map(s=>`<option value="${s.id}" ${s.id===order.store?'selected':''}>${esc(s.name)} · ${s.city}</option>`).join('')}</select></div>
      <div class="field"><label for="o-time">Pickup time</label><select id="o-time">${sl.map(x=>`<option value="${x.v}" ${x.v===order.time?'selected':''}>${x.label}</option>`).join('')}</select><p class="hint">${hint}</p></div>
      <div class="field"><label for="o-name">Name on the order</label><input type="text" id="o-name" autocomplete="given-name" maxlength="24" placeholder="e.g. Emily" value="${esc(order.name)}"></div>
      <div class="totals">${t.save>0?`<div class="row"><span>Combo savings</span><span>−${money(t.save)}</span></div>`:''}<div class="row grand"><span>Total</span><span>${money(t.sub)}</span></div></div>
      <button type="submit" class="btn btn-primary btn-block">Place order · ${money(t.sub)}</button>
      <p class="demo-note">Demo checkout for the campaign concept. Nothing is charged, and no order is sent to a restaurant.</p>
    </form>`;
  if(focusSel){const el=body.querySelector(focusSel); if(el) el.focus();}
}
let lastFocus=null;
function openBag(){
  lastFocus=document.activeElement; renderBag();
  bagEl.classList.add('open'); bagEl.setAttribute('aria-hidden','false'); scrim.hidden=false;
  document.documentElement.classList.add('locked');
  setTimeout(()=>$('#bag-close').focus(),60);
}
function closeBag(restore){
  bagEl.classList.remove('open'); bagEl.setAttribute('aria-hidden','true'); scrim.hidden=true;
  document.documentElement.classList.remove('locked');
  if(restore!==false&&lastFocus&&lastFocus.focus) lastFocus.focus({preventScroll:true});
}
$('#bag-btn').addEventListener('click',openBag);
$('#bag-close').addEventListener('click',()=>closeBag());
scrim.addEventListener('click',()=>closeBag());
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&bagEl.classList.contains('open')) closeBag();});
const bagBody=$('#bag-body');
bagBody.addEventListener('click',e=>{
  const inc=e.target.closest('[data-inc]'), dec=e.target.closest('[data-dec]');
  if(inc||dec){
    e.stopPropagation();
    const id=(inc||dec).dataset[inc?'inc':'dec'];
    bag[id]=Math.max(0,Math.min(20,(bag[id]||0)+(inc?1:-1))); if(!bag[id]) delete bag[id];
    saveBag(); updateBagBtn(); renderMenu();
    renderBag(bag[id]?`[data-${inc?'inc':'dec'}="${id}"]`:null);
    if(!bag[id]) $('#bag-close').focus();
    return;
  }
  if(e.target.closest('[data-close-bag]')){closeBag(false); return;}
  if(e.target.closest('#new-order')){placed=null; closeBag(false); location.hash='#menu'; return;}
});
bagBody.addEventListener('change',e=>{
  if(e.target.name==='method'){order.method=e.target.value; renderBag('#m-'+order.method);}
  else if(e.target.id==='o-store') order.store=e.target.value;
  else if(e.target.id==='o-time') order.time=e.target.value;
});
bagBody.addEventListener('input',e=>{if(e.target.id==='o-name') order.name=e.target.value;});
bagBody.addEventListener('submit',e=>{
  e.preventDefault();
  const [day,mins]=order.time.split('|');
  const t=totals();
  placed={no:'MM-'+Math.floor(1000+Math.random()*9000),when:`${day}, ${fmt(+mins)}`,time:fmt(+mins),
    store:STORES.find(s=>s.id===order.store),method:order.method,name:order.name.trim(),
    lines:lines().map(({d,q})=>({name:d.name,q,price:d.price*q})),total:t.sub};
  bag={}; saveBag(); updateBagBtn(); renderMenu(); renderBag();
  bagBody.scrollTop=0; const dk=$('#docket'); if(dk) dk.focus();
});

/* ---------- One hand picker ---------- */
const HAND={
  phone:{cap:'Reply to the group chat between bites.',what:'a phone'},
  card:{cap:'Tap on at the gate. Breakfast stays put.',what:'an Opal card'},
  coffee:{cap:'Burrito in one hand, flat white in the other.',what:'a coffee'},
  backpack:{cap:'Hold onto the strap on a packed 7:42.',what:'a backpack strap'}
};
function setHand(v){
  $('#oh-mascot').innerHTML=mascotSVG({item:v,label:`${MASCOT} the burrito mascot holding a breakfast burrito in one hand and ${HAND[v].what} in the other`});
  $('#oh-caption').textContent=HAND[v].cap;
}
$('#hand-pick').addEventListener('change',e=>{if(e.target.name==='hand') setHand(e.target.value);});

/* ---------- Store finder ---------- */
const sf={q:'',city:'all',drive:false,allday:false};
function storeStatus(s,now){
  if(now>=START&&now<END) return {on:true,text:'Serving brekkie until 10:30am'};
  if(s.allday) return {on:false,text:'Open now · brekkie from 6:00am'};
  if(now<START) return {on:false,text:'Opens 6:00am for brekkie'};
  if(now<23*60) return {on:false,text:'Open now · brekkie back at 6:00am'};
  return {on:false,text:'Closed · opens 6:00am for brekkie'};
}
function renderStores(){
  const now=sydMins(), q=sf.q.trim().toLowerCase();
  const list=STORES.filter(s=>(sf.city==='all'||s.city===sf.city)&&(!sf.drive||s.drive)&&(!sf.allday||s.allday)&&(!q||(s.name+' '+s.near+' '+s.city).toLowerCase().includes(q)));
  $('#store-count').textContent=list.length?`Showing ${list.length} of ${STORES.length} restaurants`:'';
  $('#store-grid').innerHTML=list.length?list.map(s=>{
    const st=storeStatus(s,now);
    return `<article class="store">
      <div class="store-top"><h3>${esc(s.name)}</h3><span class="city">${s.city}</span></div>
      <p class="store-near">${esc(s.near)}</p>
      <div class="store-tags"><span class="tag">${s.drive?'Drive-thru':'Walk-up counter'}</span><span class="tag">${s.allday?'Open 24/7':'6:00am–11:00pm'}</span></div>
      <p class="store-status"><span class="dot ${st.on?'on':''}"></span>${st.text}</p>
      <button class="btn btn-ghost btn-sm" type="button" data-store="${s.id}">Order from here</button>
    </article>`;}).join('')
    :`<div class="find-empty"><p><b>No restaurants match that.</b> Try a suburb or station, like Central or Parramatta, or clear the filters.</p><button class="chip" type="button" id="clear-find">Clear search and filters</button></div>`;
}
$('#store-q').addEventListener('input',e=>{sf.q=e.target.value; renderStores();});
$('[data-view="find"]').addEventListener('click',e=>{
  const city=e.target.closest('[data-city]'), tog=e.target.closest('[data-toggle]'), st=e.target.closest('[data-store]');
  if(city){sf.city=city.dataset.city; $$('[data-city]').forEach(x=>x.setAttribute('aria-pressed',String(x===city))); renderStores();}
  else if(tog){const k=tog.dataset.toggle; sf[k]=!sf[k]; tog.setAttribute('aria-pressed',String(sf[k])); renderStores();}
  else if(e.target.closest('#clear-find')){
    Object.assign(sf,{q:'',city:'all',drive:false,allday:false}); $('#store-q').value='';
    $$('[data-city]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.city==='all')));
    $$('[data-toggle]').forEach(x=>x.setAttribute('aria-pressed','false')); renderStores(); $('#store-q').focus();
  }
  else if(st){
    const s=STORES.find(x=>x.id===st.dataset.store); order.store=s.id;
    if(!s.drive&&order.method==='drive') order.method='pickup';
    placed=null;
    if(totals().n){openBag();}
    else {toast(`Ordering from ${s.name}. Now pick your brekkie.`); location.hash='#menu';}
  }
});

/* ---------- Episodes ---------- */
$('#ep-row').innerHTML=EPS.map(ep=>`<li class="ep">
  <div class="ep-thumb sc-${ep.sc}"><span class="ep-badge">EP ${ep.n}</span><div class="fig">${mascotSVG({item:ep.item,sil:!!ep.sil})}</div></div>
  <span class="ep-meta">${ep.when}</span>
  <h3>${esc(ep.title)}</h3>
</li>`).join('');

/* ---------- Router ---------- */
let current=null;
function route(){
  let r=(location.hash||'').replace(/^#/,'');
  if(!PAGES[r]) r='home';
  if(r===current) return;
  const first=current===null;
  current=r;
  $$('.view').forEach(v=>{v.hidden=v.dataset.view!==r;});
  $$('.primary-nav a').forEach(a=>{if(a.getAttribute('href')==='#'+r) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');});
  const ns=$('#next-stop'), nxt=PAGES[r].next;
  if(r==='home'){ns.hidden=true;}
  else{
    ns.hidden=false;
    $('#ns-link').setAttribute('href','#'+nxt);
    if(nxt==='home'){$('#ns-label').textContent='Back to the start · 6:00am'; $('#ns-title').textContent='Home';}
    else{$('#ns-label').textContent=`Next stop · ${PAGES[nxt].time}`; $('#ns-title').textContent=PAGES[nxt].title;}
  }
  document.title=r==='home'?`${BRAND} Brekkie`:`${PAGES[r].label} · ${BRAND} Brekkie`;
  if(!first){
    window.scrollTo(0,0);
    const h=$(`.view[data-view="${r}"] h1`); if(h) h.focus({preventScroll:true});
  }
  nav.classList.remove('open'); navBtn.setAttribute('aria-expanded','false'); navBtn.textContent='Menu';
}

/* ---------- Clock + live status ---------- */
let lastPhase='';
function tick(){
  const now=sydMins(), h=Math.floor(now/60), m=now%60, on=now>=START&&now<END;
  $('#clk-h').textContent=String(h%12||12); $('#clk-m').textContent=String(m).padStart(2,'0'); $('#clk-ap').textContent=h<12?'am':'pm';
  let status,pill;
  if(on){status=`Brekkie's on. ${dur(END-now)} left to grab one.`; pill=`Brekkie on · ${dur(END-now)} left`;}
  else if(now<START){status=`Brekkie starts in ${dur(START-now)}. Pre-order now and it's ready at 6:00am.`; pill=`Brekkie in ${dur(START-now)}`;}
  else {status=`Brekkie's back at 6:00am. Pre-order tonight and skip the queue.`; pill='Brekkie back 6:00am';}
  $('#hero-status').textContent=status; $('#pill-text').textContent=pill; $('#pill-dot').classList.toggle('on',on);
  const phase=on?'on':now<START?'pre':now<23*60?'day':'late';
  if(phase!==lastPhase){lastPhase=phase; renderStores();}
}

/* ---------- Mobile nav ---------- */
const nav=$('#primary-nav'), navBtn=$('#menu-toggle');
navBtn.addEventListener('click',()=>{const open=!nav.classList.contains('open'); nav.classList.toggle('open',open); navBtn.setAttribute('aria-expanded',String(open)); navBtn.textContent=open?'Close':'Menu';});

/* ---------- Boot ---------- */
$('#hero-mascot').innerHTML=mascotSVG({item:'card'});
$('#wrap-diagram').innerHTML=wrapDiagram(true);
$('[data-hub-art="menu"]').innerHTML=art('burrito',{fill:[C.egg,C.bacon,C.avoL]});
$('[data-hub-art="wrap"]').innerHTML=wrapDiagram(false);
$('[data-hub-art="find"]').innerHTML=mapArt();
$('[data-hub-art="mascot"]').innerHTML=mascotSVG({item:'coffee'});
$('[data-hub-art="uni"]').innerHTML=art('combo',{mini:true});
setHand('phone');
renderMenu(); updateBagBtn(); tick();
window.addEventListener('hashchange',route);
route();
setInterval(tick,20000);
})();
