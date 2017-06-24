"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url) {
  global.document = _jsdom2.default.jsdom("<!doctype html><html><body><div id=\"app\"></div></body></html>", {
    url: url
  });
  global.window = document.defaultView;
  global.navigator = window.navigator;
  window.localStorage = window.sessionStorage = {
    getItem: function getItem(key) {
      return this[key];
    },
    setItem: function setItem(key, value) {
      this[key] = value;
    },
    removeItem: function removeItem(key) {
      delete this[key];
    }
  };
};

var _jsdom = require("jsdom");

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }