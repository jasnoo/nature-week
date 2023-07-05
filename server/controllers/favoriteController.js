
const path = require("path");
const { User } = require("../models/user");
const { isFloat32Array } = require("util/types");

const favoriteController = {};

favoriteController.addFavorite = async (req, res, next) => {
  if (res.locals.user) {
    let speciesId = req.body._id
    try {
      await User.findOneAndUpdate({ 'email': res.locals.user }, { $addToSet: { favorites: speciesId } }, { new: true, useFindAndModify: false })
        .then(data => {
          res.locals.userFavorites = data.favorites
        })
      next();
    } catch (err) {
      next(err);
    }
  }
  else {
    next();
  }
};


favoriteController.removeFavorite = async (req, res, next) => {
  if (res.locals.user) {
    let user = req.body.user
    let speciesId = req.body._id
    try {
      await User.findOneAndUpdate({ "email": user }, { $pull: { favorites: { $in: speciesId } } }, { new: true }).exec()
        .then(data => { res.locals.userFavorites = data.favorites })
      next();
    } catch (err) {
      next(err);
    }
  }
  next();
};

favoriteController.getAllFavorites = (req, res, next) => {
  if (res.locals.user) {
    try {
      User.findOne({ 'email': res.locals.user }).select('favorites').exec()
        .then(data => {
          res.locals.favorites = data
          next();
        })
    } catch (err) {
      next(err);
    }
  }
  else {
    next();
  }
}

favoriteController.getFavoriteData = (req, res, next) => {

  if (res.locals.favorites.favorites[0] !== undefined) {
    const favString = res.locals.favorites.favorites.join("%2C")
    try {
      fetch(`https://api.inaturalist.org/v1/taxa/${favString}`)
        .then((response) => response.json())
        .then((data) => {
          let favoritesInfo = data.results.map(x => {
            return {
              id: x.id,
              preferred_common_name: x.preferred_common_name,
              name: x.name,
              medium_url: x.default_photo.medium_url,
              nature_option: x.iconic_taxon_name,
            }

          })
          res.locals.favorites = favoritesInfo

          next();
        })
        .catch((e) => console.log('error', e));

    } catch (err) {
      next(err);
    }
  }
  else {
    next();
  }
}

module.exports = favoriteController;




