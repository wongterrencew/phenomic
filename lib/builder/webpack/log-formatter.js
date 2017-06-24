"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleInvalid = handleInvalid;
exports.handleDone = handleDone;

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _log = require("../../_utils/log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spinner = (0, _ora2.default)();

// remove noize from messages
var betterMsg = function betterMsg(msg) {
  return msg.replace(process.cwd(), ".")

  // Webpack "Module not found" noize
  .replace(/Error: Cannot resolve 'file' or 'directory'/, "")

  // loader path for css
  .replace(/.\/~\/(css|postcss|sass|less|stylus)-loader(.*)!/g, "");
};

function handleInvalid() {
  spinner.text = "Updating";
  spinner.start();
}

var isSyntaxError = function isSyntaxError(msg) {
  return msg.includes("SyntaxError");
};

function handleDone(webpackStats) {
  spinner.stop();

  var stats = webpackStats.toJson({}, true);
  if (!webpackStats.hasErrors() && !webpackStats.hasWarnings()) {
    spinner.stream.write(_logSymbols2.default.success + _chalk2.default.green(" Updated ") + ("(in " + (0, _log.formatTime)(stats.time / 1000) + ")"));
    return;
  }

  if (stats.errors.length) {
    spinner.text = _chalk2.default.red("Update failed") + "\n";
    spinner.fail();
    spinner = (0, _ora2.default)();

    var errors = stats.errors.some(isSyntaxError)
    // Show syntax error first
    ? stats.errors.filter(isSyntaxError) : stats.errors;
    errors.forEach(function (msg) {
      return (0, _log.plainLog)("Error in " + betterMsg(msg) + "\n", "error");
    });
    return;
  }

  spinner.text = _chalk2.default.yellow("Updated with warnings") + "\n";
  spinner.fail();
  spinner = (0, _ora2.default)();
  stats.warnings.forEach(function (msg) {
    return (0, _log.plainLog)("Warning in " + betterMsg(msg) + " \n", "warning");
  });
}