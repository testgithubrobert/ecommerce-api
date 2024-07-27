"use strict";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').configDotenv();
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../model/connection/model.connection');
const { v4:uuid } = require('uuid');

async function logintoAccount(request, response) {
    response.statusCode = 200;
        response.contentType = 'application/json';

        let registeredAccounts = await AccountsDbPool_connection.query("SELECT * FROM accounts");
        const foundAccount = registeredAccounts[0].find((account) => { return account.email === request.body.email });
        var passwordMatch = await bcrypt.compare(`${request.body.password}`, foundAccount.password);
        var token = jwt.sign({ email: request.body.email }, process.env.secrete_key, { expiresIn: '10s' });

        await AccountsDbPool_connection.query(`INSERT INTO loggedin_users VALUES (${JSON.stringify(uuid())}, ${JSON.stringify(request.body.email)})`)
        passwordMatch === false ? (async function(){ response.status(403).json({ "message": "provided credentials do not match any account query!" }) }()) : (async function(){ 
            response.status(200).json({ "message": `Logged into account ${foundAccount.first_name} ${foundAccount.last_name} successfully!`, "token": JSON.stringify(token)});
        }());
}

module.exports = logintoAccount;