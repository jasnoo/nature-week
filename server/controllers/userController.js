
const { User } = require("../models/user");

const userController = {};

// getting a user/creating a new one 
userController.getUser = async (req, res, next) => {
    const { email, given_name } = res.locals.credentials;
    try {
        await User.findOne({ email: email })
            .exec()
            .then((data) => {
                if (!data) {
                    User.create({
                        email: email,
                        first_name: given_name,
                        favorite: [],
                    }).then((data) => {
                        res.locals.user = data.email
                        res.locals.name = data.first_name
                        res.locals.favorites = data.favorites
                        next();
                    });
                } else {
                    res.locals.user = data.user
                    res.locals.name = given_name
                    res.locals.favorites = data.favorites
                    next();
                }

            });
    } catch (err) {
        next(err);
    }
};

// getting user favorites
userController.getUserFavorites = async (req, res, next) => {
    if (res.locals.user) {
        try {
            await User.findOne({ email: res.locals.user }).select('favorites').exec()
                .then(data => {
                    res.locals.favorites = data.favorites
                })
            next()
        }
        catch (err) {
            next(err)
        }
    }
    next()
}

module.exports = userController;




















// // const { useSyncExternalStore } = require("react");
// const { User } = require("../models/user");

// // validate user token
// // desired controllers
// // check if a user exists
// // start a session
// // create a user
// // end a session

// // login with google will give me name and username
// // check if user exists -> 


// const userController = {};



// userController.getUser = (req, res, next) => {
//     console.log("start userController.createUser");
//     const { email, given_name } = res.locals.credentials;

//     try {
//         User.findOne({ email: email })
//             .exec()
//             .then((data) => {
//                 if (data) {
//                     console.log("user exists, user data: ", data);


//                 } else {
//                     User.create({
//                         email: email,
//                         first_name: given_name,
//                         favorite: [],
//                     }).then((data) => {
//                         console.log("THIS IS THE USER: ", data);
//                         // res.locals.userId = data["_id"];


//                     });
//                 }
//                 res.locals.user = data.email
//                 res.locals.favorites = data.favorites
//                 console.log("leaving userController.createUser");
//                 next();
//             });
//     } catch (err) {
//         next(err);
//     }
// };

// userController.verifyUser = (req, res, next) => {
//     // write code here

//     // pulling out the username and password from the user inputted sign in field
//     let { username, password } = req.body;
//     // let salt = bcrypt.genSaltSync(10)
//     password = bcrypt.hashSync(password, salt);
//     try {
//         // querying the database to see if the username exists
//         User.findOne({ username: username })
//             .exec()
//             // if the username exists (note we used .find() instead of .findAll() so this return an empty array)
//             .then((data) => {
//                 if (data) {
//                     // block for if something was found in DB
//                     if (data.password === password) {
//                         res.locals.userId = data["_id"];
//                         next();
//                     } else {
//                         // if username exists but not password
//                         res.sendFile(path.resolve(__dirname, "../../client/index.html"));
//                     }
//                     // end block for if something was found in DB
//                 } else {
//                     // username doesnt exist
//                     res.sendFile(path.resolve(__dirname, "../../client/signup.html"));
//                 }
//             });
//         // error handling for if an error occurs during the db lookup
//     } catch (err) {
//         next(err);
//     }
// };

// module.exports = userController;
