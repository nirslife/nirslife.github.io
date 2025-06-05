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

function LoadSentencesToHTML(idsentence) {
    let sentence = get_sentence(idsentence);
    let sentence_en = sentence.sentence_en;
    // split the sentence into words using space as a delimiter
    let words = sentence_en.split(' ').map(word => word.trim()).filter(word => word.length > 0);
   // return 0;
    let puzzleBlockDiv = document.getElementById('div_puzzletextfrom1');
    let div_inputtextfrom1 = document.getElementById('div_inputtextfrom1');
    let textfrom1 = document.getElementById('textfrom1');
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
    addNewPhrase()
}

function LoadSentences() {
    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);
    if (article_items) {
        LoadNextSentenceNotProcessed(article_items, -1);        
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

function SetProcessedSentence(vdata, idsrc_sentence) {
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
    // let sentences = vdata["sentences"];
    // if (!sentences) return;
    // let sentence = sentences.find(item => item.idsentence === idsrc_sentence);
    // if (sentence) {
    //     sentence.processed = 1; 
    // }
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
