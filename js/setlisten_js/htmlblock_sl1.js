/*
let LessonNum = 1;
let ListLesson;
let eventvalue;
let pvoiceitemctrl;
let arrobjs = [{am:[],sp:null}];
*/
/*
function createitemctrl(gv) {  
  let AnyObj = gv.HtmlAnyObj;
  AnyObj.create1ElemByInx("blockvoiceitemid","");
  AnyObj.create1ElemByInx("blockvoiceitemctrlid","");
  AnyObj.create1ElemByInx("downctrlblockid","V");  
  AnyObj.kp["blockvoiceitemid"].appendChild(AnyObj.kp["downctrlblockid"]);
  AnyObj.kp["blockvoiceitemid"].appendChild(AnyObj.kp["blockvoiceitemctrlid"]);
  gv.HtmlBodyObj.kp["blockvoice"].appendChild(AnyObj.kp["blockvoiceitemid"]);
}

function createitemctrlbutton(gv) {
  let AnyObj = gv.HtmlAnyObj;  
  let bicl = gv.HtmlAnyObj.kp["blockvoiceitemctrlid"];
  bicl.appendChild(AnyObj.create1ElemByInx("Delete1","Delete"));
  bicl.appendChild(AnyObj.create1ElemByInx("DeleteOk1","Delete OK"));
  bicl.appendChild(AnyObj.create1ElemByInx("SpeedVoiceDec","-"));
  bicl.appendChild(AnyObj.create1ElemByInx("SpeedVoiceVal","0.8"));
  bicl.appendChild(AnyObj.create1ElemByInx("SpeedVoiceInc","+"));
}
*/

function create1BlockVoiceItem(gv) {  
  let Tpb = gv.HtmlBV; 
  let i = gv.HtmlBV.Idx;
  Tpb.create1ElemByInx("blvi_2divbuttctrl_i","");
  let bd2 = Tpb.op["blvi_2divbuttctrl_i"];     
    bd2.appendChild(Tpb.create1ElemByInx("blvi_3Delete1","Delete"));
    bd2.appendChild(Tpb.create1ElemByInx("blvi_3DeleteOk1","Delete OK"));
    bd2.appendChild(Tpb.create1ElemByInx("blvi_3SpeedVoiceDec","-"));
    bd2.appendChild(Tpb.create1ElemByInx("blvi_3SpeedVoiceVal","1.0"));
    bd2.appendChild(Tpb.create1ElemByInx("blvi_3SpeedVoiceInc","+"));  
  Tpb.create1ElemByInx("blvi_2linebut1menu_i","V");  
  Tpb.create1ElemByInx("blvi_1divctrl_i","");
  Tpb.op["blvi_2linebut1menu_i"].innerText = (i + 1)*1;
  Tpb.op["blvi_2linebut1menu_i"].style.backgroundColor = "rgb(192, 192, 192)";
  let bd1 = Tpb.op["blvi_1divctrl_i"];
  bd1.appendChild(Tpb.op["blvi_2linebut1menu_i"]);
  bd1.appendChild(Tpb.op["blvi_2divbuttctrl_i"]);
  Tpb.create1ElemByInx("blvi_0main_i","");
  Tpb.op["blvi_0main_i"].appendChild(bd1);  
  Tpb.create1ElemByInx("blvi_00main_i","");
  Tpb.op["blvi_00main_i"].appendChild(Tpb.op["blvi_0main_i"]);  
  gv.HtmlBodyObj.kp["blockvoice"].appendChild(Tpb.op["blvi_00main_i"]);  
}

