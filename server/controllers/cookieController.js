const cookieController = {};
const path = require("path");

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie(`ssid=${res.locals.userId}; HttpOnly`);
  next();
};

module.exports = cookieController;
