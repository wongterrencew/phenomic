"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOfflineConfig = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _url = require("url");

var _chalk = require("chalk");

var _log = require("../../_utils/log");

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOfflineConfig = exports.defaultOfflineConfig = {
  serviceWorker: true,
  appcache: true,
  cachePatterns: {
    onInstall: ["/", "phenomic.*"],
    afterInstall: ["**", ":assets:"],
    onDemand: [],
    excludes: ["**/.*", "**/*.map", "**/*.html"]
  }
};

var knownKeys = Object.keys(defaultOfflineConfig);

exports.default = function (_ref) {
  var pkg = _ref.pkg,
      config = _ref.config,
      errors = _ref.errors;


  if (!config.offline) {
    config.offline = false;
    return;
  }

  if (config.offline === true) {
    config.offlineConfig = defaultOfflineConfig;
  } else if (_typeof(config.offline) !== "object") {
    var keys = Object.keys(defaultOfflineConfig);
    errors.push("Your provided an '" + _typeof(config.offline) + "'" + "for 'phenomic.offline'." + "This option accepts a boolean or an object" + ("with " + keys.length + " keys: ") + keys.join(", "));

    return;
  } else {
    var userOfflineConfig = config.offline;

    var allKeys = Object.keys(userOfflineConfig);
    var incorrectKeys = allKeys.filter(function (key) {
      return knownKeys.indexOf(key) === -1;
    });
    if (incorrectKeys.length) {
      errors.push("You provided some key(s) " + "for 'phenomic.offline' option " + "that are not recognized " + ("(" + incorrectKeys.join(", ") + "). ") + "");
    }

    if (typeof userOfflineConfig.serviceWorker !== "boolean") {
      errors.push("You provided an incorrect type" + (" ('" + _typeof(userOfflineConfig.serviceWorker) + "') ") + "for 'phenomic.offline.serviceWorker' option. " + "This option accepts a boolean value.");
    }

    if (typeof userOfflineConfig.appcache !== "boolean") {
      errors.push("You provided an incorrect type" + (" ('" + _typeof(userOfflineConfig.appcache) + "') ") + "for 'phenomic.offline.appcache' option. " + "This option accepts a boolean value.");
    }

    // Validate patterns
    var cachePatternsKeys = Object.keys(defaultOfflineConfig.cachePatterns);
    var error = void 0;
    if (_typeof(userOfflineConfig.cachePatterns) !== "object") {
      error = "You provided an incorrect type" + (" ('" + _typeof(userOfflineConfig.cachePatterns) + "') ") + "for 'phenomic.offline.cachePatterns' option. ";
    } else {
      var _incorrectKeys = Object.keys(userOfflineConfig.cachePatterns).filter(function (key) {
        return !(cachePatternsKeys.indexOf(key) > -1) || !Array.isArray(userOfflineConfig.cachePatterns[key]);
      });
      if (_incorrectKeys.length) {
        error = "You provided some key(s) " + "for 'phenomic.offline.cachePatterns' option " + "that are not recognized or with incorrect types " + ("(" + _incorrectKeys.join(", ") + "). ") + "";
      }
    }
    if (error) {
      errors.push(error + "This option accepts a object with " + ("with " + cachePatternsKeys.length + " keys: ") + cachePatternsKeys.join(", ") + " " + "that accept array of glob patterns.");
    }

    // Merge config with default config
    config.offlineConfig = _extends({}, defaultOfflineConfig, userOfflineConfig, {
      cachePatterns: _extends({}, defaultOfflineConfig.cachePatterns, userOfflineConfig.cachePatterns)
    });
  }

  if (pkg.homepage && (0, _url.parse)(pkg.homepage).protocol !== "https:" && config.offlineConfig.serviceWorker) {
    console.warn((0, _chalk.yellow)("ServiceWorker (for Offline access) only works with HTTPS protocol." + "You are currently using HTTP, so ServiceWorker will be ignored by " + "browsers."));
  }

  // Disable offline for development if user defined offline config
  if (config.dev && config.offline && !config.forceOffline) {
    config.offline = false;
    config.offlineConfig = {
      serviceWorker: false,
      appcache: false,
      cachePatterns: {}
    };
    (0, _log2.default)((0, _chalk.gray)("Offline support disabled during development " + "(to avoid some false positives)"), "warning");
    return;
  }
};