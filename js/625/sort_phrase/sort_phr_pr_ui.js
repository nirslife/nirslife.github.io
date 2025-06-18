// create 

function Get_Config_Sort_Phrase() {
    gv.sts.config_phrase.sort_phrase;
    if (!gv.sts.config_phrase.sort_phrase) {
        gv.sts.config_phrase.sort_phrase = 
        {
           cur_partition : 1
        };        
        Set_Sort_Phrase_Config_SaveToFB(gv.sts.config_phrase.sort_phrase);
    }
    return gv.sts.config_phrase.sort_phrase;
}


function Set_Sort_Phrase_Config_SaveToFB(cnf_sort_phrase) {
    let addurl = "config_phrase/sort_phrase";
    RequestArrFireBase_AddUrl(cnf_sort_phrase, 'PATCH', addurl);
}


function Load_Sort_Phrase_HtmlContent() {

    CreateMainSortPhraseStyles();
    // clear the body content
    document.body.innerHTML = ''; // Clear existing content

    const cnf_sort_phr = Get_Config_Sort_Phrase();
    const count_at_1_portion = 200; // Number of phrases per partition
    // Calculate the total number of partitions
    const total_phrases = gv.sts.phrases.length;
    const total_partitions = Math.ceil(total_phrases / count_at_1_portion);
    // Set the current partition to 1 if it exceeds total partitions
    if (cnf_sort_phr.cur_partition > total_partitions) {
        // set last partition
        cnf_sort_phr.cur_partition = total_partitions;
        Set_Sort_Phrase_Config_SaveToFB(cnf_sort_phr);
    }

    // Create info
    const div_cur_partition = document.createElement('div');
    div_cur_partition.id = 'title-name-sort';
    div_cur_partition.innerHTML = `<h1>Partition: ${cnf_sort_phr.cur_partition}</h1>`;
    document.body.appendChild(div_cur_partition);


    let phrases = gv.sts.phrases;
    // Filter phrases for the current partition
    const start_index = (cnf_sort_phr.cur_partition - 1) * count_at_1_portion;
    const end_index = start_index + count_at_1_portion;
    let phrases_part = phrases.slice(start_index, end_index);


    phrases_part.forEach(phrase => {
        // Create a div for each phrase
        const phrase_div = document.createElement('div');
        phrase_div.className = 'sort-block-phrase-item';
        const cust_idphrase_ru = `sort-phrase-part-ru${phrase.idphrase}`;
        const cust_idphrase_en = `sort-phrase-part-en${phrase.idphrase}`;
        const cust_idphrase_tools = `sort-phrase-part-tools${phrase.idphrase}`;
        phrase_div.innerHTML = `
            <div class="sort-phrase-part-en" id="${cust_idphrase_en}">${phrase.phrase_en}</div>
            <div class="sort-phrase-part-ru" id="${cust_idphrase_ru}">${phrase.phrase_ru}</div>  
            <div class="sort-phrase-part-tools" id="${cust_idphrase_tools}"></div>
        `;        
        document.body.appendChild(phrase_div);
        CreateToolsButtonForPhrase_Trans(cust_idphrase_ru, phrase.idphrase);
        UpdateToolsButtonForPhrase_Label(phrase, 'L1');
        UpdateToolsButtonForPhrase_Label(phrase, 'L2');
        UpdateToolsButtonForPhrase_Label(phrase, 'L3');
    });
}

function HideAllPopupsElements() {
    // Hide all phrase translation divs
    const allPhraseDivs = document.querySelectorAll('.sort-phrase-part-ru');
    allPhraseDivs.forEach(div => {
        div.style.display = 'none';
    });    
}

function CreateToolsButtonForPhrase_Trans(cust_idphrase_ru, idphrase) {
    const tools_div = document.getElementById(`sort-phrase-part-tools${idphrase}`);
    const button = document.createElement('div');
    button.className = 'sort-phrase-tools-button bkg_clr_blue';
    button.innerHTML = 'Trans';
    button.setAttribute('cust_idphrase_ru', cust_idphrase_ru);
    button.onclick = function(element) {
        const cust_idphrase_ru = element.target.getAttribute('cust_idphrase_ru');
        const div_phrase_ru = document.getElementById(cust_idphrase_ru);
        const save_display = div_phrase_ru.style.display;
        HideAllPopupsElements();
        if (save_display === 'none' || save_display === '') {
            div_phrase_ru.style.display = 'block';
        } else {
            div_phrase_ru.style.display = 'none';
        }
    };
    tools_div.appendChild(button);    
}

// function UpdateToolsButtonForPhrase_L1(phrase) {
//     const tools_div = document.getElementById(`sort-phrase-part-tools${phrase.idphrase}`);
//     // Check if the button already exists
//     let existingButton = document.getElementById(`sort-phrase-tools-l1-${phrase.idphrase}`);
//     // If it exists, remove it
//     if (existingButton) {
//         existingButton.remove();
//     }
//     const button = document.createElement('div');
//     button.className = 'sort-phrase-tools-button bkg_clr_off';
//     button.id = `sort-phrase-tools-l1-${phrase.idphrase}`;
//     if (phrase.l1 && phrase.l1 > 0) {
//         button.classList.add('bkg_clr_red');
//         button.setAttribute('L1', '1');
//     }
//     button.innerHTML = 'L1';
//     button.setAttribute('idphrase', phrase.idphrase);
//     button.onclick = function(element) {
//         const idphrase = element.target.getAttribute('idphrase');
//         const phrase_l1 = element.target.getAttribute('L1');
//         if (phrase_l1 === '1') {
//             Patch_Phrase_Label_Firebase(idphrase,'L1', 0);
//         } else {
//             Patch_Phrase_Label_Firebase(idphrase,'L1',1);
//         }
//     };
//     tools_div.appendChild(button);
// }

