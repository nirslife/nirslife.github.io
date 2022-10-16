function Get_ArVP(gv){
  let obj1 = {
    ar:[
      {textv:"", Rate:"",Wait:"", InxSentence:""}
    ],
    CurPos:0,
    Repeat:1,
    Stop:0,
    Playing:0,
    CurSentence:0
  };
  return obj1;
}

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

function Get_HtmlAnyElem(gv) {  
  let ClassObj = Create_MetodsObj(gv);
  let av = DataHtmlAnyElem(gv);
  ClassObj.ar = av.ar;    
  ClassObj.InitAllElem();
  return ClassObj;
}  

function Get_HtmlBV(gv) {  
  let ClassObj = Create_MetodsObj(); 
  let av = DataHtmlBV_i(gv);
  ClassObj.ar = av.ar;    
  ClassObj.InitAllElem();
  return ClassObj;
}  

function Get_HtmlTst(gv) {
  let ClassObj = Create_MetodsObj();
  let av = DataHtmlTst_i(gv);
  ClassObj.ar = av.ar;
  ClassObj.InitAllElem();
  return ClassObj;
}  


function Create_MetodsObj(gv) {
  //let eval = gv.eventvalue;
  let MetObj = {
    OnInxAtt:true,
    Idx:0,
    arx:[],
    oix:[],
    opx:[],
    ar:[],
    oi:[],
    op:[],
    wrx:[{w:[],Speed:1}],
    wr:{w:[],Speed:1},
    From_i_to_x: function() {
      this.arx[this.Idx] = this.ar;
      this.oix[this.Idx] = this.oi;
      this.opx[this.Idx] = this.op; 
      this.wrx[this.Idx] = this.wr;
    },
    From_x_to_i: function() {
      this.ar = this.arx[this.Idx];
      this.oi = this.oix[this.Idx];
      this.op = this.opx[this.Idx]; 
      this.wr = this.wrx[this.Idx];
    },
    InitAllElem: function() {
      // заполняем массив ключей ki и kp:[atr[0].value] по atr[0] = atr:[{name:"id", value:"StepMixInc1"}]      
      let ar_ = this.ar;
      for(let j = 0; j < ar_.length; j++) {
        let key1 = ar_[j].atr[0].value;
        this.oi[key1] = j;
      }   
      this.From_i_to_x();   
    },
    SetIdx: function(aIdx) {
      this.From_x_to_i();
      this.Idx = aIdx; 
    },
    GetIdx: function() {
      return this.Idx;
    },

    Get_DataHtml_i: function(){},    

    create1Elem: function(i, itxt){
      // создает по индексу i массива просто элемент (document.createElement) и заполняет его атрибутами
      let ar_i = this.ar[i];      
      ar_i.pobj = document.createElement(ar_i.elname);
      let key1 = ar_i.atr[0].value;
      this.op[key1] = ar_i.pobj;
      ar_i.pobj.innerText = itxt;      
      for(let j = 0; j < ar_i.atr.length; j++) {
        let att1 = document.createAttribute(ar_i.atr[j].name);
        let avv = ar_i.atr[j].value;
        if ((ar_i.atr[j].Add_i)&&(this.Idx)){if (ar_i.atr[j].Add_i == 1) {avv = avv + this.Idx;}} 
        att1.value = avv;
        ar_i.pobj.setAttributeNode(att1);  	   
      }
      // добавить атрибут значения индекса 
      if (this.OnInxAtt == 1) {
        let att2 = document.createAttribute("InxAtt");
        att2.value = this.Idx;
        ar_i.pobj.setAttributeNode(att2);
      }
      return ar_i.pobj;
    },

    create1ElemByInx: function(idn, itxt){
      let inx = this.oi[idn];
      return this.create1Elem(inx, itxt);
    }

  }
  return MetObj;
} 
 
/*
function CreateMetodsObj() {
  //let eval = gv.eventvalue;
  let MetObj = {
    OnInxAtt:true,
    ar:[],
    ki:[],
    kp:[],

    InitAllElem: function() {
      // заполняем массив ключей ki и kp:[atr[0].value] по atr[0] = atr:[{name:"id", value:"StepMixInc1"}]
      let ar_ = this.ar;
      for(let i = 0; i < ar_.length; i++) {
        let key1 = ar_[i].atr[0].value;
        this.ki[key1] = i;
      }      
    },

    create1Elem: function(i, itxt, idx){
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
      // добавить атрибут значения индекса 
      if (this.OnInxAtt == 1) {
        let att2 = document.createAttribute("InxAtt");       
        att2.value = idx;        
        ar_i.pobj.setAttributeNode(att2);  	   
      }
      return ar_i.pobj;   
    },

    create1ElemByInx: function(idn, itxt, idx){
      let inx = this.ki[idn];
      //this.Get_tVarObj(idn, "inx");       
      return this.create1Elem(inx, itxt, idx);
    }

  }
  return MetObj;
}  
*/

function DataHtmlAnyElem(gv) {  
  let eval = gv.eventvalue;
  let Obj = { 
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
    ]
  }
  return Obj;
}  


