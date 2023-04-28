  function create1BlockForVoice1(gv) {
    let mm1 = gv.MMenu;
    gv.VersionVoiceApp = "53";
    gv.RIF = "";
   // gv.ModeRepeatVoice = 2; // del after this line
    let bd2 = mm1.op["mm_div1_i"];
    bd2.appendChild(mm1.create1ElemByInx("mm_Play_i","___Play___"));
    bd2.appendChild(mm1.create1ElemByInx("mm_Stop_i","___Stop___"));
    bd2.appendChild(mm1.create1ElemByInx("mm_space_i","="));
    bd2.appendChild(mm1.create1ElemByInx("mm_version_i",gv.ModeRepeatVoice+"_"+gv.VersionVoiceApp+gv.RIF));
    bd2.appendChild(mm1.create1ElemByInx("mm_allsent_i","ALL"));
    mm1.op["mm_allsent_i"].style.background = "rgb(52, 188, 69)";
    gv.MarkMode = "";
    gv.MarkCurPObj = mm1.op["mm_allsent_i"];
    bd2.appendChild(mm1.create1ElemByInx("mm_L1mrksent_i","L1"));
    bd2.appendChild(mm1.create1ElemByInx("mm_L2mrksent_i","L2"));
    bd2.appendChild(mm1.create1ElemByInx("mm_L3mrksent_i","L3"));
    mm1.op["mm_0main_i"].appendChild(mm1.create1ElemByInx("mm_1sentence_i",""));
    create1BlockMenu3(gv);
  }

  function click_mm_markbut_i(athis){
    let gv = Get_GlobalVar();
    gv.MarkCurPObj.style.background = "rgb(85, 85, 85)";
    gv.MarkMode = athis.getAttribute("MarkName");
    gv.MarkCurPObj = athis;
    athis.style.background = "rgb(52, 188, 69)";
    click_mm_Stop_i(null);
    gv.ArVP.ar = FormVoiceArrCurSentence(gv);
  }

  function click_mm_version_i(athis){
    let gv = Get_GlobalVar();
    if(gv.ModeRepeatVoice == 2){
      gv.ModeRepeatVoice = 1;
    }
    else{
      gv.ModeRepeatVoice = 2;
    }
    gv.MMenu.op["mm_version_i"].innerText = gv.ModeRepeatVoice+"_"+gv.VersionVoiceApp+gv.RIF;
    click_mm_Stop_i(null);
    gv.ArVP.ar = FormVoiceArrCurSentence(gv);
    SendToBDModeRepeat(gv);
  }
  
  function AfterLoadVoiceLesson(gv) {
    //
  }
  
  function Check_LoadLesson(gv) {
  
  }
  

function click_mm_Play_i(athis) {
  let gv = Get_GlobalVar();
  Play_ButtonProc(gv);
}

