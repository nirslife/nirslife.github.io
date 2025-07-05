function build_phr_new_MainUI() {

  Phr_new_createStyles();
  InitDefaultVoice();
  
  // Clear body
  document.body.innerHTML = '';
  const main_screen = document.createElement('div');
  main_screen.id = 'main_screen';
  document.body.appendChild(main_screen);


  // Header
  const header = document.createElement('div');
  header.id = 'header1';
  main_screen.appendChild(header);

  const infoDivTop = document.createElement('div');
  infoDivTop.className = 'margin_head_info';
  infoDivTop.id = 'id_info_margin_phrases_head';
  main_screen.appendChild(infoDivTop);

  // Top controls
  const controlDivTop = document.createElement('div');
  controlDivTop.id = 'control_div';
  controlDivTop.innerHTML = `      
      <div class="button_ctrl_sentences" onclick="Prev_phr_Sentence()">Prev</div>
      <div class="button_ctrl_sentences" onclick="Next_phr_Sentence()">Next</div>
      <div class="button_ctrl_sentences" onclick="Set_phr_ProcessedAndNext()">SetPR -> </div>      
      <div class="button_ctrl_sentences" onclick="Edit_phr_Sentence()">Edit Sent</div>
      <div class="button_ctrl_sentences" onclick="SwitchVoicePhraseWhenAdded()">Sp_ech</div>
  `;
  main_screen.appendChild(controlDivTop);

  // Info
  const infoDiv = document.createElement('div');
  infoDiv.id = 'info_div';
  main_screen.appendChild(infoDiv);

  // English text
  const textFrom1 = document.createElement('div');
  textFrom1.id = 'textfrom1';
  textFrom1.setAttribute('onmousedown', 'clickTextfrom(this)');
  main_screen.appendChild(textFrom1);

  // Input phrase container
  const inputTextFrom1 = document.createElement('div');
  inputTextFrom1.id = 'inputtextfrom1';
  inputTextFrom1.style.background = 'rgb(255, 255, 255)';
  inputTextFrom1.innerHTML = `<div id="div_inputtextfrom1"></div>`;
  main_screen.appendChild(inputTextFrom1);

  // Phrase controls
  const controlDivPhrase = document.createElement('div');
  controlDivPhrase.id = 'control_div';
  controlDivPhrase.innerHTML = `
    <div class="button_ctrl_sentences" onclick="addNewPhr_new()">Add Phr</div>
    <div class="button_ctrl_sentences" onclick="remove_phr_LastPhrase()">Del Last Phr</div>
    <div class="button_ctrl_sentences" onclick="Save_phr_PhraseToFireBase()">Save Phrs FB</div>    
  `;
  main_screen.appendChild(controlDivPhrase);

  // Puzzle text
  const puzzleTextFrom1 = document.createElement('div');
  puzzleTextFrom1.id = 'puzzletextfrom1';
  puzzleTextFrom1.innerHTML = `<div id="div_puzzletextfrom1"></div>`;
  main_screen.appendChild(puzzleTextFrom1);

  // Other containers
  ['m_container1', 'verify_cont1', 'main_menu_bottom'].forEach(id => {
    const div = document.createElement('div');
    div.id = id;
    main_screen.appendChild(div);
  });

  let block_bottom = document.createElement('div');
  block_bottom.id = 'block_bottom';
  block_bottom.innerHTML = `
    <div class="buttons_bottom_block">
      <div class="button_ctrl_sentences" onclick="Click_Set_Not_Processed()">Set Not Processed</div>
    </div>
  `;
  main_screen.appendChild(block_bottom);

  build_forall_MainUI(main_screen);

}


// FUNCTION OF MAIN STYLE UI
function Phr_new_createStyles() {
  Phr_new_createStyles_1();
  Phr_new_proc_createStyles();  
}



function Phr_new_createStyles_1() {
  const style = document.createElement('style');
  style.textContent = `
#main_screen {
  width: 97%;
  margin: 10px 10px 10px 10px;
}


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
  gap: 16px;
}


#control_div10000 {
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

  .button_ctrl_sentences {
  background: #1e90ff;
  color: #fff;
  border: none;
  min-height: 60px;
  border-radius: 7px;
  padding: 12px 28px;
  font-size: 26px;
  font-weight: 600;
  margin: 35px 50px 35px 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(30,144,255,0.08);
  transition: background 0.2s, box-shadow 0.2s;
  display: inline-block;
  letter-spacing: 0.5px;
}

.button_ctrl_sentences:hover {
  background: #156ec1;
  box-shadow: 0 4px 16px rgba(30,144,255,0.18);
}


  `;
  document.head.appendChild(style);
}
