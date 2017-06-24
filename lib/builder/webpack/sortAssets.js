"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (assets) {
  var assetsFiles = { css: [], js: [] };

  Object.keys(assets).reduce(function (result, key) {
    var chunkAssets = assets[key];
    return result.concat(chunkAssets);
  }, []).sort(function (a, b) {
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
  }).forEach(function (name) {
    if (name.endsWith(".js")) {
      assetsFiles.js.push(name);
    } else if (name.endsWith(".css")) {
      assetsFiles.css.push(name);
    }
  });

  return assetsFiles;
};