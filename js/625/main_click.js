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


// ExImpForTrans
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



