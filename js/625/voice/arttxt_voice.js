
function SetBodyHtmlWidthIfMobile() {
    // Check if the device is mobile
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Set the body width to 400px for mobile devices
        document.body.style.width = '400px';
    } else {
        // Set the body width to 80% for desktop devices
        document.body.style.width = '97%';
    }
}

function UpdateBookmarkBlockMenu(article_marks) {
    // create a div for article marks
    // if not exists, create it
    let articleMarksDiv = document.getElementById('article-marks');
    if (!articleMarksDiv) {
        articleMarksDiv = document.createElement('div');
        articleMarksDiv.id = 'article-marks';
        articleMarksDiv.className = 'menu-for-bookmark-block';
        document.body.appendChild(articleMarksDiv);
    }else {
       articleMarksDiv.innerHTML = ''; // Clear existing content
    }

    // create a button for each article mark with order by desc
    for (let i = article_marks.length - 1; i >= 0; i--) {
        const mark = article_marks[i];
        const markButton = document.createElement('button');
        markButton.textContent = mark.idsentence;
        markButton.onclick = function () {
            // Scroll to the corresponding sentence or section
            const id_target_name = `idsentence_en_${mark.idsentence}`;
            const targetSentence = document.getElementById(id_target_name);
            if (targetSentence) {
                targetSentence.scrollIntoView({ behavior: 'smooth' });
            }
        };
        articleMarksDiv.appendChild(markButton);
    }
}

