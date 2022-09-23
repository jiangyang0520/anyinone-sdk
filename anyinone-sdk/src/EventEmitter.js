
/**
 * 自定义事件触发器
 */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.listeners = {};
    }
    EventEmitter.prototype.addEventListener = function (type, listener) {
        var listeners = this.getListerers(type);
        if (!listeners.includes(listener)) {
            listeners.push(listener);
        }
    };
    EventEmitter.prototype.dispatchEvent = function (event) {
        try {
            for (var _i = 0, _a = this.getListerers(event.type); _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(event);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    };
    EventEmitter.prototype.removeEventListener = function (type, callback) {
        var listeners = this.getListerers(type);
        var i = -1;
        if ((i = listeners.indexOf(callback)) != -1) {
            listeners.splice(i, 1);
        }
    };
    EventEmitter.prototype.clearListeners = function () {
        this.listeners = {};
    };
    EventEmitter.prototype.getListerers = function (type) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        return this.listeners[type];
    };
    return EventEmitter;
}());
export default EventEmitter;
