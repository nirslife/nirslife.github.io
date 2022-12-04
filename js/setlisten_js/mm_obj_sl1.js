function create1mmenu_obj(gv) {
    let mm1 = gv.MMenu;
    let lls = gv.ListLess; 
    mm1.create1ElemByInx("mm_div1_i","");
    let bd2 = mm1.op["mm_div1_i"];
    mm1.create1ElemByInx("mm_div2_i","");
    let bd3 = mm1.op["mm_div2_i"];
    mm1.create1ElemByInx("mm_div3_i","");
    let bd4 = mm1.op["mm_div3_i"];
    mm1.create1ElemByInx("mm_div4_i","");
    let bd5 = mm1.op["mm_div4_i"];



    mm1.create1ElemByInx("mm_but1_i","");
    mm1.create1ElemByInx("mm_but2_i","");
    mm1.create1ElemByInx("mm_but3_i","");
    mm1.create1ElemByInx("mm_but4_i","");
    mm1.create1ElemByInx("mm_1divctrl_i","");
    mm1.op["mm_but1_i"].style.backgroundColor = "rgb(192, 192, 192)";
    mm1.op["mm_but3_i"].style.backgroundColor = "rgb(192, 192, 192)";
    mm1.op["mm_but4_i"].style.backgroundColor = "rgb(192, 192, 192)";

    mm1.op["mm_but1_i"].innerText = "Menu1";
    mm1.op["mm_but2_i"].innerText = "Menu2";
    mm1.op["mm_but3_i"].innerText = "Menu3";
    mm1.op["mm_but4_i"].innerText = "M_Voice";
    mm1.mmopen = "mm_but2_i";
    mm1.op["mm_but2_i"].style.backgroundColor = "rgb(30, 144, 255)";
    mm1.op[mm1.tid[mm1.mmopen]].style.display = "block";

    let bd1 = mm1.op["mm_1divctrl_i"];
    bd1.appendChild(mm1.op["mm_but1_i"]);
    bd1.appendChild(mm1.op["mm_but2_i"]);
    bd1.appendChild(mm1.op["mm_but3_i"]);
    bd1.appendChild(mm1.op["mm_but4_i"]);
    bd1.appendChild(mm1.op["mm_div1_i"]);
    bd1.appendChild(mm1.op["mm_div2_i"]);
    bd1.appendChild(mm1.op["mm_div3_i"]);
    bd1.appendChild(mm1.op["mm_div4_i"]);
    
    mm1.create1ElemByInx("mm_0main_i","");
    mm1.op["mm_0main_i"].appendChild(bd1);
    mm1.create1ElemByInx("mm_00main_i","");
    mm1.op["mm_00main_i"].appendChild(mm1.op["mm_0main_i"]);
    if (gv.ProgName == "Voice"){
      gv.HtmlBodyObj.kp["blockvoice"].appendChild(mm1.op["mm_00main_i"]);
    }
    if (gv.ProgName == "Sentence"){
      gv.HtmlBodyObj.kp["header1"].appendChild(mm1.op["mm_00main_i"]);
    }
}

function LoadlessTo_mmenu(gv) {  
  let mm1 = gv.MMenu;
  let lst = gv.ListLess;
  let lls = gv.LstLes;
  let bd1 = mm1.op["mm_div2_i"];
  bd1.appendChild(mm1.create1ElemByInx("sent_select_ok","Select-OK"));
  for (let i=0; i<lst.length; i++) {
    lls.AddNewArr();
    bd1.appendChild(lls.create1ElemByInx("mmless_item",lst[i].recid+" - "+lst[i].shortdesc));
  }
  let s1 = "";
  if(gv.TmpLessonNum > 0){s1 = gv.TmpLessonNum;}
  lls.oop["mmless_item"+s1].style.backgroundColor = "rgb(33, 150, 243)";
  mm1.loadedlessons = 1;
}

