"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.success = exports.warn = exports.error = void 0;
var STATUS_SYMBOLS;
(function (STATUS_SYMBOLS) {
    STATUS_SYMBOLS["INFO"] = "\u24D8";
    STATUS_SYMBOLS["SUCCESS"] = "\u2713";
    STATUS_SYMBOLS["WARNING"] = "\u26A0";
    STATUS_SYMBOLS["ERROR"] = "\u2717";
})(STATUS_SYMBOLS || (STATUS_SYMBOLS = {}));
function error(...message) {
    console.error(STATUS_SYMBOLS.ERROR, ' ', message);
}
exports.error = error;
function warn(...message) {
    console.warn(STATUS_SYMBOLS.WARNING, ' ', message);
}
exports.warn = warn;
function success(...message) {
    console.log('%c', STATUS_SYMBOLS.SUCCESS, ' ', message, 'color: green');
}
exports.success = success;
function info(...message) {
    console.log(STATUS_SYMBOLS.INFO, ' ', message);
}
exports.info = info;
