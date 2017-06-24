"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (config, definitions) {
  var errors = [];

  Object.keys(config).forEach(function (key) {
    if (!definitions[key]) {
      errors.push("Unknow option '" + key + "'.");
    } else if (definitions[key].type !== undefined && definitions[key].type !== _typeof(config[key])) {
      errors.push("Wrong type for '" + key + "': expected '" + definitions[key].type + "', " + ("got '" + _typeof(config[key]) + "'."));
    }
  });

  return errors;
};