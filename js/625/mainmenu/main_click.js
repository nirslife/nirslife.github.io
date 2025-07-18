//PREV
function Click_Prev_ArticleText() {
    Click_Move_ArticleText_Custom('prev');
}

// NEXT
function Click_Next_ArticleText() {
    Click_Move_ArticleText_Custom('next');
}


// Phrase
function Click_Main_Phrase_LoadDataToHTML() {
    SetDBCurProgramType("Phrase");  
    Main_Phrase_LoadDataToHTML();
}

function Main_Phrase_LoadDataToHTML() {
   build_Phrase_MainUI();
   LoadSentences();
}


// Phr_New
function Click_Main_Phr_New_LoadDataToHTML() {
    SetDBCurProgramType("Phr_New");
    Main_Phr_New_LoadDataToHTML();
}
function Main_Phr_New_LoadDataToHTML() {
   build_phr_new_MainUI();
   Load_phr_Sentences();
}



// ArticleText
function Click_Main_ArticleText_LoadDataToHTML() {
    SetDBCurProgramType("ArticleText");
    Main_ArticleText_LoadDataToHTML();
}
function Main_ArticleText_LoadDataToHTML(){
    build_ArticleTextEnter_MainUI();    
}


// VoiceArticleText
function Click_Main_VoiceArticleText_LoadDataToHTML(){
   SetDBCurProgramType("VoiceArticleText");
   Main_VoiceArticleText_LoadDataToHTML();
}
function Main_VoiceArticleText_LoadDataToHTML() {
  build_VoiceArticleText_MainUI();
}


// ExImpForTrans  //for Sentences and Phrases
function Click_Main_ExpImpForTrans_LoadDataToHTML() {
    SetDBCurProgramType("ExpImpForTrans_Sent");
    Main_ExpImpForTrans_Sent_LoadDataToHTML();
}
function Main_ExpImpForTrans_Sent_LoadDataToHTML() {
    build_ExpImpForTrans_MainUI();
    ExpImpForTrans_Sentence_loadDataToHTML();        
}
function Click_Main_ExpImpForTrans_ShowPhrases(){
    SetDBCurProgramType("ExpImpForTrans_Phrase");
    Main_ExpImpForTrans_Phrase_LoadDataToHTML();
}
function Main_ExpImpForTrans_Phrase_LoadDataToHTML() {
    build_ExpImpForTrans_MainUI();
    ExpImpForTrans_Phrase_loadDataToHTML();        
}




// SortPhrase
function Click_Main_Sort_Phrase_HTML() {
    SetDBCurProgramType("SortPhrase");
    Main_SortPhrase_LoadDataToHTML();
}
function Main_SortPhrase_LoadDataToHTML() {
    //build_SortPhrase_MainUI();
    Load_Sort_Phrase_HtmlContent();    
}


// CollectNewWords
function Click_Main_CollectNewWords() {
    SetDBCurProgramType("CollectNewWords");
    Main_CollectNewWords_LoadDataToHTML();
}
function Main_CollectNewWords_LoadDataToHTML() { 
    Load_CollectNewWords_HtmlContent();
}


// Backup Text Phrase Object
function Click_Main_Backup_Text_Phrase_Obj() { 
    Main_Backup_Text_Phrase_Obj_WithTS();    
}

function  Click_Main_OpenSettings() {
}

function  Click_Main_Other777() {
}


// function Create_MainMenu_Elem() {
//     const mainMenu = document.createElement('div');
//     mainMenu.id = 'main_menu';
//     mainMenu.style.display = 'none'; // Initially hidden
//     document.body.appendChild(mainMenu); 
    
//     const info1 = gv.cst.FBSets.DataSet_Basic;  

    
//     mainMenu.innerHTML = `
//       <div class="info_platform"> ${info1} </div>
//       <div class="pair_items">
//         <div class="button_mmenu_items btn_next1" id = "prev_article_text_mm"> PREV Article Text </div>
//         <div class="button_mmenu_items btn_next1" id = "next_article_text_mm"> NEXT Article Text -> </div>
//       </div>
//       <div class="pair_items">
//         <div class="button_mmenu_items" id = "main_phrase_mm" >..1.. Phrase</div>        
//         <div class="button_mmenu_items" id = "main_phr_new_mm">..1.1.. NEW Phrase</div>
//       </div>  
//       <div class="pair_items">
//         <div class="button_mmenu_items" id = "main_article_text_mm" >..2.. Import Article Text</div>
//         <div class="button_mmenu_items" id = "main_voice_article_text_mm" >..3.. Voice Article Text</div>
//       </div>
//       <div class="pair_items">
//         <div class="button_mmenu_items" id = "main_open_settings_mm" >..4.. Open Settings</div>      
//         <div class="button_mmenu_items" id = "main_exp_imp_for_trans_mm" >..5.. Translation Exports/Import</div>            
//       </div>
//       <div class="pair_items">
//         <div class="button_mmenu_items" id = "main_sort_phrase_mm" >..6.. Sort Phrase</div>      
//         <div class="button_mmenu_items" id = "main_collect_new_words_mm" >..7.. Collect New Words</div>            
//       </div>
//       <div class="pair_items">
//         <div class="button_mmenu_items" id = "main_backup_text_phrase_obj_mm" >..8.. BackUP TEXT_PHRASE_OBJ</div>      

//       </div>

//     `;
//     InitOnClickFunc_MainMenu();
//     return mainMenu;
// }

// function InitOnClickFunc_MainMenu() { 

//   // Add event listeners to the buttons
//   document.getElementById('prev_article_text_mm').setAttribute('onclick', 'Click_Prev_ArticleText()');
//   document.getElementById('next_article_text_mm').setAttribute('onclick', 'Click_Next_ArticleText()');
//   document.getElementById('main_phrase_mm').setAttribute('onclick', 'Click_Main_Phrase_LoadDataToHTML()');
//   document.getElementById('main_phr_new_mm').setAttribute('onclick', 'Click_Main_Phr_New_LoadDataToHTML()');
//   document.getElementById('main_article_text_mm').setAttribute('onclick', 'Click_Main_ArticleText_LoadDataToHTML()');
//   document.getElementById('main_voice_article_text_mm').setAttribute('onclick', 'Click_Main_VoiceArticleText_LoadDataToHTML()');
//   document.getElementById('main_open_settings_mm').setAttribute('onclick', 'Click_Main_OpenSettings()');
//   document.getElementById('main_exp_imp_for_trans_mm').setAttribute('onclick', 'Click_Main_ExpImpForTrans_LoadDataToHTML()');
//   document.getElementById('main_sort_phrase_mm').setAttribute('onclick', 'Click_Main_Sort_Phrase_HTML()');
//   document.getElementById('main_collect_new_words_mm').setAttribute('onclick', 'Click_Main_CollectNewWords()');
//   document.getElementById('main_backup_text_phrase_obj_mm').setAttribute('onclick', 'Click_Main_Backup_Text_Phrase_Obj()');

// }




