// Importing jQuery in ES6 style
import $ from "jquery";

// We need to expose jQuery as global variable
window.jQuery = window.$ = $;

// ES6 import does not work it throws error: Missing jQuery using Node.js style import works without problems
// require('bootstrap');

// Import Modules
import { Modal } from './ui/content-panels';

// jQuery Test
$(document).ready(function(){
    console.log("jQuery console log");
});

// Custom Javascript
let modalTrigger = document.querySelector('.modalTrigger');    
modalTrigger.addEventListener('click',  Modal.open);

