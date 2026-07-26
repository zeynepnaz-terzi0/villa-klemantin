/* Villa Klemantin — Rezervasyon takvimi + form (TR/EN)
   Hem ana sayfada hem rezervasyon sayfasında kullanılır.
   Dolu tarihler booked.js'ten (BOOKED), metinler i18n.js'ten (CAL_L10N) gelir.
   Dil değişince 'vk:langchange' olayıyla yeniden çizilir. */
(function(){
  'use strict';
  var grid=document.getElementById('calGrid');
  if(!grid || typeof BOOKED==='undefined') return;

  var titleEl=document.getElementById('calTitle');
  var prevBtn=document.getElementById('calPrev');
  var nextBtn=document.getElementById('calNext');
  var weekEl=document.getElementById('calWeek');
  var legendEl=document.getElementById('calLegend');
  var datesEl=document.getElementById('bkDates');
  var msgEl=document.getElementById('bkMsg');

  function curLang(){ return (window.getLang ? window.getLang() : 'tr'); }
  var L = window.CAL_L10N[curLang()];

  var pad=function(n){return String(n).padStart(2,'0');};
  var key=function(y,m,d){return y+'-'+pad(m+1)+'-'+pad(d);};

  var bookedSet=new Set();
  BOOKED.forEach(function(r){
    var s=new Date(r.start+'T00:00:00'), e=new Date((r.end||r.start)+'T00:00:00');
    for(var d=new Date(s); d<=e; d.setDate(d.getDate()+1)){
      bookedSet.add(key(d.getFullYear(),d.getMonth(),d.getDate()));
    }
  });

  var today=new Date(); today.setHours(0,0,0,0);
  var curY=today.getFullYear(), curM=today.getMonth();
  var view=new Date(curY,curM,1);
  var selStart=null, selEnd=null;

  var fmt=function(d){return d.getDate()+' '+L.months[d.getMonth()]+' '+d.getFullYear();};

  var hasBookedBetween=function(a,b){
    for(var d=new Date(a); d<=b; d.setDate(d.getDate()+1)){
      if(bookedSet.has(key(d.getFullYear(),d.getMonth(),d.getDate())))return true;
    }
    return false;
  };

  function pick(dt){
    msgEl.textContent='';
    if(!selStart||selEnd){selStart=dt;selEnd=null;}
    else if(dt.getTime()===selStart.getTime()){selStart=null;selEnd=null;}
    else if(dt<selStart){selStart=dt;}
    else if(hasBookedBetween(selStart,dt)){
      msgEl.textContent=L.rangeHasBooked;
      selStart=dt;selEnd=null;
    }
    else{selEnd=dt;}
    render();updateDates();
  }

  function updateDates(){
    if(selStart&&selEnd){
      var nights=Math.round((selEnd-selStart)/86400000);
      datesEl.value=fmt(selStart)+' → '+fmt(selEnd)+(nights?L.nights(nights):'');
    } else if(selStart){
      datesEl.value=fmt(selStart)+' → '+L.selectCheckout;
    } else {
      datesEl.value='';
    }
  }

  function render(){
    var y=view.getFullYear(), m=view.getMonth();
    titleEl.textContent=L.months[m]+' '+y;
    grid.innerHTML='';
    var off=(new Date(y,m,1).getDay()+6)%7;
    var days=new Date(y,m+1,0).getDate();
    for(var i=0;i<off;i++){var c=document.createElement('div');c.className='cal-day empty';grid.appendChild(c);}
    for(var d=1;d<=days;d++){
      var cell=document.createElement('div');
      cell.className='cal-day';cell.textContent=d;
      var dt=new Date(y,m,d);
      if(dt<today){cell.classList.add('past');}
      else if(bookedSet.has(key(y,m,d))){cell.classList.add('booked');cell.title=L.booked;}
      else{
        cell.classList.add('free');cell.title=L.free;
        (function(dt){cell.addEventListener('click',function(){pick(dt);});})(dt);
        if(selStart&&selEnd&&dt>selStart&&dt<selEnd)cell.classList.add('inrange');
        if((selStart&&dt.getTime()===selStart.getTime())||(selEnd&&dt.getTime()===selEnd.getTime()))cell.classList.add('sel');
      }
      if(y===curY&&m===curM&&d===today.getDate())cell.classList.add('today');
      grid.appendChild(cell);
    }
    prevBtn.disabled=(y===curY&&m===curM);
  }

  var bkForm=document.getElementById('bkForm');
  var MAIL='villaklemantin0@gmail.com';
  var setMsg=function(t,ok){msgEl.textContent=t;msgEl.classList.toggle('ok',!!ok);};
  var send=function(mail){
    var name=document.getElementById('bkName').value.trim();
    var phone=document.getElementById('bkPhone').value.trim();
    var email=document.getElementById('bkEmail').value.trim();
    if(!selStart||!selEnd){setMsg(L.needDates);return;}
    if(!name){setMsg(L.needName);return;}
    if(!phone){setMsg(L.needPhone);return;}
    setMsg('');
    var lines=L.lblName+': '+name+'\n'+L.lblPhone+': '+phone+(email?'\n'+L.lblEmail+': '+email:'')+'\n'+L.lblDates+': '+datesEl.value;
    if(mail){
      var w=window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(MAIL)+'&su='+encodeURIComponent(L.mailSubject)+'&body='+encodeURIComponent(lines),'_blank','noopener');
      if(!w)setMsg(L.popupBlocked(MAIL));
    } else {
      window.open('https://wa.me/905457601789?text='+encodeURIComponent(L.waGreeting+'\n\n'+lines),'_blank','noopener');
    }
  };
  bkForm.addEventListener('submit',function(e){e.preventDefault();send(false);});
  document.getElementById('bkMail').addEventListener('click',function(){send(true);});
  prevBtn.addEventListener('click',function(){if(prevBtn.disabled)return;view.setMonth(view.getMonth()-1);render();});
  nextBtn.addEventListener('click',function(){view.setMonth(view.getMonth()+1);render();});

  function applyLang(){
    L = window.CAL_L10N[curLang()];
    if(weekEl) weekEl.innerHTML = L.week.map(function(w){return '<span>'+w+'</span>';}).join('');
    if(legendEl) legendEl.innerHTML =
      '<span><i class="lg-free"></i>'+L.free+'</span>'+
      '<span><i class="lg-booked"></i>'+L.booked+'</span>'+
      '<span><i class="lg-today"></i>'+L.today+'</span>';
    render(); updateDates();
  }
  window.addEventListener('vk:langchange', applyLang);
  applyLang();
})();
