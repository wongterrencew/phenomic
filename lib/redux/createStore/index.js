"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var reducer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var extraMiddlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var extraStoreEnhancers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var finalCreateStore = _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, [_promise2.default].concat(_toConsumableArray(extraMiddlewares)))].concat(_toConsumableArray(extraStoreEnhancers)))(_redux.createStore);

  return finalCreateStore(reducer, initialState);
};

var _redux = require("redux");

var _promise = require("../middlewares/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }