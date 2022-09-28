function HTML_BODY_AppendChilds(aBodyObj) {
    for (let i = 0; i < aBodyObj.length; i++) {
      createElementByObj(aBodyObj[i]);
      document.body.appendChild(aBodyObj[i].pointobj);	
    } 
  }
  
  
  function Btn4OnClick(){
    HTML_BODY_AppendChilds(BodyObj);
  }
  