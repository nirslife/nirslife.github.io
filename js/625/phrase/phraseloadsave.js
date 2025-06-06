

function LoadNextSentenceNotProcessed(article_items, curpos_idsentence) {
  let list_not_processed = article_items.filter(item => item.processed !== 1 && item.idsentence !== undefined);
  if (list_not_processed.length > 0) {
    gv.sts.config_phrase.count_not_processed = list_not_processed.length;
    if (curpos_idsentence < 1) {f_founded = true;} else { f_founded = false;}    
    let idsentence_found = -1;
    let first_idsentence = list_not_processed[0].idsentence;
    for (let i = 0; i < list_not_processed.length; i++) {
      let item = list_not_processed[i];
      if (f_founded) {
        idsentence_found = item.idsentence;
        break;
      }
    //  if (item.idsentence === gv.sts.config_phrase.idsentence) {
      if (item.idsentence === curpos_idsentence) {        
        // If the sentence is already loaded, skip it
        f_founded = true;
        continue;
      }
    }
    if (idsentence_found > 0) {
      gv.sts.config_phrase.idsentence = idsentence_found;
      LoadSentencesToHTML(idsentence_found);
      return;
    }
    // If no unprocessed sentence is found, load the first one
    gv.sts.config_phrase.idsentence = first_idsentence;
    LoadSentencesToHTML(first_idsentence);
  }
}

// split the sentence into words using space as a delimiter 
function splitStringIntoWords(str1) {    
    let words = str1.split(' ').map(word => word.trim()).filter(word => word.length > 0);
    return words;
}

function LoadSentencesToHTML(idsentence) {
    let sentence = get_sentence(idsentence);
    let sentence_en = sentence.sentence_en;
    let words = splitStringIntoWords(sentence_en);
    let puzzleBlockDiv = document.getElementById('div_puzzletextfrom1');
    let div_inputtextfrom1 = document.getElementById('div_inputtextfrom1');
    let textfrom1 = document.getElementById('textfrom1');
    textfrom1.setAttribute('idsentence', idsentence);
    // Clear the input text div
    puzzleBlockDiv.innerHTML = '';
    div_inputtextfrom1.innerHTML = '';
    textfrom1.textContent = sentence_en; // Set the text content of the textfrom1 div
    // create a new puzzle block for each word
    words.forEach((word, index) => {
        let inputTextBlock = document.createElement('div');
        inputTextBlock.className = 'puzzleblock inpon';
        inputTextBlock.id = `Puzzid${index}`;
        inputTextBlock.setAttribute('indexarr', index);
        inputTextBlock.setAttribute('onclick', 'clickPuzzletext(this)');
        inputTextBlock.style.cursor = 'pointer';
        inputTextBlock.textContent = word;
        puzzleBlockDiv.appendChild(inputTextBlock);
    });

    let info_div = document.getElementById('info_div');
    if (info_div) {
        info_div.textContent = `Current ID: ${idsentence} from count=${gv.sts.config_phrase.count_not_processed} `;
    }else {
        let new_info_div = document.createElement('div');
        new_info_div.id = 'info_div';
        new_info_div.textContent = `Current ID: ${idsentence} from count=${gv.sts.config_phrase.count_not_processed} `;
        let divtextfrom1 = document.getElementById('textfrom1');
        if (divtextfrom1) {
            divtextfrom1.parentNode.insertBefore(new_info_div, divtextfrom1);
        }        
    }
    addNewPhrase();
}

// if sentence contains a specific phrase
function ContainsPhraseInSentence(phrase, sentence) {
    function leaveonlyletter(str) {
        str = str.toLowerCase();
        return str.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s]/g, ''); // remove all non-letter characters
    }
    let ph1 = leaveonlyletter(phrase);
    let se1 = leaveonlyletter(sentence);
    return se1.includes(ph1);
}


function LookForExistingPhraseinBD() {
    let vdata = gv.vdata1;
    if (!vdata) return;
    let phrases = vdata["phrases"];
    let textfrom1 = document.getElementById('textfrom1');
    let sentence_en = textfrom1.textContent;
    phrases.forEach(phrase => {
        let phrase_en = phrase.phrase_en;
        if (ContainsPhraseInSentence(phrase_en, sentence_en)) {
            // add phrase to the input text div
            let inputTextDiv = document.getElementById('div_inputtextfrom1');
            let words = splitStringIntoWords(phrase_en);
            let divPhrase = document.createElement('div');
            divPhrase.className = 'phrase';
            divPhrase.setAttribute('phrase_id', phrase.idphrase);
            words.forEach((word, index) => {
                let inputTextBlock = document.createElement('div');
                inputTextBlock.className = 'inputtext';
                inputTextBlock.setAttribute('indexarr', index);
                inputTextBlock.setAttribute('onclick', 'clickInputtext(this)');
                inputTextBlock.style.cursor = 'pointer';
                inputTextBlock.textContent = word;
                divPhrase.appendChild(inputTextBlock);
            });
            inputTextDiv.appendChild(divPhrase);
        }
    });
}

function LoadSentences() {
    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let curpos_idsentence = sts1.config_phrase.idsentence;
    if (!cur_idarticle_text) { cur_idarticle_text = -1; }     
    let article_items = get_article_items(cur_idarticle_text);
    if (article_items) {
        LoadNextSentenceNotProcessed(article_items, curpos_idsentence);
    }
}

