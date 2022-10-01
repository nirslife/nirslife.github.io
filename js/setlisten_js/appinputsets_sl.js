function Get_eventvalue_devices(){
  const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', "i");
  let aeventv = "onclick";
  if (devices.test(navigator.userAgent)) {
    aeventv = "ontouchend"; // ontouchstart ontouchend    
    //               alert("Ð’Ñ‹ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚Ðµ Ð¼Ð¾Ð±Ð¸Ð»ÑŒÐ½Ð¾Ðµ ÑƒÑÑ‚Ñ€Ð¾Ð¹ÑÑ‚Ð²Ð¾ (Ñ‚ÐµÐ»ÐµÑ„Ð¾Ð½ Ð¸Ð»Ð¸ Ð¿Ð»Ð°Ð½ÑˆÐµÑ‚).")
  }   
  return aeventv;
} 


async function LoadSentencesJson(aLessonNum,aCallBack) {
  function InitUrlSentencesJson(aLessonNum) {
    const UrlArrP1 = "https://nirslife.github.io/json/arr_sentences";
    const UrlArrP2 = ".json";  
    let UrlArray1 = UrlArrP1 + aLessonNum + UrlArrP2;
    return UrlArray1; 
  }  
  const response = await fetch(InitUrlSentencesJson(aLessonNum));
  const array1 = await response.json();
  aCallBack(array1);
}

// ðàçðåçàåì ïðåäëîæåíèå ïî ïðîáåëàì
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
    s1 = s1.replaceAll(" ","");   // óáèðàåì ïðîáåëû	
	if (s1.length == 1) {s1 = s1 + " ";} 
	arrsen[j] = s1;
	j++;
  }   
  return arrsen;
}

