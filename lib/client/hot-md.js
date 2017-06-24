"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pages = require("../redux/modules/pages");

var pageActions = _interopRequireWildcard(_pages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (mdContext, collection, store) {
  return function (file) {
    var item = collection.find(function (item) {
      return item.__filename === file.slice("./".length);
    });
    var dataUrl = mdContext(file);
    if (dataUrl !== item.__dataUrl) {
      item.__dataUrl = dataUrl;
      console.log(file, " hot update");
      store.dispatch(pageActions.refresh(item.__url, item.__dataUrl));
    }
  };
}; // eslint-disable-next-line import/no-namespace