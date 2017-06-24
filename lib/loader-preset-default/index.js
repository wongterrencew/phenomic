"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loaderPluginInitHeadPropertyFromConfig = require("../loader-plugin-init-head-property-from-config");

var _loaderPluginInitHeadPropertyFromConfig2 = _interopRequireDefault(_loaderPluginInitHeadPropertyFromConfig);

var _loaderPluginInitHeadPropertyFromContent = require("../loader-plugin-init-head-property-from-content");

var _loaderPluginInitHeadPropertyFromContent2 = _interopRequireDefault(_loaderPluginInitHeadPropertyFromContent);

var _loaderPluginInitBodyPropertyFromContent = require("../loader-plugin-init-body-property-from-content");

var _loaderPluginInitBodyPropertyFromContent2 = _interopRequireDefault(_loaderPluginInitBodyPropertyFromContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_loaderPluginInitHeadPropertyFromConfig2.default, _loaderPluginInitHeadPropertyFromContent2.default, _loaderPluginInitBodyPropertyFromContent2.default];

exports.default = plugins;