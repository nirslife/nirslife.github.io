function Get_Config_Collect_New_Words() {
    gv.sts.config_phrase.collect_new_words;
    if (!gv.sts.config_phrase.collect_new_words) {
        gv.sts.config_phrase.collect_new_words = 
        {
           cur_test_position : 1
        };        
        Set_Collect_New_Words_Config_SaveToFB(gv.sts.config_phrase.collect_new_words);
    }
    if (!gv.sts.config_phrase.collect_new_words.gen_id_colleted_words) {
        gv.sts.config_phrase.collect_new_words.gen_id_colleted_words = 0;
        Set_Collect_Words_GenIDConfig_SaveToFB(gv.sts.config_phrase.collect_new_words.gen_id_colleted_words);
    }
    return gv.sts.config_phrase.collect_new_words;    
}

function Set_Collect_Words_GenIDConfig_SaveToFB(gen_id_colleted_words) {
    let addurl = "config_phrase/collect_new_words";
    let ObjRequest = GetObjForRequest();
    ObjRequest.addUrl = addurl;
    ObjRequest.ametod = 'PATCH';
    ObjRequest.vobj = { gen_id_colleted_words: gen_id_colleted_words };
    RequestArrFireBase_AddUrl(ObjRequest);
}

function Set_Collect_New_Words_Config_SaveToFB(cnf_collect_new_words) {
    let addurl = "config_phrase";
    let ObjRequest = GetObjForRequest();
    ObjRequest.addUrl = addurl;
    ObjRequest.ametod = 'PATCH';
    ObjRequest.vobj = cnf_collect_new_words;
    RequestArrFireBase_AddUrl(ObjRequest);
}

async function get_collected_words_items_from_firebase() {
    let ObjRequest = GetObjForRequest();
    ObjRequest.addUrl = "collect_new_words";
    ObjRequest.ametod = 'GET';
    ObjRequest.vobj = null;
    // Return a promise that resolves when the callback is called
    return new Promise((resolve, reject) => {
        ObjRequest.CallBackFunction = function CallBack_Get_Collected_Words_Items(vobj, ametod) {
            if (vobj) {
                resolve(vobj);
            } else {                
                resolve(null);
            }
        };
        RequestArrFireBase_AddUrl(ObjRequest);
    });
}



//////////////////////////////
//////////////////////////////
//////////////////////////////
async function get_collected_words_item_by_idarticle_text(cur_idarticle_text) {
  
    let coll_words_array = gv.sts.collect_new_words;
    if (!coll_words_array) {        
        coll_words_array = [];        
    }
    let indx_coll_words = coll_words_array.findIndex(item => item.idarticle_text === cur_idarticle_text);
    if (indx_coll_words === -1) {    
        let new_coll_word_item = {
            idarticle_text: cur_idarticle_text,
            timestamp: get_now_n19_datefromat_fb(),
            id_colleted_words: gv.sts.config_phrase.collect_new_words.gen_id_colleted_words,
            items: []
        };
        coll_words_array.push(new_coll_word_item);
        indx_coll_words = coll_words_array.length - 1; // Get the index of the newly added item
        // Save the new collected word item to Firebase
        let addurl = "collect_new_words/" + indx_coll_words + "/";
        let ObjRequest = GetObjForRequest();
        ObjRequest.addUrl = addurl;
        ObjRequest.ametod = 'PATCH';
        ObjRequest.vobj = coll_words_array[indx_coll_words];
        RequestArrFireBase_AddUrl(ObjRequest);
        gv.sts.config_phrase.collect_new_words.gen_id_colleted_words++;
        //Set_Collect_Words_GenIDConfig_SaveToFB(gv.sts.config_phrase.collect_new_words.gen_id_colleted_words);
    }
    gv.sts.config_phrase.collect_new_words.indx_coll_words = indx_coll_words;
    Set_Collect_New_Words_Config_SaveToFB(gv.sts.config_phrase.collect_new_words); 
    return coll_words_array[indx_coll_words];
}

