function Get_phr_NextSentenceNotProcessed(article_items, curpos_idsentence, direction) {
  let ret_idsentence = -1;  
  let list_not_processed = article_items.filter(item => item.processed !== 1 && item.idsentence !== undefined);
  if (list_not_processed.length > 0) {
    gv.sts.config_phrase.count_not_processed = list_not_processed.length;
    for (let i = 0; i < list_not_processed.length; i++) {
      let item = list_not_processed[i];
      if (item.idsentence === curpos_idsentence) {
        // If the sentence is already loaded, skip it
        if (direction === 'next') {
          // Load the next unprocessed sentence
          if (i + 1 < list_not_processed.length) {
            gv.sts.config_phrase.next_idsentence = list_not_processed[i + 1].idsentence;
          } else {
            // If there is no next sentence, load the first one
            gv.sts.config_phrase.next_idsentence = list_not_processed[0].idsentence;
          }
          ret_idsentence = gv.sts.config_phrase.next_idsentence;
        } else if (direction === 'prev') {
          // Load the previous unprocessed sentence
          if (i - 1 >= 0) {
            gv.sts.config_phrase.prev_idsentence = list_not_processed[i - 1].idsentence;
          } else {
            // If there is no previous sentence, load the last one
            gv.sts.config_phrase.prev_idsentence = list_not_processed[list_not_processed.length - 1].idsentence;
          }
          ret_idsentence = gv.sts.config_phrase.prev_idsentence;
        }
        //Load_phr_SentencesToHTML(gv.sts.config_phrase.idsentence);
        return ret_idsentence;
      }
    }
    // if not found, get first
    ret_idsentence = list_not_processed[0].idsentence; // Default to the first unprocessed sentence
    gv.sts.config_phrase.prev_idsentence = ret_idsentence; // Set previous to the first unprocessed sentence
    gv.sts.config_phrase.next_idsentence = ret_idsentence; // Set next to the first unprocessed sentence
    gv.sts.config_phrase.idsentence = ret_idsentence; // Set current to the first unprocessed sentence
    return ret_idsentence;    
  }
  // If no unprocessed sentence is found, return -1
  return ret_idsentence; // Return -1 if no unprocessed sentence is found
}


// split the sentence into words using space as a delimiter 
function split_phr_StringIntoWords(str1) {    
   let words = str1.split(' ').map(word => word.trim()).filter(word => word.length > 0);
   return words;
}


function Load_phr_SentencesToHTML(idsentence) {
    let sentence = get_sentence(idsentence);
    if (!sentence) {
        console.error(`No sentence found with id: ${idsentence}`);
        return;
    }
    let sentence_en = sentence.sentence_en;
    let words = split_phr_StringIntoWords(sentence_en);
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
        inputTextBlock.setAttribute('onclick', 'click_phr_Puzzletext(this)');
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
    // Look for existing phrases in the sentence
    Look_phr_ForExistingPhraseinBD();
    // Add a new phrase if there are no phrases
    addNewPhrase();
}


// if sentence contains a specific phrase
function Contains_phr_PhraseInSentence(phrase, sentence) {
    function leaveonlyletter(str) {
        str = str.toLowerCase();
        return str.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s]/g, ''); // remove all non-letter characters
    }
    let ph1 = leaveonlyletter(phrase);
    let se1 = leaveonlyletter(sentence);
    return se1.includes(ph1);
}


function Look_phr_ForExistingPhraseinBD() {
    let vdata = gv.vdata1;
    if (!vdata) return;
    let phrases = vdata["phrases"];
    let textfrom1 = document.getElementById('textfrom1');
    let sentence_en = textfrom1.textContent;
    phrases.forEach(phrase => {
        let phrase_en = phrase.phrase_en;
        if (Contains_phr_PhraseInSentence(phrase_en, sentence_en)) {
            // add phrase to the input text div
            let inputTextDiv = document.getElementById('div_inputtextfrom1');
            let words = split_phr_StringIntoWords(phrase_en);
            let divPhrase = document.createElement('div');
            divPhrase.className = 'phrase';
            divPhrase.setAttribute('phrase_id', phrase.idphrase);
            divPhrase.setAttribute('onclick', 'OnClickPhrase_Speech(this)');
            words.forEach((word, index) => {
                let inputTextBlock = document.createElement('div');
                inputTextBlock.className = 'inputtext';
                inputTextBlock.setAttribute('indexarr', -1);
                //inputTextBlock.setAttribute('onclick', 'clickInputtext(this)');
                inputTextBlock.setAttribute('onclick', 'click_phr_Inputtext(this)');                
                inputTextBlock.style.cursor = 'pointer';
                inputTextBlock.textContent = word;
                divPhrase.appendChild(inputTextBlock);
            });
            inputTextDiv.appendChild(divPhrase);
        }
    });
}

function Load_phr_Sentences() {
    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let name_article_text = get_article_name_text(cur_idarticle_text);
    // add info into id_info_margin_phrases_head
    let id_info_margin_phrases_head = document.getElementById('id_info_margin_phrases_head');
    id_info_margin_phrases_head.innerHTML = `*ID*: ${cur_idarticle_text} - - - ${name_article_text}`;

    let curpos_idsentence = sts1.config_phrase.idsentence;
    if (!cur_idarticle_text) { cur_idarticle_text = -1; }     
    let article_items = get_article_items(cur_idarticle_text);
    if (article_items) {
        //LoadNextSentenceNotProcessed(article_items, curpos_idsentence);
        let next_idsentence = Get_phr_NextSentenceNotProcessed(article_items, curpos_idsentence, 'next');
        Load_phr_SentencesToHTML(next_idsentence);
    }
}


