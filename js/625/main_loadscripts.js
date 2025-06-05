function loadAppScripts() {
  const scripts = [
    "./js/625/sent_main.js",
    "./js/625/global_var.js",
    "./js/625/phrase_p1.js",
    "./js/625/phrase_proc.js",
    "./js/625/voice_p1.js",
    "./js/625/article_p1.js",
    "./js/625/ui/buildUI.js",
    "./js/625/ui/mainmenu_ui.js",
    "./js/625/voice_p2.js"
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