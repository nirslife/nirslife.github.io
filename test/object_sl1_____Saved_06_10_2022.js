function Get_HtmlBodyElem() {
  let BodyObj = 
  { 
    ar:[
      {elname:"div", atr:[{name:"id", value:"header1"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"blockvoice"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"blocksentenceitem"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"footerctrlblock"}], pobj:null}
    ],
    ki:[],
    kp:[],
    InitElem: function(){
      // заполняем массив ключей ki и kp:[atr[0].value] по atr[0] = atr:[{name:"id", value:"textfrom1"}]
      let arr = this.ar;
      for(let i = 0; i < arr.length; i++) {
        let key1 = arr[i].atr[0].value;
        this.ki[key1] = i;        
      }      
    },
    createElem: function(i){
      // создает просто элемент (document.createElement) и заполняет его атрибутами
      let ar_i = this.ar[i];
      ar_i.pobj = document.createElement(ar_i.elname);
      let key1 = ar_i.atr[0].value;
      this.kp[key1] = ar_i.pobj;
      for(let j = 0; j < ar_i.atr.length; j++) {
        let att1 = document.createAttribute(ar_i.atr[j].name);
        att1.value = ar_i.atr[j].value;
        ar_i.pobj.setAttributeNode(att1);  
      }    
    },
    createThis_AddChilds: function(){
      // создает Тело документа HtmlBody и наполняет его элементами
      for (let i = 0; i < this.ar.length; i++) {
        this.createElem(i);    
        document.body.appendChild(this.ar[i].pobj);	
      }
    },
    GetpObj: function(idn){
      // например, по idn="inputtextfrom1" ищет в atr[0].value из атрибутов и возвращает pobj. atr[0] = atr:[ {name:"id", value:"inputtextfrom1"}]
      let stop1 = 0;
      let po = null;
      for (let i = 0; stop1 == 0; i++) {
        if (i == this.ar.length - 1) {stop1 = 1;}
        if (idn == this.ar[i].atr[0].value){
          stop1 = 1;
          po = this.ar[i].pobj;
        }       
      }
      return po;
    }  
  }
  BodyObj.InitElem();
  return BodyObj;
}
  
  
function Get_HtmlAnyElem(gv) {
  
  let eval = gv.eventvalue;
  let Obj = 
  { 
    ar:[      
      { elname:"div",         
        atr:[
          {name:"id", value:"blockvoiceitemid"},
          {name:"class", value:"blockvoiceitem"},
          {name:"blockvi_inx", value:"", Add_i:0}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"blockvoiceitemctrlid"},
          {name:"class", value:"blockvoiceitemctrl"}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"downctrlblockid"},
          {name:"class", value:"downctrlblock"},
          {name:eval, value:"clickButtondownctrlblock(this)"}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"Delete1"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"DeleteOk1"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"SpeedVoiceDec"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },      
      { elname:"div",         
        atr:[
          {name:"id", value:"SpeedVoiceVal"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"SpeedVoiceInc"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"AddVoiceItemid"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"NextSentenceid"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"SaveToBaseid"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"bsentenitemid"}          
        ],
        pobj:null
      }
    ],
    ki:[],
    kp:[],
    InitElem: function(){
      // заполняем массив ключей ki и kp:[atr[0].value] по atr[0] = atr:[{name:"id", value:"StepMixInc1"}]
      let arr = this.ar;
      for(let i = 0; i < arr.length; i++) {
        let key1 = arr[i].atr[0].value;
        this.ki[key1] = i;
      }      
    },
    createElem: function(i, itxt, idx){
      // создает по индексу i массива просто элемент (document.createElement) и заполняет его атрибутами
      let ar_i = this.ar[i];
      ar_i.pobj = document.createElement(ar_i.elname);
      let key1 = ar_i.atr[0].value;
      this.kp[key1] = ar_i.pobj;      
      ar_i.pobj.innerText = itxt;      
      for(let j = 0; j < ar_i.atr.length; j++) {
        let att1 = document.createAttribute(ar_i.atr[j].name);
        let avv = ar_i.atr[j].value;
        if ((ar_i.atr[j].Add_i)&&(idx)){if (ar_i.atr[j].Add_i == 1) {avv = avv + idx;}} 
        att1.value = avv;        
        ar_i.pobj.setAttributeNode(att1);  	   
      }
      return ar_i.pobj;   
    },
    createElemByInx: function(idn, itxt, idx){
      let inx = this.Get_tVarObj(idn, "inx");       
      return this.createElem(inx, itxt, idx);
    },
    Get_tVarObj: function(idn, tVar){
      // ищет по (idn="StepMixid1") в atr[0] -> atr:[ {name:"id", value:"StepMixid1"}]
      // и возвращает: 1) tVar == "pobj" -> pobj; 2) tVar == "inx" -> i (this.ar[i].atr[0].value)
      let stop1 = 0;
      let po = null;
      let ii = null;
      for (let i = 0; stop1 == 0; i++) {
        if (i == this.ar.length - 1) {stop1 = 1;}
        if (idn == this.ar[i].atr[0].value){
          stop1 = 1;
          po = this.ar[i].pobj;
          ii = i;
        }       
      }
      if (tVar == "pobj") {return po;}
      else if (tVar == "inx") {return ii;} 
    },
    SetInnerText: function(idn, itxt) {
      let inx = this.Get_tVarObj(idn, "inx");  
      let ar_i = this.ar[inx];      
      ar_i.pobj.innerText = itxt;      
    }
  }
  Obj.InitElem();
  return Obj;
}

