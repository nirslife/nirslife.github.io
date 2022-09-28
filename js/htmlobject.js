const BodyObj = [
    {elementname:"div", attrib:[{attrname:"id", attrvalue:"header1"}], pointobj:null},
    {elementname:"div", attrib:[{attrname:"id", attrvalue:"textfrom1"}], pointobj:null},
    {elementname:"div", attrib:[{attrname:"id", attrvalue:"inputtextfrom1"}], pointobj:null},
    {elementname:"div", attrib:[{attrname:"id", attrvalue:"puzzletextfrom1"}], pointobj:null}
  ];
  
  
  function createElementByObj(aObjItem) {
    aObjItem.pointobj = document.createElement(aObjItem.elementname);
    for(let j = 0; j < aObjItem.attrib.length; j++) {
       let att1 = document.createAttribute(aObjItem.attrib[j].attrname);
       att1.value = aObjItem.attrib[j].attrvalue;
       aObjItem.pointobj.setAttributeNode(att1);  	   
    }
  }
  