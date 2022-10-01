
function Get_HtmlBodyElem() {
  let BodyObj = 
  { 
    ar:[
      {elname:"div", atr:[{name:"id", value:"header1"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"textfrom1"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"inputtextfrom1"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"puzzletextfrom1"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"m_container1"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"verify_cont1"}], pobj:null}
    ],
    ki:[],
    kp:[],
    InitElem: function(){
      // заполн€ем массив ключей ki и kp:[atr[0].value] по atr[0] = atr:[{name:"id", value:"textfrom1"}]
      let arr = this.ar;
      for(let i = 0; i < arr.length; i++) {
        let key1 = arr[i].atr[0].value;
        this.ki[key1] = i;        
      }      
    },
    createElem: function(i){
      // создает просто элемент (document.createElement) и заполн€ет его атрибутами
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
      // создает “ело документа HtmlBody и наполн€ет его элементами
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
          {name:"id", value:"StepMixDec1"},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"clickStepMixChange(this)"}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"StepMixInc1"},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"clickStepMixChange(this)"}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"StepMixS_2"},
          {name:"class", value:"footerbutt2"},
          {name:eval, value:"clickStepMixSet(this)"}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"StepMixS_4"},
          {name:"class", value:"footerbutt2"},
          {name:eval, value:"clickStepMixSet(this)"}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"StepMixS_7"},
          {name:"class", value:"footerbutt2"},
          {name:eval, value:"clickStepMixSet(this)"}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"blocktemctrlid1"},
          {name:"class", value:"blocktemctrl"}          
        ],
        pobj:null
      },      
      { elname:"div",         
        atr:[
          {name:"id", value:"StepMix1"},
          {name:"class", value:"confbuttctrl"}          
        ],
        pobj:null
      }            
    ],
    ki:[],
    kp:[],
    InitElem: function(){
      // заполн€ем массив ключей ki и kp:[atr[0].value] по atr[0] = atr:[{name:"id", value:"StepMixInc1"}]
      let arr = this.ar;
      for(let i = 0; i < arr.length; i++) {
        let key1 = arr[i].atr[0].value;
        this.ki[key1] = i;
      }      
    },
    createElem: function(i, itxt){
      // создает по индексу i массива просто элемент (document.createElement) и заполн€ет его атрибутами
      let ar_i = this.ar[i];
      ar_i.pobj = document.createElement(ar_i.elname);
      let key1 = ar_i.atr[0].value;
      this.kp[key1] = ar_i.pobj;      
      ar_i.pobj.innerText = itxt;      
      for(let j = 0; j < ar_i.atr.length; j++) {
        let att1 = document.createAttribute(ar_i.atr[j].name);
        att1.value = ar_i.atr[j].value;
        ar_i.pobj.setAttributeNode(att1);  	   
      }
      return ar_i.pobj;   
    },
    createElemByInx: function(idn, itxt){
      let inx = this.Get_tVarObj(idn, "inx");       
      return this.createElem(inx, itxt);
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