//--------------- MAIN HTML content for Collect New Words
async function Load_Collect_New_Words_HtmlContent() {
    // clear the body content
    document.body.innerHTML = '';
    RemoveAllStylesCollect_New_Words();
    CreateMainCollect_New_Words_Styles();

    let sts1 = gv.sts;    
    let cur_idarticle_text = sts1.config_phrase.cur_idarticle_text;
    let name_article_text = get_article_name_text(cur_idarticle_text);
    let coll_words_item = await get_collected_words_item_by_idarticle_text(cur_idarticle_text);
    let indx_coll_words = sts1.config_phrase.collect_new_words.indx_coll_words;
    let article_items = get_article_items(cur_idarticle_text);
    if (!article_items) {
        console.error("No article items found for the given cur_idarticle_text.");
        return;        
    }
    let config_collect_new_words = Get_Config_Collect_New_Words();
    let cur_test_position = config_collect_new_words.cur_test_position;
    let htmlContent = `
        <div id="title-name-article_text">
            <h1>Collect New Words ID: ${cur_idarticle_text}</h1>
            <h2>${name_article_text}</h2>
        </div>
        <div id="control_div">
        </div>        
    `;
    // Loop through article items to create the content. each item refers to a sentence by its idsentence.
    // Each item should have a sentence and its translation.
    // Assuming each item has properties: idsentence, sentence_en, sentence_ru
    // partioning   each item into English and Russian parts.
    const count_item_inblock = 5; // Number of items in each block
    let blockCount = Math.ceil(article_items.length / count_item_inblock);        
    htmlContent += `<div id="collect_new_words_content">`; 
    document.body.innerHTML = htmlContent;
    const id_div_sentence_en = 'sentence_en_id_';
    const id_div_sentence_ru = 'sentence_ru_id_';
    for (let ib = 0; ib < blockCount; ib++) {
        let divBlock = document.createElement('div');
        divBlock.className = 'block-partofarticle-item';
        document.body.appendChild(divBlock);
        for (let i = 0; i < count_item_inblock; i++) {
            let index = ib * count_item_inblock + i;
            if (index >= article_items.length) break; // Prevent out of bounds
            let item = article_items[index];
            let sentence = get_sentence(item.idsentence);            
            let sentence_en = sentence.sentence_en || '';
            let sentence_ru = sentence.sentence_ru || '';
            const divEng = document.createElement('div');
            divEng.className = 'partofarticle-item_en';
            divEng.id = id_div_sentence_en+item.idsentence;
            SplitWordsIntoContent(item.idsentence, sentence_en, divEng, indx_coll_words);
            const divRus = document.createElement('div');
            divRus.className = 'partofarticle-item_ru';
            divRus.id = id_div_sentence_ru+item.idsentence;
            divRus.textContent = sentence_ru;
            divBlock.appendChild(divEng);
            divBlock.appendChild(divRus);
        }        
    }
    document.body.innerHTML += `</div>`; // Close collect_new_words_content
    
    build_forall_MainUI(document.body);
}

//-----END---------- MAIN HTML content for Collect New Words


////////////////
//////////////////////
//////////////////////
function IfExistsWord_In_Collect(idsentence, word, indx_coll_words) {
    let coll_words_array = gv.sts.collect_new_words;
    if (!coll_words_array || indx_coll_words < 0 || indx_coll_words >= coll_words_array.length) {
        return false; // Invalid index or no collected words
    }
    let items_words = coll_words_array[indx_coll_words].items;
    if (!Array.isArray(items_words)) {
        return false; // No items in the collection or not an array
    }
    let fres = items_words.some(item => item.word === word && Number(item.idsentence) === Number(idsentence));
    return fres;
}

function onClick_SelectProc_New_Words(span) {
    let isSpanSelected = span.classList.contains('pofart_words_sel');
    let isSpanSaved = span.classList.contains('pofart_words_sav');
    // Clear previous selection
    ClearStyleForWordsSpan();
    // Toggle selection
    if (isSpanSelected) {        
        span.classList.add('pofart_words_sav');
        SaveSelectedWords_New_Words(span);
    } 
    if (!isSpanSelected && !isSpanSaved) {
        span.classList.add('pofart_words_sel');
    }
}


function SplitWordsIntoContent(idsentence, sentence_en, divEng, indx_coll_words){
    let coll_words_array = gv.sts.collect_new_words;
    let items_words = coll_words_array[indx_coll_words].items;

    let words = splitStringIntoWords(sentence_en);
    words.forEach(word => {
        let span = document.createElement('span');
        if (IfExistsWord_In_Collect(idsentence, word, indx_coll_words)) {
            span.className = 'pofart_words_sav';
        }
        else {
            span.className = 'pofart_words';
            span.setAttribute('onclick', 'onClick_SelectProc_New_Words(this)');
        }        
        span.textContent = word + " ";
        span.setAttribute('idsentence_of_word', idsentence);
        span.setAttribute('indx_coll_words', indx_coll_words);        
        divEng.appendChild(span);
    });
}

