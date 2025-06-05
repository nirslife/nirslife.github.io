let voices = [];
let VoiceENIndex = -1;
let VoiceSamantha = -1;

function addVoiceSelectionDropdown() {
    // Create a select element for voice selection
    var selectElm = document.createElement('select');
    selectElm.id = 'selectvoiceEN_US';
    selectElm.style.marginBottom = '10px'; // Add some spacing below the dropdown
    selectElm.onchange = function() {
        let selectedOption = this.options[this.selectedIndex];
        let inx = selectedOption.getAttribute('index_i');
        if (inx) {        
            VoiceENIndex = parseInt(inx, 10);
            document.getElementById("idlabel_selected").innerHTML = 'Selected Voice (EN-US): ' + (voices[VoiceENIndex] ? voices[VoiceENIndex].name : 'None');
        }        
        var selectedVoiceURI = this.value;
        var selectedVoice = voices.find(voice => voice.voiceURI === selectedVoiceURI);
        if (selectedVoice) {
            SpeechEngl("Selected voice: " + selectedVoice.name);
        }
    };
    
    // add the div for margin
    var marginDiv = document.createElement('div');
    marginDiv.id = 'marginDivVoiceEN_US';
    marginDiv.style.marginBottom = '10px'; // Add some spacing below the dropdown
    marginDiv.style.borderRadius = '5px'; // Add some border radius for better appearance
    marginDiv.style.border = '1px solid #ccc'; // Add a border for better visibility
    marginDiv.style.padding = '10px'; // Add some padding for better appearance
    marginDiv.style.backgroundColor = '#f9f9f9'; // Add a light background color for better visibility


    marginDiv.appendChild(selectElm);
    document.body.appendChild(marginDiv); // Append the margin div to the body   

    // Populate the voice list and add labels after voices are loaded
    populateVoiceEN_USList();
}

async function populateVoiceEN_USList() {
     let marginDiv = document.getElementById('marginDivVoiceEN_US');    

    voices = await window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        // If voices are not loaded yet, wait for them to load
        window.speechSynthesis.onvoiceschanged = populateVoiceEN_USList;
        return;
    }
    let selectElm = document.getElementById('selectvoiceEN_US');
    if (!selectElm) return;
    // Clear existing options
    selectElm.innerHTML = '';
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].lang.indexOf('en-US') < 0) continue; // skip non-EN voices
        var option = document.createElement('option');
        option.innerHTML = voices[i].name + ' (' + voices[i].lang + ')';
        option.setAttribute('value', voices[i].voiceURI);
        option.setAttribute('index_i', i);
        option.voice = voices[i];
        if (voices[i].default) {
            option.selected = true;
            VoiceENIndex = i;
        }
        if (voices[i].name.indexOf('Samantha') >= 0) {
            VoiceSamantha = i;
            option.selected = true;
            VoiceENIndex = i;
        }
        selectElm.appendChild(option);
    }

    // Now add the labels, since voices is ready
    var label1 = document.createElement('label');
    label1.setAttribute('for', 'selected voice');
    label1.id = 'idlabel_selected';
    label1.innerHTML = 'Selected Voice (EN-US): ' + (voices[VoiceENIndex] ? voices[VoiceENIndex].name : 'None');
    label1.style.display = 'block'; // Make the label block-level for better spacing
    label1.style.marginBottom = '5px'; // Add some spacing below the label
    marginDiv.insertBefore(label1, selectElm); // Insert label before the dropdown

    // Add a label for the dropdown
    var label = document.createElement('label');
    label.setAttribute('for', 'selectvoiceEN_US');
    label.innerHTML = 'Select Voice (EN-US): ';
    label.style.display = 'block'; // Make the label block-level for better spacing
    label.style.marginBottom = '5px'; // Add some spacing below the label
    marginDiv.insertBefore(label, selectElm); // Insert label before the dropdown
}


function SpeechEngl(text1){
  ms = new SpeechSynthesisUtterance();
  ms.voice = voices[VoiceENIndex];
  ms.text = text1;  
  window.speechSynthesis.speak(ms);
}
