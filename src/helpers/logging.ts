enum STATUS_SYMBOLS {
    INFO = '\u24D8',
    SUCCESS = '\u2713',
    WARNING = '\u26A0',
    ERROR = '\u2717'
}

function error(...message: any[]) {
    console.error(STATUS_SYMBOLS.ERROR, ' ', message)
}
function warn(...message: any[]) {
    console.warn(STATUS_SYMBOLS.WARNING, ' ', message)
}
function success(...message: any[]) {
    console.log('%c', STATUS_SYMBOLS.SUCCESS, ' ', message, 'color: green');
}
function info(...message: any[]) {
    console.log(STATUS_SYMBOLS.INFO, ' ', message);
}

export { error, warn, success, info }