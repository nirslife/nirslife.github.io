function Get_HtmlBodyElem() {
  let BodyObj = 
  { 
    ar:[
      {elname:"div", atr:[{name:"id", value:"blockvoice"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"header1"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"mmless_buf_id"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"blocksentenceitem"}], pobj:null},
      {elname:"div", atr:[{name:"id", value:"footerctrlblock"}], pobj:null}
    ],
    ki:[],
    kp:[],
    InitElem: function(){
      // ��������� ������ ������ ki � kp:[atr[0].value] �� atr[0] = atr:[{name:"id", value:"textfrom1"}]
      let arr = this.ar;
      for(let i = 0; i < arr.length; i++) {
        let key1 = arr[i].atr[0].value;
        this.ki[key1] = i;
      }
    },
    createElem: function(i){
      // ������� ������ ������� (document.createElement) � ��������� ��� ����������
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
      // ������� ���� ��������� HtmlBody � ��������� ��� ����������
      for (let i = 0; i < this.ar.length; i++) {
        this.createElem(i);
        document.body.appendChild(this.ar[i].pobj);	
      }
    },
    GetpObj: function(idn){
      // ��������, �� idn="inputtextfrom1" ���� � atr[0].value �� ��������� � ���������� pobj. atr[0] = atr:[ {name:"id", value:"inputtextfrom1"}]
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
  let ClassObj = Create_MetodsObj(gv);
  let av = DataHtmlAnyElem(gv);
  ClassObj.ar = av.ar;    
  ClassObj.InitAllElem();
  return ClassObj;
}  


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


