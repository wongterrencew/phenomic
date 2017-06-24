"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _PageContainer = require("../components/PageContainer");

var _PageContainer2 = _interopRequireDefault(_PageContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// deprecated
console.log("⚠️ " + _chalk2.default.yellow("'phenomic/lib/PageContainer' reference is deprecated.\n" + "Please use `import { PageContainer } from \"phenomic\" instead`."));

exports.default = _PageContainer2.default;