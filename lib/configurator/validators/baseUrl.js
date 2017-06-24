"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
  var pkg = _ref.pkg,
      config = _ref.config;

  var devUrl = "http://" + config.devHost + ":" + config.devPort + "/";
  var prodBaseUrl = (0, _url.parse)(pkg.homepage ? pkg.homepage : devUrl);
  config.baseUrl = config.production ? prodBaseUrl : _extends({}, (0, _url.parse)(devUrl), {
    // get base from prod url
    pathname: prodBaseUrl.path ? prodBaseUrl.path : "/"
  });

  config.baseUrl = (0, _index2.default)(config.baseUrl);

  // Set basename to process.env for universal usage
  process.env.PHENOMIC_USER_PATHNAME = config.baseUrl.pathname;
};

var _url = require("url");

var _index = require("../../_utils/normalize-base-url/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }