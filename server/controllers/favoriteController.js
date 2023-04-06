const favoriteController = {};
const path = require('path');
const { Favorite } = require('../models/natureWeekModels');

favoriteController.addFavorite = (req, res, next) => {

    console.log('req.body')
    console.log(req.body)

    let { _id, name, common_name, type, photo_url } = req.body;

    try {
        // creating a new user
        // first check if the user already exists
        Favorite.findOne({ _id: _id }).exec()
            .then(data => {
                if (data) {
                    // block for if something was found in DB
                    console.log('already in favorites')
                    next();
                }
                // if the user doesnt exist
                else {
                    console.log('creating new fav in db')
                    //create password hash
                    //make the uer in db
                    Favorite.create({
                        _id: _id, name: name, common_name: common_name, type: type, photo_url: photo_url

                    })
                    return next()
                    // .then(data => {

                    //     next()
                    // })

                }
            })
    }
    // if theres some sort of error
    catch (err) {
        next(err)
    }

    next();

}

module.exports = favoriteController;
