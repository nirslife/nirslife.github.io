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
    // selectElm.onclick = function(athis){
    //    let selectedOption = athis.options[athis.selectedIndex];
    //    let inx = selectedOption.getAttribute('index_i');
    //    if (inx) {        
    //        document.getElementById("idlabel_selected").innerHTML = 'Selected Voice (EN-US): ' + (voices[VoiceENIndex] ? voices[VoiceENIndex].name : 'None');
    //    }    
    // }
    document.body.appendChild(selectElm);

    // Populate the voice list and add labels after voices are loaded
    populateVoiceEN_USList();
}

async function populateVoiceEN_USList() {
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
    document.body.insertBefore(label1, selectElm); // Insert label before the dropdown

    // Add a label for the dropdown
    var label = document.createElement('label');
    label.setAttribute('for', 'selectvoiceEN_US');
    label.innerHTML = 'Select Voice (EN-US): ';
    label.style.display = 'block'; // Make the label block-level for better spacing
    label.style.marginBottom = '5px'; // Add some spacing below the label
    document.body.insertBefore(label, selectElm); // Insert label before the dropdown
}


function SpeechEngl(text1){
  ms = new SpeechSynthesisUtterance();
  ms.voice = voices[VoiceENIndex];
  ms.text = text1;  
  // if it is mobile device, use the 195 voice
//   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     //VoiceENIndex = 195; // Mobile voice index
// //    const voices = window.speechSynthesis.getVoices();
//     ms.voice = voices[VoiceENIndex];
//   } else {
//     //VoiceENIndex = 0; // Desktop voice index
//   } 
  window.speechSynthesis.speak(ms);
}