function JsonToContentMD() {    

    // Ensure the styles are applied
    RemoveAllStylesCollect_New_Words();
    CreateMainCollect_New_Words_Styles();
    VoiceP2_createStyles();
    MarkAndOther_createStyles();

    


    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let name_article_text = get_article_name_text(cur_idarticle_text);
    let article_items = get_article_items(cur_idarticle_text);
    let article_marks = get_article_marks(cur_idarticle_text);
    if (!article_items) {
        console.error("No article items found for the given cur_idarticle_text.");
        return;        
    }
    let sentences = [];
    let phrases = gv.sts.phrases || []; // Ensure phrases is defined

    // add div with Title = Name of Article Text
    const articleTextName = document.createElement('div');
    articleTextName.id = 'title-name-article_text';
    articleTextName.innerHTML = `<h1>ID:${cur_idarticle_text} --- ${name_article_text}</h1>`;
    document.body.appendChild(articleTextName);

    // Create a bookmark block menu
    UpdateBookmarkBlockMenu(article_marks);

    // Process the article items
    article_items.forEach(item => {
        // Do something with each article item
        let sentenceData = get_sentence(item.idsentence);
        if (sentenceData) {
            sentences.push({
                idsentence: sentenceData.idsentence,
                sentenece_en: sentenceData.sentence_en,
                sentenece_ru: sentenceData.sentence_ru || "" // Ensure Russian translation is included
            });
        } 
      
    });

    const startname_id_div_sentence_ru = 'idsentence_ru_';
    const attribute_name_id_ru = 'idsentence_ru';


    // Process the sentences
    sentences.forEach(sentence => {
        if (sentence.sentenece_en) {
            // Create a container for the sentence and the play button
            const sentenceContainer = document.createElement('div');
            sentenceContainer.className = 'sentence-container_voice';

            // create the english sentence div
            const div_sentence_en = document.createElement('div');
            div_sentence_en.setAttribute('idsentence_en', sentence.idsentence); // Add the sentence ID as an attribute
            let startname_id_div_sentence_en = 'idsentence_en_'; // Prefix for the English sentence div ID
            div_sentence_en.id = startname_id_div_sentence_en + sentence.idsentence; // Unique ID for the English sentence div
            div_sentence_en.className = 'sentence_en_voice';
            div_sentence_en.textContent = sentence.sentenece_en; // Add the English sentence text
            div_sentence_en.onclick = function () {
//                SpeechEngl(this.textContent);
            };
            sentenceContainer.appendChild(div_sentence_en);
            // Create the Russian sentence div
            const div_sentence_ru = document.createElement('div');
            const id_div_sentence_ru = startname_id_div_sentence_ru + sentence.idsentence; // Unique ID for the Russian sentence div
            div_sentence_ru.id = id_div_sentence_ru;
            div_sentence_ru.className = 'sentence_ru_voice';
            div_sentence_ru.textContent = sentence.sentenece_ru; // Add the Russian sentence text
            div_sentence_ru.style.display = 'none'; // Hide the Russian sentence by default            
            // Append the container to the document body
            document.body.appendChild(sentenceContainer);

            //add below the sentence phrase containing in array of phrases
            const phraseControlContainer = document.createElement('div');
            phraseControlContainer.className = 'phrase-control-container';

            PhraseCtrl_AddTranslationButton(phraseControlContainer, attribute_name_id_ru, id_div_sentence_ru);
            PhraseCtrl_AddMenuButton(phraseControlContainer, sentence.idsentence);
            PhraseCtrl_AddSomeButton(phraseControlContainer, sentence.idsentence);

            const startname_id_content_phrase = 'idcontent_phrase_';
            const phraseInfoContainer = document.createElement('div');

            let inx = 0;
            phrases.forEach(phrase => {
                if (phrase.idphrase && phrase.phrase_en) {
                    // if phrase contains in sentence, add it to the phraseText
                    if (sentence.sentenece_en.includes(phrase.phrase_en)) {
                        inx++;
                        const div_MarkPhrase = document.createElement('div');
                        div_MarkPhrase.className = 'phrase-marker_voice';            
                        div_MarkPhrase.textContent = phrase.phrase_en.substring(0, 15);
                        let mark_phrase_id = startname_id_content_phrase + phrase.idphrase + sentence.idsentence; // Unique ID for the phrase marker
                        div_MarkPhrase.setAttribute(startname_id_content_phrase, mark_phrase_id); 
                        phraseControlContainer.appendChild(div_MarkPhrase);

                        const div_PhraseContent = document.createElement('div');
                        div_PhraseContent.className = 'div_phrase_content_voice';
                        div_PhraseContent.id = mark_phrase_id; 
                        // Add the English phrase (phrase_en)
                        const el_phraseEng = document.createElement('div');
                        el_phraseEng.textContent = `${phrase.phrase_en}`;
                        el_phraseEng.className = 'phrase_en_voice';                        
                        div_PhraseContent.appendChild(el_phraseEng);                        
                        // Add the Russian phrase (phrase_ru)
                        const el_phraseRus = document.createElement('div');
                        el_phraseRus.textContent = `${phrase.phrase_ru}`;
                        el_phraseRus.className = 'phrase_ru_voice';
                        div_PhraseContent.appendChild(el_phraseRus);                        
                        
                        // Add click event to the phrase element
                        div_MarkPhrase.onclick = function () {
                            let mark_phrase_id  = this.getAttribute(startname_id_content_phrase);                            
                            const div_PhraseContent1 = document.getElementById(mark_phrase_id);
                            let current_state_contentphrase = div_PhraseContent1.style.display;
                            // hide all translation
                            HideAllExternalsInfo();
                            // if (current_state_contentphrase === 'none' || current_state_contentphrase === '') {
                            //     div_PhraseContent1.style.display = 'block';
                            //     SpeechEngl(phrase.phrase_en);  // Speak the English text
                            // } else {
                            //     div_PhraseContent1.style.display = 'none';
                            // }
                            div_PhraseContent1.style.display = 'block';
                            SpeechEngl(phrase.phrase_en);  // Speak the English text
                            const div_phrase_en = div_PhraseContent1.querySelector('.phrase_en_voice');
                            // select the text in the div_sentence_en
                            window.getSelection().removeAllRanges(); // Clear any existing selection
                            const range = document.createRange();
                            range.selectNodeContents(div_phrase_en); // Select the contents of the div
                            window.getSelection().addRange(range); // Add the new selection
                        };
                        phraseInfoContainer.appendChild(div_PhraseContent);                        
                        
                    }
                }
            });
            // Append the phrase container to the sentence container
            if (phraseControlContainer.childElementCount > 0) {
                sentenceContainer.appendChild(phraseControlContainer);
                sentenceContainer.appendChild(phraseInfoContainer);
            }
            // Append the Russian sentence div to the sentence container
            sentenceContainer.appendChild(div_sentence_ru);
        }
    });

    AddExportButton();    

}

