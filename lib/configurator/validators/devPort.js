"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var config = _ref.config,
      errors = _ref.errors;

  var port = Math.trunc(config.devPort);

  if (port > 0) {
    config.devPort = port;
  } else {
    errors.push("`devPort` must be a legal http port number");
  }
};