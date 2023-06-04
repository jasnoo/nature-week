const cookieController = {};
const path = require('path');

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
    // write code here
    console.log('youve enetered SSID cookie creator')
    res.cookie(`ssid=${res.locals.userId}; HttpOnly`);
    console.log('finishing cookieController.setSSIDCookie')
    next();

}

module.exports = cookieController;
