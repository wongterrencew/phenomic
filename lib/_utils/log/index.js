"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plainLog = exports.totalElapsedTime = exports.elapsedTime = exports.formatTime = exports.setTime = exports.setStartTime = exports.start = undefined;

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbolOrSuccess = function symbolOrSuccess(symbol) {
  return _logSymbols2.default[symbol ? symbol : "success"];
};

// eslint-disable-next-line import/no-mutable-exports


var start = exports.start = new Date();
var lastTime = new Date();

// for testing
var setStartTime = exports.setStartTime = function setStartTime(t) {
  exports.start = start = t;
};
var setTime = exports.setTime = function setTime(t) {
  lastTime = t;
};

var formatTime = exports.formatTime = function formatTime(time) {
  return Math.round(time * 100) / 100 + "s";
};

var elapsedTime = exports.elapsedTime = function elapsedTime() {
  var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : lastTime;

  var diff = (now.getTime() - time.getTime()) / 1000;
  lastTime = now;
  if (diff < 0.1) {
    return "";
  }

  var color = diff < 1 ? _chalk2.default.gray : _chalk2.default.blue;
  return color("+" + formatTime(diff));
};

var totalElapsedTime = exports.totalElapsedTime = function totalElapsedTime() {
  var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  return elapsedTime(now, start);
};

var plainLog = exports.plainLog = function plainLog(message) {
  var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "info";

  console.log(_logSymbols2.default[symbol], message);
};

exports.default = function (message, action) {
  // the space is used to avoid shitty collapsed message from other modules
  // that can happen during a loading...
  var spinner = (0, _ora2.default)(message + " ");

  if (action && action.then) {
    spinner.start();
    // $FlowFixMe when we use .start() above, flow miss the action.then test...
    return action.then(function (res) {
      spinner.text += elapsedTime();
      spinner.succeed();
      return res;
    }, function (res) {
      spinner.text += elapsedTime();
      spinner.fail();
      return res;
    });
  }
  if (typeof action === "function") {
    spinner.start();
    try {
      var res = action();
      spinner.text += elapsedTime();
      spinner.succeed();
      return res;
    } catch (e) {
      spinner.text += elapsedTime();
      spinner.fail();
      throw e;
    }
  }

  // else
  spinner.text += elapsedTime();
  spinner.stopAndPersist(symbolOrSuccess(action && String(action)));
};