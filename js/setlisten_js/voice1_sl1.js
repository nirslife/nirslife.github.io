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
    let bd2 = mm1.op["mm_div1_i"];-
    bd2.appendChild(mm1.create1ElemByInx("mm_Play_i","Play"));
    bd2.appendChild(mm1.create1ElemByInx("mm_Stop_i","Stop"));
    bd2.appendChild(mm1.create1ElemByInx("mm_space_i","======="));
    bd2.appendChild(mm1.create1ElemByInx("mm_version_i","2_1"));
    mm1.op["mm_0main_i"].appendChild(mm1.create1ElemByInx("mm_1sentence_i",""));
    create1BlockMenu3(gv);
  }

  
  function AfterLoadVoiceLesson(gv) {
    //
  }
  
  function Check_LoadLesson(gv) {
  
  }
  
  /*
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
*/

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


  
  function formframedo1(gv) {
    if(gv.ArVP.ar[gv.ArVP.CurPos].InxSentence != gv.ArVP.CurSentence){
      gv.ArVP.FrameIndex++;
      if (gv.ArVP.FrameIndex > 5) {
        let f1 = gv.HtmlBodyObj.kp["blocksentenceitem"].firstChild;
        gv.HtmlBodyObj.kp["blocksentenceitem"].removeChild(f1);
        gv.HtmlBodyObj.kp["blocksentenceitem"].appendChild(f1);
      }
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
      //L2.style.background = "background-color: rgb(21, 101, 164)";
      L2.style.background = "rgb(21, 101, 164)";
      const att4 = document.createAttribute("class");
      att4.value = "lsentence";
      L2.setAttributeNode(att4);
      //divsentence
      div1.appendChild(L1);
      div1.appendChild(L2);
      //p1 = p1 + "<div id=sentenid>"+inx+"><p>"+bv1[inx].Eng+"</p><p>"+bv1[inx].Eng+"</p></div>";
      gv.HtmlBodyObj.kp["blocksentenceitem"].appendChild(div1);
      
    }
  }

