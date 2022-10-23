let vGV; // глобальная переменная - она будет одна


function Main_Init_VarObj_Start(gv) {
  gv.ProgName = "Voice"; //gv.ProgName = "Sentence";
  gv.eventvalue = Init_Eventvalue_Devices();
  gv.HtmlBodyObj = Get_HtmlBodyElem();
  gv.HtmlAnyObj = Get_HtmlAnyElem(gv);
  gv.msgspeak = Init_SpeechSynthesisUtterance();
  gv.FBSets = Init_LoginFireBaseSets();
  gv.HtmlBV = Get_HtmlBV(gv);
  gv.HtmlTst = Get_HtmlTst(gv); // для тестов   
  gv.MMenu =  Get_HtmlMMenu(gv); // main menu
  gv.LstLes =  Get_HtmlLstLes(gv); // список уроков
  gv.funInit_LessonVarObj = Init_LessonVarObj;
  gv.ArVP = Get_ArVP(gv);
//  gv.funInit_BlViVarObj = Init_BlViVarObj;
//  gv.BVObj = Init_BlViVarObj(gv);
  gv.TplItemVoice = Get_TplItemVoice(gv);
  gv.funCBAfterPutBeforeLoad = AfterPutBeforeLoadLesson;
  gv.funCBAfterLoadArrLesson = AfterLoadArrLesson;
  gv.funCBBeforeLoadAfterPatch = BeforeLoadAfterPatch;
}

function AfterLoadArrLesson(gv) {  
  gv.ArVP.ar = FormVoiceArrCurSentence(gv);
}


// просто для примера
function BeforeLoadAfterPatch(gv, vdata) {

}

/*
// конструктор звуковых предложений 
//!!!не удалять!!!
function Create_HTML_BODY_Start(gv) {  
  gv.HtmlBodyObj.createThis_AddChilds();
  create1BlockVoiceItem(gv);
  createfooterctrlblock(gv);
  LoginFireBase(gv);
}
//!!!не удалять!!!
*/



// инспытательный вариант Create_HTML_BODY_Start
function Create_HTML_BODY_Start(gv) {
  gv.HtmlBodyObj.createThis_AddChilds();
  create1mmenu_obj(gv);
  //gv.funCBAfterLoadArrLesson = TempAfterLoadArrLesson; // пустую функцию, пока ничего делать не нужно
  //create1Blocktest1(gv);
  create1BlockForVoice1(gv);
  LoginFireBase(gv);
}


function Main_App_Run() {
  vGV = Init_GlobalVar();
  Main_Init_VarObj_Start(vGV);
  Create_HTML_BODY_Start(vGV);
}
