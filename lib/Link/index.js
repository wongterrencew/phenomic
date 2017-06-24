"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _Link = require("../components/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// deprecated
console.log("⚠️ " + _chalk2.default.yellow("'phenomic/lib/Link' reference is deprecated.\n" + "Please use `import { Link } from \"phenomic\" instead`."));

exports.Link = _Link2.default;
exports.default = _Link2.default;