function Play_ButtonProc(gv){
  if ((gv.ArVP.Playing === 1)&&(gv.ArVP.Playing != 0)){
    gv.MMenu.op["mm_Play_i"].innerText = "___Play-R___";
    speechSynthesis.cancel();
    gv.ArVP.Playing = 0;
  }else{
    gv.MMenu.op["mm_Play_i"].innerText = "___Pause___";
    gv.ArVP.Stop = 0;
    gv.ArVP.Playing = 1;
    PlayProc_i(gv);
  }
}


  function formframedo(gv) {
    let Tpb = gv.MMenu;
    let bv1 = gv.ArrSens;
    const lenframe = 3;
    let InxStartF = 0; let InxStopF = bv1.length-1;
    if (lenframe*2 < bv1.length){
      let j = gv.ArVP.CurSentence;
      let j1 = j - 3;
      if(j1 < 0){ j1 = bv1.length + j1;}
      InxStartF = j1;
       j1 = j + 3;
      if(j1 >= bv1.length){ j1 = j1 - bv1.length;}
      InxStopF = j1;
    }

    let f1 = gv.HtmlBodyObj.kp["blocksentenceitem"].firstChild;
    while(f1){
      gv.HtmlBodyObj.kp["blocksentenceitem"].removeChild(f1);
      f1 = gv.HtmlBodyObj.kp["blocksentenceitem"].firstChild;
    }

    for (let inx=InxStartF; inx != InxStopF+1; inx++){
      if(inx == bv1.length){inx = 0;}
      let mr = {"l1":0,"l2":0,"l3":0};
      if (gv.ArrMark[inx]){ mr = gv.ArrMark[inx];}       
      let divs = "f_divsentenid"+inx;
      const div1 = document.createElement("div");
      div1.id = divs;
      const att1 = document.createAttribute(gv.eventvalue);
      att1.value = "click_f_divsentid(this)";
      div1.setAttributeNode(att1);
      const att2 = document.createAttribute("class");
      att2.value = "divsentence";
      div1.setAttributeNode(att2);
      
      if (inx == gv.ArVP.CurSentence) {div1.style.color = '#8bfcd7';}

      const L1 = document.createElement("div");
      L1.id = "f_l1sentenid"+inx;
      L1.innerText = bv1[inx].Eng;
      const att3 = document.createAttribute("class");
      att3.value = "f_lsentence";
      L1.setAttributeNode(att3);

      const L2 = document.createElement("div");
      L2.id = "l2f_divsentenid"+inx;
      L2.innerText = bv1[inx].Rus;
      L2.style.display = "none";      
      L2.style.background = "rgb(21, 101, 164)";
      const att4 = document.createAttribute("class");
      att4.value = "lsentence";
      L2.setAttributeNode(att4);      
      div1.appendChild(L1);
      div1.appendChild(L2);
      
      gv.HtmlBodyObj.kp["blocksentenceitem"].appendChild(div1);
      if (gv.MarkMode != ""){
        if (mr[gv.MarkMode] == 0){
          div1.style.display = "none";
        }
      }
    }
  }


  function click_mm_Stop_i(athis) {
    let gv = Get_GlobalVar();
    gv.MMenu.op["mm_Play_i"].innerText = "____Play___";
    let e1 = gv.ArVP.ar[gv.ArVP.CurPos];
    e1.inxas = 0;
    gv.ArVP.CurPos = 0;
    gv.ArVP.Stop = 1;
    gv.ArVP.Playing = 0;
    speechSynthesis.cancel();
  }

  function ProcForPlayFrom_Stop(inxfrom) {
    let gv = Get_GlobalVar();
    if (gv.ArVP.Stop == 1){ 
      gv.ArVP.CurPos = inxfrom;
      click_mm_Play_i(null);
    }else{
     // speechSynthesis.cancel();
      gv.ArVP.PlayingFromInx = inxfrom;
    }
    gv.MMenu.op["mm_space_i"].innerText = ">>"+inxfrom;
  //  gv.MMenu.op["mm_allsent_i"].innerText = gv.MMenu.op["mm_allsent_i"].innerText + '::'+ e1.inxas+">>>"+gv.ArVP.CurPos;
  }
  
function click_mm_space_i(athis) {
  let gv = Get_GlobalVar();
  gv.ArVP.CurPos++;
//  gv.ArVP.CurPos++;
  if (gv.ArVP.CurPos >= gv.ArVP.ar.length) {
    gv.ArVP.CurPos--;
  }
  athis.innerText = ">>"+gv.ArVP.CurPos;
  formframedo(gv);
}


function PlayProc_i(gv) {
  if (gv.ArVP.ar.length < 1) return;
  if(gv.ArVP.ar[gv.ArVP.CurPos].InxSentence != gv.ArVP.CurSentence){
    let bv1 = gv.ArrSens;
    let Tpb = gv.MMenu;
    const senid_1 = document.getElementById("divsentenid"+gv.ArVP.CurSentence);
    senid_1.style.color = '#ffffff';
    sid2 = gv.ArVP.ar[gv.ArVP.CurPos].InxSentence;
    const senid_2 = document.getElementById("divsentenid"+sid2);
    senid_2.style.color = '#8bfcd7';
    gv.ArVP.CurSentence = gv.ArVP.ar[gv.ArVP.CurPos].InxSentence;
   // Tpb.op["mm_1sentence_i"].innerText = bv1[gv.ArVP.CurSentence].Eng;
  }
  formframedo(gv);
  let e1 = gv.ArVP.ar[gv.ArVP.CurPos];
  e1.Rate = e1.as[e1.inxas];
  speakBV(gv, e1);
}

