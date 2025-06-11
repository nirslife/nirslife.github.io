function ExpImpForTrans_ShowSentence(){
    ExpImpForTrans_Sentence_loadDataToHTML();
}

function ExpImpForTrans_loadDataToHTML() {
   ExpImpForTrans_Sentence_loadDataToHTML();  
}

function ExpImpForTrans_Sentence_loadDataToHTML() {
   ExpImpForTrans_createStyles_2();    

   const countSentences = 5;

    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let article_items = get_article_items(cur_idarticle_text);    
    if (!article_items) {
        console.error("No article items found for the given cur_idarticle_text.");
        return;        
    }
    let tr_sentences = [];
    let phrases = gv.sts.phrases || []; // Ensure phrases is defined

    // Process the article items
    article_items.forEach(item => {
        // Do something with each article item
        let sentenceData = get_sentence(item.idsentence);
        if (sentenceData) {
            // check if the sentence without translation
            if (!sentenceData.sentence_ru || sentenceData.sentence_ru.trim() === "") {
                tr_sentences.push({
                   idsentence: sentenceData.idsentence,
                   sentenece_en: sentenceData.sentence_en,
                   sentenece_ru: "" 
                });
           } 
        }
      
    });

    // Create the HTML structure

    const  infoDiv = document.getElementById('info_div');
    infoDiv.innerHTML = ''; // Clear previous content
    // get article name
    let article_text = gv.sts.article_text;
    let article_item =  article_text.find(item => item.idarticle_text === cur_idarticle_text);
    let article_name = article_item.name_article_text;    

    infoDiv.innerHTML = `
        <h3>${article_name}</h3>
    `;

    if (tr_sentences.length === 0) {
        infoDiv.innerHTML += `<p>No sentences without translation found.</p>`;
        return;
    }

    // Extract every countSentences portion in one div block with copy button to clipboard

    for (let i = 0; i < tr_sentences.length; i += countSentences) {
        let sentencesBlock = document.createElement('div');
        sentencesBlock.className = 'sentences-block';
        let id_block = Math.floor(i / countSentences);
        sentencesBlock.id = `sentences-block-${id_block}`;        
        for (let j = i; j < i + countSentences && j < tr_sentences.length; j++) {
            let sentence = tr_sentences[j];
            let begin_delimeter_sentences = '352725_' + sentence.idsentence;
            let end_delimeter_sentences = '973524_';
            sentencesBlock.innerHTML += `
                <div class="sentence-item" id="sentence-${sentence.idsentence}">                    
                    <span class="sentence-en">${begin_delimeter_sentences} ${sentence.sentenece_en} ${end_delimeter_sentences}</span>
                </div>
            `;
        }

        // Add copy button
        let copyButton = document.createElement('button');
        copyButton.textContent = 'Copy to Clipboard ';
        copyButton.className = 'button_controlsentences_copy';
        copyButton.setAttribute('valueid', `sentences-block-${id_block}`);        
        copyButton.onclick = function() {
            const allcopyButtons = document.querySelectorAll('.button_controlsentences_copy');
            // Reset all buttons text to "Copy to Clipboard"
            allcopyButtons.forEach(btn => {
                btn.textContent = 'Copy to Clipboard';
            });
            let valueid = this.getAttribute('valueid');
            let sentencesBlock1 = document.getElementById(valueid);
            if (!sentencesBlock1) {
                console.error(`Element with id ${valueid} not found.`);
                return;
            }
            let TextToCopy1 = sentencesBlock1.innerText;
            // change button text to "Copied!" for 2 seconds
            this.textContent = 'Copied';
            TextArea_copyToClipboard(TextToCopy1);          
        };        

        let pasteButton = document.createElement('button');
        pasteButton.textContent = 'Paste From Clipboard';
        pasteButton.setAttribute('rusvalueid', `sentences-rus-block-${id_block}`);
        pasteButton.className = 'button_controlsentences';
        pasteButton.onclick = function() {
            if (document.hasFocus()) {
                navigator.clipboard.readText().then(text => {
                    // Split the text by the delimiter and process each sentence
                    
                    
                    let sentences = text.split('973524_');
                    sentences.forEach(sentence => {
                         let trimmedSentence = sentence.trim();
                         trimmedSentence = trimmedSentence.replace('\n', '');
                        if (trimmedSentence) { // Check if sentence is not empty
                            // extract the id from the sentence
                            let idsentenceMatch = trimmedSentence.match(/352725_(\d+)/); // Match the id at the beginning
                            if (idsentenceMatch) {
                                let idSentence = idsentenceMatch[1]; // Get the matched id
                                trimmedSentence = trimmedSentence.replace(/352725_\d+ /, ''); // Remove the id from the sentence
                                let sentenceDiv = document.createElement('div');
                                sentenceDiv.className = 'sentence-paste-rus-item';
                                sentenceDiv.id = `sentence-paste-${idSentence}`;
                                sentenceDiv.setAttribute('idsentence', idSentence);
                                sentenceDiv.innerHTML = trimmedSentence;
                                // Append the sentence div after the button pasteButton
                                let sentencesRusBlock = document.getElementById(this.getAttribute('rusvalueid'));
                                if (!sentencesRusBlock) {
                                    console.error(`Element with id ${this.getAttribute('rusvalueid')} not found.`);
                                    return;
                                }
                                sentencesRusBlock.appendChild(sentenceDiv);                               
                            }

                        }
                    });
                    // Show the save button
                    let saveToBaseButton = document.getElementById(`button-save-to-db-${id_block}`);
                    if (saveToBaseButton) {
                        saveToBaseButton.style.display = 'block'; // Show the button
                    } else {
                        console.error(`Save button with id button-save-to-db-${id_block} not found.`);
                    }
                }).catch(err => {
                    alert('Clipboard access failed. Please make sure the page is focused and you have granted permission.');
                    console.error('Failed to read clipboard contents: ', err);
                });
            } else {
                alert('Please click on the page to focus it before pasting from clipboard.');
            }
        };

        let sentencesRusBlock1 = document.createElement('div');
        sentencesRusBlock1.id = `sentences-rus-block-${id_block}`;
        sentencesRusBlock1.className = 'sentences-rus-block';

        saveToBaseButton = document.createElement('button');
        saveToBaseButton.textContent = 'Save To DB';
        saveToBaseButton.className = 'button_controlsentences';
        saveToBaseButton.id = `button-save-to-db-${id_block}`;
        saveToBaseButton.style.display = 'none'; // Initially hidden
        saveToBaseButton.onclick = function() {
            let id_block = this.id.replace('button-save-to-db-', '');
            if (!id_block) {
                console.error('ID block not found.');
                return;
            }
            // Call the function to save sentences to the database
            console.log(`Saving sentences for block ID: ${id_block}`);
            // Call the function to save sentences to the database
            Save_1Block_ToBase_Sent_TransRus(id_block);
        };

        
        
        infoDiv.appendChild(sentencesBlock);
        infoDiv.appendChild(copyButton);
        infoDiv.appendChild(pasteButton);
        infoDiv.appendChild(sentencesRusBlock1);
        infoDiv.appendChild(saveToBaseButton);
    }

}

