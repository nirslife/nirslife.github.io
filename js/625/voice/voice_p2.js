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


function JsonToContentMD() {    

    // Ensure the styles are applied
    VoiceP2_createStyles();

    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);    
    if (!article_items) {
        console.error("No article items found for the given cur_idarticle_text.");
        return;        
    }
    let sentences = [];
    let phrases = gv.sts.phrases || []; // Ensure phrases is defined

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

    // const jsonData = JSON.parse(jsonData20250502504410f);
    // const phrases = jsonData.phrases;
    // const sentences = jsonData.sentences;

    // Process the sentences
    sentences.forEach(sentence => {
        if (sentence.sentenece_en) {
            // Create a container for the sentence and the play button
            const sentenceContainer = document.createElement('div');
            sentenceContainer.className = 'sentence-container_voice';

            // Create the sentence div
            const div_sentence = document.createElement('div');
            div_sentence.className = 'sentence_voice';
            div_sentence.textContent = sentence.sentenece_en; // Add the English sentence text
            // Add the Russian translation as a data attribute
            div_sentence.setAttribute('rus-text', sentence.sentenece_ru);
            // Add the English sentence text as a data attribute
            let engl1_text = sentence.sentenece_en;
            div_sentence.setAttribute('eng-text', engl1_text);
            // Append the sentence div to the container
            sentenceContainer.appendChild(div_sentence);
            // Append the container to the document body
            document.body.appendChild(sentenceContainer);

            //add below the sentence phrase containing in array of phrases
            const phraseContainer = document.createElement('div');
            phraseContainer.className = 'phrase-container_voice';

            // Create the play button
            const playButton = document.createElement('div');
            playButton.className = 'button_voice_play';
            playButton.textContent = 'Play';            
            playButton.onclick = function () {
                SpeechEngl(sentence.sentenece_en); // Speak the sentence text
            };
            phraseContainer.appendChild(playButton);


            let inx = 0;
            phrases.forEach(phrase => {
                if (phrase.idphrase && phrase.phrase_en) {
                    // if phrase contains in sentence, add it to the phraseText
                    if (sentence.sentenece_en.includes(phrase.phrase_en)) {
                        inx++;
                        const phraseElement = document.createElement('div');
                        phraseElement.className = 'phrase-marker_voice';
                        phraseElement.textContent = phrase.phrase_en.substring(0, 15);
                        const newTranslationElement = document.createElement('div');
                        newTranslationElement.className = 'translation_voice';
                        // Add the English phrase (phrase_en)
                        const phraseEnEl = document.createElement('div');
                        phraseEnEl.textContent = `${phrase.phrase_en}`;
                        phraseEnEl.style.fontWeight = 'bold'; // Optional: Make it bold
                        newTranslationElement.appendChild(phraseEnEl);
                        
                        // Add the Russian translation (phrase_ru)
                        const translationText = document.createElement('div');
                        translationText.textContent = `${phrase.phrase_ru}`;
                        newTranslationElement.appendChild(translationText);
                        
                        // Add a close button
                        const closeButton = document.createElement('button');
                        closeButton.textContent = 'X';
                        closeButton.onclick = function(event) {
                            event.stopPropagation(); // Prevent the click event from bubbling up
                            newTranslationElement.style.display = 'none';
                        };
                        newTranslationElement.appendChild(closeButton);
                        // Add the translation popup to the phrase element
                        phraseElement.appendChild(newTranslationElement);
                        // Add click event to the phrase element
                        phraseElement.onclick = function () {
                            // Hide all translation popups
                            const translations = document.querySelectorAll('.translation_voice');
                                translations.forEach(translation => {
                                    translation.style.display = 'none';
                            });
                            // Prevent the click event from bubbling up to the document
                            event.stopPropagation();

                            // Toggle the display of the translation popup
                            const translationElement = this.querySelector('.translation_voice');                            
                            if (translationElement) {
                                translationElement.style.display =  'block';
                            }
                            SpeechEngl(phrase.phrase_en);  // Speak the English text
                        };

                        phraseElement.setAttribute('rus-text', phrase.phrase_ru); // Add the Russian translation
                        phraseElement.setAttribute('eng-text', phrase.phrase_en); // Add the English text
                        // Append the phrase element to the phrase container
                        phraseContainer.appendChild(phraseElement);
                    }
                }
            });
            // Append the phrase container to the sentence container
            if (phraseContainer.childElementCount > 0) {
                sentenceContainer.appendChild(phraseContainer);
            }
        }
    });

    AddExportButton();

}

function AddExportButton() {
    // add button in the end of the body for the export 
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export to Markdown';
    exportButton.className = 'button_controlsentences';
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
        if (exp_phrases.length > 0) { SaveExportedPhrasesToFirebase(exp_phrases); }

    };
    document.body.appendChild(exportButton);
}

function SaveExportedPhrasesToFirebase(exp_phrases) {
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



function VoiceP2_createStyles() {
    const style = document.createElement('style');
    style.textContent = `
.sentence_voice {
    margin-bottom: 10px; 
    font-size: 18px;
    display: block;
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

.translation_voice {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    padding: 15px;
    z-index: 1;
    width: 250px;
    height: auto;
    font-size: 14px;
    border-radius: 5px;
    color: black;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    opacity: 0.9;
    max-width: 300px;
    word-wrap: break-word;
    line-height: 1.5;
    text-align: left;
    font-family: Arial, sans-serif;
    box-sizing: border-box;
    margin-top: 5px;
    margin-left: 5px;
}

.translation_voice button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    border: none;
    font-size: 14px;
    cursor: pointer;
}

.translation_voice button:hover {
    color: red;
}

.phrase-container_voice {
    margin-top: 10px;
    margin-left: 20px;
    display: block;
}

.phrase-marker_voice {
    display: inline-block;
    min-width: 50px;
    height: 40px;
    margin-left: 45px;
    border-radius: 3px;
    cursor: pointer;
    color: white;
    background-color:rgb(46, 157, 167);
    font-weight: normal;
    font-size: 14px;
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

.button_voice_play {
    background-color:rgb(19, 70, 21);
    color: white;
    border: none;    
    border-radius: 3px;
    width: 50px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
}

.button_voice_play:hover {
    background-color:rgb(14, 47, 15);
}

    `;
    document.head.appendChild(style);
}
