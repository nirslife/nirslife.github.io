
function Init_GlobalVar() {
  // Функционал для инициализации Глобальной переменной;
  let gv = {
    funCBAfterLoadArrLesson:function(){}
  };
  return gv;
}

function Get_GlobalVar() {
  return vGV;
}


//************** BD *****************/
function Init_LoginFireBaseSets() {
  let oj = {};
  let apiKey1 = "AIzaSyDU0LWwjtz2BFXJOP2fM_UnhmracvGCzeo";
  //oj.email = "tese@nirsix.app.net"; 
  //oj.password = "po78L95wer1";
  oj.email = "saps@nukr.net"; 
  oj.password = "po78L950001";  
  oj.UrlTrans1 = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey1}`;
  oj.UrlPost1 = "https://nirsix-engapp-default-rtdb.europe-west1.firebasedatabase.app/mn.json?auth=";
  return oj;
}

async function LoginFireBase(gv) {  
  email = gv.FBSets.email;
  password = gv.FBSets.password;
  aUrlTrans1 = gv.FBSets.UrlTrans1;
  const response = await fetch(aUrlTrans1, {
    method: 'POST',
    body: JSON.stringify({email, password, returnSecureToken: true}),
    headers: {
      'Content-Type': 'application/json'
    }  
  });  
  const vdata = await response.json();
  gv.FBSets.idToken = vdata.idToken;
  CallBackLoginFireBase(gv);
//  console.log(names);   
}

function CallBackLoginFireBase(gv){  
  //let arr1 = "SavedArrLessKey1";  // ошибка 400
  let arr1;  
  RequestArrFireBase(gv, arr1, 'GET');
}


async function RequestArrFireBase(gv, vobj, ametod) { 
  let jsn1 = JSON.stringify(vobj); 
  let aurl = gv.FBSets.UrlPost1 + gv.FBSets.idToken;
  const response = await fetch(aurl, {
    method: ametod,
    body: jsn1,
    headers: {
      'Content-Type': 'application/json'
    }  
  });  
  let vdata = await response.json(); 
  if(ametod == 'GET'){AfterPutBeforeLoadLesson(gv, vdata);}    
//  console.log(names);   
}

function AfterPutBeforeLoadLesson(gv, vdata) {  
  gv.ListLess = vdata["varlist"];
  gv.LessonNum = vdata["SavedArrLessKey1"] * 1;  // * на 1 для уст. типа число
  gv.KeyLess = gv.ListLess[gv.LessonNum].idvarname;    
  gv.ArrSens = vdata[gv.KeyLess];
  //gv.ListLess.length;  
  gv.CurSentences = 0;
  if (gv.ListLess[gv.LessonNum].CurSentences) {gv.CurSentences = gv.ListLess[gv.LessonNum].CurSentences;}
  gv.MaxStepMix = vdata["MaxStepMix"] * 1; // * на 1 для уст. типа число
  gv.DefStepMix = vdata["DefStepMix"] * 1; // * на 1 для уст. типа число
  gv.funCBAfterLoadArrLesson(gv);
}

function SendToBDArrSens(gv) {
  let text = '{ "' + gv.KeyLess + '":[]}';
  let vobj = JSON.parse(text);
  vobj[gv.KeyLess] = gv.ArrSens;  
  RequestArrFireBase(gv, vobj, 'PATCH')
}

function SendToBDCurSentences(gv) {
  let text = '{ "varlist":[]}';
  let vobj = JSON.parse(text);
  gv.ListLess[gv.LessonNum].CurSentences = gv.CurSentences;
  vobj["varlist"] = gv.ListLess;  
  RequestArrFireBase(gv, vobj, 'PATCH')
}

function SendToBDLessonNum(gv) {  
  let vobj = {};  
  vobj["SavedArrLessKey1"] = gv.LessonNum;  
  RequestArrFireBase(gv, vobj, 'PATCH')
}





//************** END BD *****************/


function Init_Eventvalue_Devices() {
  const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', "i");
  let aeventv = "onclick";
  if (devices.test(navigator.userAgent)) {
    aeventv = "ontouchend"; // ontouchstart ontouchend    
    //               alert("Вы используете мобильное устройство (телефон или планшет).")
  }   
  return aeventv;
}

function Init_SpeechSynthesisUtterance() {
  ms = new SpeechSynthesisUtterance();
  return ms;
}  

/*
async function LoadSentencesJson(aLessonNum, aCallBack) {
  function InitUrlSentencesJson(aLessonNum) {
    const UrlArrP1 = "https://nirslife.github.io/json/arr_sentences";
    const UrlArrP2 = ".json";  
    let UrlArray1 = UrlArrP1 + aLessonNum + UrlArrP2;
    return UrlArray1; 
  }  
  const response = await fetch(InitUrlSentencesJson(aLessonNum));
  const array1 = await response.json();
  aCallBack(array1);
}
*/ 