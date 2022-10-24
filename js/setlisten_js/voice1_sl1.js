/*
function create1BlockForVoice2(gv) {  
    let Tpb = gv.HtmlTst; 
    let i = gv.HtmlTst.Idx;
    Tpb.create1ElemByInx("blvi_2divbuttctrl_i","");
    let bd2 = Tpb.op["blvi_2divbuttctrl_i"];     
      bd2.appendChild(Tpb.create1ElemByInx("blvi_Play_i","Play"));
      bd2.appendChild(Tpb.create1ElemByInx("blvi_Stop_i","Stop"));
      bd2.appendChild(Tpb.create1ElemByInx("blvi_space_i","======="));
      bd2.appendChild(Tpb.create1ElemByInx("blvi_nextlesson_i","NextLesson"));
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
  */

  function create1BlockForVoice1(gv) {  
    let mm1 = gv.MMenu;
    let bd2 = mm1.op["mm_div1_i"];
    bd2.appendChild(mm1.create1ElemByInx("mm_Play_i","Play"));
    bd2.appendChild(mm1.create1ElemByInx("mm_Stop_i","Stop"));
    bd2.appendChild(mm1.create1ElemByInx("mm_space_i","======="));
    mm1.op["mm_0main_i"].appendChild(mm1.create1ElemByInx("mm_1sentence_i",""));
  }

  
  function AfterLoadVoiceLesson(gv) {
    //
  }
  
  function Check_LoadLesson(gv) {
  
  }
  
  
  function click_mm_Play_i(athis) {
    let gv = Get_GlobalVar();
    if ((gv.ArVP.Playing === 1)&&(gv.ArVP.Playing != 0)){
      gv.MMenu.op["mm_Play_i"].innerText = "Play-R";
      speechSynthesis.cancel();
      gv.ArVP.Playing = 0;
    }else{
      gv.MMenu.op["mm_Play_i"].innerText = "Pause";
      gv.ArVP.Stop = 0;
      gv.ArVP.Playing = 1;
      PlayProc_i(gv);
    }
  }
  
  function PlayProc_i(gv) {
    if(gv.ArVP.ar[gv.ArVP.CurPos].InxSentence != gv.ArVP.CurSentence){
      let bv1 = gv.ArrSens;
      let Tpb = gv.MMenu;
      const senid_1 = document.getElementById("sentenid"+gv.ArVP.CurSentence);
      senid_1.style.color = '#ffffff';
      sid2 = gv.ArVP.ar[gv.ArVP.CurPos].InxSentence;
      const senid_2 = document.getElementById("sentenid"+sid2);
      senid_2.style.color = '#8bfcd7';
      gv.ArVP.CurSentence = gv.ArVP.ar[gv.ArVP.CurPos].InxSentence;
      Tpb.op["mm_1sentence_i"].innerText = bv1[gv.ArVP.CurSentence].Eng;
    }
    speakBV(gv, gv.ArVP.ar[gv.ArVP.CurPos]);
  }
  
  
  function click_mm_Stop_i(athis) {
    let gv = Get_GlobalVar();
    speechSynthesis.cancel();
    gv.MMenu.op["mm_Play_i"].innerText = "Play";
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
      gv.MMenu.op["mm_space_i"].innerText = "===>>>"+gv.ArVP.CurPos;
    }
  }
  
  function click_mm_space_i(athis) {
    let gv = Get_GlobalVar();
    gv.ArVP.CurPos++;
    if (gv.ArVP.CurPos >= gv.ArVP.ar.length) {
      gv.ArVP.CurPos--;//если достигли конца то все
    }
    athis.innerText = "===>>>"+gv.ArVP.CurPos;
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
    //let bv1 = gv.BVSens;
    let bv1 = gv.ArrSens;
    let arv = [];
    let p1 = "";
    for (let inx=0; inx < bv1.length; inx++){
      //let inx = gv.CurPlayingSent;
      if (bv1[inx].FirstBy1Word === 0){ ///111111111111111
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
      d1.textv = bv1[inx].Eng;
      d1.Wait = 1;//(bv1[inx].WaitBy1Word_mSec)/100; // переводим в тики: 1тик = 100мс
      d1.Rate = 0.4; //bv1[inx].SpeakRateSenten;
      d1.InxSentence = inx;
      arv.push(d1);
  
      let d2 = {};
      d2.textv = bv1[inx].Eng;
      d2.Wait = 1;//(bv1[inx].WaitBy1Word_mSec)/100; // переводим в тики: 1тик = 100мс
      d2.Rate = 0.8; //bv1[inx].SpeakRateSenten;
      d2.InxSentence = inx;
      arv.push(d2);
      p1 = p1 + "<p id=sentenid"+inx+">"+bv1[inx].Eng+"</p>";
    }
    let Tpb = gv.MMenu; 
    gv.HtmlBodyObj.kp["blocksentenceitem"].innerHTML = p1;
    if(Tpb.op["mm_1sentence_i"]){Tpb.op["mm_1sentence_i"].innerText = bv1[0].Eng;}
    return arv;
  }

/*
  function FormVoiceArrCurSentence1(gv) {
    let bv1 = gv.BVSens;
    let arv = [];
    let p1 = "";
    for (let inx=0; inx < bv1.length; inx++){
      //let inx = gv.CurPlayingSent;
      if (bv1[inx].FirstBy1Word === 0){ ///111111111111111
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
      d1.Rate = 0.4; //bv1[inx].SpeakRateSenten;
      d1.InxSentence = inx;
      arv.push(d1);
  
      let d2 = {};
      d2.textv = bv1[inx].Sentences1;
      d2.Wait = (bv1[inx].WaitBy1Word_mSec)/100; // переводим в тики: 1тик = 100мс
      d2.Rate = 0.8; //bv1[inx].SpeakRateSenten;
      d2.InxSentence = inx;
      arv.push(d2);
      p1 = p1 + "<p id=sentenid"+inx+">"+bv1[inx].Sentences1+"</p>";
    }
    let Tpb = gv.MMenu; 
    gv.HtmlBodyObj.kp["blocksentenceitem"].innerHTML = p1;
    if(Tpb.op["mm_1sentence_i"]){Tpb.op["mm_1sentence_i"].innerText = bv1[0].Sentences1;}    
    return arv;
  }

  function clickButtondownctrlTest(athis) {
    let gv = Get_GlobalVar();  
    let Bj = gv.MMenu;
    let inx = athis.getAttribute("InxAtt");
    inx = inx * 1;
    if (inx >= 0) {
      Bj.SetIdx(inx);
     // let op1 = gv.BVObj.GetCurItem();
      if (athis.style.backgroundColor == "rgb(192, 192, 192)"){
        athis.style.backgroundColor  = "rgb(30, 144, 255)"; 
        Bj.op["mm_2divbuttctrl_i"].style.display = "block";
        athis.innerText = "__"+(inx+1)+"__"; 
      }else{
        athis.style.backgroundColor = "rgb(192, 192, 192)";
        Bj.op["mm_2divbuttctrl_i"].style.display = "none";
        athis.innerText = (inx+1);
      }
    }    
  }
*/






  /*
  function FormVoiceArrCurSentence1(gv) {
    let bv1 = gv.BVSens;
    let inx = gv.CurPlayingSent;
    let arv = [];
    if (bv1[inx].FirstBy1Word === 0){ ///1 11111111111111
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
    d1.Rate = 0.4; //bv1[inx].SpeakRateSenten;
    arv.push(d1);
  
    let d2 = {};
    d2.textv = bv1[inx].Sentences1;
    d2.Wait = (bv1[inx].WaitBy1Word_mSec)/100; // переводим в тики: 1тик = 100мс
    d2.Rate = 0.6; //bv1[inx].SpeakRateSenten;
    arv.push(d1);
  
    return arv;
  
  //  e1.Sentences1 = ars[i].Eng;
  //  e1.FirstBy1Word = 1;
  //  e1.WaitBy1Word_mSec = 200;
  //  e1.SpeakRateBy1Word = 1;
  //  e1.SpeakRateSenten = 2;
  }
  */
  