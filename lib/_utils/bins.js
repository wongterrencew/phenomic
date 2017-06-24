"use strict";

// ⚠️ Used in postinstall, so es6 - imports - not transpiled

var resolve = require("path").resolve;

var platformSuffix = process.platform === "win32" ? ".cmd" : "";

module.exports = {
  babelNode: resolve("./node_modules/.bin/babel-node" + platformSuffix),
  npm: "npm" + platformSuffix,
  yarn: "yarn" + platformSuffix
};