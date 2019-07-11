// Set up MySQL connection.

var dotenv = require('dotenv');

dotenv.config();
var mysql = require("mysql");

var {eecb8depiutirrpi, bbimlosqklggogzv,t3wtg0a5l3raibza} = process.env;

var config = {
  port: 3306,
  host: 'wiad5ra41q8129zn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user:'eecb8depiutirrpi',
  password: 'bbimlosqklggogzv',
  database: 't3wtg0a5l3raibza'
};

var connection;
var host;

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
  host = 'JAWSDB';
} else {
  connection = mysql.createConnection(config);
  host = 'wiad5ra41q8129zn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
}

connection.connect(function(err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  } else {
    console.log('connected with ' + host);
  }
});
// Export connection for our ORM to use.
module.exports = connection;