function ClearStyleForWordsSpan() {
    const spans = document.querySelectorAll('.pofart_words_sel');
    spans.forEach(span => {
        span.classList.remove('pofart_words_sel');
        span.classList.add('pofart_words');
    });
}


function Get_Collected_New_Words_Item_index(span_word) {
    let indx_coll_words = span_word.getAttribute('indx_coll_words');
    let coll_words_array = gv.sts.collect_new_words;
    let items_words = coll_words_array[indx_coll_words].items;
    if (!items_words) {
        const wordsData = {
            word: span_word.textContent.trim(),
            idsentence: span_word.getAttribute('idsentence_of_word'),
            timestamp: get_now_n19_datefromat_fb(),
        };
        items_words = [];
        items_words.push(wordsData);
        coll_words_array[indx_coll_words].items = items_words;
        let addurl = "collect_new_words/" + indx_coll_words+ "/items/0";
        let ObjRequest = GetObjForRequest();
        ObjRequest.addUrl = addurl;
        ObjRequest.ametod = 'PATCH';
        ObjRequest.vobj = wordsData;
        RequestArrFireBase_AddUrl(ObjRequest);
    }   
    return items_words.length - 1; // Return the index of the last item
}

function SaveSelectedWords_New_Words(span_word) {    
    let indx_coll_words = Number(span_word.getAttribute('indx_coll_words'));
    let coll_words_array = gv.sts.collect_new_words;
    let items_words = coll_words_array[indx_coll_words].items;
    let indx_word_i = Get_Collected_New_Words_Item_index(span_word);
    if (indx_word_i > -1) {    
        indx_word_i++;
        const wordsData = {
            word: span_word.textContent.trim(),
            idsentence: Number(span_word.getAttribute('idsentence_of_word')),
            timestamp: get_now_n19_datefromat_fb(),
        };
        items_words.push(wordsData);
        let addurl = "collect_new_words/" + indx_coll_words+ "/items/" + indx_word_i;
        let ObjRequest = GetObjForRequest();
        ObjRequest.addUrl = addurl;
        ObjRequest.ametod = 'PATCH';
        ObjRequest.vobj = wordsData;
        RequestArrFireBase_AddUrl(ObjRequest);
    }
}


function CreateMainCollect_New_Words_Styles() {
    CreateCustomCollect_New_Words_Styles1();
    CreateCustomCollect_New_Words_Styles2();
}

function RemoveAllStylesCollect_New_Words() {
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
             style.remove(); 
    });
}

function CreateCustomCollect_New_Words_Styles2(){    

    const style = document.createElement('style');
    style.textContent = `
      #control_div {
        margin: 24px 0 24px 0;
        display: flex;
        gap: 16px;
        justify-content: flex-start;
        align-items: center;
      }


      .button_control {
        background: #1e90ff;
        color: #fff;
        border: none;
        min-height: 50px;
        border-radius: 7px;
        padding: 12px 28px;
        font-size: 26px;
        font-weight: 600;
        margin: 10px 80px 12px 20px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(30,144,255,0.08);
        transition: background 0.2s, box-shadow 0.2s;
        display: flex;              
        align-items: center;        
        justify-content: center;    
        letter-spacing: 0.5px;
        text-align: center;
      }
      .button_control:hover {
          background-color: #e0e0e0;
      }
    `;
    document.head.appendChild(style);

}


function CreateCustomCollect_New_Words_Styles1() {
    const style = document.createElement('style');
    style.textContent = `
        #title-name-article_text {
            text-align: center;
            margin: 20px 0;
        }
        .block-partofarticle-item {
            margin: 40px 10px;            
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;            
            display: block;
            background-color: #f9f9f9;
            cursor: pointer;
        }
        .partofarticle-item_en {
            font-size: 28px;
        }
        .partofarticle-item_ru {
            font-size: 28px;
            display: none;
        }
        .pofart_words_1{
        }
        .pofart_words_sel{
          color:rgb(6, 25, 236); 
          font-weight: bold;
        }
        .pofart_words_sav{
          color:rgb(229, 15, 22); 
          font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