function SavePhraseToFireBase() {
    let cst1 = window.gv && window.gv.cst ? window.gv.cst : (this.gv ? this.gv.cst : null);
    let vdata = gv.vdata1;
    if (!vdata) return;
    let phrases = vdata["phrases"];
    if (!phrases) return;
    let gen_id_phrase = gv.sts.config_phrase.gen_id_phrase;
    if (!gen_id_phrase) {
        gen_id_phrase = 0;
    }
    let div_inputtextfrom1 = document.getElementById('div_inputtextfrom1');
    // get children of div_inputtextfrom1
    let phraseElements = div_inputtextfrom1.getElementsByClassName('phrase');
    // create an array to hold the phrases
    let newPhrases = [];
    let idsrc_sentence = vdata["config_phrase"].idsentence;
    // for each phrase element, get the text content of inputtext elements
    for (let i = 0; i < phraseElements.length; i++) {        
        let phraseElement = phraseElements[i];
        let inputTexts = phraseElement.getElementsByClassName('inputtext');
        let phraseText = Array.from(inputTexts).map(input => input.textContent).join(' ');
        // if phraseText is empty, skip this phrase
        if (phraseText.trim() === "") {
            console.log("Skipping empty phrase.");
            continue;
        }
        // increment gen_id_phrase
        gen_id_phrase++;
        // create a new phrase object
        newPhrases.push({
            idphrase: gen_id_phrase,
            phrase_en: phraseText,
            phrase_ru: "",            
            src_sentence: idsrc_sentence
        }); 
    }
    // if there are no new phrases, return
    if (newPhrases.length === 0) {
        console.log("No new phrases to save.");
        return;
    }
    // add the new phrases to the existing phrases
    phrases = phrases.concat(newPhrases);
    // update the vdata object
    vdata["phrases"] = phrases;
    // update the gen_id_phrase in config_phrase
    vdata["config_phrase"].gen_id_phrase = gen_id_phrase;
    // set property processed to 1 for the current sentence in article_items
    SetProcessedSentence(vdata, idsrc_sentence);
    // send the updated vdata to Firebase
    RequestArrFireBase(vdata, 'PATCH');
}


function SetProcessedAndNext(){
    let textfrom1 = document.getElementById('textfrom1');
    let cur_idsentence = textfrom1.getAttribute('idsentence');
    SetProcessedSentence(cur_idsentence);
    // After setting the sentence as processed, load the next sentence
    NextSentence();
}

function SetProcessedSentence(idsrc_sentence) {
    let sts1 = gv.sts;
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);
    if (!article_items) return;          
    let items = article_items; // Assuming article_items is an array of items
    // Check if items is an array and has elements
    if (Array.isArray(items) && items.length > 0) {
        let item = items.find(item => item.idsentence === idsrc_sentence);
        if (item) {
            item.processed = 1; // Mark the sentence as processed
        } else {
            console.log(`No item found with idsentence: ${idsrc_sentence}`);
        }
    }
}

function NextSentence() {  
    let sts1 = gv.sts;
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);
    if (article_items) {
        LoadNextSentenceNotProcessed(article_items, sts1.config_phrase.idsentence);
    } else {
        console.log("No article items found for the given cur_idarticle_text.");
    }
}

function EditSentence() {
    // Get the current sentence ID from the textfrom1 div
    const textfrom1 = document.getElementById('textfrom1');
    if (!textfrom1) {
        console.error("textfrom1 div not found.");
        return;
    }
    const idsentence = Number(textfrom1.getAttribute('idsentence'));
    if (!idsentence) {
        console.error("No idsentence attribute found in textfrom1 div.");
        return;
    }
    // Get the current sentence text
    const sentence = get_sentence(idsentence);
    if (!sentence) {
        console.error(`No sentence found with id: ${idsentence}`);
        return;
    }
    // Create a new input field to edit the sentence
    const inputField = document.createElement('textarea');
    // <textarea id="input_textbody_area" rows="50" cols="50" placeholder="Type your article text here..."></textarea>
    inputField.type = 'textarea';
    inputField.id = 'input_textbody_area';
    inputField.rows = 7; // Set the number of rows for the textarea
    inputField.cols = 80; // Set the number of columns for the textarea
    inputField.value = sentence.sentence_en; // Set the current sentence text
    inputField.style.width = '100%'; // Make the input field take full width
    // Set the input field to be editable
    inputField.onblur = function() {
    // Update the sentence in the global variable    
        const sentenceObj = gv.sts.sentences.find(s => s.idsentence === idsentence);
        if (sentenceObj) {
            sentenceObj.sentence_en = this.value;
        }
        textfrom1.textContent = this.value; // Update the textfrom1 div with the new sentence
        this.remove(); // Remove the input field after editing
        gv.sts.config_phrase.idsentence = idsentence;
        SaveSentenceToFirebase();
    };

    //add the input field to the textfrom1 div
    textfrom1.innerHTML = ''; // Clear the current content
    textfrom1.appendChild(inputField); // Append the input field
    inputField.focus(); // Focus on the input field for editing  

}

function SaveSentenceToFirebase() {
  let vdata = gv.vdata1;
  if (!vdata) return;
  vdata["sentences"] = gv.sts.sentences;
  vdata["config_phrase"].idsentence = gv.sts.config_phrase.idsentence;
  RequestArrFireBase(vdata, 'PATCH');
}

