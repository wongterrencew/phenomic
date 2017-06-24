"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (_ref) {
  var config = _ref.config,
      errors = _ref.errors;

  // Prepare config.assets path and route
  if (config.assets) {

    // normalize simple string options
    if (["boolean", "string", "object"].indexOf(_typeof(config.assets)) < 0) {
      errors.push("You provided a " + _typeof(config.assets) + " for 'assets' option." + "This option accept a boolean value, a string, or an object.");
    } else if (_typeof(config.assets) === "object" && (typeof config.assets.path !== "string" || typeof config.assets.route !== "string")) {
      var configAssets = config.assets;
      errors.push("You provided an object for 'assets' option." + "You need to provide 2 keys: " + "'path' (string, path of your assets, relative to 'source') " + "and 'route' (string, path of your assets folder in the destination)." + "\n" + "You provided the following keys: " + Object.keys(configAssets).map(function (k) {
        return "'" + k + "' (" + _typeof(configAssets[k]) + ")";
      }).toString());
    } else {
      if (typeof config.assets === "string") {
        config.assets = {
          path: config.assets,
          route: config.assets
        };
      } else if (typeof config.assets === "boolean") {
        // === true
        config.assets = {
          path: _definitions2.default.assets.default,
          route: _definitions2.default.assets.default
        };
      }

      var _configAssets = config.assets;
      // adjust path and validate
      config.assets = {
        path: (0, _path.join)(config.cwd, config.source, _configAssets.path),
        route: _configAssets.route

        // Test folder
      };try {
        var stats = _fs2.default.lstatSync(config.assets.path);
        if (!stats.isDirectory()) {
          // Just throw a dump error
          throw new Error("This is not a folder");
        }
      } catch (e) {
        errors.push(config.assets.path + " doesn't exist or isn't a folder. " + "Please check your 'assets' configuration. " + "Note that if you don't need this option, " + "you can set it up to `false`.");
      }
    }
  }
};

var _path = require("path");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _definitions = require("../definitions.js");

var _definitions2 = _interopRequireDefault(_definitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }