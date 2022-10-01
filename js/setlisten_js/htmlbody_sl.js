let LessonNum = 1;
let ListLesson;
let eventvalue;
let pvoiceitemctrl;
let arrobjs = [{am:[],sp:null}];

 
function MainSets_Init_Obj() {
  eventvalue = Get_eventvalue_devices();
  LoadSentencesJson(LessonNum, AddToHtmlFromSentence)
}  


function HTML_BODY_AppendChilds(aBodyObj) {
  MainSets_Init_Obj();   
  for (let i = 0; i < aBodyObj.length; i++) {
    createElementByObj(aBodyObj[i]);
    document.body.appendChild(aBodyObj[i].pointobj);	
  }
  createitemctrl(aBodyObj);
  createitemctrlbutton(aBodyObj);
  //createaObjItemsbytempl(aBodyObj);
  createfooterctrlblock(aBodyObj);
}

function AddToHtmlFromSentence(Arr1) {  
  createaObjItemsbytempl(BodyObj, SomeObj, Arr1, 0);
} 
  
function createitemctrl(aBodyObj) {  
  const pblockvoice = document.createElement("div"); 
  pblockvoice.className = "blockvoiceitem";
  pvoiceitemctrl = document.createElement("div"); 
  pvoiceitemctrl.className = "blockvoiceitemctrl";
  const DivEl2 = document.createElement("div"); 
  DivEl2.className = "downctrlblock";  
  DivEl2.innerText = "V";
  const att1 = document.createAttribute(eventvalue); //onclick //ontouchstart
  att1.value = "clickButtondownctrlblock(this)";  
  DivEl2.setAttributeNode(att1); 
  pblockvoice.appendChild(DivEl2);
  pblockvoice.appendChild(pvoiceitemctrl);
  aBodyObj[1].pointobj.appendChild(pblockvoice);   
}

function createitemctrlbutton(aBodyObj) {
  const DivEl1 = document.createElement("div");
  DivEl1.className = "confbuttctrl";
  DivEl1.innerText = "Delete";
  const DivEl2 = document.createElement("div");
  DivEl2.className = "confbuttctrl";
  DivEl2.innerText = "Delete OK";
  const DivEl3 = document.createElement("div");
  DivEl3.className = "confbuttctrl";
  DivEl3.innerText = "  -  ";
  const DivEl4 = document.createElement("div");
  DivEl4.className = "confbuttctrl";
  DivEl4.innerText = "0.8";
  const DivEl5 = document.createElement("div");
  DivEl5.className = "confbuttctrl";
  DivEl5.innerText = "  +  ";

  pvoiceitemctrl.appendChild(DivEl1);
  pvoiceitemctrl.appendChild(DivEl2);
  pvoiceitemctrl.appendChild(DivEl3);
  pvoiceitemctrl.appendChild(DivEl4);
  pvoiceitemctrl.appendChild(DivEl5);
}



const snItemObj2 = [
  {elementname:"div", 
    attrib:[{attrname:"id", attrvalue:"snitemid1"},
            {attrname:"className", attrvalue:"sentenceitem"}
           ],
    pointobj:null
  },
  {elementname:"div", 
    attrib:[{attrname:"id", attrvalue:"snitemid2"},
            {attrname:"className", attrvalue:"sentenceitem"}
           ],
    pointobj:null
  },
  {elementname:"div", 
    attrib:[{attrname:"id", attrvalue:"snitemid3"},
            {attrname:"className", attrvalue:"sentenceitem"}
           ],
    pointobj:null
  },
  {elementname:"div", 
    attrib:[{attrname:"id", attrvalue:"snitemid4"},
            {attrname:"className", attrvalue:"sentenceitem"}
           ],
    pointobj:null
  },
  {elementname:"div", 
    attrib:[{attrname:"id", attrvalue:"snitemid5"},
            {attrname:"className", attrvalue:"sentenceitem"}
           ],
    pointobj:null
  }
];

//============================================================
let snItemObj ={ 
  sh:{elementname_i:"div", 
       attrib_i:[{aname_i:"id", avalue_i:"snitemid", Oki:1 },
                 {aname_i:"IndxA", avalue_i:"", Oki:1},
                 {aname_i:"class", avalue_i:"sentenceitemup", Oki:0},
                 {aname_i:"onclick", avalue_i:"clicksentenceitem(this)", Oki:0}
                ]        
     },
  count_1:5,   
  ar:[]
}; 

function clickVoiceItem(aThis){
  let ix = aThis.getAttribute("IndxA");  
  arrobjs[0].am.splice(ix, 1);
  aThis.remove();
}  

