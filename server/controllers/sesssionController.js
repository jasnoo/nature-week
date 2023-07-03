const sessionController = {};


sessionController.verifyUser = (req, res, next) => {

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

module.exports = sessionController;
