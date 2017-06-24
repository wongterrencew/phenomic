"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _url = require("url");

exports.default = function (baseUrl) {
  // ensure trailing slash
  if (baseUrl.pathname && !baseUrl.pathname.endsWith("/")) {
    baseUrl.pathname = baseUrl.pathname + "/";
  }

  // update baseUrl.href since pathname has been updated
  // the usage of the spread operator is to avoid having the "magic" Object
  // returned by node (eg: make assertions difficult)
  return _extends({}, (0, _url.parse)((0, _url.format)({
    // baseUrl cannot just be passed directly
    // https://github.com/facebook/flow/issues/908
    href: baseUrl.href,
    protocol: baseUrl.protocol,
    slashes: baseUrl.slashes,
    auth: baseUrl.auth,
    hostname: baseUrl.hostname,
    port: baseUrl.port,
    host: baseUrl.host,
    pathname: baseUrl.pathname,
    search: baseUrl.search,
    query: baseUrl.query,
    hash: baseUrl.hash
  })));
};