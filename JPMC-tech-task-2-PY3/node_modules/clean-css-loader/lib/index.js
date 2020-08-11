"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanCssLoader;

var _cleanCss = _interopRequireDefault(require("clean-css"));

var _loaderUtils = require("loader-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanCssLoader(css, map) {
  const options = this.options ? this.options.module : false;
  const query = (0, _loaderUtils.getOptions)(this);
  const cleanCssOptions = query || (options ? options.cleancss || options["clean-css"] || options.CleanCSS : false) || {};
  const callback = this.async();
  return new _cleanCss.default(cleanCssOptions).minify(css, map, (err, minified) => {
    if (err) {
      return callback(err[0]);
    }

    if (!cleanCssOptions.skipWarn && Array.isArray(minified.warnings)) {
      minified.warnings.forEach(warning => {
        this.emitWarning(warning.toString());
      });
    }

    return callback(null, minified.styles, minified.sourceMap);
  });
}

module.exports = exports.default;