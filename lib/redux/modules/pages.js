"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR = exports.FORGET = exports.SET_TYPE = exports.SET = exports.GET = exports.NOOP = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
exports.get = get;
exports.refresh = refresh;
exports.setNotFound = setNotFound;

var _simpleJsonFetch = require("simple-json-fetch");

var _simpleJsonFetch2 = _interopRequireDefault(_simpleJsonFetch);

var _pathToUri = require("../../_utils/path-to-uri");

var _pathToUri2 = _interopRequireDefault(_pathToUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NOOP = exports.NOOP = "phenomic/pages/NOOP";
var GET = exports.GET = "phenomic/pages/GET";
var SET = exports.SET = "phenomic/pages/SET";
var SET_TYPE = exports.SET_TYPE = "phenomic/pages/SET_TYPE";
var FORGET = exports.FORGET = "phenomic/pages/FORGET";
var ERROR = exports.ERROR = "phenomic/pages/ERROR";

// redux reducer
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];


  switch (action.type) {
    case GET:
      return _extends({}, state, _defineProperty({}, action.page, {
        isLoading: true
      }));

    case SET:
      {
        var json = action.response.json;

        return _extends({}, state, _defineProperty({}, action.page, _extends({}, json, {
          type: json.head ? json.head.layout || json.head.type : undefined
        })));
      }

    case FORGET:
      return _extends({}, state, _defineProperty({}, action.page, undefined));

    case ERROR:
      return _extends({}, state, _defineProperty({}, action.page, action.response ? action.response.status ? {
        error: action.response.status,
        errorText: action.response.statusText
      } : {
        error: "Unexpected Error",
        errorText: action.response.message || action.response.error && action.response.error.message ||
        // here we are just in a deseperate case
        "Seriously, this is weird. Please report this page."
      } :
      // no response, it's certainly a 404
      {
        error: 404
      }));

    default:
      return state;
  }
}

// redux actions
function get(page, url) {
  return {
    types: [GET, SET, ERROR],
    page: page,
    promise: (0, _simpleJsonFetch2.default)((0, _pathToUri2.default)(process.env.PHENOMIC_USER_PATHNAME, url))
  };
}

function refresh(page, url) {
  return {
    types: [NOOP, SET, ERROR],
    page: page,
    promise: (0, _simpleJsonFetch2.default)((0, _pathToUri2.default)(process.env.PHENOMIC_USER_PATHNAME, url))
  };
}

function setNotFound(page) {
  return {
    type: ERROR,
    page: page
  };
}