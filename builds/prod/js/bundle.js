!function i(u,l,c){function s(t,e){if(!l[t]){if(!u[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(a)return a(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var r=l[t]={exports:{}};u[t][0].call(r.exports,function(e){return s(u[t][1][e]||e)},r,r.exports,i,u,l,c)}return l[t].exports}for(var a="function"==typeof require&&require,e=0;e<c.length;e++)s(c[e]);return s}({1:[function(e,t,n){"use strict";var o,r=e("jquery"),i=(o=r)&&o.__esModule?o:{default:o},u=e("./ui/content-panels");window.jQuery=window.$=i.default,(0,i.default)(document).ready(function(){console.log("jQuery console log")}),document.querySelector(".modalTrigger").addEventListener("click",u.Modal.open)},{"./ui/content-panels":2,jquery:"jquery"}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Modal=void 0;var o,r,i,u,l=e("../utils/common"),c=(o=document.querySelector(".modal"),r=o.querySelector(".modal-box"),i=o.querySelector(".closeBtn"),u=function(){l.Center.el(r)},{open:function(t){o.classList.add("open"),u(),window.addEventListener("resize",u),t&&r.classList.add(t.class),i.addEventListener("click",function(e){e.preventDefault(),o.classList.remove("open"),t&&r.classList.remove(t.class)})}});n.Modal=c},{"../utils/common":3}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o={el:function(e){var t=Math.max((window.innerHeight-e.offsetHeight)/2,0),n=Math.max((window.innerWidth-e.offsetWidth)/2,0);e.style.top=t+"px",e.style.left=n+"px"}};n.Center=o},{}]},{},[1]);