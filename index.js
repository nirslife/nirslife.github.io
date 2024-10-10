//import * as localBD from 'testmod.js';
import {GetLocalBD} from './js/setlisten_js/localBD.js'; 
import {sayHi, sayBye} from './testmod.js';


function Main_App_Run(arg1) {    
    let vs = GetLocalBD();
    console.log(vs);
   // sayHi('John'); // Hello, John!
   // sayBye('John'); // Bye, John!
}

export default Main_App_Run;
  

