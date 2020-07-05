function batcavePage(req, res) {
    res.render('batcave')
}

function authorize(req, res) {
    const {username} = req.session;
    const isBatman = username == "Batman"
    res.json({isBatman: isBatman})
}

module.exports = {batcavePage, authorize}