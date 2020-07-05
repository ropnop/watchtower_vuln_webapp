require('rootpath')();

const homepage = (req, res, next) => {
    res.render('index')
}

module.exports = homepage