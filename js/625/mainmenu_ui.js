function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
  

// Show button when scrolled down
window.onscroll = function() {
  const btn = document.getElementById('scrollToTopBtn');
  if (!btn) return;
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function build_forall_MainUI() {
  // build the main menu in top of the page. 
  // 1) create one button for opening the main menu in absolute position
  // 2) create the main menu with buttons for each section.
  // 3) create close button for the main menu.

  MainMenu_createStyleForAll();

  const mainMenu = document.createElement('div');
  mainMenu.id = 'main_menu';
  mainMenu.style.display = 'none';
    mainMenu.innerHTML = `
      <div class="pair_items">
        <div class="button_mmenu_items btn_next1" onclick="Click_Prev_ArticleText()"> PREV Article Text </div>
        <div class="button_mmenu_items btn_next1" onclick="Click_Next_ArticleText()"> NEXT Article Text -> </div>
      </div>
      <div class="pair_items">
        <div class="button_mmenu_items" onclick="Click_Main_Phrase_LoadDataToHTML()">..1.. Phrase</div>        
        <div class="button_mmenu_items" onclick="Click_Main_Phr_New_LoadDataToHTML()">..1.1.. NEW Phrase</div>
      </div>  
      <div class="pair_items">
        <div class="button_mmenu_items" onclick="Click_Main_ArticleText_LoadDataToHTML()">..2.. Import Article Text</div>
        <div class="button_mmenu_items" onclick="Click_Main_VoiceArticleText_LoadDataToHTML()">..3.. Voice Article Text</div>
      </div>
      <div class="pair_items">
        <div class="button_mmenu_items" onclick="Click_Main_OpenSettings()">..4.. Open Settings</div>      
        <div class="button_mmenu_items" onclick="Click_Main_ExpImpForTrans_LoadDataToHTML()">..5.. Translation Exports/Import</div>            
      </div>
    `;
  document.body.appendChild(mainMenu);

    
  // Button to toggle main menu visibility
  const toggleMenuButton = document.createElement('button');
  toggleMenuButton.id = 'toggleMainMenuButton';
  toggleMenuButton.innerText = '☰ Main Menu';
  toggleMenuButton.onclick = function() {
  if (mainMenu.style.display === 'none') {
      mainMenu.style.display = 'block';
    } else {
      mainMenu.style.display = 'none';
    }
  };
  document.body.appendChild(toggleMenuButton);
  // Close main menu function



  // Scroll to top button
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTopBtn';
  scrollBtn.className = 'button_controlsentences';
  scrollBtn.style.display = 'none'; // Initially hidden
  scrollBtn.onclick =  function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  scrollBtn.innerText = '↑ Top';
  document.body.appendChild(scrollBtn);

  scrollToTop();
}


function MainMenu_createStyleForMainMenu() {
  const style = document.createElement('style');
  style.innerHTML = `
    #main_menu {
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      padding: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      position: absolute;         /* Make menu absolute */
      top: 0;                     /* Stick to the top */
      left: 0;
      width: 800px;               /* Fixed width */
      max-width: 95vw;            /* Responsive on small screens */
      z-index: 1001;              /* Above other content */
      display: none;              /* Hidden by default, shown when toggled */
    }
    #main_menu .main_menu_item {
      margin: 5px 0;      
      cursor: pointer;
    }
    #main_menu .main_menu_item:hover {
      background-color: #e0e0e0;
    }
    #toggleMainMenuButton {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1002;
      width: 150px; /* Fixed width for the button */
      height: 65px; /* Fixed height for the button */
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      display: block; /* Make it visible */
      border-radius: 5px;
    }
    #toggleMainMenuButton:hover {
      background-color: #0056b3;
    }
  `;
  document.head.appendChild(style);
}

function MainMenu_createStyleForItemsMenu() {
  const style = document.createElement('style');
  style.innerHTML = `
    .pair_items {
      display: block;
    }
    
    .button_mmenu_items {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      margin: 20px 60px;
      min-height: 50px;     
      border-radius: 5px;
      text-align: center;
      font-size: 26px;
      display: inline-block;
    }
    .button_mmenu_items:hover {
      background-color: #0056b3;
    }
    #closeMainMenuButton {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: none; /* Initially hidden */
      z-index: 1000;
    }
    #closeMainMenuButton:hover {
      background-color: rgba(0, 0, 0, 0.9);
    }
    .btn_next1 {
      background-color: rgb(44, 155, 24);
    }

  .button_controlsentences {
  background: #1e90ff;
  color: #fff;
  border: none;
  min-height: 30px;
  border-radius: 7px;
  padding: 12px 28px;
  font-size: 26px;
  font-weight: 600;
  margin: 12px 20px 12px 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(30,144,255,0.08);
  transition: background 0.2s, box-shadow 0.2s;
  display: inline-block;
  letter-spacing: 0.5px;
}

.button_controlsentences:hover {
  background: #156ec1;
  box-shadow: 0 4px 16px rgba(30,144,255,0.18);
}

  `;
  document.head.appendChild(style);
//   // Show the close button when the main menu is open
//   const closeButton = document.getElementById('closeMainMenuButton');
//     if (closeButton) {
//         closeButton.style.display = 'block';
//     }
}


function MainMenu_createStyleForAll() {
   MainMenu_createStyleForMainMenu();
   MainMenu_createStyleForscrollBtn();
   MainMenu_createStyleForItemsMenu();
}

function MainMenu_createStyleForscrollBtn() {
  const style = document.createElement('style');
  style.innerHTML = `
    #scrollToTopBtn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1000;
      display: none;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 15px;
      font-size: 18px;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      transition: background 0.2s;
    }
    #scrollToTopBtn:hover {
      background-color: #0056b3;
    }
  `;
  document.head.appendChild(style);   

}
