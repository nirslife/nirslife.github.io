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

            // create the english sentence div
            const div_sentence_en = document.createElement('div');
            div_sentence_en.setAttribute('idsentence_en', sentence.idsentence); // Add the sentence ID as an attribute
            div_sentence_en.className = 'sentence_en_voice';
            div_sentence_en.textContent = sentence.sentenece_en; // Add the English sentence text
            div_sentence_en.onclick = function () {
                SpeechEngl(this.textContent);
            };
            sentenceContainer.appendChild(div_sentence_en);
            // Create the Russian sentence div
            const div_sentence_ru = document.createElement('div');
            div_sentence_ru.setAttribute('idsentence_ru', sentence.idsentence); // Add the sentence ID as an attribute
            div_sentence_ru.className = 'sentence_ru_voice';
            div_sentence_ru.textContent = sentence.sentenece_ru; // Add the Russian sentence text
            div_sentence_ru.style.display = 'none'; // Hide the Russian sentence by default
            sentenceContainer.appendChild(div_sentence_ru);
            // Append the container to the document body
            document.body.appendChild(sentenceContainer);

            //add below the sentence phrase containing in array of phrases
            const phraseContainer = document.createElement('div');
            phraseContainer.className = 'phrase-control-container';

            // Create the ShowTranslation button
            const TransitionButton = document.createElement('div');
            TransitionButton.className = 'button_voice_translation';
            TransitionButton.textContent = 'Transl';            
            TransitionButton.onclick = function () {
                // hide all translation 
                const translations = document.querySelectorAll('.sentence_ru_voice');
                translations.forEach(translation => {
                    translation.style.display = 'none';
                }
                );
                // Toggle the display of the Russian sentence
                if (div_sentence_ru.style.display === 'none') {
                    div_sentence_ru.style.display = 'block';
                } else {
                    div_sentence_ru.style.display = 'none';
                }
            };
            phraseContainer.appendChild(TransitionButton);


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



function VoiceP2_createStyles() {
    const style = document.createElement('style');
    style.textContent = `
.sentence_en_voice {
    margin-bottom: 20px; 
    font-size: 24px;
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
    font-size: 24px;
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
    width: 350px;
    height: auto;
    font-size: 24px;
    border-radius: 5px;
    color: black;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    opacity: 0.9;
    min-width: 350px;
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
    font-size: 18px;
    cursor: pointer;
}

.translation_voice button:hover {
    color: red;
}

.phrase-control-container {
    margin-top: 10px;
    margin-left: 10px;
    display: block;
    font-size: 20px;
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
    border-radius: 3px;
    cursor: pointer;
    color: white;
    background-color:rgb(46, 157, 167);
    font-weight: normal;
    font-size: 18px;
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
    width: 50px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
}

.button_voice_translation:hover {
    background-color:rgb(14, 47, 15);
}

.button_control_phrases {
    background-color: rgb(44, 155, 24);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 18px;
    cursor: pointer;    
    bottom: 30px;
    right: 30px;
    height: 50px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.button_control_phrases:hover {
    background-color: rgb(34, 120, 18);
}

    `;
    document.head.appendChild(style);
}