function HideAllExternalsInfo() {
    const translations = document.querySelectorAll('.sentence_ru_voice');
    translations.forEach(translation => {
        translation.style.display = 'none';        
    });
    const phraseContents = document.querySelectorAll('.div_phrase_content_voice');
    phraseContents.forEach(phraseContent => {
        phraseContent.style.display = 'none';        
    });
}


function PhraseCtrl_AddSomeButton(phraseControlContainer, idsentence){            
    let startname_id_div_sentence_en = 'idsentence_en_'; // Prefix for the English sentence div ID
    // Create the ShowTranslation button
    const SomeButton = document.createElement('div');
    SomeButton.className = 'button_voice_somebutton';
    //SomeButton.textContent = 'Some';
    SomeButton.textContent = 'Play';            
    SomeButton.setAttribute("idsentence", idsentence); // Add the sentence ID as an attribute
    //div_sentence_en.id = 'idsentence_en_' + sentence.idsentence; // Unique ID for the English sentence div


    // SomeButton.onclick = function (element) {
    //     let id_sentence = this.getAttribute("idsentence");
    //     let div_sentence_en = document.getElementById(startname_id_div_sentence_en + id_sentence);
    //     // select the text in the div_sentence_en
    //     window.getSelection().removeAllRanges(); // Clear any existing selection
    //     const range = document.createRange();
    //     range.selectNodeContents(div_sentence_en); // Select the contents of the div
    //     window.getSelection().addRange(range); // Add the new selection
    // };
    SomeButton.onclick = function (element) {
            let id_sentence = this.getAttribute("idsentence");
            let div_sentence_en = document.getElementById(startname_id_div_sentence_en + id_sentence);
        SpeechEngl(div_sentence_en.textContent);
    };
    phraseControlContainer.appendChild(SomeButton);
}

// if exists idsentence in marks return true, else false
function isIdsentenceInMarks(idsentence) {
    let cur_idarticle_text = gv.sts.config_phrase.cur_idarticle_text;
    let article_marks = get_article_marks(cur_idarticle_text);
    return article_marks.some(mark => mark.idsentence === idsentence);
}


function PhraseCtrl_AddMenuButton(phraseControlContainer, idsentence) {
    // create the phrase_menu button
    const phraseMenuButton = document.createElement('button');
    phraseMenuButton.className = 'button_voice_somebutton';
    phraseMenuButton.textContent = 'Menu';
    phraseMenuButton.setAttribute("idsentence", idsentence);
    // Check if the idsentence is already marked
    if (isIdsentenceInMarks(idsentence)) {
        phraseMenuButton.textContent = 'Marked'; // Change the text to "Marked"
        phraseMenuButton.style.backgroundColor = 'red'; // Change the background color to red
        phraseMenuButton.setAttribute("mark_saved", 'true'); // Add a custom attribute to track saved state
    } else {
        phraseMenuButton.style.backgroundColor = ''; // Change the background color to default by like in style .button_voice_somebutton
        phraseMenuButton.setAttribute("mark_saved", 'false'); // Add a custom attribute to track saved state
    }    
    phraseMenuButton.onclick = function () {                
        HideAllExternalsInfo();
        let idsentence = Number(this.getAttribute("idsentence"));
        let mark_saved = this.getAttribute("mark_saved");
        if (mark_saved === 'false') {
           SaveMarkCurrentIdsentence(idsentence); 
           this.setAttribute("mark_saved", 'true'); 
           //change the text of the button to "Marked" and background color to red
           this.textContent = 'Marked';
           this.style.backgroundColor = 'red';
        }else{
           DeleteMarkCurrentIdsentence(idsentence); 
           this.setAttribute("mark_saved", 'false'); 
           //change the text of the button to "Menu" and background color to blue
           this.textContent = 'Menu';
           this.style.backgroundColor = '';
        }
    }
    phraseControlContainer.appendChild(phraseMenuButton);
}

function DeleteMarkCurrentIdsentence(idsentence) {
    let cur_idarticle_text = gv.sts.config_phrase.cur_idarticle_text;
    let article_marks = get_article_marks(cur_idarticle_text);
    // look for the index of the mark with the given idsentence
    let mark_index = article_marks.findIndex(mark => mark.idsentence === idsentence);
    if (mark_index !== -1) {
        // Remove the mark from the array
        article_marks.splice(mark_index, 1);
        // Save the updated marks to Firebase
        save_article_marks_to_fb(cur_idarticle_text, article_marks);
    }
    UpdateBookmarkBlockMenu(article_marks);
}

