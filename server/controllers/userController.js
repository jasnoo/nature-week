
const { User } = require("../models/user");

const userController = {};

// getting a user/creating a new one 
userController.findOrCreateUser = async (req, res, next) => {
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
        next({ Error: 'Could not find or create user' });
    }
};

// getting user favorites
userController.getExistingUserFavorites = async (req, res, next) => {
    if (res.locals.user) {
        try {
            await User.findOne({ email: res.locals.user }).select('favorites').exec()
                .then(data => {
                    res.locals.favorites = data.favorites
                })
            next()
        }
        catch (err) {
            next({ Error: 'Could not find user' })
        }
    }
    next()
}

module.exports = userController;


