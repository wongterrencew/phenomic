"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (collection) {
  if (!Array.isArray(collection)) {
    throw new Error("minify expect a valid collection instead of " + (typeof collection === "undefined" ? "undefined" : _typeof(collection)));
  }

  return collection.map(function (item) {
    return _extends({}, item.head, {
      __filename: item.__filename,
      __url: item.__url,
      __resourceUrl: item.__resourceUrl,
      __dataUrl: item.__dataUrl
    });
  });
};