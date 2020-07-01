function keyPage(req, res) {
    res.render('secretkey');
}

function fetchKey(req, res) {
    const {secretKey} = req.session
    res.send(JSON.stringify({secretKey: secretKey}));
}

module.exports = {keyPage, fetchKey}