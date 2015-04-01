/**
 * logdown - Debug utility with markdown support that runs on browser and server
 *
 * @version v1.1.2
 * @link https://github.com/caiogondim/logdown
 * @author Caio Gondim <me@caiogondim.com> (http://caiogondim.com)
 * @license ISC
 */
!function(e,r){"use strict";"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?module.exports=r():e.Logdown=r()}(this,function(){"use strict";function e(r){if(!(this instanceof e))return new e(r);r=r||{};var t=void 0===r.prefix?"":r.prefix;return t=a(t),t&&c(t,x)?l(t,x):(this.markdown=void 0===r.markdown?!0:r.markdown,this.prefix=t,x.push(this),f()?(this.prefixColor=m[g%m.length],g+=1):u()&&(this.prefixColor=v()),this)}function r(e){for(var r=[],o=t(e);o;)e=e.replace(o.rule.regexp,o.rule.replacer),f()&&(r.push(o.rule.style),r.push("color:inherit;")),o=t(e);return{text:e,styles:r}}function t(e){var r=[],t=[];return f()?t=[{regexp:/\*([^\*]+)\*/,replacer:function(e,r){return"%c"+r+"%c"},style:"font-weight:bold;"},{regexp:/\_([^\_]+)\_/,replacer:function(e,r){return"%c"+r+"%c"},style:"font-style:italic;"},{regexp:/\`([^\`]+)\`/,replacer:function(e,r){return"%c"+r+"%c"},style:"background:#FDF6E3; color:#586E75; padding:1px 5px; border-radius:4px;"}]:u()&&(t=[{regexp:/\*([^\*]+)\*/,replacer:function(e,r){return"["+b.modifiers.bold[0]+"m"+r+"["+b.modifiers.bold[1]+"m"}},{regexp:/\_([^\_]+)\_/,replacer:function(e,r){return"["+b.modifiers.italic[0]+"m"+r+"["+b.modifiers.italic[1]+"m"}},{regexp:/\`([^\`]+)\`/,replacer:function(e,r){return"["+b.bgColors.bgYellow[0]+"m["+b.colors.black[0]+"m "+r+" ["+b.colors.black[1]+"m["+b.bgColors.bgYellow[1]+"m"}}]),t.forEach(function(t){var o=e.match(t.regexp);o&&r.push({rule:t,match:o})}),0===r.length?null:(r.sort(function(e,r){return e.match.index-r.match.index}),r[0])}function o(e,t){var o,n,i,s;return"string"==typeof e?t.markdown&&p()?(o=r(e),n=o.text,i=o.styles):(n=e,i=[]):(n=n||"",i=i||[],s=e),t.prefix&&(p()?(n="%c"+t.prefix+"%c "+n,i.unshift("color:"+t.prefixColor+"; font-weight:bold;","color:inherit;")):n="["+t.prefix+"] "+n),{parsedText:n,styles:i,notText:s}}function n(e,t){var o,n="";return t.prefix&&(n=p()?"["+t.prefixColor[0]+"m["+b.modifiers.bold[0]+"m"+t.prefix+"["+b.modifiers.bold[1]+"m["+t.prefixColor[1]+"m ":"["+t.prefix+"] "),"string"==typeof e?n+=t.markdown?r(e).text:e:o=e,{parsedText:n,styles:[],notText:o}}function i(e){var r=!1;return h.forEach(function(t){"enable"===t.type&&t.regExp.test(e.prefix)?r=!1:"disable"===t.type&&t.regExp.test(e.prefix)&&(r=!0)}),r}function s(e){return new RegExp("^"+e.replace(/\*/g,".*?")+"$")}function c(e,r){var t=!1;return r.forEach(function(r){return r.prefix===e?void(t=!0):void 0}),t}function l(e,r){var t;return r.forEach(function(r){return r.prefix===e?void(t=r):void 0}),t}function a(e){return"string"==typeof e?e.replace(/\%c/g,""):e}function p(){if(f()){var e="WebkitAppearance"in document.documentElement.style,r=window.console&&(console.firebug||console.exception&&console.table),t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31;return e||r||t}return u()?process.stdout&&!process.stdout.isTTY?!1:"win32"===process.platform?!0:"COLORTERM"in process.env?!0:"dumb"===process.env.TERM?!1:/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)?!0:!1:void 0}function u(){return"undefined"!=typeof module&&"undefined"!=typeof module.exports}function f(){return"undefined"!=typeof window}function d(e){return e}var x=[],g=0,m=["#B58900","#CB4B16","#DC322F","#D33682","#6C71C4","#268BD2","#2AA198","#859900"],b={modifiers:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},colors:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39]},bgColors:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49]}},h=[];e.enable=function(){Array.prototype.forEach.call(arguments,function(r){"-"===r[0]&&e.disable(r.substr(1));var t=s(r);"*"===r?h=[{type:"enable",regExp:t}]:h.push({type:"enable",regExp:t})})},e.disable=function(){Array.prototype.forEach.call(arguments,function(r){"-"===r[0]&&e.enable(r.substr(1));var t=s(r);"*"===r?h=[{type:"disable",regExp:t}]:h.push({type:"disable",regExp:t})})};var y=["log","info","warn","error"];y.forEach(function(r){e.prototype[r]=function(){var e,t=[];if(!i(this)){var s=Array.prototype.slice.call(arguments,0).join(" ");f()?(s=a(s),e=o(s,this),Function.prototype.apply.call(console[r],console,[e.parsedText].concat(e.styles,"undefined"!=typeof e.notText?[e.notText]:""))):u()&&(s=d(s),e=n(s,this),"warn"===r?e.parsedText="["+b.colors.yellow[0]+"m⚠["+b.colors.yellow[1]+"m "+e.parsedText:"error"===r?e.parsedText="["+b.colors.red[0]+"m✖["+b.colors.red[1]+"m "+e.parsedText:"info"===r&&(e.parsedText="["+b.colors.blue[0]+"mℹ["+b.colors.blue[1]+"m "+e.parsedText),t.push(e.parsedText),e.notText&&t.push(e.notText),console[r].apply(console,t))}}});var v=function(){var e=0,r=[[31,39],[32,39],[33,39],[34,39],[35,39],[36,39]];return function(){return r[(e+=1)%r.length]}}();return e});