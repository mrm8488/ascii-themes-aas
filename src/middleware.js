"use strict";

const validator = {
  exists: param => (param ? true : false),

  isString: param => typeof param === "string" || param instanceof String,

  isNoLongerThan: (number, param) => (param.length <= number ? true : false)
};

/**
 * Middleware to check posted data
 * @param {[object]} req request
 * @param {[object]} res response
 * @param {[function]} next chain function
 * @returns {function/view} next function or response error
 */
module.exports = (req, res, next) => {
  if (
    validator.exists(req.params.text) &&
    validator.isString(req.params.text) &&
    validator.isNoLongerThan(40, req.params.text)
  )
    req.text = req.params.text;
  else req.text = "ASCII THEME";
  if (
    validator.exists(req.query.font) &&
    validator.isString(req.query.font) &&
    validator.isNoLongerThan(40, req.query.font)
  )
    req.font = req.query.font;
  else req.font = "Slant Relief";
  if (
    validator.exists(req.query.themeName) &&
    validator.isString(req.query.themeName) &&
    validator.isNoLongerThan(40, req.query.themeName)
  )
    req.themeName = req.query.themeName;
  else req.themeName = "Monokai Dimmed";

  return next();
};
