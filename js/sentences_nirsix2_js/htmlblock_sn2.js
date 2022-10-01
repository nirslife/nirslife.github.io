function createitemctrlbutton(gv) {      
  let AnyObj = gv.HtmlAnyObj;   
  AnyObj.createElemByInx("blocktemctrlid1","");
  let vObj = AnyObj.kp["blocktemctrlid1"];
  vObj.style.display = "block";

  const Elem1 = document.createElement("div");  
  Elem1.className = "confblock";
  Elem1.innerText = "Стереть1";   
  const att1 = document.createAttribute("onclick");
  att1.value = "clickClearInput(this)";  
  Elem1.setAttributeNode(att1);          
  
  const Elem2 = document.createElement("div");
  Elem2.id = "confLessonNumid1";
  Elem2.className = "confblock";
  Elem2.innerText = "Lesson#"+gv.LessonNum;   
  const att2 = document.createAttribute("onclick");
  att2.value = "clickLessonNum(this)";  
  Elem2.setAttributeNode(att2);

  vObj.appendChild(Elem1);
  vObj.appendChild(Elem2);
  vObj.appendChild(AnyObj.createElemByInx("StepMixDec1","  -  "));
  vObj.appendChild(AnyObj.createElemByInx("StepMix1","4"));
  vObj.appendChild(AnyObj.createElemByInx("StepMixInc1","  +  "));
}
  
function Create_HeaderBlock(gv) {  
  createitemctrlbutton(gv);
    
  const DivEl2 = document.createElement("div"); 
  DivEl2.className = "downctrlblock";  
  DivEl2.innerText = "V";  
  const att3 = document.createAttribute(gv.eventvalue);
  att3.value = "clickButtondownctrlblock(this)";  
  DivEl2.setAttributeNode(att3); 

  let hdobj = gv.HtmlBodyObj.kp["header1"]; //GetpObj("header1");
  hdobj.appendChild(DivEl2);   
  hdobj.appendChild(gv.HtmlAnyObj.kp["blocktemctrlid1"]);   
}
  
  
function Create_FooterBlock(gv) {
  const Butt1 = document.createElement("div");
  Butt1.id = "testbutt";
  Butt1.className = "footerbutt";  
  Butt1.innerText = "Verify";
  const att1 = document.createAttribute("onclick");
  att1.value = "TestSentOnClick()";  
  Butt1.setAttributeNode(att1);             
    
  const Butt2 = document.createElement("div");
  Butt2.id = "nextsentbutt";
  Butt2.className = "footerbutt";  
  Butt2.innerText = "Next";
  const att2 = document.createAttribute("onclick");
  att2.value = "NextSentenceOnClick()";  
  Butt2.setAttributeNode(att2);                   
    
  let m_cobj = gv.HtmlBodyObj.kp["m_container1"]; //GetpObj("m_container1");  
  let AnyObj = gv.HtmlAnyObj; 
  m_cobj.appendChild(Butt1);
  m_cobj.appendChild(Butt2);     
  m_cobj.appendChild(AnyObj.createElemByInx("StepMixS_2","2"));
  m_cobj.appendChild(AnyObj.createElemByInx("StepMixS_4","4"));
  m_cobj.appendChild(AnyObj.createElemByInx("StepMixS_7","7"));
}

function clickButtondownctrlblock(athis) {
  let gv = Get_GlobalVar();
  if (athis.innerText == "V"){
    athis.innerText = "X";
    gv.pvoiceitemctrl.style.display = "block";
  }else{
    athis.innerText = "V";
    gv.pvoiceitemctrl.style.display = "none"; 
  }  
}

function clickClearInput(aThis){
  InpNode = document.getElementById("div_inputtextfrom1");
  if (InpNode) {
    while (InpNode.firstChild) {
       clickInputtext(InpNode.firstChild);
    }
  }	
}

function clickLessonNum(aNode){  
  let gv = Get_GlobalVar();
  gv.LessonNum = gv.LessonNum + 1;
  if (gv.LessonNum > gv.CountLessonNum){ gv.LessonNum = 1;}
  const Elem1 = document.getElementById("confLessonNumid1");
  Elem1.innerText = "Lesson#"+gv.LessonNum; 
}