function DataTree_i(gv) {
  let Bi = {
    blvi_0main_i:{
    //++++++++++++++++++++++  
    //++++++++++++++++++++++
    //++++++++++++++++++++++
    //++++++++++++++++++++++
    //++++++++++++++++++++++
    //++++++++++++++++++++++   
    }
  }  
}  

//function DataHtmlTplBlVi_i(gv) {  
function DataHtmlBV_i(gv) {  
  let eval = gv.eventvalue;
  let BlVi = {
    ar:[                
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_00main_i", Add_i:1},
        {name:"class", value:"blvi_00main_i"}          
      ],
      pobj:null
    },      
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_0main_i", Add_i:1},
        {name:"class", value:"blvi_0main_i"}          
      ],
      pobj:null
    },      
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_0foot_i", Add_i:1},
        {name:"class", value:"blvi_0foot_i"}          
      ],
      pobj:null
    },      
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_1divctrl_i", Add_i:1},
        {name:"class", value:"blvi_1divctrl_i"}          
      ],
      pobj:null
    },
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_2linebut1menu_i", Add_i:1},
        {name:"class", value:"blvi_2linebut1menu_i"},
        {name:eval, value:"clickButtondownctrlblock(this)"}                  
      ],
      pobj:null
    },
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_2divbuttctrl_i", Add_i:1},
        {name:"class", value:"blvi_2divbuttctrl_i"}          
      ],
      pobj:null
    },
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_3Delete1", Add_i:1},
        {name:"class", value:"confbuttctrl"}          
      ],
      pobj:null
    },
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_3DeleteOk1", Add_i:1},
        {name:"class", value:"confbuttctrl"}          
      ],
      pobj:null
    },
  { elname:"div",         
    atr:[
      {name:"id", value:"blvi_3SpeedVoiceDec", Add_i:1},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  },      
  { elname:"div",         
    atr:[
      {name:"id", value:"blvi_3SpeedVoiceVal", Add_i:1},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  },
  { elname:"div",         
    atr:[
      {name:"id", value:"blvi_3SpeedVoiceInc", Add_i:1},
      {name:"class", value:"confbuttctrl"}          
    ],
    pobj:null
  }  
]
}
return BlVi;
}  

  
function DataHtmlTst_i(gv) {  
  let eval = gv.eventvalue;
  let BlVi = {
    ar:[                
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_00main_i", Add_i:1},
        {name:"class", value:"blvi_00main_i"}          
      ],
      pobj:null
    },      
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_0main_i", Add_i:1},
        {name:"class", value:"blvi_0main_i"}          
      ],
      pobj:null
    },      
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_0foot_i", Add_i:1},
        {name:"class", value:"blvi_0foot_i"}          
      ],
      pobj:null
    },      
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_1sentence_i", Add_i:1},
        {name:"class", value:"blvi_1sentence_i"}
      ],
      pobj:null
    },
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_1divctrl_i", Add_i:1},
        {name:"class", value:"blvi_1divctrl_i"}          
      ],
      pobj:null
    },
    {elname:"div",         
      atr:[
        {name:"id", value:"blvi_2linebut1menu_i", Add_i:1},
        {name:"class", value:"blvi_2linebut1menu_i"},
        {name:eval, value:"clickButtondownctrlTest(this)"}
      ],
      pobj:null
    },
    {elname:"div",
      atr:[
        {name:"id", value:"blvi_2linebut2menu_i", Add_i:1},
        {name:"class", value:"blvi_2linebut2menu_i"},
        {name:eval, value:"clickButtondownctrlTest1111111(this)"}
      ],
      pobj:null
    },
    {elname:"div",
      atr:[
        {name:"id", value:"blvi_2divbuttctrl_i", Add_i:1},
        {name:"class", value:"blvi_2divbuttctrl_i"}
      ],
      pobj:null
    },
    {elname:"div",
      atr:[
        {name:"id", value:"blvi_Play_i", Add_i:1},
        {name:"class", value:"confbuttctrl"},
        {name:eval, value:"click_blvi_Play_i(this)"}
      ],
      pobj:null
    },
    {elname:"div",
      atr:[
        {name:"id", value:"blvi_Stop_i", Add_i:1},
        {name:"class", value:"confbuttctrl"},
        {name:eval, value:"click_blvi_Stop_i(this)"}
      ],
      pobj:null
    },
    {elname:"div",
      atr:[
        {name:"id", value:"blvi_space_i", Add_i:1},
        {name:"class", value:"confbuttctrl"},
        {name:eval, value:"click_blvi_space_i(this)"}
      ],
      pobj:null
    },
    {elname:"div",
      atr:[
        {name:"id", value:"blvi_nextlesson_i", Add_i:1},
        {name:"class", value:"confbuttctrl"},
        {name:eval, value:"click_blvi_nextlesson_i(this)"}
      ],
      pobj:null
    },
    {elname:"div",
      atr:[
        {name:"id", value:"blvi_Generate1", Add_i:1},
        {name:"class", value:"confbuttctrl"},
        {name:eval, value:"clickGenerate1(this)"}
      ],
      pobj:null
    },
    {elname:"div",
      atr:[
        {name:"id", value:"blvi_Generate2", Add_i:1},
        {name:"class", value:"confbuttctrl"},
        {name:eval, value:"clickGenerate2(this)"}        
      ],
      pobj:null
    }
]
}
return BlVi;
}







