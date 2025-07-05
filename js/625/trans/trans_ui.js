function build_ExpImpForTrans_MainUI(){

  RemoveAllStylesExpImpForTrans();
  ExpImpForTrans_createStyles();
  ExpImpForTrans_createStyles_2();

  // Clear body
  document.body.innerHTML = '';

  // // Header
  // const header = document.createElement('div');
  // header.id = 'header1';
  // document.body.appendChild(header);  

  // Top controls
  const controlDivTop = document.createElement('div');
  controlDivTop.id = 'control_div';  
  controlDivTop.innerHTML = `  
    <div class="button_controlsentences" onclick="Click_Main_ExpImpForTrans_LoadDataToHTML()">Sentences</div>
    <div class="button_controlsentences" onclick="Click_Main_ExpImpForTrans_ShowPhrases()">Phrases</div>
  `;

  // Top controls
  const controlDivTop2 = document.createElement('div');  
  controlDivTop2.id = 'control_div_top2';
  controlDivTop2.innerHTML = `  
    <div class="button_control_transl" id="id_SetModeCollectedWords" onclick="Click_SetModeCollectedWords(this)">SetModeCollectedWords</div>
  `;

  document.body.appendChild(controlDivTop);
  document.body.appendChild(controlDivTop2);

  // Info
  const infoDiv = document.createElement('div');
  infoDiv.id = 'info_div';
  document.body.appendChild(infoDiv);


  build_forall_MainUI(document.body);
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
    #control_div_top2 {
        display: flex;        
        margin-top: 40px;
        margin-bottom: 20px;
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
    .button_control_transl {
      background: #1e90ff;
      color: #fff;
      border: none;
      min-height: 30px;
      border-radius: 7px;
      padding: 12px 28px;
      font-size: 26px;
      font-weight: 600;
      margin: 12px 20px 12px 20px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(30,144,255,0.08);
      transition: background 0.2s, box-shadow 0.2s;
      display: inline-block;
      letter-spacing: 0.5px;
    }
    .button_controlsentences_copy:hover {
        background: #1c86ee;
        box-shadow: 0 4px 16px rgba(30,144,255,0.2);
    }
       .button_control_transl_on { 
        background: rgb(205, 50, 50);
        color: #fff;
    }

    
  `;
  document.head.appendChild(style);
}