function Save_1Block_ToBase_Sent_TransRus(id_block) {
    // Get all sentences in the block
    let sentencesRusBlock = document.getElementById(`sentences-rus-block-${id_block}`);
    if (!sentencesRusBlock) {
        console.error(`Element with id sentences-rus-block-${id_block} not found.`);
        return;
    }

    let sentences = sentencesRusBlock.querySelectorAll('.sentence-paste-rus-item');
    if (sentences.length === 0) {
        alert('No sentences to save.');
        return;
    }

    // Prepare data to save
    let dataToSave = [];
    sentences.forEach(sentence => {
        let idsentence = sentence.getAttribute('idsentence');
        let sentenceText = sentence.innerText.trim();
        if (idsentence && sentenceText) {
            dataToSave.push({
                idsentence: idsentence,
                sentence_ru: sentenceText
            });
        }
    });

    // Save to Firebase or any other database
    if (dataToSave.length > 0) {
        // Call your save function here, e.g., SaveSentencesToFirebase(dataToSave);
        SaveTransReadyDataToFireBase(dataToSave);
        alert('Sentences saved successfully!');
    } else {
        alert('No valid sentences to save.');
    }


}

function SaveTransReadyDataToFireBase(dataToSave) {
    let cst1 = window.gv && window.gv.cst ? window.gv.cst : (this.gv ? this.gv.cst : null);
    let vdata = gv.vdata1;
    if (!vdata) return;
    // Get sentences from vdata
    let sentences = vdata["sentences"];  
    if (!sentences) { return; }
    for (let i = 0; i < dataToSave.length; i++) {
        let sentenceData = dataToSave[i];
        let idsentence = sentenceData.idsentence;
        let sentence_ru = sentenceData.sentence_ru;
        
        // Find the sentence in the sentences array
        let existingSentence = sentences.find(item => item.idsentence == idsentence);
        if (existingSentence) {
            // Update the existing sentence with the new Russian translation
            existingSentence.sentence_ru = sentence_ru;
        } 
    }
    // Send the updated vdata to Firebase
    RequestArrFireBase(vdata, 'PATCH');
}

function TextArea_copyToClipboard(TextToCopy1) {

    // Create a temporary textarea element to copy the content
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = TextToCopy1;
    document.body.appendChild(tempTextarea);

    // Select and copy the content
    tempTextarea.select();
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);
}


function ExpImpForTrans_createStyles_2() {
   const style = document.createElement('style');
   style.innerHTML = `
       .sentences-rus-block {
           border: 1px solid #ccc;
           padding: 8px;
           margin-top: 8px;
           background-color: #f9f9f9;
       }

       .sentence-item {
           margin-bottom: 8px;
       }
       .sentence-ru {
           color: blue;
       }
       .sentence-en {
           color: green;
       }
   `;
   document.head.appendChild(style);
}

