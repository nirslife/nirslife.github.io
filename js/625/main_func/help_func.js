function get_article_name_text(cur_idarticle_text) {
    let article_text = gv.sts.article_text;
    if (!article_text) return null;
    const item = article_text.find(item => item.idarticle_text == cur_idarticle_text);
    return item ? item.name_article_text : null;
}


function get_article_items(cur_idarticle_text) {
    let article_text = gv.sts.article_text;
    if (!article_text) return null;
    const item = article_text.find(item => item.idarticle_text == cur_idarticle_text);
    return item ? item.items : null;
}

function get_article_text_index(cur_idarticle_text) {
    let article_text = gv.sts.article_text;
    if (!article_text) return null;
    const index = article_text.findIndex(item => item.idarticle_text == cur_idarticle_text);
    return index !== -1 ? index : null;
}

function get_sentence(idsentence) {
    let sentences = gv.sts.sentences;
    if (!sentences) return null;
    const item = sentences.find(item => item.idsentence == idsentence);
    return item ? item : null;
}

function get_unique_collected_words_items(cur_idarticle_text) {
    let collect_new_words = gv.sts.collect_new_words;
    if (!collect_new_words) return null;
    const coll_word_item = collect_new_words.find(item => item.idarticle_text == cur_idarticle_text);
    // avoid a duplicate 
    let res_items = [];
    let sent_items = coll_word_item ? coll_word_item.items : [];
    // remove duplicates
    let uniqueItems = new Set();
    for (let key in sent_items) {    
        let item = sent_items[key];
        if (!uniqueItems.has(Number(item.idsentence))) {
            uniqueItems.add(Number(item.idsentence));
            res_items.push(item);
        }
    }
    return res_items.length > 0 ? res_items : null;
}
    

// split the sentence into words using space as a delimiter 
function splitStringIntoWords(str1) {    
    let words = str1.split(' ').map(word => word.trim()).filter(word => word.length > 0);
    return words;
}

function get_now_n19_datefromat_fb() {    
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function get_nowBackUp_n19_datefromat_fb() {    
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');    
    return `${year}-${month}-${day}_${hours}_${minutes}_${seconds}`;
}
