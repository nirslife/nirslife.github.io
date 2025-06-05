// Function to handle control Phrase text click BEGIN
// begin of ./js/sent_main.js - Main functions for handling phrases and puzzle text
function clickInputtext(element) {
  // Remove the element from the DOM
  const phrase = element.parentElement;
  element.remove();
  // Check if parent exists and is a phrase
  if (phrase && phrase.classList.contains('phrase')) {
    if (phrase.children.length === 0) {
      phrase.remove();
      return false;
    }
  }
}

function addNewPhrase() {
  RefreshPuzzletext();
  const inputTextDiv = document.getElementById('div_inputtextfrom1');
  const newPhrase = document.createElement('div');
  newPhrase.className = 'phrase';
  newPhrase.setAttribute('phrase_id', inputTextDiv.children.length + 1);    
  inputTextDiv.appendChild(newPhrase);
}

function RefreshPuzzletext() {
  const div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
  const puzzleBlocks = div_puzzletextfrom1.getElementsByClassName('puzzleblock inpoff');
  Array.from(puzzleBlocks).forEach(element => {
    element.setAttribute('class', 'puzzleblock inpon');
    element.setAttribute('onclick', 'clickPuzzletext(this)');
  });
}

function removeLastPhrase() {
  RefreshPuzzletext();
  const inputTextDiv = document.getElementById('div_inputtextfrom1');
  const phrases = inputTextDiv.getElementsByClassName('phrase');
  if (phrases.length > 0) {
    phrases[phrases.length - 1].remove();
  }
}

function clickPuzzletext(element) {
  // find the last phrase in the input text
  const inputTextDiv = document.getElementById('div_inputtextfrom1');
  const phrases = inputTextDiv.getElementsByClassName('phrase');
  if (phrases.length > 0) {
    const lastPhrase = phrases[phrases.length - 1];
    // create a new input text block
    const newInputText = document.createElement('div');
    newInputText.className = 'inputtext';
    newInputText.setAttribute('onclick', 'clickInputtext(this)');
    newInputText.setAttribute('indexarr', element.getAttribute('indexarr'));
    newInputText.style.color = 'rgb(0, 0, 0)';
    newInputText.style.background = 'rgb(90, 238, 120)';
    newInputText.textContent = element.textContent;    
    lastPhrase.appendChild(newInputText);
    // change the attribute of the puzzle block     
    element.setAttribute('class', 'puzzleblock inpoff');
    element.setAttribute('onclick', '');
    element.style.cursor = 'default';    
  }

}