function Get_HtmlBlockVoice_i(gv) {  
  let eval = gv.eventvalue;
  let MenuObj = {
    ar:[          
    { elname:"div",         
    atr:[
      {name:"id", value:"blvi_toolmenu_i", Add_i:1},
      {name:"class", value:"blvi_toolmenu_i"}          
    ],
    pobj:null
  },
  { elname:"div",         
    atr:[
      {name:"id", value:"blockvoiceitemctrlid"},
      {name:"class", value:"blockvoiceitemctrl"}
    ],
    pobj:null
  },
  { elname:"div",         
    atr:[
      {name:"id", value:"downctrlblockid"},
      {name:"class", value:"downctrlblock"},
      {name:eval, value:"clickButtondownctrlblock(this)"}
    ],
    pobj:null
  },
  { elname:"div",         
    atr:[
      {name:"id", value:"Delete1"},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  },
  { elname:"div",         
    atr:[
      {name:"id", value:"DeleteOk1"},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  },
  { elname:"div",         
    atr:[
      {name:"id", value:"SpeedVoiceDec"},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  },      
  { elname:"div",         
    atr:[
      {name:"id", value:"SpeedVoiceVal"},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  },
  { elname:"div",         
    atr:[
      {name:"id", value:"SpeedVoiceInc"},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  },
  { elname:"div",         
    atr:[
      {name:"id", value:"AddVoiceItemid"},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  }

  }

  let Obj = { 
    ar:[      
      { elname:"div",         
        atr:[
          {name:"id", value:"blvi0_i", Add_i:1}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"NextSentenceid"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"SaveToBaseid"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"bsentenitemid"}          
        ],
        pobj:null
      }
    ],
    ki:[],
    kp:[],
    InitElem: function(){
      // заполняем массив ключей ki и kp:[atr[0].value] по atr[0] = atr:[{name:"id", value:"StepMixInc1"}]
      let arr = this.ar;
      for(let i = 0; i < arr.length; i++) {
        let key1 = arr[i].atr[0].value;
        this.ki[key1] = i;
      }      
    },
    createElem: function(i, itxt, idx){
      // создает по индексу i массива просто элемент (document.createElement) и заполняет его атрибутами
      let ar_i = this.ar[i];
      ar_i.pobj = document.createElement(ar_i.elname);
      let key1 = ar_i.atr[0].value;
      this.kp[key1] = ar_i.pobj;      
      ar_i.pobj.innerText = itxt;      
      for(let j = 0; j < ar_i.atr.length; j++) {
        let att1 = document.createAttribute(ar_i.atr[j].name);
        let avv = ar_i.atr[j].value;
        if ((ar_i.atr[j].Add_i)&&(idx)){if (ar_i.atr[j].Add_i == 1) {avv = avv + idx;}} 
        att1.value = avv;        
        ar_i.pobj.setAttributeNode(att1);  	   
      }
      return ar_i.pobj;   
    },
    createElemByInx: function(idn, itxt, idx){
      let inx = this.Get_tVarObj(idn, "inx");       
      return this.createElem(inx, itxt, idx);
    },
    Get_tVarObj: function(idn, tVar){
      // ищет по (idn="StepMixid1") в atr[0] -> atr:[ {name:"id", value:"StepMixid1"}]
      // и возвращает: 1) tVar == "pobj" -> pobj; 2) tVar == "inx" -> i (this.ar[i].atr[0].value)
      let stop1 = 0;
      let po = null;
      let ii = null;
      for (let i = 0; stop1 == 0; i++) {
        if (i == this.ar.length - 1) {stop1 = 1;}
        if (idn == this.ar[i].atr[0].value){
          stop1 = 1;
          po = this.ar[i].pobj;
          ii = i;
        }       
      }
      if (tVar == "pobj") {return po;}
      else if (tVar == "inx") {return ii;} 
    },
    SetInnerText: function(idn, itxt) {
      let inx = this.Get_tVarObj(idn, "inx");  
      let ar_i = this.ar[inx];      
      ar_i.pobj.innerText = itxt;      
    }
  }
  Obj.InitElem();
  return Obj;
}  

  
//шаблон блока англслова для заполнения его атрибутами
function Get_TplItemVoice(gv) {
  gv.ItVUp = [{am:[],sp:null}];
  let eval = gv.eventvalue;
  let TplItemVoice = { 
    sh:{ename_i:"div", 
         atr_i:[
                 {aname_i:"id", avalue_i:"snitemid", Add_i:0 },
                 {aname_i:"IndxA", avalue_i:"", Add_i:1},
                 {aname_i:"class", avalue_i:"sentenceitemup", Add_i:0},
                 {aname_i:eval, avalue_i:"clicksentenceitem(this)", Add_i:0}
               ]        
       },    
    ar:[]
  };     
  return TplItemVoice;
}