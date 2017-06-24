"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTestAnswers = undefined;

var _validUrl = require("valid-url");

var _validUrl2 = _interopRequireDefault(_validUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTestAnswers = exports.defaultTestAnswers = {
  name: "phenomic-theme-base",
  homepage: "https://phenomic.io/themes/base/demo",
  twitter: "Phenomic_app",
  repository: "https://github.com/MoOx/phenomic",
  CNAME: false
};

var packageJsonNameRE = /^[a-zA-Z0-9\-]+$/;
var twitterRE = /^[a-zA-Z0-9\-_]+$/;

var questions = [{
  type: "input",
  name: "name",
  message: "Dashed name of your project (eg: my-project)",
  validate: function validate(value) {
    if (packageJsonNameRE.test(value)) {
      return true;
    }
    return "Only letters, numbers and dashes are allowed.";
  }
}, {
  type: "input",
  name: "homepage",
  message: "Website url (eg: http://abc.xyz/)",
  validate: function validate(value) {
    if (_validUrl2.default.isWebUri(value)) {
      return true;
    }
    return "Please provide a valid url";
  }
}, {
  type: "input",
  name: "repository",
  message: "Repository url" + " (eg: https://github.com/MoOx/phenomic.git, optional)",
  validate: function validate(value) {
    if (value === "" || _validUrl2.default.isWebUri(value)) {
      return true;
    }
    return "Please provide a valid url for repository";
  }
}, {
  type: "input",
  name: "twitter",
  message: "Twitter nickname (eg: MoOx, optional)",
  validate: function validate(value) {
    if (value === "" || twitterRE.test(value)) {
      return true;
    }
    return "Only letters, numbers, dashes & underscores are allowed.";
  }
}, {
  type: "confirm",
  name: "CNAME",
  message: "Do you want a CNAME file (eg: for GitHub Pages)?",
  default: false
}];

exports.default = questions;