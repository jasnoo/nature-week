const sessionController = {};

sessionController.createSession = (req, res, next) => {
    const sess = req.session;
    sess.user = res.locals.credentials.email
    sess.name = res.locals.credentials.given_name
    sess.token = res.locals.token
    next();
};

sessionController.getSession = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user
        res.locals.name = req.session.name
        res.locals.token = req.session.token
    }
    next();
};


module.exports = sessionController;


