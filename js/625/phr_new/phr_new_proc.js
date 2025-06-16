// Function to handle control Phrase text click BEGIN

// function click_phr_Inputtext(element) {
//   // Remove the element from the DOM
//   const phrase = element.parentElement;
//   let indexarr = element.getAttribute('indexarr');
//   element.remove();
//   let div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
//   let puzzleBlocks = div_puzzletextfrom1.getElementsByClassName('puzzleblock inpoff');
//   // Find the puzzle block with the matching indexarr
//   Array.from(puzzleBlocks).forEach(block => {
//     if (block.getAttribute('indexarr') === indexarr) {
//       // Change the class and onclick attribute of the puzzle block
//       block.setAttribute('class', 'puzzleblock inpon');     
//       block.setAttribute('onclick', 'click_phr_Puzzletext(this)');
//       block.style.cursor = 'pointer';
//     }
//   });
// }

function click_phr_Inputtext(element) {
   const phrase = element.parentElement;
   element.remove();  
}


function addNewPhr_new() {  
    const div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
    let selectedElements = div_puzzletextfrom1.querySelectorAll('.puzzleblock[selected_position="true"]');
    if (selectedElements.length > 0) {
      Refresh_phr_Puzzletext();
      const inputTextDiv = document.getElementById('div_inputtextfrom1');
      const newPhrase = document.createElement('div');
      newPhrase.className = 'phrase';
      newPhrase.setAttribute('phrase_id', -1);    
      newPhrase.setAttribute('onclick', 'OnClickPhrase(this)');
      inputTextDiv.appendChild(newPhrase);
      Array.from(selectedElements).forEach(element => {
          // create a new input text block
          const newInputText = document.createElement('div');
          newInputText.className = 'inputtext';
          newInputText.setAttribute('onclick', 'click_phr_Inputtext(this)');
          newInputText.setAttribute('indexarr', element.getAttribute('indexarr'));
          newInputText.textContent = element.textContent;
          newPhrase.appendChild(newInputText);
      });
      Clear_End_SelElem_In_Puzzletext();
      Clear_Beg_SelElem_In_Puzzletext();
      Clear_Selection_In_Puzzletext();
    }
}

function OnClickPhrase(phraseElement) {
   let inputTexts = phraseElement.getElementsByClassName('inputtext');
   let phraseText = Array.from(inputTexts).map(input => input.textContent).join(' ');
   SpeechEngl(phraseText);  // Speak the English text
}


function Refresh_phr_Puzzletext() {
  const div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
  const puzzleBlocks = div_puzzletextfrom1.getElementsByClassName('puzzleblock inpoff');
  Clear_Beg_SelElem_In_Puzzletext();
  Clear_End_SelElem_In_Puzzletext();
  Clear_Selection_In_Puzzletext();
  Array.from(puzzleBlocks).forEach(element => {
    element.setAttribute('class', 'puzzleblock inpon');
    element.setAttribute('onclick', 'click_phr_Puzzletext(this)');
  });
}

function remove_phr_LastPhrase() {
  Refresh_phr_Puzzletext();
  const inputTextDiv = document.getElementById('div_inputtextfrom1');
  const phrases = inputTextDiv.getElementsByClassName('phrase');
  if (phrases.length > 0) {
    phrases[phrases.length - 1].remove();
  }
}

// function click_phr_Puzzletext(element) {
//   // find the last phrase in the input text
//   const inputTextDiv = document.getElementById('div_inputtextfrom1');
//   const phrases = inputTextDiv.getElementsByClassName('phrase');
//   if (phrases.length > 0) {
//     const lastPhrase = phrases[phrases.length - 1];
//     // create a new input text block
//     const newInputText = document.createElement('div');
//     newInputText.className = 'inputtext';
//     newInputText.setAttribute('onclick', 'click_phr_Inputtext(this)');
//     newInputText.setAttribute('indexarr', element.getAttribute('indexarr'));
//     newInputText.style.color = 'rgb(0, 0, 0)';
//     newInputText.style.background = 'rgb(90, 238, 120)';
//     newInputText.textContent = element.textContent;    
//     lastPhrase.appendChild(newInputText);
//     // change the attribute of the puzzle block     
//     element.setAttribute('class', 'puzzleblock inpoff');
//     element.setAttribute('onclick', '');
//     element.style.cursor = 'default';    
//   }