/*
  function PlayProc_i(gv) {
    formframedo(gv);
    if(gv.ArVP.ar[gv.ArVP.CurPos].InxSentence != gv.ArVP.CurSentence){
      let bv1 = gv.ArrSens;
      let Tpb = gv.MMenu;
      const senid_1 = document.getElementById("divsentenid"+gv.ArVP.CurSentence);
      senid_1.style.color = '#ffffff';
      sid2 = gv.ArVP.ar[gv.ArVP.CurPos].InxSentence;
      const senid_2 = document.getElementById("divsentenid"+sid2);
      senid_2.style.color = '#8bfcd7';
      gv.ArVP.CurSentence = gv.ArVP.ar[gv.ArVP.CurPos].InxSentence;
      Tpb.op["mm_1sentence_i"].innerText = bv1[gv.ArVP.CurSentence].Eng;
    }
    speakBV(gv, gv.ArVP.ar[gv.ArVP.CurPos]);
  }
*/


  function PlayProc_i(gv) {    
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


/*
  function click_mm_Stop_i(athis) {
    let gv = Get_GlobalVar();
    speechSynthesis.cancel();
    gv.MMenu.op["mm_Play_i"].innerText = "Play";
    gv.ArVP.CurPos = 0;
    gv.ArVP.Stop = 1;
    gv.ArVP.Playing = 0;
  }
*/

  function click_mm_Stop_i(athis) {
    let gv = Get_GlobalVar();
    speechSynthesis.cancel();
    gv.MMenu.op["mm_Play_i"].innerText = "Play";
    gv.ArVP.CurPos = 0;
    gv.ArVP.Stop = 1;
    gv.ArVP.Playing = 0;
  }

/*
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
*/

function PlayNextVoice(gv) {
  if ((gv.ArVP.Stop != 1)&&(gv.ArVP.Playing == 1)) {
    let e1 = gv.ArVP.ar[gv.ArVP.CurPos];
    e1.inxas++;
    if (e1.inxas >= e1.as.length){
      e1.inxas = 0;
      gv.ArVP.CurPos++;
    }
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
  
/*
  function click_mm_space_i(athis) {
    let gv = Get_GlobalVar();
    gv.ArVP.CurPos++;
    gv.ArVP.CurPos++;
    if (gv.ArVP.CurPos >= gv.ArVP.ar.length) {
      gv.ArVP.CurPos--;//���� �������� ����� �� ���
    }
    athis.innerText = "===>>>"+gv.ArVP.CurPos;
    formframedo(gv);
  }
*/

function click_mm_space_i(athis) {
  let gv = Get_GlobalVar();
  gv.ArVP.CurPos++;
//  gv.ArVP.CurPos++;
  if (gv.ArVP.CurPos >= gv.ArVP.ar.length) {
    gv.ArVP.CurPos--;
  }
  athis.innerText = "===>>>"+gv.ArVP.CurPos;
  formframedo(gv);
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
      /*
      if (bv1[inx].FirstBy1Word === 0){ ///111111111111111
        let ar1w = SliceSentence(bv1[inx].Sentences1);
        for(let i = 0; i < ar1w.length; i++) {
          let e1 = {};
          e1.textv = ar1w[i];
          e1.Wait = (bv1[inx].WaitBy1Word_mSec)/100; // ��������� � ����: 1��� = 100��
          e1.Rate = 0.5;//bv1[inx].SpeakRateBy1Word;
          e1.InxSentence = inx;
          arv.push(e1);
        }
      }
      */

     /*
      let d1 = {};
      d1.textv = bv1[inx].Eng;
      d1.Wait = 1;//(bv1[inx].WaitBy1Word_mSec)/100; // ��������� � ����: 1��� = 100��
      d1.Rate = 0.4; //bv1[inx].SpeakRateSenten;
      d1.InxSentence = inx;
      arv.push(d1);
      */
  
      let d2 = {};
      d2.textv = bv1[inx].Eng;
      d2.as = [0.4, 0.8];
      d2.inxas = 0;
      d2.Wait = 1;//(bv1[inx].WaitBy1Word_mSec)/100; // ��������� � ����: 1��� = 100��
      d2.Rate = 0.8; //bv1[inx].SpeakRateSenten;
      d2.InxSentence = inx;
      arv.push(d2);

      let divs = "divsentenid"+inx;
      const temp1 = document.getElementById(divs);
      if (temp1){temp1.remove();}    
      const div1 = document.createElement("div");
      div1.id = divs;
      const att1 = document.createAttribute(gv.eventvalue);
      att1.value = "click_divsentid(this)";
      div1.setAttributeNode(att1);
      const att2 = document.createAttribute("class");
      att2.value = "divsentence";
      div1.setAttributeNode(att2);

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
      L2.style.background = "rgb(21, 101, 164)";
      const att4 = document.createAttribute("class");
      att4.value = "lsentence";
      L2.setAttributeNode(att4);
      //divsentence
      div1.appendChild(L1);
      div1.appendChild(L2);
      //p1 = p1 + "<div id=sentenid>"+inx+"><p>"+bv1[inx].Eng+"</p><p>"+bv1[inx].Eng+"</p></div>";
     // gv.HtmlBodyObj.kp["blocksentenceitem"].appendChild(div1);
      gv.HtmlBodyObj.kp["footerctrlblock"].appendChild(div1);
      
    }
    let Tpb = gv.MMenu; 
    //gv.HtmlBodyObj.kp["blocksentenceitem"].innerHTML = p1;
    //if(Tpb.op["mm_1sentence_i"]){Tpb.op["mm_1sentence_i"].innerText = bv1[0].Eng;}
    return arv;
  }

  function click_divsentid(athis) {
    let gv = Get_GlobalVar();
    //const l2 = document.getElementById("l2"+athis.id);
    if (gv.ArVP.SelectedP) {
      gv.ArVP.SelectedP.style.display = "none";
    }
    gv.ArVP.SelectedP = document.getElementById("l2"+athis.id);
    gv.ArVP.SelectedP.style.display = "block";
  }

  function click_f_divsentid(athis) {
    let gv = Get_GlobalVar();
    if (gv.ArVP.f_SelectedP) {
      gv.ArVP.f_SelectedP.style.display = "none";
    }
    gv.ArVP.f_SelectedP = document.getElementById("l2"+athis.id);
    gv.ArVP.f_SelectedP.style.display = "block";

/*    const f_l2 = document.getElementById("f_l2"+athis.id);
    if (f_l2.style.display == "none"){
      f_l2.style.display = "block";
    }else{
      f_l2.style.display = "none";
    }
*/    
  }

