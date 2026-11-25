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
/* ---------- تخطيط المخطط (مأخوذ من صورة المخطط في eventa.grok.me، إحداثيات تقريبية وليست بمقياس) ---------- */
(function(){
  const B=[]; const add=(code,cat,x,y,w,h,extra)=>B.push(Object.assign({code,cat,x,y,w,h},extra||{}));
  const row=(pfx,from,to,cat,x,y,w,h,gap=1.5)=>{for(let i=from,k=0;i<=to;i++,k++) add(pfx+i,cat,x+k*(w+gap),y,w,h);};
  // كتلة 1: رعاية 1 + A1–A4 / A13–A16 (ضمن نطاق الرعاية) ثم A5–A12 / A17–A24
  add("S1","sponsor",415,122,40,76,{label:"رعاية 1",labelEn:"S1"});
  row("A",1,4,"linked",458,122,39,37); row("A",13,16,"linked",458,160,39,37);
  row("A",5,12,"yellow",660,122,39,37); row("A",17,24,"yellow",660,160,39,37);
  // كتلة 2: رعاية 2 + B1–B4 / B13–B16 ثم B5–B12 / B17–B24
  add("S2","sponsor",415,234,40,76,{label:"رعاية 2",labelEn:"S2"});
  row("B",1,4,"linked",458,234,39,37); row("B",13,16,"linked",458,272,39,37);
  row("B",5,12,"red",660,234,39,37); row("B",17,24,"red",660,272,39,37);
  // كتلة 3: رعاية 3 + A32–A35 / A44–A47 ثم A36–A43 / A48–A55
  add("S3","sponsor",415,346,40,76,{label:"رعاية 3",labelEn:"S3"});
  row("A",32,35,"linked",458,346,39,37); row("A",44,47,"linked",458,384,39,37);
  row("A",36,43,"yellow",660,346,39,37); row("A",48,55,"yellow",660,384,39,37);
  // الصف العلوي والسفلي من الأصفر
  row("A",25,28,"yellow",685,40,39,37); row("A",29,31,"yellow",915,40,39,37);
  row("A",56,59,"yellow",685,458,39,37); row("A",60,62,"yellow",915,458,39,37);
  // المقاهي
  for(let i=1;i<=5;i++) add("CAFE"+i,"cafe",392+(i-1)*35,42,33,34,{label:"مقهى "+i,labelEn:"Café "+i,short:"C"+i});
  for(let i=6;i<=10;i++) add("CAFE"+i,"cafe",392+(i-6)*35,460,33,34,{label:"مقهى "+i,labelEn:"Café "+i,short:"C"+i});
  // محطات الأطعمة 1–9
  for(let i=1;i<=6;i++) add("FS"+i,"station",50+(i-1)*31,42,29,27,{label:"محطة "+i,labelEn:"Station "+i,short:String(i)});
  for(let i=7;i<=9;i++) add("FS"+i,"station",237,72+(i-7)*29,28,27,{label:"محطة "+i,labelEn:"Station "+i,short:String(i)});
  // فود ترك 1–7
  for(let i=1;i<=6;i++) add("FT"+i,"truck",28,84+(i-1)*65,38,56,{label:"فود ترك "+i,labelEn:"Truck "+i,short:String(i)});
  add("FT7","truck",232,414,34,56,{label:"فود ترك 7",labelEn:"Truck 7",short:"7"});
  // متجر وسوق طَلّة
  add("STORE","store",1048,122,40,116,{label:"متجر طَلّة",labelEn:"Store",vertical:true});
  add("MARKET","market",1048,300,40,140,{label:"سوق طَلّة",labelEn:"Market",vertical:true});
  window.TALLAH.booths=B;
  // عناصر ثابتة غير قابلة للحجز
  window.TALLAH.fixtures=[
    {x:205,y:155,w:66,h:236,fill:"#1f6b3b",label:{ar:"صالة أوريا لكبار الشخصيات",en:"Auria VIP Lounge"},vertical:true},
    {x:280,y:40,w:46,h:110,fill:"#1f6b3b",label:{ar:"شركاء",en:"Partners"},vertical:true},
    {x:280,y:376,w:46,h:116,fill:"#1f6b3b",label:{ar:"شركاء",en:"Partners"},vertical:true},
    {x:318,y:214,w:54,h:116,fill:"#1f6b3b",label:{ar:"كليك للسياحة",en:"Click Travel"},vertical:true},
    {x:92,y:430,w:120,h:70,fill:"#3a2a52",label:{ar:"المدخل",en:"Entrance"}}
  ];
})();
