function GetNormalizeUserAgentStr(gv) {
  let s1 = navigator.userAgent;
  s1 = s1.replaceAll(" ","");   // убираем пробелы
  s1 = s1.replaceAll("/","");
  s1 = s1.replaceAll('\\',"");
  s1 = s1.replaceAll('(',"");
  s1 = s1.replaceAll(')',"");
  s1 = s1.replaceAll('.',"");
  gv.NormStrUserAgent = s1;
  return s1;
}

function GetStartLoadVoice(gv){  
  if (gv.LoadedVoices == 0) {OnLoadVoice();}
  if (window.speechSynthesis.onvoiceschanged !== undefined)
  window.speechSynthesis.onvoiceschanged = OnLoadVoice();
}


function OnLoadVoice() {
  let gv = Get_GlobalVar();
  const synth = window.speechSynthesis;
  let voices = [];
  gv.Glob_Voices = synth.getVoices();
  voices = gv.Glob_Voices;
  if (voices.length) {gv.LoadedVoices = 1;}
  if (gv.LoadedVoices) {LoadVoicesTo_mmenu(gv);}
}


function SendToBDUserAgent(gv) { ///!!!!! test test
  let vobj = {};
  vobj[gv.NormStrUserAgent] = {};
  vobj[gv.NormStrUserAgent].CurVoiceElm = gv.CurVoiceElm;
 // vobj["989899"] = 1;
  RequestArrFireBase(gv, vobj, 'PATCH');
}

function SendToBDCurVoiceInx(gv) {
  let vobj = {};
  let el = {};
  el.CurVoiceInx = gv.CurVoiceInx;
  el.CurVoiceElm = gv.CurVoiceElm;
  vobj[gv.NormStrUserAgent] = el;
  RequestArrFireBase(gv, vobj, 'PATCH');
}


