//import * as localBD from 'testmod.js';
import {sayHi, sayBye} from './testmod.js';


function Main_App_Run(arg1) {
    

    sayHi('John'); // Hello, John!
    sayBye('John'); // Bye, John!
  }
  

function sayHi(user) {
    alert(`Hello, ${user}!`);
  }
  
  function sayBye(user) {
    alert(`Bye, ${user}!`);
  }
  
  export {sayHi, sayBye}; // a 