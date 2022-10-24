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
  
/*   function Get_HtmlBodyElem() {
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
        // ˜˜˜˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜˜˜˜˜˜ ki ˜ kp:[atr[0].value] ˜˜ atr[0] = atr:[{name:"id", value:"textfrom1"}]
        let arr = this.ar;
        for(let i = 0; i < arr.length; i++) {
          let key1 = arr[i].atr[0].value;
          this.ki[key1] = i;
        }
      },
      createElem: function(i){
        // ˜˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜˜˜˜˜˜˜ (document.createElement) ˜ ˜˜˜˜˜˜˜˜˜ ˜˜˜ ˜˜˜˜˜˜˜˜˜˜
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
        // ˜˜˜˜˜˜˜ ˜˜˜˜ ˜˜˜˜˜˜˜˜˜ HtmlBody ˜ ˜˜˜˜˜˜˜˜˜ ˜˜˜ ˜˜˜˜˜˜˜˜˜˜
        for (let i = 0; i < this.ar.length; i++) {
          this.createElem(i);
          document.body.appendChild(this.ar[i].pobj);	
        }
      },
      GetpObj: function(idn){
        // ˜˜˜˜˜˜˜˜, ˜˜ idn="inputtextfrom1" ˜˜˜˜ ˜ atr[0].value ˜˜ ˜˜˜˜˜˜˜˜˜ ˜ ˜˜˜˜˜˜˜˜˜˜ pobj. atr[0] = atr:[ {name:"id", value:"inputtextfrom1"}]
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
  } */
  
  //˜˜˜˜˜˜ ˜˜˜˜˜ ˜˜˜˜˜˜˜˜˜ ˜˜˜ ˜˜˜˜˜˜˜˜˜˜ ˜˜˜ ˜˜˜˜˜˜˜˜˜˜
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
/*  
  function Get_HtmlAnyElem(gv) {  
    let ClassObj = Create_MetodsObj(gv);
    let av = DataHtmlAnyElem(gv);
    ClassObj.ar = av.ar;    
    ClassObj.InitAllElem();
    return ClassObj;
  }  
*/  
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
  
  function Get_HtmlMMenu(gv) {
    let ClassObj = Create_MetodsObj();
    let av = DataHtmlMMenu_i(gv);
    ClassObj.ar = av.ar;
    ClassObj.InitAllElem();  
    return ClassObj;
  }
  
  function Get_HtmlLstLes(gv) {
    let ClassObj = Create_MetodsObj();
    let av = DataHtmlLstLes_i(gv);
    ClassObj.ar = av.ar;
    ClassObj.InitAllElem();  
    return ClassObj;
  }
  
  
  
  
  function Create_MetodsObj(gv) {
    //let eval = gv.eventvalue;
    let MetObj = {
      OnInxAtt:true,
      mmopen:"",
      Idx:-1,
      countx:0,
      arx:[],
      oix:[],
      opx:[],
      ar:[],
      oi:[],
      op:[],
      oop:[],
      tid:[],
      wrx:[{w:[],Speed:1}],
      wr:{w:[],Speed:1},    
      From_i_to_x: function() {
        let ix = (this.Idx == -1) ? 0 : this.Idx;
        this.arx[ix] = this.ar;
        this.oix[ix] = this.oi;
        this.opx[ix] = this.op; 
        this.wrx[ix] = this.wr;
      },
      From_x_to_i: function() {
        let ix = (this.Idx == -1) ? 0 : this.Idx;
        this.ar = this.arx[ix];
        this.oi = this.oix[ix];
        this.op = this.opx[ix]; 
        this.wr = this.wrx[ix];
      },
      InitAllElem: function() {
        // ˜˜˜˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜˜˜˜˜˜ ki ˜ kp:[atr[0].value] ˜˜ atr[0] = atr:[{name:"id", value:"StepMixInc1"}]      
        let ar_ = this.ar;
        for(let j = 0; j < ar_.length; j++) {
          let key1 = ar_[j].atr[0].value;
          this.oi[key1] = j;
          if (ar_[j].atr[0].tid){this.tid[key1] = ar_[j].atr[0].tid;}
        }   
        this.From_i_to_x();
      },
      AddNewArr: function() {
        if(this.Idx > -1){
          this.countx++;
          this.Idx++;
          let ar_ = this.ar;
          this.arx.push(ar_);
          this.ar = this.arx[this.Idx];
          this.From_i_to_x();
        } else {
          this.countx++;
          this.Idx++;
        }
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
        // ˜˜˜˜˜˜˜ ˜˜ ˜˜˜˜˜˜˜ i ˜˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜˜˜˜˜˜˜ (document.createElement) ˜ ˜˜˜˜˜˜˜˜˜ ˜˜˜ ˜˜˜˜˜˜˜˜˜˜
        let ar_i = this.ar[i];
        ar_i.pobj = document.createElement(ar_i.elname);
        let key1 = ar_i.atr[0].value;
        this.op[key1] = ar_i.pobj;
        ar_i.pobj.innerText = itxt;
        for(let j = 0; j < ar_i.atr.length; j++) {
          let att1 = document.createAttribute(ar_i.atr[j].name);
          let avv = ar_i.atr[j].value;
          if ((ar_i.atr[j].Add_i)&&(this.Idx > 0)){if (ar_i.atr[j].Add_i == 1) {avv = avv + this.Idx;}}
          att1.value = avv;
          ar_i.pobj.setAttributeNode(att1);        
        }
        this.oop[ar_i.pobj.id] = ar_i.pobj;
        // ˜˜˜˜˜˜˜˜ ˜˜˜˜˜˜˜ ˜˜˜˜˜˜˜˜ ˜˜˜˜˜˜˜ 
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
   
  
/*   function DataHtmlAnyElem(gv) {  
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
 */  
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
      },
      {elname:"div",
        atr:[
          {name:"id", value:"blvi_LoadLesson", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"clickblvi_LoadLesson(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"blvi_LoadVarList", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"clickblvi_LoadVarList(this)"}
        ],
        pobj:null
      }
  ]
  }
  return BlVi;
  }
  
  function DataHtmlMMenu_i(gv) {
    let eval = gv.eventvalue;
    let mm = {
      ar:[
      {elname:"div",
        atr:[
          {name:"id", value:"mm_00main_i", Add_i:1},
          {name:"class", value:"mm_00main_i"}          
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_0main_i", Add_i:1},
          {name:"class", value:"mm_0main_i"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_0foot_i", Add_i:1},
          {name:"class", value:"mm_0foot_i"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_1sentence_i", Add_i:1},
          {name:"class", value:"mm_1sentence_i"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_1divctrl_i", Add_i:1},
          {name:"class", value:"mm_1divctrl_i"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_but1_i", Add_i:1, tid:"mm_div1_i"},
          {name:"class", value:"mm_but1_i"},
          {name:eval, value:"clickCtrlMMenu(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_but2_i", Add_i:1, tid:"mm_div2_i"},
          {name:"class", value:"mm_but2_i"},
          {name:eval, value:"clickCtrlMMenu(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_div1_i", Add_i:1, tid:"mm_but1_i"},
          {name:"class", value:"mm_div1_i"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_div2_i", Add_i:1, tid:"mm_but2_i"},
          {name:"class", value:"mm_div2_i"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_boxlesslist_i", Add_i:1, tid:"mm_but2_i"},
          {name:"class", value:"mm_boxlesslist_i"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"sent_select_ok", Add_i:1},
          {name:"class", value:"sent_select_ok"},
          {name:eval, value:"click_sent_select_ok(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_Play_i", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"click_mm_Play_i(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_Stop_i", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"click_mm_Stop_i(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_space_i", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"click_mm_space_i(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_nextlesson_i", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"click_mm_nextlesson_i(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_Generate1", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"clickGenerate1(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_Generate2", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"clickGenerate2(this)"}        
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_LoadLesson", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"clickmm_LoadLesson(this)"}
        ],
        pobj:null
      },
      {elname:"div",
        atr:[
          {name:"id", value:"mm_LoadVarList", Add_i:1},
          {name:"class", value:"confbuttctrl"},
          {name:eval, value:"clickmm_LoadVarList(this)"}
        ],
        pobj:null
      },
      { elname:"div",         
        atr:[
          {name:"id", value:"ClearInputid1"},
          {name:"class", value:"confblock"},
          {name:eval, value:"clickClearInput(this)"}
        ],
        pobj:null
      },
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
          {name:"id", value:"StepMix1"},
          {name:"class", value:"confbuttctrl"}          
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
      }
  ]
  }
  return mm;
  }
  
  function DataHtmlLstLes_i(gv){
    let eval = gv.eventvalue;
    let lls = {
      ar:[
        {elname:"div",
          atr:[
            {name:"id", value:"mmless_item", Add_i:1},
            {name:"class", value:"mmless_item"},
            {name:eval, value:"click_mmless_item(this)"}
          ],
          pobj:null
        }
      ]
    }
    return lls;
  }
