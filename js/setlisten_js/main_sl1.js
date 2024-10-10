let vGV; // глобальная переменная - она будет одна


function Main_Init_VarObj_Start(gv) {
  gv.ProgName = "Voice"; //gv.ProgName = "Sentence";
  gv.OffLineMode = 0;
  gv.RusTalkMode = 0;
  gv.CurVoiceElm = null;
  gv.CurVoiceInx = -1;
  gv.TmpSelVoiceMM = -1;
  gv.LoadedVoices = 0; 
 // GetStartLoadVoice(gv);
  GetNormalizeUserAgentStr(gv);
  gv.eventvalue = Init_Eventvalue_Devices();
  gv.HtmlBodyObj = Get_HtmlBodyElem();
  gv.HtmlAnyObj = Get_HtmlAnyElem(gv);
  Init_SetVoices(gv);
  gv.FBSets = Init_LoginFireBaseSets(gv);
  gv.HtmlBV = Get_HtmlBV(gv);
 // gv.HtmlTst = Get_HtmlTst(gv); // для тестов
  gv.MMenu =  Get_HtmlMMenu(gv); // main menu
  gv.LstLes =  Get_HtmlLstLes(gv); // список уроков
  gv.LstVoi =  Get_HtmlLstVoi(gv); // для голосов 
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
//  create1Blocktest1(gv);
  create1BlockForVoice1(gv);
  EnterToBD(gv); // LoginFireBase(gv);
}


function Main_App_Run(arg1) {
  vGV = Init_GlobalVar(arg1);
  Main_Init_VarObj_Start(vGV);
  Create_HTML_BODY_Start(vGV);
}
