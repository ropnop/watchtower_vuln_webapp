const sqlite3 = require('sqlite3').verbose();
const identities = require('../data/identities');
const path = require('path');

const dbFile = path.resolve(__dirname, '../data/watchtower.db');

const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READONLY, err => {
    if (err) {
        console.error(err);
        throw err
    }
    console.log(`Connected to ${dbFile}`)
});

const seedDB = () => {
    db.serialize(() => {
        const insertIdentity = 'INSERT INTO identities VALUES(?,?)';
        const insertLocation = 'INSERT INTO locations VALUES(?,?)';
        db.run('CREATE TABLE IF NOT EXISTS "identities" ("superhero" TEXT, "real_name" TEXT);');
        db.run('CREATE TABLE IF NOT EXISTS "locations" ("superhero" TEXT, "location" TEXT);');
        
        identities.forEach((entry) => {
            db.run(insertIdentity, [entry.name, entry.realName]);
            db.run(insertLocation, [entry.name, entry.location]);
        });
        console.log("DB seeded");
    });
}

module.exports = db
