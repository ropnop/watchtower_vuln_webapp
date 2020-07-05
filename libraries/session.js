function authMiddleware(req, res, next) {
    if (req.path === "/login" || req.path === "/register") {
        next();
    }
    else if (req.session.isNew) {
        res.redirect('/login');
    } else {
        next();
    }
}

function userView(req, res, next) {
    res.locals.session = req.session;
    next();
}

module.exports = {authMiddleware, userView}