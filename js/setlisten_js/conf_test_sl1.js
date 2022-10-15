function create1BlockForVoice1(gv) {  
  let Tpb = gv.HtmlTst; 
  let i = gv.HtmlTst.Idx;
  Tpb.create1ElemByInx("blvi_2divbuttctrl_i","");
  let bd2 = Tpb.op["blvi_2divbuttctrl_i"];     
    bd2.appendChild(Tpb.create1ElemByInx("blvi_Play_i","Play"));
    bd2.appendChild(Tpb.create1ElemByInx("blvi_Stop_i","Stop"));
  Tpb.create1ElemByInx("blvi_2linebut1menu_i","V");  
  Tpb.create1ElemByInx("blvi_1divctrl_i","");
  Tpb.op["blvi_2linebut1menu_i"].innerText = (i + 1)*1;
  Tpb.op["blvi_2linebut1menu_i"].style.backgroundColor = "rgb(192, 192, 192)";
  let bd1 = Tpb.op["blvi_1divctrl_i"];
  bd1.appendChild(Tpb.op["blvi_2linebut1menu_i"]);
  bd1.appendChild(Tpb.op["blvi_2divbuttctrl_i"]);
  clickButtondownctrlTest(Tpb.op["blvi_2linebut1menu_i"]);
  Tpb.create1ElemByInx("blvi_1sentence_i","");  
  Tpb.create1ElemByInx("blvi_0main_i","");
  Tpb.op["blvi_0main_i"].appendChild(bd1);
  Tpb.op["blvi_0main_i"].appendChild(Tpb.op["blvi_1sentence_i"]);
  Tpb.create1ElemByInx("blvi_00main_i","");
  Tpb.op["blvi_00main_i"].appendChild(Tpb.op["blvi_0main_i"]);  
  gv.HtmlBodyObj.kp["blockvoice"].appendChild(Tpb.op["blvi_00main_i"]);
  //gv.funCBAfterLoadArrLesson = AfterLoadVoiceLesson;
}

function AfterLoadVoiceLesson(gv) {
  //
}




function click_blvi_Play_i(athis) {
  let gv = Get_GlobalVar();  
  if ((gv.ArVP.Playing === 1)&&(gv.ArVP.Playing != 0)){
    gv.HtmlTst.op["blvi_Play_i"].innerText = "Play-R";
    speechSynthesis.cancel();
    gv.ArVP.Playing = 0;
  }else{
    gv.HtmlTst.op["blvi_Play_i"].innerText = "Pause";
    gv.ArVP.Stop = 0;
    gv.ArVP.Playing = 1;
    PlayProc_i(gv);
  }

 /* if (!(speechSynthesis.speaking)){
  }else{
    speechSynthesis.cancel();
  }
  */
}

function PlayProc_i(gv) {
  if(gv.ArVP.ar[gv.ArVP.CurPos].InxSentence != gv.ArVP.CurSentence){
    let bv1 = gv.BVSens;
    let Tpb = gv.HtmlTst;  
    gv.ArVP.CurSentence = gv.ArVP.ar[gv.ArVP.CurPos].InxSentence;
    Tpb.op["blvi_1sentence_i"].innerText = bv1[gv.ArVP.CurSentence].Sentences1;
  }
  speakBV(gv, gv.ArVP.ar[gv.ArVP.CurPos]);
}


function click_blvi_Stop_i(athis) {
  let gv = Get_GlobalVar();
  speechSynthesis.cancel();
  gv.HtmlTst.op["blvi_Play_i"].innerText = "Play";
  gv.ArVP.CurPos = 0;
  gv.ArVP.Stop = 1;
  gv.ArVP.Playing = 0;
}

function PlayNextVoice(gv) {
  if ((gv.ArVP.Stop != 1)&&(gv.ArVP.Playing == 1)) {
    gv.ArVP.CurPos++;
    if (gv.ArVP.CurPos >= gv.ArVP.ar.length) {
      gv.ArVP.CurPos = 0;
      if(gv.ArVP.Repeat == 1) {
        PlayProc_i(gv);
        //click_blvi_Play_i(gv.HtmlTst.op["blvi_Play_i"]);
      }
    } else {
      //click_blvi_Play_i(gv.HtmlTst.op["blvi_Play_i"]);      
      PlayProc_i(gv);
    }
  }
}

function speakBV(gv, e1) {
  msgspeak = gv.msgspeak;
  msgspeak.lang = "en-EN";
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
  let bv1 = gv.BVSens;
  let arv = [];
  for (let inx=0; inx < bv1.length; inx++){
    //let inx = gv.CurPlayingSent;  
    if (bv1[inx].FirstBy1Word === 1){ ///1 11111111111111
      let ar1w = SliceSentence(bv1[inx].Sentences1);
      for(let i = 0; i < ar1w.length; i++) {
        let e1 = {};
        e1.textv = ar1w[i];
        e1.Wait = (bv1[inx].WaitBy1Word_mSec)/100; // переводим в тики: 1тик = 100мс
        e1.Rate = 0.5;//bv1[inx].SpeakRateBy1Word;
        e1.InxSentence = inx;
        arv.push(e1);
      }
    }
    let d1 = {};
    d1.textv = bv1[inx].Sentences1;
    d1.Wait = (bv1[inx].WaitBy1Word_mSec)/100; // переводим в тики: 1тик = 100мс
    d1.Rate = 1; //bv1[inx].SpeakRateSenten;
    d1.InxSentence = inx;
    arv.push(d1);
  }
  let Tpb = gv.HtmlTst; 
  Tpb.op["blvi_1sentence_i"].innerText = bv1[0].Sentences1;
  return arv;
}


