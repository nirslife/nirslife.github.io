
function Get_HtmlBodyObj() {
  let BodyObj = 
  { 
    ar:[
      {elementname:"div", attrib:[{attrname:"id", attrvalue:"header1"}], pobj:null},
      {elementname:"div", attrib:[{attrname:"id", attrvalue:"textfrom1"}], pobj:null},
      {elementname:"div", attrib:[{attrname:"id", attrvalue:"inputtextfrom1"}], pobj:null},
      {elementname:"div", attrib:[{attrname:"id", attrvalue:"puzzletextfrom1"}], pobj:null},
      {elementname:"div", attrib:[{attrname:"id", attrvalue:"m_container1"}], pobj:null},
      {elementname:"div", attrib:[{attrname:"id", attrvalue:"verify_cont1"}], pobj:null}
    ],
    createElem: function(i){
      let ar_i = this.ar[i];
      ar_i.pobj = document.createElement(ar_i.elementname);
      for(let j = 0; j < ar_i.attrib.length; j++) {
        let att1 = document.createAttribute(ar_i.attrib[j].attrname);
        att1.value = ar_i.attrib[j].attrvalue;
        ar_i.pobj.setAttributeNode(att1);  	   
      }    
    },
    createThis: function(){
      for (let i = 0; i < this.ar.length; i++) {
        this.createElem(i);    
        document.body.appendChild(this.ar[i].pobj);	
      }
    },
    GetpObj: function(idn){
      let stop1 = 0;
      let po = null;
      for (let i = 0; stop1 == 0; i++) {
        if (i == this.ar.length - 1) {stop1 = 1;}
        if (idn == this.ar[i].attrib[0].attrvalue){
          stop1 = 1;
          po = this.ar[i].pobj;
        }       
      }
      return po;
    }  
  }
  return BodyObj;
}
  
  
  