function NextSentenceOnClick() {
  let gv = Get_GlobalVar();
  gv.CurSentences++;
  if (gv.ArrSens.length == gv.CurSentences) {
    gv.CurSentences = 0;    
  }
  SendToBDCurSentences(gv);
  DisplayExercise(gv);
  const remNode = document.getElementById("div_verify_cont1"); 
  if (remNode){remNode.remove();}  
  document.getElementById("verify_cont1").className = "verify_def";  
}

function TestSentOnClick() {
  let gv = Get_GlobalVar();  
  let inpstr = ""; 
  let srcstr = "";
  const myCollection = document.getElementsByClassName("inputtext");
  for (let i = 0; i < myCollection.length; i++) {
    //myCollection[i].style.color = "red";
    inpstr = inpstr + myCollection[i].innerHTML;
  }  
  inpstr = inpstr.replaceAll(" ","");
  inpstr = inpstr.toUpperCase();
  srcstr = gv.ArrSens[gv.CurSentences].Eng.replaceAll(" ","");
  srcstr = srcstr.toUpperCase();
    
  const remNode = document.getElementById("div_verify_cont1");
  if (remNode){remNode.remove();}
    
  const vrfNode = document.getElementById("verify_cont1");  
  const rootDiv = document.createElement("div");
  rootDiv.id = "div_verify_cont1";
  const bInfo = document.createElement("div");  
  bInfo.className = "verify_info";
   
  const EngSrcSen = document.createElement("div");  
  EngSrcSen.className = "verify_info";
  EngSrcSen.innerText = gv.ArrSens[gv.CurSentences].Eng;
    
  const EngSrc = document.createElement("div");  
  EngSrc.className = "verify_info";
  EngSrc.innerText = srcstr;
  const EngInp = document.createElement("div");  
  EngInp.className = "verify_info";
  EngInp.innerText = inpstr;
  if (inpstr == srcstr){
    vrfNode.className = "verify_green";   
    bInfo.innerText = "ХОРОШО!";  	  
  }
  else{
    vrfNode.className = "verify_red"; 
    bInfo.innerText = "НЕ ВЕРНО!";  	  
  }  
  rootDiv.appendChild(EngSrcSen);  
  rootDiv.appendChild(EngSrc);
  rootDiv.appendChild(EngInp);    
  vrfNode.appendChild(rootDiv);      
}
    
function clickInputtext(aThis) {
  let gv = Get_GlobalVar();  
  const InpBl = document.getElementById("Puzzid"+aThis.getAttribute("IndexArr"));  
  InpBl.className = "puzzleblock inpon";        
  const att1 = document.createAttribute(gv.eventvalue);    
  att1.value = "clickPuzzletext(this)";  
  InpBl.setAttributeNode(att1);        
  aThis.remove();   
}

function clickPuzzletext(aThis) {
  let gv = Get_GlobalVar();  
  aThis.removeAttribute(gv.eventvalue);
  aThis.className = "inpoff puzzleblock";    
  const InTxt = document.createElement("div");
  InTxt.innerText = aThis.innerText;
  InTxt.className = "inputtext";      
  const att1 = document.createAttribute(gv.eventvalue);//   
  att1.value = "clickInputtext(this)";  
  InTxt.setAttributeNode(att1);             
  const att2 = document.createAttribute("IndexArr");
  att2.value = aThis.getAttribute("IndexArr");  
  InTxt.setAttributeNode(att2);       
  speak(gv, aThis.innerText, 1.2);
  document.getElementById("div_inputtextfrom1").appendChild(InTxt);  
}


function FormArr_puzzletextfrom(gv){
// формирование массива пазлов-слов (состоит из всех слов ответа и подмешиваем слова из соседнего предложения) 
// obj - обьект предложений,  
// Indx - индекс предложения
  obj = gv.ArrSens;
  Indx = gv.CurSentences;
  // IndxNei - индекс предложения для подмешивания слов
  let IndxNei = Indx + 1;   
  if (IndxNei >= obj.length){IndxNei = 0;}   
  let EngArrDbl = SliceSentence(obj[Indx].Eng); // разбивка англ. варианта пары
  let EngArrNei = SliceSentence(obj[IndxNei].Eng); // разбивка англ. из соседней пары для подмешивания 
    
  // добавляем к EngArrDbl массив EngArrNei
  let lnei = EngArrNei.length;
  let ldbl = EngArrDbl.lenght;
  if (lnei > gv.MaxMixWordsAdd ){ lnei = gv.MaxMixWordsAdd;} // добавляем не больше чем MaxMixWordsAdd-слов
  if (ldbl > 30){ lnei = 0; } // если слов больше 30 то не подмешиваем
  for (i = 0; i < lnei; i++) {
    EngArrDbl.push(EngArrNei[i]);    
  }    
  return EngArrDbl; 
}

