(function(){
"use strict";
const T=window.TALLAH, C=T.categories, NS="http://www.w3.org/2000/svg";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const params=new URLSearchParams(location.search);
let lang=params.get("lang")==="en"?"en":(localStorage.getItem("tallah-lang")||"ar");
const state={filter:"all",availOnly:false,sel:null,opt:"a",qty:1,view:"map",form:{}};

/* ---------- statuses (placeholder: everything "available" unless overridden) ---------- */
const DEMO=params.get("demo")==="1";
const demoStatus={B7:"reserved",B8:"reserved",B17:"held",A9:"reserved",A10:"held",A40:"unavailable",A41:"reserved",S1:"reserved",CAFE3:"reserved"};
T.booths.forEach(b=>{
  b.status = b.cat==="linked" ? "linked" : (T.STATUS_OVERRIDES[b.code] || (DEMO&&demoStatus[b.code]) || "available");
});
if(DEMO) $("#demoNote").hidden=false;
// off-map pseudo unit for carts
const CART={code:"CART",cat:"cart",status:"available",offMap:true,label:"عربة أطعمة",labelEn:"F&B cart"};

/* ---------- helpers ---------- */
const L=o=>o&&typeof o==="object"?(o[lang]??o.ar):o;
const fmt=n=>n.toLocaleString("en-US");
const SAR=n=>lang==="ar"?`${fmt(n)} ر.س`:`SAR ${fmt(n)}`;
const t=(ar,en)=>lang==="ar"?ar:en;
const statusTxt=s=>({available:t("متاح للطلب","Available to request"),held:t("محجوز مؤقتًا","Temporarily held"),reserved:t("محجوز","Booked"),unavailable:t("غير متاح","Unavailable"),linked:t("ضمن نطاق الرعاية","Sponsorship block"),request:t("التسعير عند الطلب","Price on request")}[s]);
const sizeTxt=c=>c.size==="—"?"—":`${c.size} ${t("م","m")}`;
const bookable=b=>C[b.cat].bookable && (b.status==="available");
const byCode=code=>code==="CART"?CART:T.booths.find(b=>b.code===code);
const dispCode=b=>b.code==="STORE"||b.code==="MARKET"||b.code==="CART"?L({ar:b.label,en:b.labelEn}):b.code;
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("on");clearTimeout(toast._t);toast._t=setTimeout(()=>el.classList.remove("on"),2200);}

/* ---------- i18n ---------- */
function applyLang(){
  const html=document.documentElement; html.lang=lang; html.dir=lang==="ar"?"rtl":"ltr";
  $$("[data-en]").forEach(el=>{ if(el.dataset.ar===undefined) el.dataset.ar=el.innerHTML; el.innerHTML= lang==="en"?el.dataset.en:el.dataset.ar; });
  $$("[data-en-alt]").forEach(el=>{ if(el.dataset.arAlt===undefined) el.dataset.arAlt=el.alt; el.alt=lang==="en"?el.dataset.enAlt:el.dataset.arAlt; });
  $$("[data-lang-toggle]").forEach(b=>{b.textContent=lang==="ar"?"English":"العربية";b.setAttribute("aria-label",lang==="ar"?"Switch to English":"التبديل إلى العربية");});
  document.title=t("طَلّة 2027 | احجز جناحك في ذا أرينا الرياض — 11–16 يناير","Tallah 2027 | Book your booth at The Arena Riyadh, 11–16 Jan");
  $("#map").setAttribute("aria-label",t("مخطط قاعة تياترو التفاعلي","Interactive Teatro hall floor plan"));
  localStorage.setItem("tallah-lang",lang);
  renderChips(); renderMap(); renderList(); renderPanel(); waDeck();
}
$$("[data-lang-toggle]").forEach(b=>b.addEventListener("click",()=>{lang=lang==="ar"?"en":"ar";applyLang();}));
// mobile menu gets its own language button
(function(){const nav=$("#nav");const b=document.createElement("button");b.type="button";b.className="lang-btn m";b.dataset.langToggle="";b.style.margin="10px 0 0";b.addEventListener("click",()=>{lang=lang==="ar"?"en":"ar";applyLang();});nav.appendChild(b);})();
const menuBtn=$(".menu-btn");
menuBtn.addEventListener("click",()=>{const o=$("#nav").classList.toggle("open");menuBtn.setAttribute("aria-expanded",o);menuBtn.textContent=o?"✕":"☰";});
$$("#nav a").forEach(a=>a.addEventListener("click",()=>{$("#nav").classList.remove("open");menuBtn.setAttribute("aria-expanded","false");menuBtn.textContent="☰";}));

/* ---------- chips ---------- */
const chipOrder=["red","yellow","sponsor","store","market","cart","cafe","station","truck"];
function renderChips(){
  const el=$("#chips"); el.innerHTML="";
  const mk=(key,html,cls)=>{const b=document.createElement("button");b.type="button";b.className="chip "+(cls||"");b.setAttribute("aria-pressed",state.filter===key);b.innerHTML=html;b.onclick=()=>{state.filter=key;renderChips();renderMap();renderList(); if(key==="cart"){select("CART");} else if(key==="store"||key==="market"){select(key.toUpperCase());}};el.appendChild(b);};
  mk("all",t("كل المساحات","ALL SPACES"),"all");
  chipOrder.forEach(k=>{const c=C[k];const n=T.booths.filter(b=>b.cat===k).length;
    const price=c.price?(c.options?t("من ","from ")+SAR(c.price):SAR(c.price)):t("عند الطلب","On request");
    const count=c.qty?(k==="cart"?t("داخل القاعة · الموقع يحدده الفريق","In-hall · spot assigned"):t("وحدات 1×1 م حسب التوفر","1×1 m units, subject to availability")):`${n} ${t(n===1?"وحدة":"وحدات في المخطط",n===1?"unit":"units on plan")}`;
    mk(k,`<div class="t"><span class="dot" style="background:${c.color}"></span>${L(c.name)}</div><div class="p num">${c.size!=="—"?sizeTxt(c)+" · ":""}${price}</div><div class="c">${count}</div>`);
  });
}

/* ---------- map ---------- */
const svg=$("#map");
const aspect=()=>{const r=svg.getBoundingClientRect();return r.width?r.height/r.width:520/1100;};
const maxW=()=>1100;
function homeVB(){const w=maxW();const asp=aspect();
  if(innerWidth<=700){const mw=Math.min(w,470);return{x:630,y:Math.max(0,260-mw*asp/2),w:mw,h:mw*asp};}
  return{x:0,y:(520-w*asp)/2,w,h:w*asp};}
let vb={x:0,y:0,w:1100,h:520};
function setVB(){svg.setAttribute("viewBox",`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);$("#zoomlbl").textContent=Math.round(maxW()/vb.w*100)+"%";}
function el(n,a){const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e;}
function renderMap(){
  svg.innerHTML="";
  const defs=el("defs",{});
  defs.innerHTML=`<pattern id="hHeld" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="rgba(0,0,0,0)"/><rect width="2.5" height="6" fill="rgba(20,10,38,.55)"/></pattern>
  <pattern id="hRes" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.6" height="5" fill="rgba(255,255,255,.18)"/></pattern>
  <linearGradient id="floor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b3a86"/><stop offset="1" stop-color="#3e2567"/></linearGradient>
  <filter id="glow"><feGaussianBlur stdDeviation="6"/></filter>`;
  svg.appendChild(defs);
  // hall floor
  svg.appendChild(el("rect",{x:4,y:4,width:1092,height:512,rx:18,fill:"url(#floor)",stroke:"rgba(212,180,131,.35)","stroke-width":1.2}));
  svg.appendChild(el("rect",{x:385,y:24,width:650,height:476,rx:12,fill:"rgba(255,255,255,.035)",stroke:"rgba(255,255,255,.08)"}));
  // labels
  const lab=(x,y,txt,o={})=>{const e=el("text",Object.assign({x,y,"text-anchor":"middle",fill:"rgba(255,255,255,.75)","font-size":11,"font-weight":600,"font-family":"Jost, IBM Plex Sans Arabic, sans-serif","letter-spacing":lang==="en"?1.5:0},o));e.textContent=txt;svg.appendChild(e);};
  lab(142,88,t("محطات الأطعمة","FOOD STATIONS"));
  lab(92,272,t("فود ترك","FOOD TRUCKS"),{transform:"rotate(-90 92 272)"});
  lab(745,222,t("← المدخل الداخلي","← HALL ENTRY"),{fill:"rgba(212,180,131,.0)"});
  // fixtures
  T.fixtures.forEach(f=>{const g=el("g",{class:"fixture"});g.appendChild(el("rect",{x:f.x,y:f.y,width:f.w,height:f.h,rx:6,fill:f.fill,opacity:.85}));
    const cx=f.x+f.w/2,cy=f.y+f.h/2;const tx=el("text",{x:cx,y:cy+4,"text-anchor":"middle",transform:f.vertical?`rotate(-90 ${cx} ${cy})`:""});tx.textContent=L(f.label);g.appendChild(tx);svg.appendChild(g);});
  // booths
  T.booths.forEach(b=>{
    const c=C[b.cat]; const match=(state.filter==="all"||state.filter===b.cat||(state.filter==="sponsor"&&b.cat==="linked")) && (!state.availOnly||bookable(b));
    const g=el("g",{class:`booth st-${b.status} ${b.cat==="linked"?"linked":""} ${match?"":"dim"} ${state.sel===b.code?"sel":""}`,tabindex:match?0:-1,role:"button","data-code":b.code,
      "aria-label":`${dispCode(b)} · ${L(c.name)} · ${statusTxt(b.status)}`});
    g.appendChild(el("rect",{class:"base",x:b.x,y:b.y,width:b.w,height:b.h,rx:4,fill:c.color,opacity:b.cat==="linked"?.75:1}));
    if(b.status==="held") g.appendChild(el("rect",{x:b.x,y:b.y,width:b.w,height:b.h,rx:4,fill:"url(#hHeld)",stroke:"#f0c24b","stroke-width":1.6}));
    if(b.status==="reserved") g.appendChild(el("rect",{x:b.x,y:b.y,width:b.w,height:b.h,rx:4,fill:"url(#hRes)"}));
    const cx=b.x+b.w/2,cy=b.y+b.h/2;
    const label=b.vertical?L({ar:b.label,en:b.labelEn}).toUpperCase():(b.short||b.code);
    const tx=el("text",{x:cx,y:cy+3.5,"text-anchor":"middle",transform:b.vertical||b.cat==="sponsor"?`rotate(-90 ${cx} ${cy})`:"",style:c.ink&&!["reserved","unavailable"].includes(b.status)?`fill:${c.ink}`:""});
    tx.textContent=b.cat==="sponsor"?t(b.label,"SPONSOR "+b.code.slice(1)):label; if(b.cat==="cafe")tx.setAttribute("font-size","8.5");
    g.appendChild(tx);
    const tip=el("title",{});tip.textContent=`${dispCode(b)} — ${L(c.name)} — ${statusTxt(b.status)}`;g.appendChild(tip);
    g.addEventListener("click",e=>{if(moved)return;select(b.code);});
    g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();select(b.code);}});
    svg.appendChild(g);
  });
  setVB();
}
/* zoom & pan */
function zoom(f,cx,cy){const nw=Math.min(maxW(),Math.max(160,vb.w/f));const r=nw/vb.w;cx=cx??vb.x+vb.w/2;cy=cy??vb.y+vb.h/2;
  vb.x=cx-(cx-vb.x)*r;vb.y=cy-(cy-vb.y)*r;vb.w=nw;vb.h=nw*aspect();clampVB();setVB();}
function clampVB(){vb.x=vb.w>=1100?(1100-vb.w)/2:Math.min(Math.max(vb.x,0),1100-vb.w);vb.y=vb.h>=520?(520-vb.h)/2:Math.min(Math.max(vb.y,0),520-vb.h);}
function pt(e){const r=svg.getBoundingClientRect();return{x:vb.x+(e.clientX-r.left)/r.width*vb.w,y:vb.y+(e.clientY-r.top)/r.height*vb.h};}
$("#zIn").onclick=()=>zoom(1.4);$("#zOut").onclick=()=>zoom(1/1.4);$("#zReset").onclick=()=>{vb=homeVB();setVB();};
$("#zFull").onclick=()=>{const m=$("#mapbox");if(document.fullscreenElement)document.exitFullscreen();else m.requestFullscreen?.();};
svg.addEventListener("wheel",e=>{e.preventDefault();const p=pt(e);zoom(e.deltaY<0?1.15:1/1.15,p.x,p.y);},{passive:false});
const ptrs=new Map();let moved=false,start=null,pinch0=null;
svg.addEventListener("pointerdown",e=>{ptrs.set(e.pointerId,e);moved=false;start={x:e.clientX,y:e.clientY,vb:{...vb}};if(ptrs.size===2){const [a,b]=[...ptrs.values()];pinch0={d:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),w:vb.w};}});
svg.addEventListener("pointermove",e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,e);
  if(ptrs.size===2&&pinch0){const [a,b]=[...ptrs.values()];const d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);const target=pinch0.w*pinch0.d/d;zoom(vb.w/target,...Object.values(pt({clientX:(a.clientX+b.clientX)/2,clientY:(a.clientY+b.clientY)/2})));moved=true;return;}
  const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)+Math.abs(dy)>6&&(vb.w<1099||vb.h<519)){moved=true;svg.classList.add("drag");svg.setPointerCapture(e.pointerId);const r=svg.getBoundingClientRect();vb.x=start.vb.x-dx/r.width*vb.w;vb.y=start.vb.y-dy/r.height*vb.h;clampVB();setVB();}});
const up=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinch0=null;svg.classList.remove("drag");setTimeout(()=>moved=false,0);};
svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",up);
svg.addEventListener("dblclick",e=>{const p=pt(e);zoom(1.6,p.x,p.y);});

/* ---------- list ---------- */
function renderList(){
  const tb=$("#listbody");tb.innerHTML="";
  const rows=[...T.booths,CART].filter(b=>b.cat!=="linked"&&(state.filter==="all"||state.filter===b.cat)&&(!state.availOnly||bookable(b)));
  rows.sort((a,b)=>chipOrder.indexOf(a.cat)-chipOrder.indexOf(b.cat)||a.code.localeCompare(b.code,undefined,{numeric:true}));
  rows.forEach(b=>{const c=C[b.cat];const tr=document.createElement("tr");if(state.sel===b.code)tr.className="sel";tr.tabIndex=0;
    const st=c.onRequest&&b.status==="available"?"request":b.status;
    tr.innerHTML=`<td class="num"><b>${dispCode(b)}</b></td><td><span class="pill" style="border-color:${c.color}55"><i style="background:${c.color}"></i>${L(c.name)}</span></td><td class="num">${sizeTxt(c)}</td><td class="num">${c.price?(c.options?t("من ","from ")+SAR(c.price):SAR(c.price))+(c.qty?" "+L(c.unit):""):t("عند الطلب","On request")}</td><td><span class="pill ${st}"><i></i>${statusTxt(st)}</span></td>`;
    tr.onclick=()=>select(b.code);tr.onkeydown=e=>{if(e.key==="Enter")select(b.code);};tb.appendChild(tr);});
}
$("#vMap").onclick=()=>{state.view="map";$("#booths").classList.remove("list");$("#vMap").setAttribute("aria-pressed","true");$("#vList").setAttribute("aria-pressed","false");};
$("#vList").onclick=()=>{state.view="list";$("#booths").classList.add("list");$("#vList").setAttribute("aria-pressed","true");$("#vMap").setAttribute("aria-pressed","false");};
$("#availOnly").onchange=e=>{state.availOnly=e.target.checked;renderMap();renderList();};

/* ---------- selection & panel ---------- */
const mq=matchMedia("(max-width:1080px)");
function select(code,opts={}){
  const b=byCode(code);if(!b)return;
  if(state.sel!==code){state.opt="a";state.qty=1;}
  state.sel=code;
  const u=new URL(location);u.searchParams.set("booth",code);history.replaceState(null,"",u);
  renderMap();renderList();renderPanel();
  if(mq.matches){$("#panel").classList.add("open");$("#scrim").classList.add("on");}
  // zoom softly towards booth on map if not already zoomed
  if(!b.offMap&&opts.focus){vb=homeVB();vb.x=Math.max(0,b.x+b.w/2-vb.w/2);setVB();zoom(innerWidth<=700?1.3:2.2,b.x+b.w/2,b.y+b.h/2);}
}
function closePanel(){$("#panel").classList.remove("open");$("#scrim").classList.remove("on");}
$("#scrim").onclick=closePanel;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanel();});
function price(b){const c=C[b.cat];if(!c.price)return null;let base=c.options?c.options.find(o=>o.id===state.opt).price:c.price;if(c.qty)base*=state.qty;const vat=Math.round(base*T.vat);return{base,vat,total:base+vat};}
function renderPanel(){
  const p=$("#panel");
  if(!state.sel){p.innerHTML=`<div class="empty"><div class="glyph">✦</div><h3 style="font-size:24px;margin-bottom:6px">${t("اختر مساحة من المخطط","Pick a space on the plan")}</h3><p style="margin:0;font-size:14px">${t("ستظهر هنا التفاصيل والسعر مع الضريبة ونموذج الطلب.","Details, price incl. VAT and the request form appear here.")}</p></div>`;return;}
  const b=byCode(state.sel),c=C[b.cat];const st=c.onRequest&&b.status==="available"?"request":b.status;const pr=price(b);
  const canBook=c.bookable&&b.status==="available";
  let h=`<button class="x" type="button" aria-label="${t("إغلاق","Close")}">✕</button>
  <span class="kicker">${L(c.name)}</span><div class="code num">${dispCode(b)}</div><span class="pill ${st}"><i></i>${statusTxt(st)}</span>
  <p style="color:var(--dim);font-size:14px;margin:12px 0 0">${L(c.blurb)}</p>
  <div class="rows"><div class="rowi"><span>${t("المقاس","SIZE")}</span><span class="num">${sizeTxt(c)}</span></div>${c.unit&&L(c.unit)?`<div class="rowi"><span>${t("الوحدة","UNIT")}</span><span>${L(c.unit)}</span></div>`:""}</div>
  <div class="incl"><b>${t("يشمل","Includes")}</b><ul>${L(c.includes).map(i=>`<li>${i}</li>`).join("")}</ul></div>`;
  if(canBook&&c.options) h+=`<div class="opts" role="radiogroup" aria-label="${t("الخيار","Option")}">${c.options.map(o=>`<label class="opt"><span><input type="radio" name="opt" value="${o.id}" ${state.opt===o.id?"checked":""}> ${L(o.label)}</span><b class="num">${SAR(o.price)}</b></label>`).join("")}</div>`;
  if(canBook&&c.qty) h+=`<div class="qty"><span style="color:var(--dim);font-size:13px">${t("العدد","Quantity")}</span><button type="button" data-q="-1" aria-label="${t("إنقاص","Decrease")}">−</button><output class="num" aria-live="polite">${state.qty}</output><button type="button" data-q="1" aria-label="${t("زيادة","Increase")}">+</button></div>`;
  if(pr) h+=`<div class="price rows"><div class="rowi"><span>${t("السعر قبل الضريبة","BASE PRICE BEFORE VAT")}</span><span class="num">${SAR(pr.base)}</span></div><div class="rowi"><span>${t("ضريبة القيمة المضافة 15%","VAT 15%")}</span><span class="num">${SAR(pr.vat)}</span></div></div><div class="total"><span>${t("الإجمالي مع الضريبة","TOTAL INCL. VAT")}</span><b class="num">${SAR(pr.total)}</b></div>`;
  else if(c.onRequest) h+=`<div class="total"><span>${t("السعر","PRICE")}</span><b style="font-size:22px">${t("يُحدَّد بعد مراجعة الطلب","Set after review")}</b></div>`;
  if(canBook){const f=state.form;
    h+=`<form class="form" novalidate>
      <label>${t("اسم العلامة","Brand name")} *<input name="org" required autocomplete="organization" value="${f.org||""}"><span class="err"></span></label>
      <label>${t("اسمك","Your name")} *<input name="name" required autocomplete="name" value="${f.name||""}"><span class="err"></span></label>
      <label>${t("الجوال","Mobile")} *<input name="tel" required type="tel" inputmode="tel" dir="ltr" placeholder="05xxxxxxxx" autocomplete="tel" value="${f.tel||""}"><span class="err"></span></label>
      <label>${t("النشاط","Activity")}<select name="act">${[["أزياء","Fashion"],["عطور","Perfume"],["قهوة","Coffee"],["مطاعم","Restaurants"],["إكسسوارات","Accessories"],["أخرى","Other"]].map(([a,e])=>`<option value="${a}|${e}" ${f.act===a+"|"+e?"selected":""}>${t(a,e)}</option>`).join("")}</select></label>
      <div class="actions"><button class="btn btn-gold" type="submit">${c.onRequest?t("اطلب التسعير عبر واتساب","Request pricing on WhatsApp"):t("أرسل طلب الحجز عبر واتساب","Send booking request on WhatsApp")}</button>
      <button type="button" class="linkbtn" data-copy>${t("نسخ رابط هذه المساحة","Copy link to this space")}</button></div>
      <p class="fine" style="margin:4px 0 0">${t("يُفتح واتساب برسالة جاهزة فيها رمز المساحة والسعر. يُعتبر الحجز مؤكدًا بعد تأكيد الفريق. التقسيط متاح عبر تمارا.","WhatsApp opens with a ready message including the space code and price. The booking is confirmed once the team confirms it. Tamara installments available.")}</p>
    </form>`;
  } else {
    h+=`<div class="actions" style="margin-top:16px"><a class="btn btn-ghost" target="_blank" rel="noopener" href="${wa(t(`مرحبًا، أستفسر عن المساحة ${dispCode(b)} في طَلّة 2027.`,`Hello, I'm enquiring about space ${dispCode(b)} at Tallah 2027.`))}">${b.status==="linked"?t("استفسر عن الرعاية","Ask about sponsorship"):t("تواصل مع الفريق","Contact the team")}</a>
    ${b.status!=="linked"?`<button type="button" class="btn btn-gold" data-next>${t("اقترح أقرب مساحة متاحة","Suggest the nearest available space")}</button>`:""}</div>`;
  }
  p.innerHTML=h;
  p.querySelector(".x").onclick=closePanel;
  p.querySelectorAll("input[name=opt]").forEach(r=>r.onchange=()=>{state.opt=r.value;renderPanel();});
  p.querySelectorAll("[data-q]").forEach(q=>q.onclick=()=>{state.qty=Math.min(20,Math.max(1,state.qty+ +q.dataset.q));renderPanel();});
  const cp=p.querySelector("[data-copy]");if(cp)cp.onclick=()=>{const u=location.href;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast(t("تم نسخ الرابط","Link copied"))).catch(()=>toast(u));};
  const nx=p.querySelector("[data-next]");if(nx)nx.onclick=()=>{const alt=T.booths.filter(x=>x.cat===b.cat&&x.status==="available").sort((m,n)=>Math.hypot(m.x-b.x,m.y-b.y)-Math.hypot(n.x-b.x,n.y-b.y))[0];if(alt)select(alt.code,{focus:true});else toast(t("لا توجد مساحة متاحة من النوع نفسه","No available space of this type"));};
  const form=p.querySelector("form");
  if(form){form.querySelectorAll("input,select").forEach(i=>i.addEventListener("input",()=>{state.form[i.name]=i.value;}));
    form.onsubmit=e=>{e.preventDefault();let ok=true;
      form.querySelectorAll("input[required]").forEach(i=>{let m="";const v=i.value.trim();
        if(!v)m=t("مطلوب","Required");else if(i.name==="tel"&&!/^(\+?966|0)?5\d{8}$/.test(v.replace(/[\s-]/g,"")))m=t("أدخل رقم جوال سعودي صحيح، مثل 05xxxxxxxx","Enter a valid Saudi mobile, e.g. 05xxxxxxxx");
        i.setAttribute("aria-invalid",!!m);i.nextElementSibling.textContent=m;if(m&&ok){ok=false;i.focus();}});
      if(!ok)return;
      const f=Object.fromEntries(new FormData(form));const [actAr,actEn]=f.act.split("|");
      const lines=[t("مرحبًا فريق طَلّة، أرغب في حجز مساحة في طَلّة 2027:","Hello Tallah team, I'd like to book a space at Tallah 2027:"),
        `${t("المساحة","Space")}: ${dispCode(b)} — ${L(c.name)} (${sizeTxt(c)})`];
      if(c.options)lines.push(`${t("الخيار","Option")}: ${L(c.options.find(o=>o.id===state.opt).label)}`);
      if(c.qty)lines.push(`${t("العدد","Quantity")}: ${state.qty}`);
      if(pr)lines.push(`${t("السعر قبل الضريبة","Price before VAT")}: ${SAR(pr.base)} | ${t("الإجمالي مع الضريبة","Total incl. VAT")}: ${SAR(pr.total)}`);
      else lines.push(t("السعر: أرجو تزويدي بالتسعير","Price: please send me a quote"));
      lines.push(`${t("العلامة","Brand")}: ${f.org}`,`${t("الاسم","Name")}: ${f.name}`,`${t("الجوال","Mobile")}: ${f.tel}`,`${t("النشاط","Activity")}: ${t(actAr,actEn)}`,`${t("الرابط","Link")}: ${location.href}`);
      const url=wa(lines.join("\n"));window.__lastWA=url;window.open(url,"_blank","noopener");toast(t("جارٍ فتح واتساب…","Opening WhatsApp…"));};
  }
}
function wa(text){return `https://wa.me/${T.phone}?text=${encodeURIComponent(text)}`;}
function waDeck(){const a=$("#waDeck");if(a)a.href=wa(t("مرحبًا، أرغب في استلام ملف الرعاية لطَلّة 2027.","Hello, I'd like to receive the Tallah 2027 sponsorship deck."));}
$$("[data-select]").forEach(a=>a.addEventListener("click",()=>{state.filter="sponsor";renderChips();setTimeout(()=>select(a.dataset.select,{focus:true}),350);}));

/* ---------- init ---------- */
applyLang();
vb=homeVB();setVB();
addEventListener("resize",()=>{const c=homeVB();if(Math.abs(vb.h/vb.w-c.h/c.w)>.01){vb=c;setVB();}});
const deep=params.get("booth");
if(deep&&byCode(deep.toUpperCase())){select(deep.toUpperCase(),{focus:true});if(!mq.matches)setTimeout(()=>$("#booths").scrollIntoView(),50);}
})();