// }
function click_phr_Puzzletext(element) {
   let pos_beg_or_end = element.getAttribute('position_be');
   if (pos_beg_or_end === 'begin') {
       Clear_End_SelElem_In_Puzzletext();
       Clear_Beg_SelElem_In_Puzzletext();
       Clear_Selection_In_Puzzletext();

    //  element.removeAttribute('position_be');
    //  // remove class puzzle_position_begin
    //  element.classList.remove('puzzle_position_begin');
    //  // find element with position_be='end'
    //  let endElement = element.parentElement.querySelector('.puzzleblock[position_be="end"]');
    //  if (endElement) {
    //     endElement.removeAttribute('position_be');
    //     endElement.classList.remove('puzzle_position_end');
    //     Clear_Selection_In_Puzzletext();
    //  }
   } else if (pos_beg_or_end === 'end') {
    //  element.removeAttribute('position_be');
    //  // remove class puzzle_position_end
    //  element.classList.remove('puzzle_position_end');
     Clear_End_SelElem_In_Puzzletext();
     Clear_Selection_In_Puzzletext();
   }
   else {    
     let begElement = element.parentElement.querySelector('.puzzleblock[position_be="begin"]');
     if (begElement) {
        let beg_indexarr = Number(begElement.getAttribute('indexarr'));
        let cur_indexarr = Number(element.getAttribute('indexarr'));
        if (beg_indexarr < cur_indexarr) {
           Clear_End_SelElem_In_Puzzletext();
           element.setAttribute('position_be', 'end');
           element.classList.add('puzzle_position_end');           
           Clear_Selection_In_Puzzletext();
           Set_Selection_In_Puzzletext(beg_indexarr, cur_indexarr);
        }  
     } else {
        element.setAttribute('position_be', 'begin');
        element.classList.add('puzzle_position_begin');
     }
   }
}

function Set_Selection_In_Puzzletext(beg_indexarr, end_indexarr) {
  beg_indexarr = Number(beg_indexarr);
  end_indexarr = Number(end_indexarr);
  const div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
  const puzzleBlocks = div_puzzletextfrom1.getElementsByClassName('puzzleblock inpon');
  Array.from(puzzleBlocks).forEach(element => {
    let indexarr = Number(element.getAttribute('indexarr'));
    if (indexarr >= beg_indexarr && indexarr <= end_indexarr) {
      element.setAttribute('selected_position', 'true');      
    }
    if (indexarr > beg_indexarr && indexarr < end_indexarr) {
      element.classList.add('puzzle_between');      
    }
  });
}

function Clear_Selection_In_Puzzletext() {
    // for each element in div_puzzletextfrom1 with attribute indexarr selected_position = true
    const div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
    let selectedElements = div_puzzletextfrom1.querySelectorAll('.puzzleblock[selected_position="true"]');
    Array.from(selectedElements).forEach(element => {
        element.removeAttribute('selected_position');
        element.classList.remove('puzzle_between');
    });
}

function Clear_End_SelElem_In_Puzzletext() {
    // for each element in div_puzzletextfrom1 with attribute indexarr selected_position = true
    const div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
    let endElement = div_puzzletextfrom1.querySelector('.puzzleblock[position_be="end"]');
    if (endElement) {
       endElement.removeAttribute('position_be');
       endElement.classList.remove('puzzle_position_end');
       endElement.classList.remove('selected_position');
    }
}

function Clear_Beg_SelElem_In_Puzzletext() {
    // for each element in div_puzzletextfrom1 with attribute indexarr selected_position = true
    const div_puzzletextfrom1 = document.getElementById('div_puzzletextfrom1');
    let begElement = div_puzzletextfrom1.querySelector('.puzzleblock[position_be="begin"]');
    if (begElement) {
       begElement.removeAttribute('position_be');
       begElement.classList.remove('puzzle_position_begin');
       begElement.classList.remove('selected_position');
    }
}


function Phr_new_proc_createStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .puzzle_position_begin {
      background-color: rgb(43, 45, 162);
      color: white;
    }
    .puzzle_position_end {
      background-color: rgb(162, 45, 43);
      color: white;
    }
    .puzzle_between {
      background-color: rgb(162, 162, 45);
      color: white;
    }  

    `;
  document.head.appendChild(style);
}
