const environment = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[environment];
const MongoClient = require('mongodb').MongoClient;
const servidor = 'mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.name;

var connection = null;
var db = null;

function connect(callback) {
    if (connection) return callback(null, db);

    MongoClient.connect(servidor, (err, conn) => {
        if (err)
            return callback(err, null);
        else {
            connection = conn;
            db = conn.db(config.database.name);
            return callback(null, db);
        }
    })
}

function disconnect() {
    if (!connection) return true;
    connection.close();
    connection = null;
    return true;
}

module.exports = { connect, disconnect }