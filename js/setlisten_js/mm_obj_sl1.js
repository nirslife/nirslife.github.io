function create1mmenu_obj(gv) {
    let mm1 = gv.MMenu;
    let lls = gv.ListLess; 
    //let i = gv.MMenu.Idx;
    mm1.create1ElemByInx("mm_div1_i","");
    let bd2 = mm1.op["mm_div1_i"];     
//      bd2.appendChild(mm1.create1ElemByInx("mm_LoadLesson","ListLesson"));
//      bd2.appendChild(mm1.create1ElemByInx("mm_LoadVarList","LoadVarList"));

    mm1.create1ElemByInx("mm_div2_i","");
    let bd3 = mm1.op["mm_div2_i"];
  //bd3.appendChild(mm1.create1ElemByInx("sent_select_ok","Select-OK"));


//      bd3.appendChild(mm1.create1ElemByInx("part1_item","part1_item"));
  
    mm1.create1ElemByInx("mm_but1_i","");
    mm1.create1ElemByInx("mm_but2_i","");
    mm1.create1ElemByInx("mm_1divctrl_i","");
    mm1.op["mm_but1_i"].style.backgroundColor = "rgb(192, 192, 192)";
    //mm1.op["mm_but2_i"].style.backgroundColor = "rgb(192, 192, 192)";
    mm1.op["mm_but1_i"].innerText = "Menu1";
    mm1.op["mm_but2_i"].innerText = "Menu2";
    mm1.mmopen = "mm_but2_i";
    mm1.op["mm_but2_i"].style.backgroundColor = "rgb(30, 144, 255)";    
    mm1.op[mm1.tid[mm1.mmopen]].style.display = "block";

    let bd1 = mm1.op["mm_1divctrl_i"];
    bd1.appendChild(mm1.op["mm_but1_i"]);
    bd1.appendChild(mm1.op["mm_but2_i"]);
    bd1.appendChild(mm1.op["mm_div1_i"]);
    bd1.appendChild(mm1.op["mm_div2_i"]);
    //clickButtondownctrlTest(mm1.op["mm_2linebut1menu_i"]);
    
    mm1.create1ElemByInx("mm_0main_i","");
    mm1.op["mm_0main_i"].appendChild(bd1);  
    mm1.create1ElemByInx("mm_00main_i","");
    mm1.op["mm_00main_i"].appendChild(mm1.op["mm_0main_i"]);  
    gv.HtmlBodyObj.kp["blockvoice"].appendChild(mm1.op["mm_00main_i"]);    
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
}

function click_sent_select_ok(athis) {
  let gv = Get_GlobalVar();
  let mm1 = gv.MMenu;
  gv.LessonNum = gv.TmpLessonNum;
  SendToBDLessonNum(gv);
  StartReLoadLesson(gv);
  clickCtrlMMenu(mm1.op["mm_but1_i"]);
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


function clickCtrlMMenu(athis) {
  let gv = Get_GlobalVar();
  let mm1 = gv.MMenu;
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

  