function DisplayExercise(gv){    
// obj - обьект предложений,  
// Indx - индекс предложения

  let obj = gv.ArrSens;
  let Indx = gv.CurSentences;  
  let AnyObj = gv.HtmlAnyObj;   
  let StepMix = gv.DefStepMix;
  if (obj[Indx].StepMix) { 
    StepMix = obj[Indx].StepMix;    
  }else{
    obj[Indx].StepMix = StepMix;
    SendToBDArrSens(gv);
  }

  AnyObj.kp["StepMix1"].innerText = StepMix;

  // очищаем старое, если есть
  const rNode1 = document.getElementById("div_puzzletextfrom1");
  const rNode2 = document.getElementById("div_inputtextfrom1");
  if (rNode1){rNode1.remove();}
  if (rNode2){rNode2.remove();}
  let EngArrDbl = FormArr_puzzletextfrom(gv);    
  let MixArr = InitRandomArr3(EngArrDbl.length, StepMix);
  const rootDiv = document.createElement("div");
  rootDiv.id = "div_puzzletextfrom1";
  for (i = 0; i < EngArrDbl.length; i++) {    
    const InpBl = document.createElement("div");
    InpBl.innerText = EngArrDbl[MixArr[i]];
    InpBl.className = "puzzleblock inpon";    
    const att1 = document.createAttribute(gv.eventvalue); 
    att1.value = "clickPuzzletext(this)";  
    InpBl.setAttributeNode(att1);        
    const att2 = document.createAttribute("IndexArr");
    att2.value = i;  
    InpBl.id = "Puzzid"+i;
    InpBl.setAttributeNode(att2);        		
    rootDiv.appendChild(InpBl);    
  }
  document.getElementById("puzzletextfrom1").appendChild(rootDiv); 
    
  const inpDiv = document.createElement("div");
  inpDiv.id = "div_inputtextfrom1";
  document.getElementById("inputtextfrom1").appendChild(inpDiv); 
    
  textR = document.getElementById("textfrom1");
  textR.innerText = obj[Indx].Rus; 
  const att3 = document.createAttribute("onmousedown"); //onclick //ontouchstart
  att3.value = "clickTextfrom(this)";  
  textR.setAttributeNode(att3);         
  
  //document.getElementById("footerinfcount").innerText = Indx + " of " + obj.length;
  document.getElementById("nextsentbutt").innerText = Indx + " of " + obj.length;
  //
}   // end of function
  
function clickTextfrom(aThis) {
  let gv = Get_GlobalVar();    
  let inpstr = ""; 
  const myCollection = document.getElementsByClassName("inputtext");
  for (let i = 0; i < myCollection.length; i++) {    
    inpstr = inpstr + " " + myCollection[i].innerHTML;
  } 
  speak(gv, inpstr, 0.8);
}

function clickStepMixChange(athis) {
  let e1 = 0;    
  if (athis.id == "StepMixDec1") {e1 = -1;}
  if (athis.id == "StepMixInc1") {e1 = 1;}    
  let gv = Get_GlobalVar();        
  let maxm = gv.MaxStepMix / 1;
  obj = gv.ArrSens; Indx = gv.CurSentences; 
  let aValue = obj[Indx].StepMix;   
  if (aValue) {       
    aValue = aValue + e1;
    if (aValue == 0) {aValue = 1;}
    if (aValue >= maxm + 1) {aValue = maxm;}
  };
  if (aValue != obj[Indx].StepMix) {
    obj[Indx].StepMix = aValue;
    SendToBDArrSens(gv);
    DisplayExercise(gv);
  }
}    

function clickStepMixSet(athis) {
  let gv = Get_GlobalVar();
  obj = gv.ArrSens; Indx = gv.CurSentences; 
  let aValue = 2;  
  if (athis.id == "StepMixS_2") {aValue = 2;}
  if (athis.id == "StepMixS_4") {aValue = 4;}
  if (athis.id == "StepMixS_7") {aValue = 7;}  
  if (aValue != obj[Indx].StepMix) {
    obj[Indx].StepMix = aValue;
    SendToBDArrSens(gv);
    DisplayExercise(gv);
  }
}