function loadAppScripts() {
  const scripts = [

    "./js/625/main_func/sent_main.js",
    "./js/625/main_func/global_var.js",
    "./js/625/mainmenu/mainmenu_ui.js",
    "./js/625/mainmenu/main_click.js",


    "./js/625/phrase/phraseloadsave.js",
    "./js/625/phrase/phrase_proc.js",
    "./js/625/phrase/phrase_ui.js",


    "./js/625/voice/voice_p1.js",    
    "./js/625/voice/arttxt_voice.js",        
    

    "./js/625/import_article/imp_art_tmpl.js",
    "./js/625/import_article/imp_art_pr_ui.js",


    "./js/625/trans/trans_ui.js",
    "./js/625/trans/phrase_trans_loadsave.js",
    "./js/625/trans/sent_trans_loadsave.js",


    "./js/625/phr_new/phr_new_ui.js",    
    "./js/625/phr_new/phr_new_proc.js",    
    "./js/625/phr_new/phr_newloadsave.js",

    "./js/625/sort_phrase/sort_phr_tmpl.js",

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