function SaveMarkCurrentIdsentence(idsentence) {
    let cur_idarticle_text = gv.sts.config_phrase.cur_idarticle_text;
    let article_marks = get_article_marks(cur_idarticle_text);
    // look if idsentence already exists in article_marks
    let mark_exists = article_marks.some(mark => mark.idsentence === idsentence);
    if (!mark_exists) {
        // Create a new mark
        let new_mark = {
            idsentence: idsentence,
            datetime: get_now_n19_datefromat_fb() // Get the current date in the required format
        };
        article_marks.push(new_mark);
        // Save the updated marks to Firebase
        save_article_marks_to_fb(cur_idarticle_text, article_marks);
    }
    // Update the bookmark block menu
    UpdateBookmarkBlockMenu(article_marks);
}


function PhraseCtrl_AddTranslationButton(phraseControlContainer, attribute_name_id_ru, id_div_sentence_ru) {
    // Create the ShowTranslation button
    const TransButton = document.createElement('div');
    TransButton.className = 'button_voice_translation';
    TransButton.textContent = 'Transl';
    TransButton.setAttribute(attribute_name_id_ru, id_div_sentence_ru); // Add the sentence ID as an attribute
    TransButton.onclick = function () {
        // Get the ID of the Russian sentence div from the button's attribute               
        let div_sentence_ru = document.getElementById(id_div_sentence_ru);
        let current_state = div_sentence_ru.style.display;
        // hide all translation
        HideAllExternalsInfo();
        if (current_state === 'none' || current_state === '') {
            div_sentence_ru.style.display = 'block'; // Show the Russian sentence
        } else {
            div_sentence_ru.style.display = 'none'; // Hide the Russian sentence
        }
    };
    phraseControlContainer.appendChild(TransButton);            
}

function AddExportButton() {
    // add button in the end of the body for the export 
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Extract and Download Phrases';
    exportButton.id = 'exportPhrasesButton';    
    exportButton.className = 'button_control_phrases';
    exportButton.onclick = function () {
        let sts1 = gv.sts;    
        let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
        let article_items = get_article_items(cur_idarticle_text);    
        if (!article_items) {
            console.error("No article items found for the given cur_idarticle_text.");
            return;        
        }

        let exp_phrases = [];
        let phrases = gv.sts.phrases || [];
        article_items.forEach(item => {
            phrases.forEach(phrase => {
                if (phrase.src_sentence === item.idsentence) {
                    if (!phrase.phrase_ru || phrase.phrase_ru.length < 3) {
                        exp_phrases.push(phrase);
                    }
                }
            });
        });
        if (exp_phrases.length > 0) { ExtractPhrasesForDownloading(exp_phrases); }

    };

    // Create a margin div to separate the button from other content
    marginDiv = document.createElement('div');
    marginDiv.style.marginTop = '70px';
    document.body.appendChild(marginDiv);
    // Append the export button to the body
    document.body.appendChild(exportButton);
}

function ExtractPhrasesForDownloading(exp_phrases) {
  // create a logic for download json exp_phrases from html
  const json = JSON.stringify(exp_phrases);
  // add after every phrase new line  
  const jsonWithNewLines = json.replace(/},/g, '},\n');
  // add new line after  `,"`
  const jsonWithNewLines2 = jsonWithNewLines.replace(/,"/g, ',\n"');
  // create a blob from the json string
  const blob = new Blob([jsonWithNewLines2], { type: 'application/json' });  
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'exported_phrases.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  let vdata = gv.vdata1;
  if (!vdata) return;
  if (!vdata["exp_phrases"]) {
      vdata["exp_phrases"] = [];
  }
  vdata["exp_phrases"] = exp_phrases;
  RequestArrFireBase(vdata, 'PATCH');
}


function build_VoiceArticleText_MainUI() {
  // Clear body
  document.body.innerHTML = '';
  try {
        // call add function to add the voice selection dropdown
        addVoiceSelectionDropdown();
        // Call the function to convert JSON to content
        JsonToContentMD();
        Load_Label_Collect_New_Words_HtmlContent();
    } catch (error) {
        console.error("Error in MainFunc:", error);
    }

  build_forall_MainUI();
};


