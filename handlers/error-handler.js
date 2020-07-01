function errorHandler(err, req, res, next) {
    if (typeof (err) == 'string') {
        return res.status(400).render('error', {message: err});
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).render('error', {message: 'Unauthorized'});
    }

    return res.status(500).render('error', {message: err.message});
}

module.exports = errorHandler