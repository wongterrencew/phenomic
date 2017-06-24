"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

/**
 * Normalize path into uri
 * Join, replace multiple / or \ to single /
 */
var pathToUri = function pathToUri() {
  return _path.join.apply(undefined, arguments).replace(/(\/|\\)+/g, "/");
};
exports.default = pathToUri;