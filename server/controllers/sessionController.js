const sessionController = {};

sessionController.getSession = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user
        res.locals.name = req.session.name
    }
    next();
};

module.exports = sessionController;


