/* Villa Klemantin — Dil desteği (TR/EN)
   Bu dosya hem ana sayfa (index.html) hem de rezervasyon sayfası tarafından kullanılır.
   - Metinler HTML içinde Türkçe yazılır (varsayılan). İngilizce karşılıkları aşağıdaki EN sözlüğündedir.
   - Çevrilecek öğelere data-i18n / data-i18n-ph / data-i18n-aria etiketleri eklenir.
   - Takvim metinleri CAL_L10N içinde tutulur; calendar.js bunu kullanır.
   Yeni metin eklerken: HTML'e data-i18n="anahtar" koyun, İngilizcesini EN sözlüğüne ekleyin. */
(function(){
  'use strict';

  // İngilizce karşılıklar (anahtar -> innerHTML / attribute değeri)
  var EN = {
    // Menü
    nav_villa:'Villa', nav_gallery:'Gallery', nav_booking:'Booking',
    nav_calendar:'Calendar', nav_location:'Location', nav_contact:'Contact',
    // Hero
    hero_sub:'A peaceful escape with a private pool, set among olive trees, mountains and Lake Köyceğiz.',
    stat_bedrooms:'Bedrooms', stat_guests:'Guests',
    stat_pool_v:'Private', stat_pool:'Swimming pool',
    stat_wf_v:'10 min', stat_wf:'To the waterfall',
    scroll_cue:'Explore<span></span>',
    // Villa
    villa_eyebrow:'The Villa',
    villa_h2:'A stillness <em>all your own</em>, in the heart of nature.',
    villa_p1:'Villa Klemantin is a newly built, modern holiday villa in Köyceğiz, set among century-old olive groves. With a private swimming pool, a spacious garden and mountain views in every direction, it offers a getaway that is entirely your own, far from the crowds.',
    villa_p2:'Wake to birdsong, spend the day by the pool and enjoy a barbecue in the garden in the evening. The centre of Köyceğiz and the famous Toparlar Waterfall are just minutes away, while the sea, the lake and ancient cities are all a short drive away.',
    villa_cap:'Private pool &amp; garden',
    // Olanaklar
    feat_eyebrow:'Amenities',
    feat_h2:'Everything you need for a comfortable stay.',
    f1_h:'Private swimming pool', f1_p:'A large, sunny pool and sun terrace, for your use only.',
    f2_h:'Mountain &amp; nature views', f2_p:'Olive groves and mountain silhouettes from every room and the garden.',
    f3_h:'3+1 · 5–6 guests', f3_p:'Three bedrooms and a spacious living room — ideal for families and small groups.',
    f4_h:'Fully equipped kitchen', f4_p:'Fridge, dishwasher, washing machine, built-in oven, hob and all the equipment you need.',
    f5_h:'Air conditioning &amp; comfort', f5_p:'Air conditioning in every room — a cool home on hot summer days.',
    f6_h:'Free WiFi', f6_p:'A fast internet connection you can work remotely on.',
    f7_h:'Garden &amp; barbecue', f7_p:'A large lawned garden, barbecue and outdoor seating area.',
    f8_h:'Private parking', f8_p:'Safe, free on-site parking within the villa grounds.',
    // Galeri
    gal_eyebrow:'Gallery', gal_h2:'A glimpse of Villa Klemantin', gal_hint:'Tap a photo to enlarge',
    // Rezervasyon
    avail_eyebrow:'Booking', avail_h2:'Villa <em>calendar</em>',
    avail_sub:'Select your check-in and check-out dates on the calendar, then fill in the form and send it to us.',
    bk_h3:'Booking request',
    bk_dates_l:'Dates', bk_dates_ph:'Select on the calendar',
    bk_name_l:'Full name', bk_name_ph:'Your full name',
    bk_phone_l:'Phone',
    bk_email_l:'Email <span class="opt">(optional)</span>', bk_email_ph:'example@email.com',
    bk_send_wa:'Send via WhatsApp', bk_send_gmail:'Send via Gmail',
    bk_note:'Your request opens ready to send as a WhatsApp message or a Gmail window, so you can review it before sending. Your booking is confirmed once we approve it.',
    // Konum
    loc_eyebrow:'Location',
    loc_h2:'Close to everything, <em>away from it all.</em>',
    loc_lead:"In the calm nature of Köyceğiz, yet a short distance from all the region's highlights. Beaches, bays, the lake, the waterfall and ancient cities are each just a trip away.",
    d1_p:'Toparlar Waterfall<small>Cool stream &amp; nature walks</small>', d1_t:'10 min',
    d2_p:'Köyceğiz centre &amp; lake<small>Shops, restaurants, boat &amp; canoe tours</small>', d2_t:'7 min',
    d3_p:'Köyceğiz bus station<small>Intercity bus arrivals</small>', d3_t:'7 min',
    d4_p:'Yuvarlakçay<small>Ice-cold spring water, breakfast &amp; trout</small>', d4_t:'25 min',
    d5_p:'Sultaniye Hot Springs<small>Healing thermal &amp; mud baths</small>', d5_t:'35 min',
    d6_p:'Dalyan &amp; Kaunos<small>Rock tombs, mud baths</small>', d6_t:'35 min',
    d7_p:'Sarıgerme Beach<small>Blue-flag sandy beach, great for families</small>', d7_t:'40 min',
    d8_p:'Akyaka &amp; Gökova<small>Azmak River, windsurfing, seaside cafés</small>', d8_t:'40 min',
    d9_p:'Dalaman River Rafting<small>Akköprü course, April–October</small>', d9_t:'45 min',
    d10_p:'Ekincik Bay<small>Quiet bay, boat tours &amp; diving</small>', d10_t:'45 min',
    d11_p:'İztuzu Beach<small>Loggerhead turtle beach</small>', d11_t:'50 min',
    d12_p:'Sarsala Bay (Göcek)<small>Pine-forested bay, reached by boat tours</small>', d12_t:'1 hr',
    d13_p:'Dalaman Airport<small>DLM · ~35 km</small>', d13_t:'40 min',
    map_link:'Open in Google Maps',
    // İletişim
    ct_h2:'Spend your holiday <em>at Klemantin</em>',
    ct_p:"Get in touch for availability, prices and bookings. We're happy to answer any questions.",
    ct_wa:'Message on WhatsApp',
    // Footer
    foot_note:'© <span id="yr"></span> Villa Klemantin · Private showcase page',
    // aria-label
    aria_menu:'Menu', aria_prevmonth:'Previous month', aria_nextmonth:'Next month',
    aria_prevphoto:'Previous photo', aria_nextphoto:'Next photo',
    aria_close:'Close', aria_prev:'Previous', aria_next:'Next', aria_lightbox:'Photo viewer'
  };

  // Takvim / form yerelleştirmesi (calendar.js kullanır)
  window.CAL_L10N = {
    tr:{
      months:['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
      week:['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'],
      free:'Müsait', booked:'Dolu', today:'Bugün',
      selectCheckout:'çıkış tarihini seçin',
      nights:function(n){return ' ('+n+' gece)';},
      rangeHasBooked:'Seçtiğiniz aralıkta dolu gün var. Lütfen farklı bir tarih seçin.',
      needDates:'Lütfen takvimden giriş ve çıkış tarihini seçin.',
      needName:'Lütfen adınızı yazın.',
      needPhone:'Lütfen telefon numaranızı yazın.',
      popupBlocked:function(a){return 'Pencere engellendi. '+a+' adresine doğrudan yazabilirsiniz.';},
      mailSubject:'Villa Klemantin — Rezervasyon talebi',
      waGreeting:'Merhaba, Villa Klemantin için rezervasyon talebim:',
      lblName:'Ad Soyad', lblPhone:'Telefon', lblEmail:'E-posta', lblDates:'Tarihler'
    },
    en:{
      months:['January','February','March','April','May','June','July','August','September','October','November','December'],
      week:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      free:'Available', booked:'Booked', today:'Today',
      selectCheckout:'select check-out date',
      nights:function(n){return ' ('+n+(n===1?' night':' nights')+')';},
      rangeHasBooked:'There are booked days in your selected range. Please choose different dates.',
      needDates:'Please select check-in and check-out dates on the calendar.',
      needName:'Please enter your name.',
      needPhone:'Please enter your phone number.',
      popupBlocked:function(a){return 'Pop-up blocked. You can email us directly at '+a+'.';},
      mailSubject:'Villa Klemantin — Booking request',
      waGreeting:'Hello, I would like to request a booking for Villa Klemantin:',
      lblName:'Full name', lblPhone:'Phone', lblEmail:'Email', lblDates:'Dates'
    }
  };

  function getLang(){
    var l = null;
    try{ l = localStorage.getItem('vk_lang'); }catch(e){}
    return (l==='en'||l==='tr') ? l : 'tr';
  }
  window.getLang = getLang;

  function apply(lang){
    document.documentElement.lang = lang;
    // innerHTML
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      if(el.getAttribute('data-tr')===null) el.setAttribute('data-tr', el.innerHTML);
      var en = EN[el.getAttribute('data-i18n')];
      el.innerHTML = (lang==='en' && en!==undefined) ? en : el.getAttribute('data-tr');
    });
    // placeholder
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      if(el.getAttribute('data-tr-ph')===null) el.setAttribute('data-tr-ph', el.getAttribute('placeholder')||'');
      var en = EN[el.getAttribute('data-i18n-ph')];
      el.setAttribute('placeholder', (lang==='en' && en!==undefined) ? en : el.getAttribute('data-tr-ph'));
    });
    // aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
      if(el.getAttribute('data-tr-aria')===null) el.setAttribute('data-tr-aria', el.getAttribute('aria-label')||'');
      var en = EN[el.getAttribute('data-i18n-aria')];
      el.setAttribute('aria-label', (lang==='en' && en!==undefined) ? en : el.getAttribute('data-tr-aria'));
    });
    // dil düğmesi etiketi (tıklayınca geçilecek dili gösterir)
    document.querySelectorAll('.lang-btn').forEach(function(b){ b.textContent = (lang==='tr') ? 'EN' : 'TR'; });
    // yıl (footer) — innerHTML değişiminde yeniden yazılır
    var yr = document.getElementById('yr'); if(yr) yr.textContent = new Date().getFullYear();
  }

  window.setLang = function(lang){
    try{ localStorage.setItem('vk_lang', lang); }catch(e){}
    apply(lang);
    window.dispatchEvent(new CustomEvent('vk:langchange',{detail:{lang:lang}}));
  };

  document.addEventListener('DOMContentLoaded', function(){
    apply(getLang());
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.addEventListener('click', function(){ window.setLang(getLang()==='tr' ? 'en' : 'tr'); });
    });
    // takvimlerin kayıtlı dili almasını sağla
    window.dispatchEvent(new CustomEvent('vk:langchange',{detail:{lang:getLang()}}));
  });
})();