function clicksentenceitem(aThis){
  const InTxt = document.createElement("div");
  arrobjs[0].am.push(aThis.innerText);
  InTxt.innerText = aThis.innerText;
  InTxt.className = "sentenceitemdw";    
  const att1 = document.createAttribute(eventvalue);   
  att1.value = "clickVoiceItem(this)";  
  InTxt.setAttributeNode(att1);               
  const att2 = document.createAttribute("IndxA");
  let ix = arrobjs[0].am.length - 1;
  att2.value = ix;  
  InTxt.setAttributeNode(att2);  

  document.getElementById("blockvoice").appendChild(InTxt); 
 // aBodyObj[1].pointobj.appendChild(InTxt);  
}

function createaObjItemsbytempl(aBodyObj, aSomeObj, aObj, Indx) {
  if (aSomeObj.blocksentenceitem){ aSomeObj.blocksentenceitem.remove(); }
  aSomeObj.blocksentenceitem = document.createElement("div"); 
  let EngArr = SliceSentence(aObj.arrw[Indx].Eng); // разбивка англ. варианта пары
  snItemObj.sh.attrib_i[3].aname_i = eventvalue;// "ontouchend";
  for(let i = 0; i < EngArr.length; i++) {
    snItemObj.ar.push(document.createElement(snItemObj.sh.elementname_i));
    for(let j = 0; j < snItemObj.sh.attrib_i.length; j++) {
      let att1 = document.createAttribute(snItemObj.sh.attrib_i[j].aname_i);
      let avv = snItemObj.sh.attrib_i[j].avalue_i
      if (snItemObj.sh.attrib_i[j].Oki == 1) {avv = avv + i;} 
      att1.value = avv;      
      snItemObj.ar[i].setAttributeNode(att1);  	         
    }
    snItemObj.ar[i].innerText = EngArr[i];
    aSomeObj.blocksentenceitem.appendChild(snItemObj.ar[i]);    
  }  
  aBodyObj[2].pointobj.appendChild(aSomeObj.blocksentenceitem);
}  


function createsentenceitem22(aBodyObj) {
  const DivEl1 = document.createElement("div");
  DivEl1.className = "sentenceitem";
  DivEl1.innerText = "_0Sen_ce1";
  const att1 = document.createAttribute(eventvalue); //onclick //ontouchstart
  att1.value = "clickButtondownctrlblock(this)";  
  DivEl1.setAttributeNode(att1); 
  DivEl1.id = '221sdds';

  const DivEl2 = document.createElement("div");
  DivEl2.className = "sentenceitem";
  DivEl2.innerText = "_Sence1";
  const DivEl3 = document.createElement("div");
  DivEl3.className = "sentenceitem";
  DivEl3.innerText = "2Sentence1";
  const DivEl4 = document.createElement("div");
  DivEl4.className = "sentenceitem";
  DivEl4.innerText = "3Sentence1";
  const DivEl5 = document.createElement("div");
  DivEl5.className = "sentenceitem";
  DivEl5.innerText = "4Sentence1";
  aBodyObj[2].pointobj.appendChild(DivEl1);
  aBodyObj[2].pointobj.appendChild(DivEl2);
  aBodyObj[2].pointobj.appendChild(DivEl3);
  aBodyObj[2].pointobj.appendChild(DivEl4);
  aBodyObj[2].pointobj.appendChild(DivEl5);
}


function createfooterctrlblock(aBodyObj) {
  const DivEl1 = document.createElement("div");
  DivEl1.className = "confbuttctrl";
  DivEl1.innerText = "AddVoiceItem";
  const DivEl2 = document.createElement("div");
  DivEl2.className = "confbuttctrl";
  DivEl2.innerText = "NextSentence";
  const DivEl3 = document.createElement("div");
  DivEl3.className = "confbuttctrl";
  DivEl3.innerText = "SaveToBase";
  const DivEl4 = document.createElement("div");
  DivEl4.className = "confbuttctrl";
  DivEl4.innerText = "SomeCtrl1";
  const DivEl5 = document.createElement("div");
  DivEl5.className = "confbuttctrl";
  DivEl5.innerText = "SomeCtrl2";
  aBodyObj[3].pointobj.appendChild(DivEl1);
  aBodyObj[3].pointobj.appendChild(DivEl2);
  aBodyObj[3].pointobj.appendChild(DivEl3);
  aBodyObj[3].pointobj.appendChild(DivEl4);
  aBodyObj[3].pointobj.appendChild(DivEl5);
}



  
function clickButtondownctrlblock(athis) {
  if (athis.innerText == "V"){
    athis.innerText = "X";
    pvoiceitemctrl.style.display = "block";
  }else{
    athis.innerText = "V";
    pvoiceitemctrl.style.display = "none"; 
  }  
}
  