function RemoveClassesFromLabelButtons(button1) {
    button1.classList.remove('bkg_clr_off');
    button1.classList.remove('bkg_clr_green');
    button1.classList.remove('bkg_clr_red');
    button1.classList.remove('bkg_clr_blue');
    button1.classList.remove('bkg_clr_violet');
    button1.classList.remove('bkg_clr_yellow');
}

function AddClassToLabelButtons(button1,flag = true) {
    let label_name = button1.getAttribute('label_name');
    label_name = label_name.toLowerCase();
    switch (label_name) {
       case 'l1':
            if (flag) { button1.classList.add('bkg_clr_red'); }else { button1.classList.add('bkg_clr_off');}
            break;
        case 'l2':
            if (flag) { button1.classList.add('bkg_clr_green'); }else { button1.classList.add('bkg_clr_off');}
            break;
        case 'l3':
            if (flag) { button1.classList.add('bkg_clr_blue'); }else { button1.classList.add('bkg_clr_off');}
            break;
        default:
            return; // No action for other labels
    }
}

function UpdateToolsButtonForPhrase_Label(phrase, label) {        
    const label_N = label.toLowerCase();
    const className_toolsdiv = `sort-phrase-part-tools${phrase.idphrase}`;
    const but_id_value = `sort-phrase-tools-${label_N}-${phrase.idphrase}`;
    const tools_div = document.getElementById(className_toolsdiv);
    // Check if the button already exists
    let button1 = document.getElementById(but_id_value);    
    if (!button1) {
        button1 = document.createElement('div');
        button1.id = but_id_value;
        button1.className = 'sort-phrase-tools-button';
        button1.innerHTML = `${label_N.toUpperCase()}`;
        button1.setAttribute('idphrase', phrase.idphrase);
        button1.setAttribute('label_name', label_N);
        tools_div.appendChild(button1);
    }
    RemoveClassesFromLabelButtons(button1);
    label_value = phrase[label_N];
    if (label_value && label_value > 0) {
        AddClassToLabelButtons(button1, true);
        button1.setAttribute(label_N, '1');
    }else {
        AddClassToLabelButtons(button1, false);
        button1.setAttribute(label_N, '0');
    }
    button1.onclick = function(element) {        
        const idphrase = element.target.getAttribute('idphrase');
        const label_value = element.target.getAttribute(label_N);
        if (label_value === '1') {
            Patch_Phrase_Label_Firebase(idphrase, label_N, 0);
        } else {
            Patch_Phrase_Label_Firebase(idphrase, label_N, 1);
        }
    };    
}

function Patch_Phrase_Label_Firebase(idphrase, name_label, value) {
    const index = gv.sts.phrases.findIndex(p => p.idphrase == idphrase);
    if (index !== -1) {
        let phrase = gv.sts.phrases[index];
        switch (name_label.toUpperCase()) {
        case 'L1':
            phrase.l1 = value;
            UpdateToolsButtonForPhrase_Label(phrase, 'L1');
            break;
        case 'L2':
            phrase.l2 = value;
            UpdateToolsButtonForPhrase_Label(phrase, 'L2');
            break;
        case 'L3':
            phrase.l3 = value;
            UpdateToolsButtonForPhrase_Label(phrase, 'L3');
            break;
        default:
            return; 
        }     
    }
    // Implement the logic to patch the phrase label in Firebase
    console.log(`Patching phrase ${idphrase} with label ${name_label}`);
}

function CreateMainSortPhraseStyles() {

    CreateCustomSortPhraseStyles1();
}

function CreateCustomSortPhraseStyles1() {
    const style = document.createElement('style');
    style.textContent = `
        #title-name-article_text {
            text-align: center;
            margin: 20px 0;
        }
        .sort-block-phrase-item {
            margin: 10px 10px;            
            border: 1px solid #ccc;
            border-radius: 5px;            
        }
        .sort-phrase-part-en{
            font-size: 28px;
            display: block;
            border: 1px solid #ccc;
            border-radius: 5px;            
            padding: 10px;
            background-color: #f9f9f9;
            cursor: pointer;
        }
        .sort-phrase-part-ru{
            font-size: 28px;
            display: none;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            background-color:rgb(208, 236, 238);
        }
        .sort-phrase-part-tools {
            margin: 5px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f0f0f0;
        }
        .sort-phrase-tools-button {            
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            margin: 5px;
            margin-right: 60px;
            border-radius: 5px;
            text-align: center;
            display: inline-block;
            font-size: 28px;
            width: 120px; 
        }
        .bkg_clr_blue {
            background-color: #007bff;
        }
        .bkg_clr_blue:hover {
            background-color: #0056b3;
        }
        .bkg_clr_green {
            background-color: #28a745;
        }
        .bkg_clr_off {
            background-color:rgb(67, 72, 68);
        }
        .bkg_clr_green:hover {
            background-color: #218838;
        }
        .bkg_clr_violet {
            background-color: #6f42c1;
        }
        .bkg_clr_violet:hover {
            background-color: #5a32a3;
        }
        .bkg_clr_red {
            background-color: #dc3545;
        }
        .bkg_clr_red:hover {
            background-color: #c82333;
        }
    `;
    document.head.appendChild(style);
}

