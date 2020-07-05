function keyPage(req, res) {
    res.render('secretkey');
}

function fetchKey(req, res) {
    const {secretKey} = req.session
    res.json({secretKey: secretKey})
}

module.exports = {keyPage, fetchKey}