function build_Phrase_MainUI() {

  Phrase_createStyles();
  
  // Clear body
  document.body.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.id = 'header1';
  document.body.appendChild(header);

  const infoDivTop = document.createElement('div');
  infoDivTop.className = 'margin_head_info';
  infoDivTop.id = 'id_info_margin_phrases_head';
  document.body.appendChild(infoDivTop);

  // Top controls
  const controlDivTop = document.createElement('div');
  controlDivTop.id = 'control_div';
  controlDivTop.innerHTML = `
      <div class="button_controlsentences" onclick="PrevSentence()">Prev</div>
      <div class="button_controlsentences" onclick="NextSentence()">Next Sent</div>
      <div class="button_controlsentences" onclick="SavePhraseToFireBase()">Save Phrase to Base</div>
      <div class="button_controlsentences" onclick="EditSentence()">Edit Sentence</div>
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
    <div class="button_controlsentences" onclick="SetProcessedAndNext()">Set Processed and Next</div>    
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

  let block_bottom = document.createElement('div');
  block_bottom.id = 'block_bottom';
  block_bottom.innerHTML = `
    <div class="buttons_bottom_block">
      <div class="button_controlsentences" onclick="Click_Set_Not_Processed()">Set Not Processed</div>
    </div>
  `;
  document.body.appendChild(block_bottom);

  build_forall_MainUI();

}



function Phrase_createStyles() {
  const style = document.createElement('style');
  style.textContent = `

.phrase {
  margin: 12px 0;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f0f8ff;
  border: 1px solid #b3d8fd;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}


.button_remove_phrase {
  display: inline-block;
  background: #4da6ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 9px 22px;
  margin: 10px 8px 0 0;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(77,166,255,0.08);
  text-align: center;
  user-select: none;
}

.button_add_phrase:hover,
.button_remove_phrase:hover {
  background: #357ec7;
}


#control_div {
  margin: 24px 0 24px 0;
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: center;
}

.margin_head_info {
  font-size: 28px;
  font-weight: 600;
  color: #666;
  margin-bottom: 20px;
  display: block;
  width: 100%;
}

.buttons_top_block {
  display: block;
  width: 100%;  
}

.buttons_bottom_block {
  margin-top: 10px;
  display: block;
  width: 100%;
}

  `;
  document.head.appendChild(style);
}
