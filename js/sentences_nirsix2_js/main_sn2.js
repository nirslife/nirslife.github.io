
let vGV; // глобальная переменная - она будет одна

function MainDBForFunction() {
  // тут БД всех функций приложения, где и в каком файле они находятся
  let main_sn2 = {
    jsname:"main_sn2.js",
    fa:
    [
      {namefun:"Main_App_Run"},
      {namefun:"Main_Init_VarObj_Start"},
      {namefun:"Create_HTML_BODY_Start"}      
    ]
  }  

  let htmlblock_sn2 = {
    jsname:"htmlblock_sn2.js",
    fa:
    [
      {func:"createitemctrlbutton"},
      {func:"Create_HeaderBlock"},
      {func:"Create_FooterBlock"},
      {func:"clickButtondownctrlblock"},
      {func:"clickClearInput"},
      {func:"clickLessonNum"},
      {func:"NextSentenceOnClick"},
      {func:"TestSentOnClick"},
      {func:"clickInputtext"},
      {func:"clickPuzzletext"},
      {func:"FormArr_puzzletextfrom"}         
    ]
  }  

  let object_sn2 = {
    jsname:"object_sn2.js",
    fa:
    [
      {func:"Get_HtmlBodyElem"},
      {func:"Get_HtmlAnyElem"}      
    ]
  }  

  let insets_sn2 = {
    jsname:"insets_sn2.js",
    fa:
    [
      {func:"Init_LoginFireBaseSets"},
      {func:"Init_Eventvalue_Devices"},
      {func:"LoadSentencesJson"},
      {func:"Init_SpeechSynthesisUtterance"},
      {func:"Init_GlobalVar"},
      {func:"Get_GlobalVar"},
      {func:"LoginFireBase"},
      {func:"CallBackLoginFireBase"},

      {func:"RequestArrFireBase"},
      {func:"LoginFireBase"},
      {func:"LoginFireBase"},
    ]
  }

  let utils_sn2 = {
    jsname:"utils_sn2.js",
    fa:
    [
    {func:"SliceSentence"},
    {func:"MixArray"},
    {func:"getRandomInt"},    
    {func:"InitRandomArr"},
    {func:"InitRandomArr3"}    
    ]
  }
  
}

 
function Main_Init_VarObj_Start(gv) {
  gv.ProgName =  "Sentence"; //gv.ProgName = "Voice"; 
  gv.eventvalue = Init_Eventvalue_Devices();
  gv.HtmlBodyObj = Get_HtmlBodyElem();
  gv.HtmlAnyObj = Get_HtmlAnyElem(gv);
  gv.msgspeak = Init_SpeechSynthesisUtterance();   
  gv.FBSets = Init_LoginFireBaseSets();
  gv.MMenu =  Get_HtmlMMenu(gv); // main menu
  gv.LstLes =  Get_HtmlLstLes(gv); // список уроков
  gv.funInit_LessonVarObj = Init_LessonVarObj;
  gv.funCBAfterPutBeforeLoad = AfterPutBeforeLoadLesson;
  gv.funCBAfterLoadArrLesson = AfterLoadArrLesson;  
}

function Create_HTML_BODY_Start(gv) {  
  gv.HtmlBodyObj.createThis_AddChilds();
  create1mmenu_obj(gv);
  Create_HeaderBlock(gv);
  Create_FooterBlock(gv);
  LoginFireBase(gv);
}

function Main_App_Run() {
  vGV = Init_GlobalVar();
  Main_Init_VarObj_Start(vGV);  
  Create_HTML_BODY_Start(vGV);  
}  



  