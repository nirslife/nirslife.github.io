function build_Phrase_MainUI() {
  // Clear body
  document.body.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.id = 'header1';
  document.body.appendChild(header);

  // Top controls
  const controlDivTop = document.createElement('div');
  controlDivTop.id = 'control_div';
  controlDivTop.innerHTML = `
    <div class="button_controlsentences" onclick="NextSentence()">Next Sentence</div>
    <div class="button_controlsentences" onclick="SavePhraseToFireBase()">Save Phrase to Base</div>
  `;
  document.body.appendChild(controlDivTop);

  // Info
  const infoDiv = document.createElement('div');
  infoDiv.id = 'info_div';
  document.body.appendChild(infoDiv);

  // English text
  const textFrom1 = document.createElement('div');
  textFrom1.id = 'textfrom1';
  textFrom1.setAttribute('onmousedown', 'clickTextfrom(this)');
  document.body.appendChild(textFrom1);

  // Input phrase container
  const inputTextFrom1 = document.createElement('div');
  inputTextFrom1.id = 'inputtextfrom1';
  inputTextFrom1.style.background = 'rgb(255, 255, 255)';
  inputTextFrom1.innerHTML = `<div id="div_inputtextfrom1"></div>`;
  document.body.appendChild(inputTextFrom1);

  // Phrase controls
  const controlDivPhrase = document.createElement('div');
  controlDivPhrase.id = 'control_div';
  controlDivPhrase.innerHTML = `
    <div class="button_controlsentences" onclick="addNewPhrase()">Add Phrase</div>
    <div class="button_controlsentences" onclick="removeLastPhrase()">Remove Last Phrase</div>
  `;
  document.body.appendChild(controlDivPhrase);

  // Puzzle text
  const puzzleTextFrom1 = document.createElement('div');
  puzzleTextFrom1.id = 'puzzletextfrom1';
  puzzleTextFrom1.innerHTML = `<div id="div_puzzletextfrom1"></div>`;
  document.body.appendChild(puzzleTextFrom1);

  // Other containers
  ['m_container1', 'verify_cont1', 'main_menu_bottom'].forEach(id => {
    const div = document.createElement('div');
    div.id = id;
    document.body.appendChild(div);
  });

  build_forall_MainUI();

}

function build_ArticleTextEnter_MainUI(){
  // Clear body
  document.body.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.id = 'header1';
  document.body.appendChild(header);

  // // Top controls
  // const controlDivTop = document.createElement('div');
  // controlDivTop.id = 'control_div';
  // controlDivTop.innerHTML = `
  //   <div class="button_controlsentences" onclick="NextSentence()">Next Sentence</div>
  //   <div class="button_controlsentences" onclick="SavePhraseToFireBase()">Save Article Text to Base</div>
  // `;
  // document.body.appendChild(controlDivTop);


    // English Name text
  const textArt_Name = document.createElement('div');
  textArt_Name.id = 'articletext_name';
  textArt_Name.innerHTML = `
<div id="input_text_area_container">
  <label for="input_name_text_area">Enter name article:</label><br>
  <input type="text" id="input_name_text_area" placeholder="Type your name here..." />
</div>
  `;
  document.body.appendChild(textArt_Name);

  // English text area
  const textArtInPut = document.createElement('div');
  textArtInPut.id = 'article_text_input';
  textArtInPut.innerHTML = `
  <label for="input_textbody_area">Enter your article text:</label><br>
  <textarea id="input_textbody_area" rows="50" cols="50" placeholder="Type your article text here..."></textarea>
  <br>
  <button id="checksplit_text_button" class="button_controlsentences" onclick="CheckSplitArticleText()">Check Article Text</button>

  `;



  document.body.appendChild(textArtInPut);

    // Info
  const infoDiv = document.createElement('div');
  infoDiv.id = 'info_div';
  document.body.appendChild(infoDiv);


  build_forall_MainUI();
}

  



function build_VoiceArticleText_MainUI() {
  // Clear body
  document.body.innerHTML = '';
  try {
        // call add function to add the voice selection dropdown
        addVoiceSelectionDropdown();
        // Call the function to convert JSON to content
        JsonToContentMD();
    } catch (error) {
        console.error("Error in MainFunc:", error);
    }

  build_forall_MainUI();
};

