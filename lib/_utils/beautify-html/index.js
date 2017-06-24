"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsBeautify = require("js-beautify");

exports.default = function (html) {
  return (0, _jsBeautify.html)(html, _extends({}, _jsBeautify.default_options, { indent_size: 2 }));
};