// Function to handle control Phrase text click BEGIN
// begin of ./js/sent_main.js - Main functions for handling phrases and puzzle text
function clickInputtext(element) {
  // Remove the element from the DOM
  const phrase = element.parentElement;
  let indexarr = element.getAttribute('indexarr');
  element.remove();
  let div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
  let puzzleBlocks = div_puzzletextfrom1.getElementsByClassName('puzzleblock inpoff');
  // Find the puzzle block with the matching indexarr
  Array.from(puzzleBlocks).forEach(block => {
    if (block.getAttribute('indexarr') === indexarr) {
      // Change the class and onclick attribute of the puzzle block
      block.setAttribute('class', 'puzzleblock inpon');     
    }
  });
}

function addNewPhrase() {  
  let div_inputtextfrom1 = document.getElementById('div_inputtextfrom1');
  let phrases = div_inputtextfrom1.getElementsByClassName('phrase');
  if (phrases.length > 0) { return false; }
  // If there are no phrases, create a new one
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

