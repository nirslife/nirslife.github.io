function build_ExpImpForTrans_MainUI(){

  ExpImpForTrans_createStyles();

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
    <div class="button_controlsentences" onclick="Click_Main_ExpImpForTrans_LoadDataToHTML()">Sentences</div>
    <div class="button_controlsentences" onclick="Click_Main_ExpImpForTrans_ShowPhrases()">Phrases</div>
  `;


  document.body.appendChild(controlDivTop);

  // Info
  const infoDiv = document.createElement('div');
  infoDiv.id = 'info_div';
  document.body.appendChild(infoDiv);


  build_forall_MainUI();
}


function ExpImpForTrans_createStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    #header1 {
      background-color: #f0f0f0;
      padding: 10px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin-top: 50px;
    }
    .button_controlsentences_copy {
        background: #1e90ff;
        color: #fff;
        border: none;
        min-height: 30px;
        border-radius: 7px;
        padding: 12px 28px;
        font-size: 18px;
        font-weight: 600;
        margin: 12px 20px 12px 20px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(30,144,255,0.08);
        transition: background 0.2s, box-shadow 0.2s;
        display: inline-block;
        letter-spacing: 0.5px;    
    }
  `;
  document.head.appendChild(style);
}
