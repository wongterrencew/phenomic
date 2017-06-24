"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// @ flow
// flow is not enabled because of the issue with set and spread
// https://github.com/facebook/flow/issues/1059

exports.default = function (array) {
  return [].concat(_toConsumableArray(new Set(array)));
};