function LoadVoicesTo_mmenu(gv) {
  let mm1 = gv.MMenu;
  let lvc = gv.LstVoi;
  let voices = gv.Glob_Voices;
  let del1 =  document.getElementById("tempbuf_loadvoice");
  if (del1) {del1.remove();};
  let dv4 = mm1.op["mm_div4_i"];
  const bd1 = document.createElement("div");
  bd1.id = "tempbuf_loadvoice";
  dv4.appendChild(bd1); 
  bd1.appendChild(mm1.create1ElemByInx("sent_voice_sel_ok","SelVoice-OK"));
  for (let i = 0; i < voices.length; i++) {    
    let la = voices[i].lang;  la = la.slice(0, 2);
    if (la == 'en'){
      lvc.AddNewArr();
      let vel = lvc.create1ElemByInx("mmvoice_item",voices[i].lang+" - "+voices[i].name);
      bd1.appendChild(vel);
      const att1 = document.createAttribute("inxvoice_ar");
      att1.value = i;
      vel.setAttributeNode(att1);
      mm1.loadedvoices = 1;
    }
     //s1 = "<p>" + voices[i].name + "---" + voices[i].lang+ "</p>";
  }
//  let s1 = "";
//  if(gv.TmpLessonNum > 0){s1 = gv.TmpLessonNum;}
//  lls.oop["mmless_item"+s1].style.backgroundColor = "rgb(33, 150, 243)";  
}


function click_sent_select_ok(athis) {
  let gv = Get_GlobalVar();
  let mm1 = gv.MMenu;
  let lls = gv.LstLes;
  gv.LessonNum = gv.TmpLessonNum * 1;
  SendToBDLessonNum(gv);
  StartReLoadLesson(gv);
  output_NameLesson(gv);
  clickCtrlMMenu(mm1.op["mm_but1_i"]);
}

function click_voice_sel_ok(athis) {
  let gv = Get_GlobalVar();
  let mm1 = gv.MMenu;
  let lvc = gv.LstVoi;
  let s1 = "";
  if(gv.TmpSelVoiceMM > 0){s1 = gv.TmpSelVoiceMM;}
  let inxv = lvc.oop["mmvoice_item"+s1].getAttribute("inxvoice_ar");
  gv.CurVoiceElm = gv.Glob_Voices[inxv];
  gv.CurVoiceInx = inxv;
  SendToBDCurVoiceInx(gv);
  clickCtrlMMenu(mm1.op["mm_but1_i"]);
}

function output_NameLesson(gv) {
  let mm1 = gv.MMenu;
  let lls = gv.LstLes;
  let s1 = "";
  if(gv.TmpLessonNum > 0){s1 = gv.TmpLessonNum;}
  mm1.op["mm_but2_i"].innerText = lls.oop["mmless_item"+s1].innerText;
}

function click_mmless_item(athis) {
  let gv = Get_GlobalVar();
  let lls = gv.LstLes;
  let s1 = "";
  if(gv.TmpLessonNum > 0){s1 = gv.TmpLessonNum;}
  lls.oop["mmless_item"+s1].style.backgroundColor = "rgb(85, 85, 85)";
  athis.style.backgroundColor = "rgb(33, 150, 243)";  
  gv.TmpLessonNum = athis.getAttribute("inxatt");
}

function click_mmvoice_item(athis) {
  let gv = Get_GlobalVar();
  let lvc = gv.LstVoi;
  let s1 = "";
  if(gv.TmpSelVoiceMM > 0){s1 = gv.TmpSelVoiceMM;}
  lvc.oop["mmvoice_item"+s1].style.backgroundColor = "rgb(85, 85, 85)";
  athis.style.backgroundColor = "rgb(33, 150, 243)";
  gv.TmpSelVoiceMM = athis.getAttribute("inxatt");
}




function clickCtrlMMenu(athis) {
  let gv = Get_GlobalVar();
  let mm1 = gv.MMenu;
  if (athis.id == "mm_but4_i"){ 
    GetStartLoadVoice(gv);
  }
  if (mm1.mmopen == ""){
    mm1.mmopen = athis.id;
    athis.style.backgroundColor = "rgb(30, 144, 255)";
    mm1.op[mm1.tid[athis.id]].style.display = "block";
  }else if (mm1.mmopen == athis.id){
    mm1.mmopen = "";
    athis.style.backgroundColor = "rgb(192, 192, 192)";
    mm1.op[mm1.tid[athis.id]].style.display = "none";
  }else if (mm1.mmopen != athis.id){    
    mm1.op[mm1.mmopen].style.backgroundColor = "rgb(192, 192, 192)";
    mm1.op[mm1.tid[mm1.mmopen]].style.display = "none";    
    mm1.mmopen = athis.id;
    athis.style.backgroundColor = "rgb(30, 144, 255)";
    mm1.op[mm1.tid[athis.id]].style.display = "block";
  }
}

  