"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// eslint-disable-next-line import/no-namespace


exports.setPageData = setPageData;
exports.forgetPageData = forgetPageData;
exports.writeHTMLFile = writeHTMLFile;
exports.writeAllHTMLFiles = writeAllHTMLFiles;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require("fs-promise");

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _urlify = require("../_utils/urlify");

var _urlify2 = _interopRequireDefault(_urlify);

var _pages = require("../redux/modules/pages");

var pagesActions = _interopRequireWildcard(_pages);

var _routesToUrls = require("./routes-to-urls");

var _routesToUrls2 = _interopRequireDefault(_routesToUrls);

var _urlAsHtml = require("./url-as-html");

var _urlAsHtml2 = _interopRequireDefault(_urlAsHtml);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (pagesActions.SET === undefined) {
  throw new Error("pages SET action is undefined");
}
if (pagesActions.FORGET === undefined) {
  throw new Error("pages FORGET action is undefined");
}

function setPageData(url, collection, store) {
  var json = collection.find(function (item) {
    return item.__url === url;
  });
  if (json) {
    // prepare page data
    store.dispatch({
      type: pagesActions.SET,
      page: url,
      response: { json: json }
    });
  }
}

function forgetPageData(url, store) {
  // forget page data to avoid having all pages data in all pages
  store.dispatch({
    type: pagesActions.FORGET,
    page: url
  });
}

function writeHTMLFile(filename, html) {
  return _fsPromise2.default.mkdirs(_path2.default.dirname(filename)).then(function () {
    return Promise.all([_fsPromise2.default.writeFile(filename, html)]);
  }).then(function () {
    return filename;
  });
}

function writeAllHTMLFiles(options, testing) {
  var routes = options.routes,
      collection = options.collection,
      destination = options.destination,
      store = options.store,
      Html = options.Html,
      setPageData = options.setPageData,
      forgetPageData = options.forgetPageData,
      writeHTMLFile = options.writeHTMLFile;

  var urls = (0, _routesToUrls2.default)(routes, collection);

  // create all html files
  return Promise.all(urls.map(function (url) {
    var item = collection.find(function (item) {
      return item.__url === url;
    });
    var filename = decodeURIComponent(item ? _path2.default.join(destination, item.__resourceUrl) : _path2.default.join(destination, (0, _urlify2.default)(url, true)));
    setPageData(url, collection, store);
    return (0, _urlAsHtml2.default)(url, options, Html, testing).then(function (html) {
      return writeHTMLFile(filename, html);
    }).then(function (filename) {
      forgetPageData(url, store);
      return filename;
    });
  }));
}

exports.default = function (options, testing) {
  return writeAllHTMLFiles(_extends({}, options, {
    setPageData: setPageData,
    forgetPageData: forgetPageData,
    writeHTMLFile: writeHTMLFile
  }), testing);
};