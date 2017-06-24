"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loaderPresetDefault = require("../loader-preset-default");

var _loaderPresetDefault2 = _interopRequireDefault(_loaderPresetDefault);

var _loaderPluginMarkdownInitHead = require("../loader-plugin-markdown-init-head.description-property-from-content");

var _loaderPluginMarkdownInitHead2 = _interopRequireDefault(_loaderPluginMarkdownInitHead);

var _loaderPluginMarkdownTransformBodyPropertyToHtml = require("../loader-plugin-markdown-transform-body-property-to-html");

var _loaderPluginMarkdownTransformBodyPropertyToHtml2 = _interopRequireDefault(_loaderPluginMarkdownTransformBodyPropertyToHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = [].concat(_toConsumableArray(_loaderPresetDefault2.default), [_loaderPluginMarkdownInitHead2.default, _loaderPluginMarkdownTransformBodyPropertyToHtml2.default]);