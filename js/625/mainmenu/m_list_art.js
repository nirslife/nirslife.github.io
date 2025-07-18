function build_forall_MenuListArtUI(main_screen) {
    // Create the menu list art element
    const MenuListArt = Create_Menu_List_Art_Elem();
    main_screen.appendChild(MenuListArt);
    MenuListArt_createStyleForAll();
}

function OnClick_Popup_ListArtNames() {
    const MenuListArt = document.getElementById('menulistart');
    if (!MenuListArt) {
        console.error("Menu list art element not found.");
        return;
    }

    const element = document.getElementById('popupListArtNames_mm');
    // Toggle visibility of the menu list art
    if (MenuListArt.style.display === 'none') {
        MenuListArt.style.display = 'block';
        // make menu below the button
        const rect = element.getBoundingClientRect();
        MenuListArt.style.top = `${rect.bottom + window.scrollY}px`; // Position below
        MenuListArt.style.left = `${rect.left + window.scrollX}px`; // Align with
    } else {
        MenuListArt.style.display = 'none';
    }

}


function Create_Menu_List_Art_Elem() {
    const MenuListArt = document.createElement('div');
    MenuListArt.id = 'menulistart';
    MenuListArt.style.display = 'none'; // Initially hidden
    document.body.appendChild(MenuListArt);
    let article_text = gv.sts.article_text;    
    let list_art_name = [];    
    if (article_text && article_text.length > 0) {                
        // Create a list of article names
        article_text.forEach(item => {
            let element = {}
            element.idarticle_text = item.idarticle_text;
            element.name_article_text = item.name_article_text;
            list_art_name.push(element);
        });
    } else {
        console.warn("No article text found in gv.sts.article_text.");
        return MenuListArt; // Return empty menu if no articles
    }
    list_art_name.sort((a, b) => b.idarticle_text - a.idarticle_text);
    list_art_name.forEach(item => {
        const txtnameitem_1 = item.idarticle_text+ ". " + item.name_article_text;
        const max_lenstr = 55; // Maximum length for truncation
        const txtnameitem = txtnameitem_1.length > max_lenstr ? txtnameitem_1.substring(0, max_lenstr) + '...' : txtnameitem_1; // Truncate if too long
        const div_m_item = document.createElement('div');
        div_m_item.className = 'button_mlistart_item';
        div_m_item.innerText = txtnameitem;
        div_m_item.setAttribute('idarticle_text', item.idarticle_text);
        div_m_item.onclick = function() {
            // Handle item click, e.g., load article text or perform an action
            const selected_idarticle_text = Number(div_m_item.getAttribute('idarticle_text'));
            if (isNaN(selected_idarticle_text)) {
                console.error("Invalid idarticle_text:", div_m_item.getAttribute('idarticle_text'));
                return;
            }
            Proc_Select_ArticleText_Custom(selected_idarticle_text);
        }
        MenuListArt.appendChild(div_m_item);
    });

    return MenuListArt;
}

function MenuListArt_createStyleForAll() {
   MenuListArt_createStyleForMenuListArt();
   MenuListArt_createStyleForItemsMenu();
}


function MenuListArt_createStyleForMenuListArt() {
  const style = document.createElement('style');  
  // make it hidden by default, shown when toggled  


  style.innerHTML = `
    #menulistart {
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      padding: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      position: absolute;         /* Make menu absolute */
      cursor: pointer;
      user-select: none;      
      overflow-y: auto;           /* Enable vertical scrolling */
      top: 0;                     /* Stick to the top */
      left: 0;
      width: 800px;               /* Fixed width */
      max-width: 95vw;            /* Responsive on small screens */
      /* fix max height and fix content inner only this */      
      max-height: 30vh;           /* Limit height for better usability */
      z-index: 1001;              /* Above other content */
      display: none;              /* Hidden by default, shown when toggled */
    }


    #toggleMenulistartButton {
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

    #toggleMenulistartButton:hover {
      background-color: #0056b3;
    }
  `;
  document.head.appendChild(style);
}

function MenuListArt_createStyleForItemsMenu() {
  const style = document.createElement('style');
  style.innerHTML = `    

    #menulistart .button_mlistart_item {
      background-color:rgb(6, 94, 71);
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      margin: 5px 60px;
      min-height: 30px;     
      border-radius: 5px;
      text-align: center;
      font-size: 26px;
      display: inline-block;
    }

    #menulistart .button_mlistart_item:hover {
      background-color:rgb(31, 57, 51);
    }

  `;
  document.head.appendChild(style);
}



