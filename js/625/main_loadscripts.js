function loadAppScripts() {
  const scripts = [
    "./js/625/sent_main.js",
    "./js/625/global_var.js",
    "./js/625/phrase/phraseloadsave.js",
    "./js/625/phrase/phrase_proc.js",
    "./js/625/voice/voice_p1.js",
    "./js/625/article/article_p1.js",
    "./js/625/mainmenu_ui.js",
    "./js/625/voice/arttxt_voice.js",    
    "./js/625/phrase/phrase_ui.js",
    "./js/625/article/enter_article_ui.js",
    "./js/625/trans/trans_ui.js",
    "./js/625/main_click.js",    
    "./js/625/trans/phrase_trans_loadsave.js",
    "./js/625/trans/sent_trans_loadsave.js"    
  ];
  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    document.head.appendChild(script);
  });
}

// Call this function as early as possible, e.g. in a <script> tag before </body> or at the top of your main JS file:
loadAppScripts();