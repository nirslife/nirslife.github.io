
function build_ArticleTextEnter_MainUI(){
  // Clear body
  document.body.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.id = 'header1';
  document.body.appendChild(header);
  

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
