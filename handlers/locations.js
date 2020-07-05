
function queryLocations(req, res) {
    const db = req.app.get('db');
    const city = req.body.city;
    const sql = `select * from locations where location like '${city}'`;
    console.log(sql);
    db.all(sql, (err, rows) => {
        if (err) {
            const message = `${err.message} -- BAD QUERY: "${sql}"`
            res.render('error', {message: message})
            return
        }
        const hasResults = rows.length != 0 ? true : false
        res.render('locations', {results: rows, hasResults: hasResults})
    })
}

function locationsPage(req, res) {
    res.render('locations');
}

module.exports = {locationsPage, queryLocations}