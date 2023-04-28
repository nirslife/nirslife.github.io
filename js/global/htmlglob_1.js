function create1BlockMenu3(gv) {
  let mm1 = gv.MMenu;
  let bd2 = mm1.op["mm_div3_i"];
  let txtb = "";
  let txt2 = "";
  if (gv.OffLineMode == 1){
    txtb = "Off line";
  }else{
    txtb = "ONLINE";
  }
  if (gv.RusTalkMode == 1){
    txt2 = "Rus_ON";
  }else{
    txt2 = "Rus_Off";
  }
  bd2.appendChild(mm1.create1ElemByInx("mm_offlinemode_i",txtb));
  bd2.appendChild(mm1.create1ElemByInx("mm_RusTalkMode_i",txt2));
}

function click_mm_offlinemode_i(athis){
  let gv = Get_GlobalVar();
  if (gv.OffLineMode == 1){
    gv.OffLineMode = 0;
    gv.MMenu.op["mm_offlinemode_i"].innerText = "ONLINE";
    let arr1;  
    RequestArrFireBase(gv, arr1, 'GET');
  }else{
    gv.OffLineMode = 1;
    gv.MMenu.op["mm_offlinemode_i"].innerText = "Off line";
    RequestOffLineBase(gv);
  }
}

function click_mm_RusTalkMode_i(athis){
  let gv = Get_GlobalVar();
  if (gv.RusTalkMode == 1){
    gv.RusTalkMode = 0;
    gv.MMenu.op["mm_RusTalkMode_i"].innerText = "Rus_Off";
    gv.RIF = "";
    gv.ArVP.ar = FormVoiceArrCurSentence(gv);
  }else{
    gv.RusTalkMode = 1;
    gv.MMenu.op["mm_RusTalkMode_i"].innerText = "Rus_ON";
    gv.RIF = "R";
    gv.ArVP.ar = FormVoiceArrCurSentence(gv);
  }
}
