
function create1Blocktest1(gv) {
  let mm1 = gv.MMenu;
  let bd2 = mm1.op["mm_div1_i"];
  bd2.appendChild(mm1.create1ElemByInx("blvi_LoadLesson","LoadLesson"));
  bd2.appendChild(mm1.create1ElemByInx("blvi_LoadVarList","LoadVarList"));
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
  let varlst = gv.ListLess;
  for(let j=0; j < varlst.length; j++) {
    let key1 = gv.ListLess[j].idvarname;
    let key2 = gv.ListBV[j].idvarname;
    ars = gv.vdata1[key1];
    let oar = [];
    for(let i = 0; i < ars.length; i++) {  
      let e1 = {};
      e1.Sentences1 = ars[i].Eng;
      e1.FirstBy1Word = 1;
      e1.WaitBy1Word_mSec = 200;
      e1.SpeakRateBy1Word = 0.5;
      e1.SpeakRateSenten = 0.8;
      oar[i] = e1;
    }
    gv.BVSens = oar;
    SendToBD_BVLess(gv,key2);
    gv.funCBBeforeLoadAfterPatch = TempBeforeLoadAfterPatch;  
  }
}

function clickGenerate2(athis){
  let gv = Get_GlobalVar();
  //1) генерируем varBVlist
  SendToBDVarBV(gv);
  gv.funCBBeforeLoadAfterPatch = TempBeforeLoadAfterPatch;
}


function TempBeforeLoadAfterPatch(gv, vdata) {
  gv.HtmlBodyObj.kp["blocksentenceitem"].innerText = 'added'+vdata.toString();
}

function TempAfterLoadArrLesson(gv) {
  // ничего не делаем
}


function clickblvi_LoadLesson(athis) {
   //загрузил и сразу отключил
  for (let i=24;i<=43;i++){
    LoadJsonArray(i);
  }  
}

//////// Load  arrles -----------------------------------------
function InitUrlJsonArray1(aLessonNum) {
  const UrlArrP1 = "https://nirslife.github.io/json/lesson";
  const UrlArrP2 = ".json";  
  let UrlArray1 = UrlArrP1 + aLessonNum + UrlArrP2;
  return UrlArray1; 
}

async function LoadJsonArray(aLessonNum) {
  const response = await fetch(InitUrlJsonArray1(aLessonNum));
  const array1 = await response.json();
  CallBackForTransport(array1, aLessonNum);
}

function CallBackForTransport(array1,aLessonNum) {
  let gv = Get_GlobalVar();
  gv.KeyLess = "arrles"+aLessonNum;
  gv.ArrSens = array1.arrw;
  SendToBDArrSens(gv);
  //gv.ListLess.push(array1.varless);
  //SendToBDListLess(gv);
}
/////////******************************************************


//////// Load  varlist -----------------------------------------
function clickblvi_LoadVarList(athis) { 
  LoadJsonArray_VarList(); 
}
function InitUrlJsonArrayList(s1) {
  const UrlArrP1 = "https://nirslife.github.io/json/!varlist";
  const UrlArrP2 = ".json";  
  let UrlArray1 = UrlArrP1 + s1 + UrlArrP2;
  return UrlArray1; 
}
async function LoadJsonArray_VarList() {
  const response = await fetch(InitUrlJsonArrayList(1));
  const array1 = await response.json();
  CallBackForTransportList(array1);
}
function CallBackForTransportList(array1) {
  let gv = Get_GlobalVar();
  gv.ListLess = array1.varlist;  
  SendToBDListLess(gv);
}