function Save_phr_PhraseToFireBase() {
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
        if (phraseElement.getAttribute('phrase_id') > -1) { continue; } // skip if phrase_id is already set
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
            datetime_create: new Date().toISOString().replace('T', ' ').substring(0, 19), // Format to YYYY-MM-DD HH:mm:ss            
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
    Set_phr_ProcessedSentence_Localy(idsrc_sentence);
    // send the updated vdata to Firebase
    RequestArrFireBase(vdata, 'PATCH');
}


function Set_phr_ProcessedAndNext(){
    let textfrom1 = document.getElementById('textfrom1');
    let cur_idsentence = textfrom1.getAttribute('idsentence');
    Set_phr_ProcessedSentence_SaveToFB(cur_idsentence);
    // After setting the sentence as processed, load the next sentence
    Next_phr_Sentence();
}

function Set_phr_ProcessedSentence_Localy(idsrc_sentence) {
    let sts1 = gv.sts;
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);
    if (!article_items) return;          
    let items = article_items; // Assuming article_items is an array of items
    // Check if items is an array and has elements
    if (Array.isArray(items) && items.length > 0) {
        let item = items.find(item => item.idsentence === Number(idsrc_sentence));
        if (item) {
            item.processed = 1; // Mark the sentence as processed
        } else {
            console.log(`No item found with idsentence: ${idsrc_sentence}`);
        }
    }
}

function Set_phr_ProcessedSentence_SaveToFB(idsrc_sentence) {
    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);
    if (!article_items) return;
    let index_article_text =  get_article_text_index(cur_idarticle_text);
    if (index_article_text < 0) {
        console.error(`No article text found with idarticle_text: ${cur_idarticle_text}`);
        return;
    }
    let items = article_items; // Assuming article_items is an array of items
    let article_text_items_item = null;
    let index_article_text_items_item = -1; // Initialize index to -1
    // Check if items is an array and has elements
    if (Array.isArray(items) && items.length > 0) {
        let item = items.find(item => item.idsentence === Number(idsrc_sentence));        
        if (item) {
            index_article_text_items_item = items.indexOf(item);
            item.processed = 1; // Mark the sentence as processed
            article_text_items_item = item; // Store the item for later use
        } else {
            console.log(`No item found with idsentence: ${idsrc_sentence}`);
        }
    }
    let addurl = "article_text/" + index_article_text + "/items/" + index_article_text_items_item;
    let ObjRequest = GetObjForRequest();
    ObjRequest.addUrl = addurl;
    ObjRequest.ametod = 'PATCH';
    ObjRequest.vobj = article_text_items_item; // Use the item found above
    RequestArrFireBase_AddUrl(ObjRequest);
}


function Next_phr_Sentence() {  
    let sts1 = gv.sts;
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);
    if (article_items) {        
        // Get the current sentence ID
        let curpos_idsentence = sts1.config_phrase.idsentence;        
        let next_idsentence = Get_phr_NextSentenceNotProcessed(article_items, curpos_idsentence, 'next');        
        if (next_idsentence > 0) {
            sts1.config_phrase.idsentence = next_idsentence; // Update the current sentence ID
            // Load the next sentence
            Load_phr_SentencesToHTML(next_idsentence);
        }        
    } else {
        console.log("No article items found for the given cur_idarticle_text.");
    }
}



function Prev_phr_Sentence() {  
    let sts1 = gv.sts;
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);
    if (article_items) {        
        // Get the current sentence ID
        let curpos_idsentence = sts1.config_phrase.idsentence;
        let prev_idsentence = Get_phr_NextSentenceNotProcessed(article_items, curpos_idsentence, 'prev');        
        if (prev_idsentence > 0) {
            sts1.config_phrase.idsentence = prev_idsentence; // Update the current sentence ID
            // Load the previous sentence
            Load_phr_SentencesToHTML(prev_idsentence);
        }
    } else {
        console.log("No article items found for the given cur_idarticle_text.");
    }
}


function Edit_phr_Sentence() {
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
        Save_phr_SentenceToFirebase();
    };

    //add the input field to the textfrom1 div
    textfrom1.innerHTML = ''; // Clear the current content
    textfrom1.appendChild(inputField); // Append the input field
    inputField.focus(); // Focus on the input field for editing  

}


function Save_phr_SentenceToFirebase() {
  let vdata = gv.vdata1;
  if (!vdata) return;
  vdata["sentences"] = gv.sts.sentences;
  vdata["config_phrase"].idsentence = gv.sts.config_phrase.idsentence;
  RequestArrFireBase(vdata, 'PATCH');
}


function Click_phr_Set_Not_Processed() {
    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_text = sts1.article_text;
    let article_text_item = article_text.find(item => item.idarticle_text === cur_idarticle_text);
    let index_article_text =  get_article_text_index(cur_idarticle_text);
    if (index_article_text < 0) {
        console.error(`No article text found with idarticle_text: ${cur_idarticle_text}`);
        return;
    }

    article_text_item.items.forEach(item => {
       item.processed = 0; // Set processed to 0 for all items
    });
    let addurl = "article_text/" + index_article_text;
    let ObjRequest = GetObjForRequest();
    ObjRequest.addUrl = addurl;
    ObjRequest.ametod = 'PATCH';
    ObjRequest.vobj = article_text_item; // Use the updated article_text_item
    RequestArrFireBase_AddUrl(ObjRequest);
    //alert
    alert("All sentences have been set to not processed.");
}