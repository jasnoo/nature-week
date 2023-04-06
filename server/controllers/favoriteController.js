const path = require('path');
const { Favorite } = require('../models/natureWeekModels');

const favoriteController = {};




favoriteController.checkFav = (req, res, next) => {

    let { _id, name, common_name, type, photo_url } = req.body;



    Favorite.findOne({ _id: _id }).exec()
        .then(data => {
            if (data) {
                // console.log('found to DB')


                Favorite.deleteOne({ _id: _id })
                    .then((data) => {
                        // console.log('removed from db')
                        res.locals.inFavorites = false;
                        next();
                    })

            }
            // if the user doesnt exist
            else {
                // console.log('creating new fav in db')

                Favorite.create({
                    _id: _id, name: name, common_name: common_name, type: type, photo_url: photo_url

                })
                // console.log('added to DB')
                res.locals.inFavorites = true;

                return next()

            }
        })



}


favoriteController.addFavorite = (req, res, next) => {

    let { _id, name, common_name, type, photo_url } = req.body;

    try {
        // creating a new user
        // first check if the user already exists
        Favorite.findOne({ _id: _id }).exec()
            .then(data => {
                if (data) {
                    // block for if something was found in DB
                    // console.log('already in favorites')

                    // remove from DB 


                    Favorite.delete({ _id: _id })
                        .then((data) => {
                            next();
                        })




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


favoriteController.checkIfFavorite = (req, res, next) => {
    // res.status(200).json({ didIt: true, id: req.params.id })


    // first check if item is in favorites already exists
    Favorite.findOne({ _id: req.params.id })
        .exec()
        .then((data) => {
            // res.send('wow')
            // console.log('db data: ', data)
            res.locals.speciesId = req.params.id

            if (data) {
                // block for if something was found in DB
                // console.log('check - already in favorites')
                res.locals.data = data
                res.locals.isFavorite = true
                // console.log('1', res.locals.dbResult)
                next()

            }
            // if the user doesnt exist
            else {
                res.locals.isFavorite = false



                next();

            }

        })

        .catch((err) => {
            console.log(err);
            next(err);
        });

    // if theres some sort of error


}

module.exports = favoriteController;