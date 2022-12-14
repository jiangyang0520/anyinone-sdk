import EventEmitter_1 from "./EventEmitter.js";
import AssetCloudEvent_1 from "./AssetCloudEvent.js";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
// exports.__esModule = true;

/** ?????????SDK???????????? */
var SdkClient = /** @class */ (function () {
  /**
   * ?????????SDK???????????????
   * @param timeout ???????????????????????????10???
   */
  function SdkClient(timeout) {
    if (timeout === void 0) {
      timeout = 10;
    }
    var _this = this;
    this.messageQueue = [];
    this.appId = null;
    this.eventEmitter = new EventEmitter_1();
    this.handleMessage = function (e) {
      if (e.data.success) {
        //???????????????????????????
        var _a = e.data,
          type = _a.type,
          data = _a.data,
          success = _a.success,
          code = _a.code,
          msg = _a.msg,
          checkCode_1 = _a.checkCode; //?????????????????????
        var event_1;
        while (true) {
          if (e.data.type === "APP_INIT") {
            if (e.data.success) {
              _this.appId = e.data.data;
            } else {
              event_1 = {
                data: data,
                msg: "??????????????????" + e.data.msg,
                originType: type,
              };
              break;
            }
          }
          event_1 = {
            data: data,
            success: success,
            code: code,
            msg: msg,
          };
          break;
        }
        var item = _this.messageQueue.filter(function (q) {
          return q.checkCode == checkCode_1;
        })[0];
        if (item) {
          _this.messageQueue.splice(_this.messageQueue.indexOf(item), 1);
          if (item.resolve && item.reject) {
            clearTimeout(item.timer);
            event_1.success ? item.resolve(event_1) : item.reject(event_1);
          } else {
            _this.dispatchEvent(event_1);
          }
        } else {
          console.warn(
            "ACSDK: \u672A\u5728\u6D88\u606F\u961F\u5217\u4E2D\u627E\u5230\u5F53\u524D\u6D88\u606F { type = "
              .concat(type, ", checkCode = ")
              .concat(checkCode_1, " }")
          );
          _this.dispatchEvent(event_1);
        }
      }
    };
    this.baseUrl = ""
      .concat(window.location.origin)
      .concat(window.location.pathname);
    this.timeout = timeout;
  }
  //#region ????????????
  SdkClient.prototype.addEventListener = function (type, listener) {
    this.eventEmitter.addEventListener(type, listener);
  };
  SdkClient.prototype.dispatchEvent = function (event) {
    return this.eventEmitter.dispatchEvent(event);
  };
  SdkClient.prototype.removeEventListener = function (type, callback) {
    this.eventEmitter.removeEventListener(type, callback);
  };
  //#endregion
  /** ?????????SDK????????? */
  SdkClient.prototype.init = function (appId) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        window.addEventListener("message", this.handleMessage);
        return [2 /*return*/, this.sendAsync("APP_INIT", appId)];
      });
    });
  };
  /** ??????SDK??????????????????????????????????????? */
  SdkClient.prototype.destroy = function () {
    this.eventEmitter.clearListeners();
    window.removeEventListener("message", this.handleMessage);
    this.appId = null;
    this.messageQueue = [];
  };
  /**
   * ????????????????????????????????????????????????
   * @param type ????????????????????????
   * @param data [??????]????????????
   */
  SdkClient.prototype.send = function (type, data) {
    if (type != "APP_INIT" && !this.appId) {
      this.dispatchEvent({
        data: null,
        msg: "?????????????????????",
        originType: type,
      });
      return;
    }
    this.nativePostMessage({ type: type, data: data });
  };
  /**
   * ??????????????????????????????Promise
   * @param type ????????????????????????
   * @param data [??????]????????????
   * @returns ??????Promise??????????????????????????????
   */
  SdkClient.prototype.sendAsync = function (type, data) {
    var _this = this;
    console.log("????????????", type, data);
    if (type === "APP_INIT" && data) {
      _this.appId = data;
    }
    return new Promise(function (resolve, reject) {
      if (type != "APP_INIT" && !_this.appId) {
        reject({
          data: null,
          msg: "?????????????????????",
          originType: type,
        });
      }
      _this.nativePostMessage({ type: type, data: data }, resolve, reject);
    });
  };
  SdkClient.prototype.nativePostMessage = function (msg, resolve, reject) {
    var _a;
    var message = {
      data: msg.data,
      from: this.baseUrl,
      appId: this.appId,
      to: "*",
      type: msg.type,
      checkCode: "r" + new Date().getTime() + "_" + ~~(Math.random() * 100),
      verifyCode: "",
    };
    var item = {
      type: message.type,
      checkCode: message.checkCode,
      resolve: resolve,
      reject: reject,
      timer: undefined,
    };
    if (resolve && reject) {
      item.timer = setTimeout(function () {
        reject({
          data: null,
          msg: "??????????????????",
          originType: message.type,
        });
      }, this.timeout * 1000);
    }
    this.messageQueue.push(item);
    window.top.postMessage(message, "*");
  };
  return SdkClient;
})();

export default SdkClient;
