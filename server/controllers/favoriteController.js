
const { User } = require("../models/user");

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
      next({ Error: 'Could not add to favorites' });
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
      next({ Error: 'Could not remove from favorites' });
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
      next({ Error: 'Could not get all user favorites' });
    }
  }
  else {
    next();
  }
}
module.exports = favoriteController;




