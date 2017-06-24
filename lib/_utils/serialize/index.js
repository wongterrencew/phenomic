"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return JSON.stringify(value).replace(/\<\/script>/g, "<\\/script>");
};