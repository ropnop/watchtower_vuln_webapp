
function queryLocations(req, res) {
    const db = req.app.get('db');
    const city = req.body.city;
    const sql = `select * from locations where location like '${city}'`;
    console.log(sql);
    db.all(sql, (err, rows) => {
        if (err) {
            const message = `${err.message} -- BAD QUERY: ${sql}`
            res.render('locations', {error: message})
            return
        }
        const message = rows.length == 0 ? "No results!" : ""
        res.render('locations', {results: rows, error: message})
    })
}

function locationsPage(req, res) {
    res.render('locations');
}

module.exports = {locationsPage, queryLocations}