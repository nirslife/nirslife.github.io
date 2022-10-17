
function create1Blocktest1(gv) {
  let Tpb = gv.HtmlTst; 
  let i = gv.HtmlTst.Idx;
  Tpb.create1ElemByInx("blvi_2divbuttctrl_i","");
  let bd2 = Tpb.op["blvi_2divbuttctrl_i"];     
    bd2.appendChild(Tpb.create1ElemByInx("blvi_Generate1","Generate1"));
    bd2.appendChild(Tpb.create1ElemByInx("blvi_Generate2","Generate2"));
    bd2.appendChild(Tpb.create1ElemByInx("blvi_LoadLesson","LoadLesson"));
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
  LoadJsonArray(10);
}


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
  gv.ListLess.push(array1.varless);
  SendToBDArrSens(gv);
  SendToBDListLess(gv);
}





