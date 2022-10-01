// gv.pvoiceitemctrl
// gv.LessonNum
// gv.CountLessonNum
// gv.CurSentences
// ListLesson
// gv.ListLesson.arrw.
// gv.MaxMixWordsAdd
// obj.arrw[Indx].Rus; 

function createitemctrlbutton(gv) {       
    gv.pvoiceitemctrl = document.createElement("div"); 
    gv.pvoiceitemctrl.className = "blockvoiceitemctrl";    
    
/*     const DivEl1 = document.createElement("div");
    DivEl1.className = "confbuttctrl";
    DivEl1.innerText = "Delete";
    const DivEl2 = document.createElement("div");
    DivEl2.className = "confbuttctrl";
    DivEl2.innerText = "Delete OK";
 */    

    const Elem1 = document.createElement("div");  
    Elem1.className = "confblock";
    Elem1.innerText = "Стереть";   
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


    const DivEl3 = document.createElement("div");
    DivEl3.className = "confbuttctrl";
    DivEl3.innerText = "  -  ";
    const DivEl4 = document.createElement("div");
    DivEl4.className = "confbuttctrl";
    DivEl4.innerText = gv.StepMix;
    const DivEl5 = document.createElement("div");
    DivEl5.className = "confbuttctrl";
    DivEl5.innerText = "  +  ";
    
//    gv.pvoiceitemctrl.appendChild(DivEl1);
//    gv.pvoiceitemctrl.appendChild(DivEl2);
  gv.pvoiceitemctrl.appendChild(Elem1);
  gv.pvoiceitemctrl.appendChild(Elem2);

  gv.pvoiceitemctrl.appendChild(DivEl3);
  gv.pvoiceitemctrl.appendChild(DivEl4);
  gv.pvoiceitemctrl.appendChild(DivEl5);
}
  
function Create_HeaderBlock(gv) {  
  createitemctrlbutton(gv);
    
  const DivEl2 = document.createElement("div"); 
  DivEl2.className = "downctrlblock";  
  DivEl2.innerText = "V";
  const att3 = document.createAttribute(gv.eventvalue);
  att3.value = "clickButtondownctrlblock(this)";  
  DivEl2.setAttributeNode(att3); 

    /*
    pvoiceitemctrl = document.createElement("div"); 
    pvoiceitemctrl.className = "blockvoiceitemctrl";
    createitemctrlbutton(gv.pvoiceitemctrl);
    */
  
  let hdobj = gv.HtmlBodyObj.GetpObj("header1");
  hdobj.appendChild(DivEl2);   
  hdobj.appendChild(gv.pvoiceitemctrl);   
}
  
  
  function Create_FooterBlock(gv) {
    const Butt1 = document.createElement("div");
    Butt1.id = "testbutt";
    Butt1.className = "footerbutt";  
    Butt1.innerText = "Verify-проверить";
    const att1 = document.createAttribute("onclick");
    att1.value = "TestSentOnClick()";  
    Butt1.setAttributeNode(att1);             
    
    const Butt2 = document.createElement("div");
    Butt2.id = "nextsentbutt";
    Butt2.className = "footerbutt";  
    Butt2.innerText = "Next sentence";
    const att2 = document.createAttribute("onclick");
    att2.value = "NextSentenceOnClick()";  
    Butt2.setAttributeNode(att2);               
    
    const Butt3 = document.createElement("div");
    Butt3.id = "footerinfcount";  
    Butt3.innerText = "Null";  
    
    let m_cobj = gv.HtmlBodyObj.GetpObj("m_container1");
    m_cobj.appendChild(Butt1);
    m_cobj.appendChild(Butt2);
    m_cobj.appendChild(Butt3);
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
//    InitLoadPage1();
}

function NextSentenceOnClick() {
  let gv = Get_GlobalVar();
  gv.CurSentences++;
  if (gv.ArrSens.length == gv.CurSentences){gv.CurSentences = 0;}
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

  obj = gv.ArrSens;
  Indx = gv.CurSentences;  
  let StepMix = gv.DefStepMix;
  if(obj[Indx].StepMix){StepMix = obj[Indx].StepMix;};
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
  
  document.getElementById("footerinfcount").innerText = Indx + " of " + obj.length;  
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
  
  
  
  
  
  