function createaObjItemsbytempl(gv) {
  //aBodyObj, aSomeObj, aObj, Indx
  //let Aj = gv.HtmlAnyObj;
  let Tpb = gv.HtmlBV;     
  let ars = gv.ArrSens;
  let Indx = gv.CurSentVoice;  
  let ItOj = gv.TplItemVoice;
  if (Tpb.op["blvi_0foot_i"]){Tpb.op["blvi_0foot_i"].remove();} 
  Tpb.create1ElemByInx("blvi_0foot_i","");  
  let EngArr = SliceSentence(ars[Indx].Eng); // �������� ����. �������� ����
 // ItOj.sh.attrib_i[3].aname_i = eventvalue;// "ontouchend";
  for(let i = 0; i < EngArr.length; i++) {
    ItOj.ar.push(document.createElement(ItOj.sh.ename_i));
    for(let j = 0; j < ItOj.sh.atr_i.length; j++) {
      let att1 = document.createAttribute(ItOj.sh.atr_i[j].aname_i);
      let avv = ItOj.sh.atr_i[j].avalue_i
      if (ItOj.sh.atr_i[j].Add_i == 1) {avv = avv + i;} 
      att1.value = avv;      
      ItOj.ar[i].setAttributeNode(att1);  	         
    }
    ItOj.ar[i].innerText = EngArr[i];
    Tpb.op["blvi_0foot_i"].appendChild(ItOj.ar[i]);
  } 
  Tpb.op["blvi_00main_i"].appendChild(Tpb.op["blvi_0foot_i"]);
 // gv.HtmlBodyObj.kp["blocksentenceitem"].appendChild(Aj.kp["bsentenitemid"]);    
}  

function AfterLoadArrLesson(gv) {
  createaObjItemsbytempl(gv);
}

function clickButtondownctrlblock(athis) {
  let gv = Get_GlobalVar();  
  let Bj = gv.HtmlBV;
  let inx = athis.getAttribute("InxAtt");
  inx = inx * 1;
  if (inx >= 0) {
    Bj.SetIdx(inx);
   // let op1 = gv.BVObj.GetCurItem();
    if (athis.style.backgroundColor == "rgb(192, 192, 192)"){
      athis.style.backgroundColor  = "rgb(30, 144, 255)"; 
      Bj.op["blvi_2divbuttctrl_i"].style.display = "block";
      athis.innerText = "__"+(inx+1)+"__"; 
    }else{
      athis.style.backgroundColor = "rgb(192, 192, 192)";
      Bj.op["blvi_2divbuttctrl_i"].style.display = "none";
      athis.innerText = (inx+1);
    }
  }    
}

function clickVoiceItem(aThis) {
  let gv = Get_GlobalVar();
  let Bj = gv.HtmlBV;  
  let ix = aThis.getAttribute("IndxA");  
  //gv.ItVUp[Bj.CurItem].am.splice(ix, 1);
  Bj.wr.w.splice(ix, 1);
  aThis.remove();
}  

function clicksentenceitem(aThis) {
  let gv = Get_GlobalVar();
  let Bj = gv.HtmlBV;
  const InTxt = document.createElement("div");
  //gv.ItVUp[Bj.CurItem].am.push(aThis.innerText);
  Bj.wr.w.push(aThis.innerText);
  InTxt.innerText = aThis.innerText;
  InTxt.className = "sentenceitemdw";    
  const att1 = document.createAttribute(gv.eventvalue);   
  att1.value = "clickVoiceItem(this)";  
  InTxt.setAttributeNode(att1);               
  const att2 = document.createAttribute("IndxA");
  //let ix = gv.ItVUp[Bj.CurItem].am.length - 1;
  let ix = Bj.wr.w.length - 1;  
  att2.value = ix;  
  InTxt.setAttributeNode(att2);
  Bj.op["blvi_0main_i"].appendChild(InTxt);
}


function createfooterctrlblock(gv) {
  let AnyObj = gv.HtmlAnyObj;  
  let bicl = gv.HtmlBodyObj.kp["footerctrlblock"];
  bicl.appendChild(AnyObj.create1ElemByInx("AddVoiceItemid","AddVoiceItem"));
  bicl.appendChild(AnyObj.create1ElemByInx("NextSentenceid","NextSentence"));
  bicl.appendChild(AnyObj.create1ElemByInx("SaveToBaseid","SaveToBase"));
}


