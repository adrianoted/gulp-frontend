(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _contentPanels = require("./ui/content-panels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We need to expose jQuery as global variable
window.jQuery = window.$ = _jquery2.default;

// ES6 import does not work it throws error: Missing jQuery using Node.js style import works without problems
// require('bootstrap');

// Import Modules
// Importing jQuery in ES6 style


// jQuery Test
(0, _jquery2.default)(document).ready(function () {
    console.log("jQuery console log");
});

// Custom Javascript
var modalTrigger = document.querySelector('.modalTrigger');
modalTrigger.addEventListener('click', _contentPanels.Modal.open);

},{"./ui/content-panels":2,"jquery":"jquery"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Modal = undefined;

var _common = require('../utils/common');

var Modal = function () {

    //DOM Cache
    var modal = document.querySelector('.modal'),
        modalBox = modal.querySelector('.modal-box'),
        closeBtn = modal.querySelector('.closeBtn');

    //Methods
    var center = function center() {
        _common.Center.el(modalBox);
    },
        open = function open(options) {
        //open Modal
        modal.classList.add('open');

        //center the Modal
        center();
        window.addEventListener('resize', center);
        if (options) modalBox.classList.add(options.class);

        //close Modal
        var close = function close(e) {
            e.preventDefault();
            modal.classList.remove('open');
            if (options) modalBox.classList.remove(options.class);
        };

        closeBtn.addEventListener("click", close);
    };

    //PUBLIC
    return {
        open: open
    };
}();

exports.Modal = Modal;

},{"../utils/common":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Center = function () {

    function element(el) {
        var top = Math.max((window.innerHeight - el.offsetHeight) / 2, 0),
            left = Math.max((window.innerWidth - el.offsetWidth) / 2, 0);
        el.style.top = top + "px";
        el.style.left = left + "px";
    };
    return {
        el: element
    };
}();

exports.Center = Center;

},{}]},{},[1])

//# sourceMappingURL=../maps/bundle.js.map
