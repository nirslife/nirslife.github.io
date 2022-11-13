function create1BlockMenu3(gv) {
  let mm1 = gv.MMenu;
  let bd2 = mm1.op["mm_div3_i"];
  let txtb = "";
  if (gv.OffLineMode == 1){
    txtb = "Off line";
  }else{
    txtb = "ONLINE";
  }
  bd2.appendChild(mm1.create1ElemByInx("mm_offlinemode_i",txtb));
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