require('rootpath')();

const homepage = (req, res, next) => {
    res.render('index', req.session)
}

module.exports = homepage