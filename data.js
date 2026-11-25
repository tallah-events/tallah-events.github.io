/* ============================================================
   طَلّة 2027 — بيانات المخطط
   المصدر: eventa.grok.me (صفحة /spaces + صورة المخطط /media/plan-map.jpg)
   كل الأسعار غير شاملة ضريبة القيمة المضافة 15٪.
   ⚠️ PLACEHOLDER: حالة التوفر (status) غير منشورة في eventa.grok.me.
   كل الوحدات تبدأ "available" (= متاح للطلب، يؤكده الفريق).
   لتحديثها: عبّئ STATUS_OVERRIDES أدناه، مثل { "B7": "reserved", "A12": "held" }
   القيم المسموحة: available | held | reserved | unavailable
   ============================================================ */
window.TALLAH = {
  phone: "966541102224",
  vat: 0.15,
  STATUS_OVERRIDES: {},
  categories: {
    red: { color:"#c8283c", size:"3×3", price:15000, bookable:true,
      name:{ar:"المنطقة الحمراء",en:"Red Zone"}, unit:{ar:"للمساحة",en:"per space"},
      blurb:{ar:"المنطقة الحمراء مع البوث القياسي.",en:"Red zone with the standard booth."},
      includes:{ar:["مساحة 3×3 م + بوث قياسي أبيض","4 دعوات لكبار الشخصيات","10 دعوات مميزة","3 تصاريح دخول لفريق تشغيل البوث","خدمة صف سيارة واحدة","تغطية خاصة للبوث على حساب طَلّة في منصات التواصل"],
                en:["3×3 m space + standard white booth","4 VIP invitations","10 premium invitations","3 entry permits for the booth team","Valet parking for one car","Dedicated booth coverage on Tallah's social channels"]}},
    yellow: { color:"#e7b52c", ink:"#2b1d00", size:"3×3", price:9000, bookable:true,
      name:{ar:"المنطقة الصفراء",en:"Yellow Zone"}, unit:{ar:"للمساحة",en:"per space"},
      blurb:{ar:"خياران: المساحة فقط، أو المساحة مع بوث قياسي أبيض.",en:"Two options: space only, or space with a standard white booth."},
      options:[{id:"a",price:9000,label:{ar:"الخيار أ — المساحة فقط",en:"Option A — space only"}},
               {id:"b",price:11400,label:{ar:"الخيار ب — 3×3 م + بوث قياسي أبيض",en:"Option B — 3×3 m + standard white booth"}}],
      includes:{ar:["مساحة 3×3 م ضمن المنطقة الصفراء","الخيار ب يشمل بوثًا قياسيًا أبيض (ارتفاع 2.4 م)"],en:["3×3 m space in the Yellow zone","Option B adds a standard white booth (2.4 m high)"]}},
    sponsor: { color:"#2f8a4a", size:"3×6", price:15300, bookable:true,
      name:{ar:"الرعاية",en:"Sponsorship"}, unit:{ar:"للمساحة",en:"per space"},
      blurb:{ar:"مساحة 3×6 م مع حضور الشعار على البوابة والمدخل وكل إعلانات الحملة.",en:"A 3×6 m space with your logo on the gate, entrance and every campaign ad."},
      includes:{ar:["مساحة 3×6 م","شعار الراعي في إعلانات طَلّة على منصات التواصل","شعار الراعي على المدخل الرئيسي والبوابة","شعار الراعي على البانرات الداخلية والخارجية","ظهور الشعار في تغطيات الفعالية","تغطية خاصة من كليك ميديا هاوس"],
                en:["3×6 m space","Logo on all Tallah social-media ads","Logo on the main entrance and gate","Logo on indoor and outdoor banners","Logo featured in event coverage","Dedicated coverage by Click Media House"]}},
    linked: { color:"#5b6b52", size:"3×3", price:null, bookable:false,
      name:{ar:"ضمن نطاق الرعاية",en:"Sponsorship block"}, unit:{ar:"",en:""},
      blurb:{ar:"هذه المربعات مدرجة ضمن نطاق الرعاية في eventa.grok.me، ويحدد فريق طَلّة تخصيصها.",en:"Listed under the sponsorship blocks on eventa.grok.me; allocation is set by the Tallah team."},
      includes:{ar:["التخصيص بالتنسيق مع فريق الفعالية"],en:["Allocated with the event team"]}},
    store: { color:"#8a2bd0", size:"1×1", price:3000, bookable:true, qty:true,
      name:{ar:"متجر طَلّة",en:"Tallah Store"}, unit:{ar:"لكل 1×1 م",en:"per 1×1 m"},
      blurb:{ar:"علاقات وأرفف جاهزة للعلامات.",en:"Ready hangers and shelves for brands."},
      includes:{ar:["مساحة 1×1 م","ضمن متجر طَلّة: علاقات وأرفف"],en:["1×1 m unit","Inside Tallah Store: hangers and shelves"]}},
    market: { color:"#6a24a8", size:"1×1", price:1200, bookable:true, qty:true,
      name:{ar:"سوق طَلّة",en:"Tallah Market"}, unit:{ar:"لكل 1×1 م",en:"per 1×1 m"},
      blurb:{ar:"ركن الأسر المنتجة.",en:"The productive-families corner."},
      includes:{ar:["مساحة 1×1 م","ضمن سوق طَلّة: أسر منتجة"],en:["1×1 m unit","Inside Tallah Market: productive families"]}},
    cafe: { color:"#1fb3d1", ink:"#03222b", size:"—", price:null, bookable:true, onRequest:true,
      name:{ar:"المقاهي",en:"Cafés"}, unit:{ar:"عند الطلب",en:"on request"},
      blurb:{ar:"صفّا المقاهي في المخطط. التخصيص عبر فريق الفعالية.",en:"The two café rows on the plan. Allocated by the event team."},
      includes:{ar:["التخصيص والتسعير عبر فريق الفعالية"],en:["Allocation and pricing via the event team"]}},
    station: { color:"#f07c1e", size:"2×2", price:null, bookable:true, onRequest:true,
      name:{ar:"محطات الأطعمة",en:"Food Stations"}, unit:{ar:"لكل محطة",en:"per station"},
      blurb:{ar:"خارج القاعة، 2×2 م، والطبخ مسموح.",en:"Outside the hall, 2×2 m, cooking allowed."},
      includes:{ar:["المقاس 2×2 م","خارج القاعة","يُسمح بالطبخ"],en:["2×2 m","Outside the hall","Cooking allowed"]}},
    truck: { color:"#e2343a", size:"3×2", price:null, bookable:true, onRequest:true,
      name:{ar:"فود ترك",en:"Food Trucks"}, unit:{ar:"لكل عربة",en:"per truck"},
      blurb:{ar:"خارج القاعة، 3×2 م، والطبخ مسموح.",en:"Outside the hall, 3×2 m, cooking allowed."},
      includes:{ar:["المقاس 3×2 م","خارج القاعة","يُسمح بالطبخ"],en:["3×2 m","Outside the hall","Cooking allowed"]}},
    cart: { color:"#25b9d8", size:"2×1.5", price:6000, bookable:true, qty:true, offMap:true,
      name:{ar:"عربات الأطعمة والمشروبات",en:"F&B Carts"}, unit:{ar:"لكل عربة",en:"per cart"},
      blurb:{ar:"داخل القاعة، والسعر للمساحة فقط، ويحدد الفريق موقع العربة.",en:"Inside the hall. Price covers the space only; the team assigns the spot."},
      includes:{ar:["السعر يشمل المساحة فقط","3 م لكل عربة حسب لوحة الأسعار","نموذج العربة: 2×1.5 م","يُمنع الطبخ"],en:["Price covers the space only","3 m per cart per the price board","Cart model: 2×1.5 m","No cooking"]}}
  }
};
/* ---------- تخطيط المخطط ----------
   مطابق لصورة المخطط الرسمي media/floorplan.jpg (إحداثيات بنظام 1024×484 = مقاس الصورة المصغّر).
   ---------------------------------------------------------------------------------- */
