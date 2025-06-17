


function CheckSplitArticleText() {
    let cst1 = window.gv && window.gv.cst ? window.gv.cst : (this.gv ? this.gv.cst : null);
    let vdata = gv.vdata1;
    if (!vdata) return;
    let article_text = vdata["article_text"];
    if (!article_text) return;

    // Get the article name and text from the input fields
    const articleNameInput = document.getElementById('input_name_text_area');
    const articleTextArea = document.getElementById('input_textbody_area');
    const articleName = articleNameInput.value.trim();
    const articleText = articleTextArea.value.trim();

    // If either field is empty, show an alert and return
    if (articleName === "" || articleText === "") {
    //if (articleText === "") {  
        alert("Please enter both the article name.");
        return;
    }

    // split the article text into sentences if length of sentence > 0      
    const sentences = articleText.split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
    // concat sentences to 1 if one from length < 20.
    sentences[0] = sentences[0] + '.';
    for (let i = 1; i < sentences.length; i++) {
        // back char "." to end of  sentence
        sentences[i] = sentences[i] + '.';
        if (sentences[i].length < 20) {            
            sentences[i] = sentences[i - 1] + ' ' + sentences[i];
            sentences.splice(i - 1, 1);
            i--;
        }
    }

    // if there are no sentences, show an alert and return
    if (sentences.length === 0) {
        alert("No valid sentences found in the article text.");
        return;
    }

    // create a info div to show sentences text
    const infoDiv = document.getElementById('info_div');
    if (infoDiv) {
        infoDiv.innerHTML = `<h3>Sentences from the article text:</h3>`;
        sentences.forEach((sentence, index) => {
            const sentNumDiv = document.createElement('span');
            sentNumDiv.className = 'sentence-number';
            sentNumDiv.textContent = `${index + 1}. `;
            infoDiv.appendChild(sentNumDiv);
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence-item-article';
            sentenceDiv.textContent = `${sentence}`;
            infoDiv.appendChild(sentenceDiv);
        });
    } else {
        console.error("Info div not found.");
    }

    // add button save
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Article Text';
    saveButton.className = 'button_controlsentences';
    saveButton.onclick = () => SaveArticleTextToFireBase();
    infoDiv.appendChild(saveButton);
}

  

function SaveArticleTextToFireBase(){
    let cst1 = window.gv && window.gv.cst ? window.gv.cst : (this.gv ? this.gv.cst : null);
    let vdata = gv.vdata1;
    if (!vdata) return;
    // Get sentences from vdata
    let sentences = vdata["sentences"];  

    if (!sentences) { return; }
    let gen_id_sentence = gv.sts.config_phrase.gen_id_sentence;
    let gen_idarticle_text = parseInt(gv.sts.config_phrase.gen_idarticle_text) + 1;
    gv.sts.config_phrase.gen_idarticle_text = gen_idarticle_text;
    
    if (!gen_id_sentence) {
        gen_id_sentence = 0;
    }
    let itemsart = [];

    // Get the 'sentence-item-article';
    const sentenceItems = document.querySelectorAll('.sentence-item-article');
    for (let i = 0; i < sentenceItems.length; i++) {
        gen_id_sentence++;
        const sentenceItem = sentenceItems[i];
        const sentenceData = {
            idsentence: gen_id_sentence,
            sentence_en: sentenceItem.textContent
        };
        sentences.push(sentenceData);
        const itemsartData = {
            idsentence: gen_id_sentence,
            processed: 0
        };
        itemsart.push(itemsartData);
    }    

    // Get the article name and text from the input fields
    const articleNameInput = document.getElementById('input_name_text_area');
    let article_text = vdata["article_text"];
    if (!article_text) {
        article_text = [];
    }
    const articleName = articleNameInput.value.trim();
    const articletextData = {
        idarticle_text: gen_idarticle_text,
        name_article_text: articleName,
        items: itemsart
    };
    article_text.push(articletextData);

    gv.sts.config_phrase.gen_id_sentence = gen_id_sentence;
    vdata["config_phrase"].gen_id_sentence = gv.sts.config_phrase.gen_id_sentence;

    // Send the updated vdata to Firebase
    RequestArrFireBase(vdata, 'PATCH');
}



function Click_Move_ArticleText_Custom(direction) {
  // Your code for handling the next article text click
  let article_text = gv.vdata1["article_text"];
  // Get the current article text ID
  let cur_idarticle_text = gv.sts.config_phrase.cur_idarticle_text;
  // Find the next article text  
  let pos_i = -1;
  for(let i = 0; i < article_text.length; i++) {
    if (article_text[i].idarticle_text === cur_idarticle_text) {
        pos_i = i;
        break; 
    }
  }
  if (direction === 'next') {
    pos_i++;
  }
  if (direction === 'prev') {
    pos_i--;
  }
  if (pos_i < 0) {
    pos_i = article_text.length - 1; // wrap around to the last item
  }
  if (pos_i >= article_text.length) {
    pos_i = 0; // wrap around to the first item
  }
  gv.sts.config_phrase.cur_idarticle_text = article_text[pos_i].idarticle_text;  
 
  SetDBCurArticleText(gv.sts.config_phrase.cur_idarticle_text);
  // Load the next article text into the HTML
  AfterRequest_FireBase();
}

// function Click_Next_ArticleText() {
//   // Logic to handle the next article text action
//   let article_text = vdata["article_text"];
//   // Get the current article text ID
//   let cur_idarticle_text = vdata["config_phrase"].cur_idarticle_text;  
//   // Find the next article text
//   let nextArticleText = article_text.find(item => item.idarticle_text > cur_idarticle_text);
//   if (nextArticleText) {
//     // Update the current article text ID
//     vdata["config_phrase"].cur_idarticle_text = nextArticleText.idarticle_text;
//     // Load the next article text into the HTML
//     Main_ArticleText_LoadDataToHTML();
//   } else {
//     alert("No more article texts available.");
//   }
// }

