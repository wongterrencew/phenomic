"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (s, maxLength) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "…";

  var trimmed = s.substr(0, maxLength);

  if (trimmed === s) {
    return s;
  }

  return trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" "))) + end;
};