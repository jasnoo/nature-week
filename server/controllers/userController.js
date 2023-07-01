// const { useSyncExternalStore } = require("react");
const { User } = require("../models/user");

// validate user token
// desired controllers
// check if a user exists
// start a session
// create a user
// end a session

// login with google will give me name and username
// check if user exists -> 


const userController = {};



userController.createUser = (req, res, next) => {
  // i expect username password to come through on req, body
  // console.log("start userController.createUser");
  const { username, password } = req.body;

  try {
    User.findOne({ username: username })
      .exec()
      .then((data) => {
        if (data) {
          // console.log("user exists");
          res.sendFile(path.resolve(__dirname, "../../client/index.html"));
          // gonna have to make this login page at some point
        } else {
          User.create({
            username: username,
            password: password,
            favorite: [],
          }).then((data) => {
            // console.log("THIS IS THE USER ID: ", data["_id"]);
            res.locals.userId = data["_id"];
            // console.log("fin userController.createUser");

            next();
          });
        }
      });
  } catch (err) {
    next(err);
  }
};

userController.verifyUser = (req, res, next) => {
  // write code here

  // pulling out the username and password from the user inputted sign in field
  let { username, password } = req.body;
  // let salt = bcrypt.genSaltSync(10)
  password = bcrypt.hashSync(password, salt);
  try {
    // querying the database to see if the username exists
    User.findOne({ username: username })
      .exec()
      // if the username exists (note we used .find() instead of .findAll() so this return an empty array)
      .then((data) => {
        if (data) {
          // block for if something was found in DB
          if (data.password === password) {
            res.locals.userId = data["_id"];
            next();
          } else {
            // if username exists but not password
            res.sendFile(path.resolve(__dirname, "../../client/index.html"));
          }
          // end block for if something was found in DB
        } else {
          // username doesnt exist
          res.sendFile(path.resolve(__dirname, "../../client/signup.html"));
        }
      });
    // error handling for if an error occurs during the db lookup
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
