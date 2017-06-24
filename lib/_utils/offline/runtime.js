"use strict";

var _runtime = require("offline-plugin/runtime");

var _runtime2 = _interopRequireDefault(_runtime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("SW Event:", "Installing");

// Install ServiceWorker and AppCache in the end since it's not most important
// operation and if main code fails, we do not want it installed

_runtime2.default.install({
  // you can specify here some code to respond to events
  // see here for more informations
  // https://www.npmjs.com/package/offline-plugin#runtime
  onInstalled: function onInstalled() {
    console.log("SW Event:", "onInstalled");
  },
  onUpdating: function onUpdating() {
    console.log("SW Event:", "onUpdating");
  },
  onUpdateReady: function onUpdateReady() {
    console.log("SW Event:", "onUpdateReady");
    _runtime2.default.applyUpdate();
  },
  onUpdated: function onUpdated() {
    console.log("SW Event:", "onUpdated");
    window.location.reload();
  },
  onUninstalled: function onUninstalled() {
    console.log("SW Event:", "onUninstalled");
  }
});
// See webpack configuration file for more offline options