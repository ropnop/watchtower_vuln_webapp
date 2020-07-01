const cors = require('cors');

var corsOptions = {
    origin: function (origin, callback) {
        callback(null, true)
    },
    credentials: true
}

const badCors = cors(corsOptions);
module.exports = badCors