function Load_Label_Collect_New_Words_HtmlContent() {
    sts1 = gv.sts;
    let indx_coll_words = sts1.config_phrase.collect_new_words.indx_coll_words;
    let list_sent_en_voice = document.querySelectorAll(".sentence_en_voice");
    list_sent_en_voice.forEach((element) => {
        sentence_en = element.textContent;
        element.textContent = '';
        let idsentence = Number(element.getAttribute("idsentence_en"));
        SplitWordsIntoContent(idsentence, sentence_en, element, indx_coll_words);
    });
}


function MarkAndOther_createStyles() {
    const style = document.createElement('style');
    style.textContent = `
       .menu-for-bookmark-block {
           margin: 10px 0;
           padding: 10px;
           border: 1px solid #ccc;
           border-radius: 5px;
           background-color: #f9f9f9;
       }
         .menu-for-bookmark-block button {
              margin-right: 40px;
              margin-bottom: 30px;
              padding: 5px 10px;
              height: 40px;
              width: 100px;
              font-size: 26px;
              cursor: pointer;
              border: none;
              border-radius: 3px;
              background-color: #007bff;
              color: white;
         }
    `;
    document.head.appendChild(style);
}



function VoiceP2_createStyles() {
    const style = document.createElement('style');
    style.textContent = `
.title-name-article_text {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 3px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    color: #333;
}    
.sentence_en_voice {
    margin-bottom: 20px; 
    font-size: 30px;
    display: block;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.sentence_ru_voice {
    margin-bottom: 20px; 
    font-size: 26px;
    display: block;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color:rgb(203, 209, 248);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    color: rgb(18, 87, 23);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

phrase_en_voice {
    font-size: 28px;
    display: block;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    color: #333;
    cursor: pointer;    
}

.phrase_ru_voice {
    font-size: 26px;
    display: block;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: rgb(203, 209, 248);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    color: rgb(18, 87, 23);
    cursor: pointer;    
}

.word_no-translation_voice {
    display: inline-block;
    position: relative;
}

.word_voice {
    cursor: pointer;
    display: inline-block;
    position: relative;
}

.word_voice:hover {
    background-color: yellow;
}

.div_phrase_content_voice {
    display: none;    
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    padding: 15px;    
    width: 350px;
    height: auto;
    font-size: 28px;
    border-radius: 5px;
    color: black;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);        
    min-width: 350px;
    word-wrap: break-word;
    line-height: 1.5;
    text-align: left;
    font-family: Arial, sans-serif;
    box-sizing: border-box;
    margin-top: 5px;
    margin-left: 5px;
}

.div_phrase_content_voice button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    border: none;
    font-size: 28px;
    cursor: pointer;
}

.div_phrase_content_voice button:hover {
    color: red;
}

.phrase-control-container {
    margin-top: 10px;
    margin-left: 10px;
    display: block;
    font-size: 28px;
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #f9f9f9;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.phrase-marker_voice {
    display: inline-block;
    min-width: 50px;
    height: 40px;
    margin-left: 45px;
    margin-bottom: 20px;
    border-radius: 3px;
    cursor: pointer;
    color: white;
    background-color:rgb(46, 157, 167);
    font-weight: normal;
    font-size: 28px;
}

.phrase-marker_voice:hover {
    text-decoration: underline;
}

.sentence-container_voice {
    margin-bottom: 35px;
}

.sentence-container_voice button {
    margin-bottom: 5px;
}

.button_voice_translation {
    background-color:rgb(19, 70, 21);
    color: white;
    border: none;    
    border-radius: 3px;
    width: 100px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
}

.button_voice_translation:hover {
    background-color:rgb(14, 47, 15);
}

.button_voice_somebutton {
    background-color: rgb(44, 155, 24);
    color: white;
    border: none;    
    border-radius: 3px;
    width: 100px;
    height: 40px;
    margin-left: 30px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    -webkit-touch-callout: default;
}

.button_control_phrases1 {
    background-color: rgb(44, 155, 24);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 28px;
    cursor: pointer;
    margin-left: 30px;
    bottom: 30px;
    right: 30px;
    height: 45px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.button_control_phrases:hover {
    background-color: rgb(34, 120, 18);
}

    `;
    document.head.appendChild(style);
}
