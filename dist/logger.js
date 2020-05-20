export var Level;
(function (Level) {
    Level[Level["DEBUG"] = 10] = "DEBUG";
    Level[Level["INFO"] = 20] = "INFO";
    Level[Level["WARNING"] = 30] = "WARNING";
    Level[Level["ERROR"] = 40] = "ERROR";
    Level[Level["CRITICAL"] = 50] = "CRITICAL";
})(Level || (Level = {}));
var NAME = 'vdvsl';
var Logger = /** @class */ (function () {
    function Logger(_a) {
        var out = _a.out, level = _a.level;
        this.out = window.console;
        this.level = Level.DEBUG;
        this.out = out;
        this.level = level;
    }
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Level.DEBUG < this.level) {
            return;
        }
        this.out.log.apply(this.out, this.withPrefix(args));
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Level.INFO < this.level) {
            return;
        }
        this.out.log.apply(this.out, this.withPrefix(args));
    };
    Logger.prototype.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Level.WARNING < this.level) {
            return;
        }
        this.out.warn.apply(this.out, this.withPrefix(args));
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Level.ERROR < this.level) {
            return;
        }
        this.out.error.apply(this.out, this.withPrefix(args));
    };
    Logger.prototype.critical = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Level.CRITICAL < this.level) {
            return;
        }
        this.out.error.apply(this.out, this.withPrefix(args));
    };
    Logger.prototype.withPrefix = function (args) {
        return ["[" + NAME + "] "].concat(args);
    };
    return Logger;
}());
export { Logger };
export default new Logger({
    out: window.console,
    level: process && process.env && process.env.NODE_ENV === 'development'
        ? Level.DEBUG
        : Level.ERROR,
});
//# sourceMappingURL=logger.js.map