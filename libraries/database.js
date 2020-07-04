const sqlite3 = require('sqlite3');
const identities = require('../data/identities');

function initDB() {
    let db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            console.error(err.message)
            throw err
        } else {
            console.log('Conencted to in memory db');
        }
    });


    db.serialize(() => {
        db.run('PRAGMA foreign_keys=OFF;');
        db.run('BEGIN TRANSACTION;');
        db.run('CREATE TABLE IF NOT EXISTS "identities" ("superhero" TEXT, "real_name" TEXT);')
        db.run('CREATE TABLE IF NOT EXISTS "locations" ("superhero" TEXT, "location" TEXT);')
        const insertIdentity = 'INSERT INTO identities VALUES(?,?)';
        const insertLocation = 'INSERT INTO locations VALUES(?,?)';
        identities.forEach((entry) => {
            db.run(insertIdentity, [entry.name, entry.realName]);
            db.run(insertLocation, [entry.name, entry.location]);
        });
        console.log("DB seeded");
    });

    return db;
}

module.exports = initDB
