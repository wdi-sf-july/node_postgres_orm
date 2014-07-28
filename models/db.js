var pg = require('pg');

var db = {};


db.config = {
  database: "social_app",
  host: "localhost",
  port: "5432"
}

db.connect = function(callback) {
  pg.connect(this.config, callback);
}

db.query = function(statement, params, callback) {
  this.connect(function(err, client, done){
      client.query(statement, params, callback);
    done();
  })
}

module.exports = db;


