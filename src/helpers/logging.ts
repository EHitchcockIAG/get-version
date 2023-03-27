enum STATUS_SYMBOLS {
    INFO = '\u24D8',
    SUCCESS = '\u2713',
    WARNING = '\u26A0',
    ERROR = '\u2717'
}

enum STATUS_COLOURS {
    SUCCESS = '\x1b[32m',
    WARNING = '\x1b[33m',
    ERROR = '\x1b[31m'
}

function error(...message: any[]) {
    console.error(STATUS_COLOURS.ERROR, STATUS_SYMBOLS.ERROR, ' ', ...message);
}
function warn(...message: any[]) {
    console.warn(STATUS_COLOURS.WARNING, STATUS_SYMBOLS.WARNING, ' ', ...message);
}
function success(...message: any[]) {
    console.log(STATUS_COLOURS.SUCCESS, STATUS_SYMBOLS.SUCCESS, ' ', ...message);
}
function info(...message: any[]) {
    console.log(STATUS_SYMBOLS.INFO, ' ', ...message);
}

export { error, warn, success, info }
