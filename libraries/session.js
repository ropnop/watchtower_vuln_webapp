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

module.exports = authMiddleware