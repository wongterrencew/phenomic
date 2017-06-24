"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require("react-redux");

var _pages = require("../../redux/modules/pages");

var pageActions = _interopRequireWildcard(_pages);

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// eslint-disable-next-line import/no-namespace
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var pages = _ref.pages;

  return { pages: pages };
}, function (dispatch) {
  return {
    getPage: function getPage() {
      return dispatch(pageActions.get.apply(pageActions, arguments));
    },
    setPageNotFound: function setPageNotFound() {
      return dispatch(pageActions.setNotFound.apply(pageActions, arguments));
    }
  };
})(_component2.default);