

function ExpImpForTrans_Phrase_loadDataToHTML() {
   ExpImpForTrans_createStyles_3();    

   const countPhrases = 27; // Number of phrases to display in one block

    let sts1 = gv.sts;    
    let phrases = gv.sts.phrases;
    if (!phrases || phrases.length === 0) {
        const infoDiv = document.getElementById('info_div');
        infoDiv.innerHTML = '<p>No phrases found.</p>';
        return;
    }

    // Process the phrases to find those without translation only first 200 phrases
    let tr_phrases = [];
    let counttotal = 200; // Limit to first 200 phrases
    let i = 0;
    phrases.forEach(item => {                
        if (!item.phrase_ru || item.phrase_ru.trim() === "") {
            tr_phrases.push({
                idphrase: item.idphrase,
                phrase_en: item.phrase_en,
                phrase_ru: ""
            });
            i++;
        }
        if (i >= counttotal) return; // Stop after processing 200 phrases
    });

    // Create the HTML structure

    const  infoDiv = document.getElementById('info_div');
    infoDiv.innerHTML = ''; // Clear previous content

    if (tr_phrases.length === 0) {
        infoDiv.innerHTML += `<p>No phrases without translation found.</p>`;
        return;
    }

    // Extract every countPhrases portion in one div block with copy button to clipboard

    for (let i = 0; i < tr_phrases.length; i += countPhrases) {
        let containerUI_Block = document.createElement('div');
        containerUI_Block.className = 'containerUI_Block';
        infoDiv.appendChild(containerUI_Block);
        let phrasesBlock = document.createElement('div');
        phrasesBlock.className = 'phrases-block';
        let id_block = Math.floor(i / countPhrases);
        phrasesBlock.id = `phrases-block-${id_block}`;
        for (let j = i; j < i + countPhrases && j < tr_phrases.length; j++) {
            let phrase = tr_phrases[j];
            let begin_delimeter_phrases = '352725_' + phrase.idphrase;
            let end_delimeter_phrases = '973524_';
            phrasesBlock.innerHTML += `
                <div class="phrase-item" id="phrase-${phrase.idphrase}">
                    <span class="phrase-en">${begin_delimeter_phrases} ${phrase.phrase_en} ${end_delimeter_phrases}</span>
                </div>
            `;
        }

        // Add copy button
        let copyButton = document.createElement('button');
        copyButton.textContent = 'Copy to Clipboard ';
        copyButton.className = 'button_controlsentences_copy';
        copyButton.setAttribute('valueid', `phrases-block-${id_block}`);
        copyButton.onclick = function() {
            const allcopyButtons = document.querySelectorAll('.button_controlphrases_copy');
            // Reset all buttons text to "Copy to Clipboard"
            allcopyButtons.forEach(btn => {
                btn.textContent = 'Copy to Clipboard';
            });
            let valueid = this.getAttribute('valueid');
            let phrasesBlock1 = document.getElementById(valueid);
            if (!phrasesBlock1) {
                console.error(`Element with id ${valueid} not found.`);
                return;
            }
            let TextToCopy1 = phrasesBlock1.innerText;
            // change button text to "Copied!" for 2 seconds
            this.textContent = 'Copied';
            TextArea_copyToClipboard(TextToCopy1);          
        };        

        let parseButton = document.createElement('button');
        parseButton.textContent = 'Parse input';
        parseButton.setAttribute('rusvalueid', `phrases-rus-block-${id_block}`);
        parseButton.className = 'button_controlsentences';
        parseButton.onclick = function() {
            let textareaB1 = document.getElementById(`textareaB1-${id_block}`);
            textareaB1.style.display = 'block'; // Show the textarea
            let phrasesRusBlock = document.getElementById(this.getAttribute('rusvalueid'));
            if (!phrasesRusBlock) {
                console.error(`Element with id ${this.getAttribute('rusvalueid')} not found.`);
                return;
            }
            if (!textareaB1) {
                console.error(`Textarea with id textareaB1-${id_block} not found.`);
                return;
            }            
            textareaB1.focus();             
            textareaB1.select();

            // if (document.hasFocus()) {
            //     navigator.clipboard.readText().then(text => {
            //         // Set the text area value to the clipboard text
            //         textareaB1.value = text; // Paste the text into the textarea

            //     }).catch(err => {
            //         alert('Clipboard access failed. Please make sure the page is focused and you have granted permission.');
            //         console.error('Failed to read clipboard contents: ', err);
            //     });
            // } else {
            //     alert('Please click on the page to focus it before pasting from clipboard.');
            // }
            phrasesRusBlock.innerHTML = ''; // Clear previous phrases
            let text_1 = textareaB1.value; // Get the text from the textarea
            // Split the text by the delimiter and process each sentence
            let phrases = text_1.split('973524_');
            phrases.forEach(phrase => {
                    let trimmedPhrase = phrase.trim();
                    trimmedPhrase = trimmedPhrase.replace('\n', '');
                if (trimmedPhrase) { // Check if phrase is not empty
                    // extract the id from the phrase
                    let idphraseMatch = trimmedPhrase.match(/352725_(\d+)/); // Match the id at the beginning
                    if (idphraseMatch) {
                        let idPhrase = idphraseMatch[1]; // Get the matched id
                        trimmedPhrase = trimmedPhrase.replace(/352725_\d+ /, ''); // Remove the id from the phrase
                        let phraseDiv = document.createElement('div');
                        phraseDiv.className = 'phrase-paste-rus-item';
                        phraseDiv.id = `phrase-paste-${idPhrase}`;
                        phraseDiv.setAttribute('idphrase', idPhrase);
                        phraseDiv.innerHTML = trimmedPhrase;
                        // Append the phrase div after the button parseButton
                        phrasesRusBlock.appendChild(phraseDiv);
                    }

                }
            });
            // Show the save button
            let saveToBaseButton = document.getElementById(`button-save-to-db-${id_block}`);
            if (saveToBaseButton) {
                if (phrasesRusBlock.childElementCount > 0) {
                   saveToBaseButton.style.display = 'block'; // Show the button
                }
                else {
                    saveToBaseButton.style.display = 'none'; // Hide the button if no phrases
                }
            } else {
                console.error(`Save button with id button-save-to-db-${id_block} not found.`);
            }

        };

        let phrasesRusBlock1 = document.createElement('div');
        phrasesRusBlock1.id = `phrases-rus-block-${id_block}`;
        phrasesRusBlock1.className = 'phrases-rus-block';

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
            // Call the function to save phrases to the database
            console.log(`Saving phrases for block ID: ${id_block}`);
            // Call the function to save phrases to the database
            Save_1Block_ToBase_Phrase_TransRus(id_block);
        };

        // textareaB1 Create a textarea for the block
        let textareaB1 = document.createElement('textarea');
        textareaB1.className = 'textareaB1';        
        textareaB1.id = `textareaB1-${id_block}`;
        textareaB1.style.display = 'none';
        textareaB1.rows = 3;
        textareaB1.cols = 50;
        // Add the textarea to the block
        textareaB1.innerHTML = ''; // Clear any previous content

        containerUI_Block.appendChild(phrasesBlock);
        containerUI_Block.appendChild(copyButton);
        containerUI_Block.appendChild(parseButton);
        containerUI_Block.appendChild(textareaB1);
        containerUI_Block.appendChild(phrasesRusBlock1);
        containerUI_Block.appendChild(saveToBaseButton);
    }

}

function Save_1Block_ToBase_Phrase_TransRus(id_block) {
    // Get all phrases in the block
    let phrasesRusBlock = document.getElementById(`phrases-rus-block-${id_block}`);
    if (!phrasesRusBlock) {
        console.error(`Element with id phrases-rus-block-${id_block} not found.`);
        return;
    }

    let phrases = phrasesRusBlock.querySelectorAll('.phrase-paste-rus-item');
    if (phrases.length === 0) {
        alert('No phrases to save.');
        return;
    }

    // Prepare data to save
    let dataToSave = [];
    phrases.forEach(phrase => {
        let idphrase = phrase.getAttribute('idphrase');
        let phraseText = phrase.innerText.trim();
        if (idphrase && phraseText) {
            dataToSave.push({
                idphrase: idphrase,
                phrase_ru: phraseText
            });
        }
    });

    // Save to Firebase or any other database
    if (dataToSave.length > 0) {
        // Call your save function here, e.g., SavePhrasesToFirebase(dataToSave);
        SaveTransPhraseReadyDataToFireBase(dataToSave);
        //console.log('Data to save:', dataToSave);
        alert('Phrases saved successfully!');
    } else {
        alert('No valid phrases to save.');
    }


}

function SaveTransPhraseReadyDataToFireBase(dataToSave) {
    let cst1 = window.gv && window.gv.cst ? window.gv.cst : (this.gv ? this.gv.cst : null);
    let vdata = gv.vdata1;
    if (!vdata) return;
    // Get phrases from vdata
    let phrases = vdata["phrases"];
    if (!phrases) { return; }
    for (let i = 0; i < dataToSave.length; i++) {
        let phraseData = dataToSave[i];
        let idphrase = phraseData.idphrase;
        let phrase_ru = phraseData.phrase_ru;

        // Find the phrase in the phrases array
        let existingPhrase = phrases.find(item => item.idphrase == idphrase);
        if (existingPhrase) {
            // Update the existing phrase with the new Russian translation
            existingPhrase.phrase_ru = phrase_ru;            
            //datetime in format YYYY-MM-DDTHH:mm:ss
            let strdt1 = new Date().toISOString();
            strdt1 = strdt1.replace('T', ' ').substring(0, 19); // Format to YYYY-MM-DD HH:mm:ss
            existingPhrase.datetimetrans = strdt1; // Update the translation date
        }
    }
    // Send the updated vdata to Firebase
    RequestArrFireBase(vdata, 'PATCH');
}


function ExpImpForTrans_createStyles_3() {
   const style = document.createElement('style');
   style.innerHTML = `
.containerUI_Block {
       margin-bottom: 20px;
       margin-top: 20px;
       padding: 10px;
       border: 1px solid #ccc;
       border-radius: 5px;
       background-color: #f9f9f9;
   }
   `;
   document.head.appendChild(style);
}

