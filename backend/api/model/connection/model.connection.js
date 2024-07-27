const mysql = require('mysql');
const mysql2 = require('mysql2');
const configuration = require('../configurations/model.configuartion.json');

// pool connection to api users database
const UsersDbPool_connection = mysql2.createPool({
    user: "root",
    password: configuration[0].password,
    host: configuration[0].host,
    database: configuration[0].database
}).promise();

// pool connection to api products database
const ProductsDbPool_connection = mysql2.createPool({
    user: "root",
    password: configuration[1].password,
    host: configuration[1].host,
    database: configuration[1].database
}).promise();

// pool connection to api payments database
const PaymentsDbPool_connection = mysql2.createPool({
    user: "root",
    password: configuration[2].password,
    host: configuration[2].host,
    database: configuration[2].database
}).promise();

// pool connection to api accounts database
const AccountsDbPool_connection = mysql2.createPool({
    user: "root",
    password: configuration[3].password,
    host: configuration[3].host,
    database: configuration[3].database
}).promise();

module.exports = {
     UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection
    }