function PlayNextVoice(gv) {
  if ((gv.ArVP.Stop != 1)&&(gv.ArVP.Playing == 1)) {
    let icn = 1;
    if (gv.ArVP.PlayingFromInx > 0){
      gv.ArVP.CurPos = gv.ArVP.PlayingFromInx;
      gv.ArVP.PlayingFromInx = 0;
      icn = 0;
    }
    let e1 = gv.ArVP.ar[gv.ArVP.CurPos];
    e1.inxas = e1.inxas + icn;
    if (e1.inxas >= e1.as.length){
      e1.inxas = 0;
      gv.ArVP.CurPos++;
    }
    if (gv.ArVP.CurPos >= gv.ArVP.ar.length) {
      gv.ArVP.CurPos = 0;
      if(gv.ArVP.Repeat == 1) {
        PlayProc_i(gv);
      }
    } else {
      PlayProc_i(gv);
    }
  }
} 


  
  function speakBV(gv, e1) {
    msgspeak = gv.msgspeak;
    if (gv.CurVoiceElm) {
      msgspeak.voice = gv.CurVoiceElm;
    }else{
      msgspeak.lang = e1.LangV; //"en-EN";
    }    
    msgspeak.text = e1.textv;
    msgspeak.rate = e1.Rate;
    msgspeak.volume = 1;
    msgspeak.addEventListener('start', handleSpeechEvent);
    msgspeak.addEventListener('end', handleSpeechEvent);
    msgspeak.addEventListener('error', handleSpeechEvent);
    msgspeak.addEventListener('boundary', handleSpeechEvent);
    msgspeak.addEventListener('pause', handleSpeechEvent);
    msgspeak.addEventListener('resume', handleSpeechEvent);
    window.speechSynthesis.speak(msgspeak);
  }

  function speakJustText(gv, textv) {
    msgspeak = gv.msgspeak;
    msgspeak.lang = "en-EN";
    msgspeak.text = textv;
    msgspeak.rate = 0.8;
    msgspeak.volume = 1;
    window.speechSynthesis.speak(msgspeak);
  }


  
  
  function handleSpeechEvent(e) {
    let gv = Get_GlobalVar();
    //console.log('Speech Event:', e);
    switch (e.type) {
      case 'start':
        console.log('start');
        break;
      case 'end':
        PlayNextVoice(gv);
        console.log('end');
        break;
      case 'endEvent':
        break;
      case 'error':
        break;
      case 'boundary':
      {
        break;
      }// case 'boundary':
      default:
        break;
    }
  }
  
  function FormVoiceArrCurSentence(gv) {
    //let bv1 = gv.BVSens;
    let bv1 = gv.ArrSens;
    let arv = [];
    if (typeof(gv.ArrMark) == "undefined"){
      gv.ArrMark = [];
    }
    let p1 = "";
    let f1 = gv.HtmlBodyObj.kp["footerctrlblock"].firstChild;
    while(f1){
      gv.HtmlBodyObj.kp["footerctrlblock"].removeChild(f1);
      f1 = gv.HtmlBodyObj.kp["footerctrlblock"].firstChild;
    }    
    for (let inx=0; inx < bv1.length; inx++){
      let mr = {"l1":0,"l2":0,"l3":0};
      if (gv.ArrMark[inx]){ mr = gv.ArrMark[inx];}
      let divs = "divsentenid"+inx;
    //  const temp1 = document.getElementById(divs);
    //  if (temp1){temp1.remove();}    
      const div1 = document.createElement("div");
      div1.id = divs;
      const att1 = document.createAttribute(gv.eventvalue);
      att1.value = "click_divsentid(this)";
      div1.setAttributeNode(att1);
      const att2 = document.createAttribute("class");
      att2.value = "divsentence";
      div1.setAttributeNode(att2);
      const att11 = document.createAttribute("InxAtt");
      att11.value = inx;
      div1.setAttributeNode(att11);


      const L1 = document.createElement("div");
      L1.id = "l1sentenid"+inx;
      L1.innerText = bv1[inx].Eng;
      const att3 = document.createAttribute("class");
      att3.value = "lsentence";
      L1.setAttributeNode(att3);

      const L2 = document.createElement("div");
      L2.id = "l2divsentenid"+inx;
      L2.innerText = bv1[inx].Rus;
      L2.style.display = "none";
      //L2.style.background = "background-color: rgb(21, 101, 164)";
      L2.style.background = "rgb(248, 249, 234)";
      L2.style.color = "rgb(162, 159, 159)";
      const att4 = document.createAttribute("class");
      att4.value = "lsentence";
      L2.setAttributeNode(att4);
      
      AddHtmlctrl_divsent(gv, div1, inx);
      div1.appendChild(L1);
      div1.appendChild(L2);
      gv.HtmlBodyObj.kp["footerctrlblock"].appendChild(div1);

      if ((gv.MarkMode != "")&&(mr[gv.MarkMode] == 0)){
        div1.style.display = "none";
      }else{
        let d2 = {};
        d2.textv = bv1[inx].Eng;
        ////////////////////////d2.txrus = bv1[inx].Rus;
        if (gv.ModeRepeatVoice == 2){
          d2.as = [0.4, 0.8];
        }
        else{
          d2.as = [0.8];
        }
        d2.inxas = 0;
        d2.Wait = 1;
        d2.LangV = gv.SpeaklangEn;
        d2.Rate = 0.8; 
        d2.InxSentence = inx;
        arv.push(d2);
        if (gv.RusTalkMode == 1) {          
          let dr = {};
          dr.textv = bv1[inx].Rus;
          dr.as = [0.8];
          dr.inxas = 0;
          dr.Wait = 1;
          dr.Rate = 0.8; 
          dr.LangV = gv.SpeaklangRu;
          dr.InxSentence = inx;
          arv.push(dr);
        }  
      }
      
    }
    return arv;
  }

  function AddHtmlctrl_divsent(gv, ownp, inx) {
    function AddButtons(gv, own1, inx) {
      let mr = {"l1":0,"l2":0,"l3":0};
      if (gv.ArrMark[inx]){ mr = gv.ArrMark[inx];}
      let vbr = [1,2,3];
      for (let i=0; i < vbr.length; i++){
        const bt1 = document.createElement("div");
        bt1.id = "l"+i+"_but_ctrl_sent_"+inx;
        const at1 = document.createAttribute("class");
        at1.value = "but_ctrl_sent_i";
        bt1.setAttributeNode(at1);
        bt1.innerText = "L"+vbr[i];
        const at2 = document.createAttribute("ValueBut");
        at2.value = mr["l"+vbr[i]];
        bt1.setAttributeNode(at2);
        const at3 = document.createAttribute("InxAtt");
        at3.value = inx;
        bt1.setAttributeNode(at3);
        const at4 = document.createAttribute("pname");
        at4.value = "l"+vbr[i];
        bt1.setAttributeNode(at4);
        const att1 = document.createAttribute(gv.eventvalue);
        att1.value = "click_but_ctrl_sent_lev(this)";
        bt1.setAttributeNode(att1);
        if (mr["l"+vbr[i]] == 1){ bt1.style.background = "rgb(15, 221, 124)";}
        own1.appendChild(bt1);
      }
    }
    function AddButPlay_1(gv, own1, inx) {
      const bt2 = document.createElement("div");
      bt2.id = "play_but_itemsent_"+inx;
      const at2 = document.createAttribute("class");
      at2.value = "but_ctrl_sent_i";
      bt2.setAttributeNode(at2);
      const at3 = document.createAttribute("InxAtt");
      at3.value = inx;
      bt2.setAttributeNode(at3);
      bt2.innerText = ">";
      const att1 = document.createAttribute(gv.eventvalue);
      att1.value = "click_play_but_itemsent(this)";
      bt2.setAttributeNode(att1);
      own1.appendChild(bt2);
    }

    function AddButPlayFrom(gv, own1, inx) {
      const bt2 = document.createElement("div");
      bt2.id = "pfrom_but_itemsent_"+inx;
      const at2 = document.createAttribute("class");
      at2.value = "but_ctrl_sent_i";
      bt2.setAttributeNode(at2);
      const at3 = document.createAttribute("InxAtt");
      at3.value = inx;
      bt2.setAttributeNode(at3);
      bt2.innerText = ">>";
      const att1 = document.createAttribute(gv.eventvalue);
      att1.value = "click_pfrom_but_itemsent(this)";
      bt2.setAttributeNode(att1);
      own1.appendChild(bt2);
    }
    
    const div1 = document.createElement("div");
    div1.id = "divctrl_sent_"+inx;
    const att2 = document.createAttribute("class");
    att2.value = "divctrl_sent_i";
    div1.setAttributeNode(att2);
    div1.style.display = "none";
    AddButtons(gv, div1, inx);
    //div1.appendChild(bt2);
    AddButPlay_1(gv, div1, inx);
    AddButPlayFrom(gv, div1, inx);
    ownp.appendChild(div1);
  }

  function click_play_but_itemsent(athis){
    let gv = Get_GlobalVar();
    click_mm_Stop_i(null);
    let inxa = athis.getAttribute("InxAtt");
    let l1 = document.getElementById("l1sentenid"+inxa);
    textv = l1.innerText; 
    speakJustText(gv, textv);
  }

  function click_pfrom_but_itemsent(athis){
    let gv = Get_GlobalVar();
    let inxa = athis.getAttribute("InxAtt");
    ProcForPlayFrom_Stop(inxa * 1);
  }

  function click_but_ctrl_sent_lev(athis){
    let gv = Get_GlobalVar();
    let inxa = athis.getAttribute("InxAtt");
    let vb = athis.getAttribute("ValueBut");
    let pn = athis.getAttribute("pname");
    if (!(gv.ArrMark[inxa])){ gv.ArrMark[inxa] = {"l1":0,"l2":0,"l3":0};}
    let am = gv.ArrMark[inxa];
    if (vb == 0){ 
      athis.setAttribute("ValueBut", 1);
      athis.style.background = "rgb(15, 221, 124)";
      am[pn] = 1;
    }else{
      athis.setAttribute("ValueBut", 0);
      athis.style.background = "rgb(192, 203, 208)";
      am[pn] = 0;
    }
    SendToBDSettingsLabel(gv);
  }

  function click_divsentid(athis) {
    let gv = Get_GlobalVar();
    if (gv.ArVP.SelectedP) {
      let inxa = gv.ArVP.SelectedP.getAttribute("InxAtt");
      let l2 = document.getElementById("l2divsentenid"+inxa);
      l2.style.display = "none";
      let ctrd1 = document.getElementById("divctrl_sent_"+inxa);
      ctrd1.style.display = "none";
    }
    gv.ArVP.SelectedP = athis; 
    let inxa = athis.getAttribute("InxAtt");
    let l2 = document.getElementById("l2divsentenid"+inxa);
    l2.style.display = "block";
    let ctrd1 = document.getElementById("divctrl_sent_"+inxa);
    ctrd1.style.display = "block";
  }

  function click_f_divsentid(athis) {
    let gv = Get_GlobalVar();
    if (gv.ArVP.f_SelectedP) {
      gv.ArVP.f_SelectedP.style.display = "none";
    }
    gv.ArVP.f_SelectedP = document.getElementById("l2"+athis.id);
    gv.ArVP.f_SelectedP.style.display = "block";

  }