window.TALLAH.W=1024; window.TALLAH.H=484;
// حالات مقروءة من المخطط الرسمي (تفسير بصري — راجع NOTES.md):
// B17 عليه شعار علامة = محجوز ، A6 و B1 بإطار برتقالي متقطع = محجوز مؤقتًا
Object.assign(window.TALLAH.STATUS_OVERRIDES,{B17:"reserved",A6:"held",B1:"held"});
(function(){
  const B=[]; const add=(code,cat,x,y,w,h,extra)=>B.push(Object.assign({code,cat,x,y,w,h},extra||{}));
  const row=(pfx,from,to,cat,xs,y,w,h)=>{for(let i=from,k=0;i<=to;i++,k++) add(pfx+i,cat,xs[k],y,w,h);};
  const L4=[435.5,471.5,507.5,543.5], L8=[614,650,686,722,757.5,793.5,829.5,865.5];
  const blocks=[["S1","A",[1,4],[13,16],"linked",[5,12],[17,24],"yellow",94],
                ["S2","B",[1,4],[13,16],"linked",[5,12],[17,24],"red",192],
                ["S3","A",[32,35],[44,47],"linked",[36,43],[48,55],"yellow",291]];
  blocks.forEach(([s,p,a1,a2,lc,b1,b2,bc,y],i)=>{
    add(s,"sponsor",398,y,36,66,{label:"رعاية "+(i+1),labelEn:"S"+(i+1)});
    row(p,a1[0],a1[1],lc,L4,y,35,32.5); row(p,a2[0],a2[1],lc,L4,y+33.5,35,32.5);
    row(p,b1[0],b1[1],bc,L8,y,34.5,32.5); row(p,b2[0],b2[1],bc,L8,y+33.5,34.5,32.5);
  });
  // الصف العلوي والسفلي من الأصفر
  row("A",25,28,"yellow",[637,672,706.5,741],24,33.5,34);
  row("A",29,31,"yellow",[845,880,914.5],24,34,34);
  row("A",56,59,"yellow",[633.5,669,705,741],391,34.5,34);
  row("A",60,62,"yellow",[840,876.5,913],391,35,34);
  // المقاهي
  const CX=[377,408.5,440,471.5,503];
  for(let i=1;i<=5;i++) add("CAFE"+i,"cafe",CX[i-1],24,30,33,{label:"مقهى "+i,labelEn:"Café "+i,short:"C"+i});
  for(let i=6;i<=10;i++) add("CAFE"+i,"cafe",CX[i-6],391,30,33,{label:"مقهى "+i,labelEn:"Café "+i,short:"C"+i});
  // محطات الأطعمة 1–9
  [76,103.5,131,158.5,186,213.5].forEach((x,k)=>add("FS"+(k+1),"station",x,24,25,23,{label:"محطة "+(k+1),labelEn:"Station "+(k+1),short:String(k+1)}));
  [46,70.5,95].forEach((y,k)=>add("FS"+(k+7),"station",238,y,27,22.5,{label:"محطة "+(k+7),labelEn:"Station "+(k+7),short:String(k+7)}));
  // فود ترك 1–7
  [59,117,175,233,291,349].forEach((y,k)=>add("FT"+(k+1),"truck",56,y,33,51,{label:"فود ترك "+(k+1),labelEn:"Truck "+(k+1),short:String(k+1)}));
  add("FT7","truck",234,352,31,50,{label:"فود ترك 7",labelEn:"Truck 7",short:"7"});
  // متجر وسوق طَلّة
  add("STORE","store",924,97,43,140,{label:"متجر طَلّة",labelEn:"Tallah Store",vertical:true});
  add("MARKET","market",924,257,43,123,{label:"سوق طَلّة",labelEn:"Tallah Market",vertical:true});
  window.TALLAH.booths=B;
  window.TALLAH.fixtures=[
    {x:146,y:121,w:67,h:213,fill:"#8f86a8",op:.55,label:{ar:"درج",en:"Stairs"},vertical:true,small:true},
    {x:213,y:123,w:57,h:209,fill:"#1f7a3c",label:{ar:"صالة أوريا لكبار الشخصيات · الدور 2",en:"Auria VIP Lounge · 2nd floor"},vertical:true},
    {x:270,y:150,w:43,h:155,fill:"#8f86a8",op:.55,label:{ar:"",en:""}},
    {x:314,y:175,w:46,h:100,fill:"#1f7a3c",label:{ar:"كليك للسياحة",en:"Click Travel"},vertical:true},
    {x:280,y:22,w:40,h:103,fill:"#1f7a3c",label:{ar:"RIA · WYN · شركاء",en:"RIA · WYN · Partners"},vertical:true,small:true},
    {x:280,y:316,w:40,h:109,fill:"#1f7a3c",label:{ar:"CLICK · جاهز · ماي تيبل",en:"CLICK · Jahez · MyTable"},vertical:true,small:true},
    {x:113,y:366,w:105,h:79,fill:"#6b6680",label:{ar:"▲ المدخل",en:"▲ ENTRANCE"}}
  ];
  window.TALLAH.marks=[{x:316,y:162,ar:"← مخرج",en:"← EXIT"},{x:316,y:300,ar:"← مدخل",en:"← ENTRANCE"}];
})();
