// разрезаем предложение по пробелам
function SliceSentence(aSenten){
    let str = aSenten;
    let s1;
    let i;  
    let j = 0;
    let arrsen = [];
    //str = str.replaceAll("}","");  
    while (str.length > 0) {
      i = str.indexOf(" ");
      if (i < 1){ i = str.length; }
      s1 = str.substr(0, i);
      str = str.slice(i+1, str.length);  
      s1 = s1.replaceAll(" ","");   // убираем пробелы	
      if (s1.length == 1) {s1 = s1 + " ";} 
      arrsen[j] = s1;
      j++;
    }   
    return arrsen;
}
  
  //перемешивание массива случайным образом
function MixArray(aObj) {  
  const rArr = []; 
  const vObj = {"arrw":[]};
  InitRandomArr(aObj.arrw.length, 0, rArr);
  for (i = 0; i < aObj.arrw.length; i++) {
    vObj.arrw[i] = aObj.arrw[rArr[i]];    
  } 
  return vObj;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function InitRandomArr(max, incval, Arr1) {  // копия кода старая: function InitRandomArr(max, incval, Arr1) {
// перемешивание случайным образом массива индексов
// max - [0..max-1], incval- величина смещение индекса [0+incval..max+incval-1] = [0..max-1] + incval
// Arr1 - массив [0..max-1]
    for (i = 0; i < max; i++) {
      Arr1[i] = i;     
    }
    let j; let a;
    for (i = max - 1; i >= 0; i--) {    
      j = getRandomInt(max - 1);  
      a = Arr1[i];
      Arr1[i] = Arr1[j];
      Arr1[j] = a;
    }  
    for (i = 0; i < max; i++) {    
      Arr1[i+incval] = Arr1[i]+incval; 
    }
}
  
function InitRandomArr3(alength, astep) {
  // IN: alength = 14, astep = 4
  // [1,2,3,4, 5,6,7,8, 9,10,11,12, 13,14]
  // OUT: Result:
  // [2,4,1,3, 5,7,8,6, 10,11,9,12, 14,13] 
    let Arr1 = [];
    for (i = 0; i < alength; i++) {
      Arr1[i] = i;     
    }
    let ap = 0;      
    let j; let a;
    //[1,2] astep=4
    // ap=2
    for (i = 0; i < alength; i++) {    
      if(ap == 0){   
        ap = astep;    
        if(ap > alength){ap = alength;}      
        if((alength - i) < ap ){ap = alength - i;}
      }  
      j = getRandomInt(ap) + i;  
      a = Arr1[i];
      Arr1[i] = Arr1[j];
      Arr1[j] = a;
      ap--;
    }  
    return Arr1; 
}

function speak(gv, text, arate) {    
   msgspeak = gv.msgspeak;
   msgspeak.lang = "en-EN";
   msgspeak.text = text;
   msgspeak.rate = arate;
   msgspeak.volume = 1;
   window.speechSynthesis.speak(msgspeak)
}
    
  
  