function FormVoiceArrCurSentence1(gv) {
  let bv1 = gv.BVSens;
  let inx = gv.CurPlayingSent;
  let arv = [];
  if (bv1[inx].FirstBy1Word === 1){ ///1 11111111111111
    let ar1w = SliceSentence(bv1[inx].Sentences1);
    for(let i = 0; i < ar1w.length; i++) {
      let e1 = {};
      e1.textv = ar1w[i];
      e1.Wait = (bv1[inx].WaitBy1Word_mSec)/100; // переводим в тики: 1тик = 100мс
      e1.Rate = 0.5;//bv1[inx].SpeakRateBy1Word;
      arv[i] = e1;
    }
  }
  let d1 = {};
  d1.textv = bv1[inx].Sentences1;
  d1.Wait = (bv1[inx].WaitBy1Word_mSec)/100; // переводим в тики: 1тик = 100мс
  d1.Rate = 1; //bv1[inx].SpeakRateSenten;
  arv.push(d1);
  return arv;
  /*
  e1.Sentences1 = ars[i].Eng;
  e1.FirstBy1Word = 1;
  e1.WaitBy1Word_mSec = 200;
  e1.SpeakRateBy1Word = 1;
  e1.SpeakRateSenten = 2;
  */
}




function create1Blocktest1(gv) {  
  let Tpb = gv.HtmlTst; 
  let i = gv.HtmlTst.Idx;
  Tpb.create1ElemByInx("blvi_2divbuttctrl_i","");
  let bd2 = Tpb.op["blvi_2divbuttctrl_i"];     
    bd2.appendChild(Tpb.create1ElemByInx("blvi_Generate1","Generate1"));
    bd2.appendChild(Tpb.create1ElemByInx("blvi_Generate2","Generate2"));
  Tpb.create1ElemByInx("blvi_2linebut1menu_i","V");  
  Tpb.create1ElemByInx("blvi_1divctrl_i","");
  Tpb.op["blvi_2linebut1menu_i"].innerText = (i + 1)*1;
  Tpb.op["blvi_2linebut1menu_i"].style.backgroundColor = "rgb(192, 192, 192)";
  let bd1 = Tpb.op["blvi_1divctrl_i"];
  bd1.appendChild(Tpb.op["blvi_2linebut1menu_i"]);
  bd1.appendChild(Tpb.op["blvi_2divbuttctrl_i"]);
  clickButtondownctrlTest(Tpb.op["blvi_2linebut1menu_i"]);
  Tpb.create1ElemByInx("blvi_0main_i","");
  Tpb.op["blvi_0main_i"].appendChild(bd1);  
  Tpb.create1ElemByInx("blvi_00main_i","");
  Tpb.op["blvi_00main_i"].appendChild(Tpb.op["blvi_0main_i"]);  
  gv.HtmlBodyObj.kp["blockvoice"].appendChild(Tpb.op["blvi_00main_i"]);    
}

function clickButtondownctrlTest(athis) {
  let gv = Get_GlobalVar();  
  let Bj = gv.HtmlTst;
  let inx = athis.getAttribute("InxAtt");
  inx = inx * 1;
  if (inx >= 0) {
    Bj.SetIdx(inx);
   // let op1 = gv.BVObj.GetCurItem();
    if (athis.style.backgroundColor == "rgb(192, 192, 192)"){
      athis.style.backgroundColor  = "rgb(30, 144, 255)"; 
      Bj.op["blvi_2divbuttctrl_i"].style.display = "block";
      athis.innerText = "__"+(inx+1)+"__"; 
    }else{
      athis.style.backgroundColor = "rgb(192, 192, 192)";
      Bj.op["blvi_2divbuttctrl_i"].style.display = "none";
      athis.innerText = (inx+1);
    }
  }    
}


function clickGenerate1(athis){  
  let gv = Get_GlobalVar();
  /*
  //1) генерируем varBVlist
  SendToBDVarBV(gv);
  gv.funCBBeforeLoadAfterPatch = TempBeforeLoadAfterPatch;
  */
  /*
  //2) генерируем первый урок  varBVlist
  SendToBDVarBV(gv);
  gv.funCBBeforeLoadAfterPatch = TempBeforeLoadAfterPatch;
  */
  let ars = gv.ArrSensTst;
  let oar = [];
  for(let i = 0; i < ars.length; i++) {
  //for(let i = 0; i < 7; i++) {    
    let e1 = {};
    e1.Sentences1 = ars[i].Eng;
    e1.FirstBy1Word = 1;
    e1.WaitBy1Word_mSec = 200;
    e1.SpeakRateBy1Word = 0.5;
    e1.SpeakRateSenten = 0.8;
    oar[i] = e1;
  }  
  gv.BVSens = oar;
  SendToBD_BVLess(gv);
  gv.funCBBeforeLoadAfterPatch = TempBeforeLoadAfterPatch;
}

function TempBeforeLoadAfterPatch(gv, vdata) {
  gv.HtmlBodyObj.kp["blocksentenceitem"].innerText = 'added'+vdata.toString();
}

function TempAfterLoadArrLesson(gv) {
  // ничего не делаем
}  




