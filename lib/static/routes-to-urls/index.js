"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require("react-router");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _urlJoin = require("url-join");

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _arrayUnique = require("../../_utils/array-unique");

var _arrayUnique2 = _interopRequireDefault(_arrayUnique);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultConsole = console.log;

var flattenRoute = function flattenRoute(route) {
  // @todo remove the default route.path, user should use IndexRoute instead?
  var routesUrls = route.path ? [route.path] : [];

  if (route.indexRoute) {
    routesUrls.push(route.path);
  }
  if (route.childRoutes) {
    var root = route.path;
    route.childRoutes.forEach(function (route) {
      routesUrls = [].concat(_toConsumableArray(routesUrls), _toConsumableArray(flattenRoute(route).map(function (r) {
        return root ? (0, _urlJoin2.default)(root, r) : r;
      })));
    });
  }

  return routesUrls;
};

// only simple types will be accepted
// array<string | number> | string | number
// other will be skipped
var paramsListFromCollection = function paramsListFromCollection(collection) {
  var params = {};

  collection.forEach(function (item) {
    if (!item.head) {
      return;
    }

    Object.keys(item.head).forEach(function (key) {
      // array<string | number>
      if (Array.isArray(item.head[key]) && item.head[key].length && (typeof item.head[key][0] === "string" || typeof item.head[key][0] === "number")) {
        var k = key
        // categories => category
        .replace(/ies$/, "y")
        // tags => tag
        .replace(/s$/, "");

        if (!params[k]) {
          params[k] = [];
        }
        params[k] = [].concat(_toConsumableArray(params[k]), _toConsumableArray(item.head[key]));
      }

      // string, number
      if (typeof item.head[key] === "string" || typeof item.head[key] === "number") {
        if (!params[key]) {
          params[key] = [];
        }
        params[key].push(item.head[key]);
      }
    });
  });

  params.splat = collection.map(function (item) {
    return item.__url;
  });

  return params;
};

var createUrlsFromParamsReplacementInUrl = function createUrlsFromParamsReplacementInUrl(url, params, log) {
  // don't compute anything if url doesn't seems to have dynamic parameters
  // react-router url params are like ``:that`` (or splat *)
  if (url.indexOf(":") === -1 && url.indexOf("*") === -1) {
    return [url];
  }

  var urls = [];

  var possibleErrorEnd = "parameter for path \"" + url + "\"";

  var missingKeys = [];
  var nonMissingKeys = [];

  Object.keys(params).forEach(function (paramName) {
    params[paramName].forEach(function (paramValue) {
      var urlParams = _defineProperty({}, paramName, paramValue);
      try {
        var hydratedUrl = (0, _reactRouter.formatPattern)(url, urlParams);
        urls.push(hydratedUrl);
        nonMissingKeys.push(paramName);
      } catch (e) {
        // log(paramName, e.message)

        var matches = e.message.match(/Missing \"(.*)\" parameter for path/);
        if (matches && matches[1]) {
          missingKeys.push(matches[1]);
        }

        if (e.message.indexOf("Missing") === 0 && e.message.lastIndexOf(possibleErrorEnd) === e.message.length - possibleErrorEnd.length - 1) {
          throw e;
        }
      }
    });
  });

  nonMissingKeys = (0, _arrayUnique2.default)(nonMissingKeys);
  missingKeys = (0, _arrayUnique2.default)(missingKeys).filter(function (key) {
    return nonMissingKeys.indexOf(key) === -1;
  });
  if (missingKeys.length) {
    log("⚠️ " + _chalk2.default.red("It looks like some parameters can't be mapped to create routes: ", missingKeys.map(function (key) {
      return ":" + key;
    }).join(", ")));
  }

  // @todo improve the algorithm to avoid duplicates,
  // we will probably get better perfs

  return (0, _arrayUnique2.default)(urls.sort());
};

var hydrateRoutesUrls = function hydrateRoutesUrls(routesUrls, collection, log) {
  var paramsList = paramsListFromCollection(collection);

  return routesUrls.reduce(function (acc, url) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(createUrlsFromParamsReplacementInUrl(url, paramsList, log)));
  }, []);
};

exports.default = function (routes, collection) {
  var log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultConsole;

  var flattenedRoutes = (0, _arrayUnique2.default)((0, _reactRouter.createRoutes)(routes).reduce(function (acc, r) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(flattenRoute(r)));
  }, []));

  if (flattenedRoutes.filter(function (url) {
    return url.indexOf("*") > -1;
  }).length > 1) {
    throw new Error("Phenomic can only handle one splat (*) in react-router routes. \n" + "You must use only one splat. If you have a specific need, do not " + "hesitate to open an issue at " + "https://github.com/MoOx/phenomic/issues/new");
  }

  var normalizedRoutes = flattenedRoutes.map(function (route) {
    return "/" + route.replace(/^\/+/, "").replace(/\/+$/, "");
  });

  return hydrateRoutesUrls(normalizedRoutes, collection, log);
};