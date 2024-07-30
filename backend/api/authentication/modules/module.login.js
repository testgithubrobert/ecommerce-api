"use strict";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').configDotenv();
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../model/connection/model.connection');
const { v4:uuid } = require('uuid');
const format = require('date-fns').format;
var date = JSON.stringify(format(new Date(), "dd/MM/yyyy\tHH:mm:ss"));

async function logintoAccount(request, response) {
    response.statusCode = 200;
        response.contentType = 'application/json';

    (async function(){
        let registeredAccounts = await AccountsDbPool_connection.query("SELECT * FROM accounts");
        const foundAccount = registeredAccounts[0].find((account) => { return account.email === request.body.email });
        
        try {
            var passwordMatch = await bcrypt.compare(`${request.body.password}`, foundAccount.password);
            var accessToken = jwt.sign({ email: request.body.email }, process.env.access_token_secrete_key, { expiresIn: "10h" });
            var refreshToken = jwt.sign({ email: request.body.email }, process.env.refresh_token_secrete_key, { expiresIn: "2 days" });
    
            await AccountsDbPool_connection.query(`INSERT INTO loggedin_users VALUES (${JSON.stringify(uuid())}, ${JSON.stringify(request.body.email)}, ${date})`)
            passwordMatch === false || foundAccount.email !== request.body.email || !request.body.email.includes("@gmail.com") ? 
                (async function(){ response.status(401).json({ "message": "provided credentials do not match any account query!" }) }())
                    : (async function(){ 
                        response.status(200).json({
                            "message": `Logged into account ${foundAccount.first_name} ${foundAccount.last_name} successfully!`, "access token": JSON.stringify(accessToken), "date": date
                        });
            }());
        } catch (error) {
            global.setTimeout(() => {
                response.status(401).json({ "message": `provided credentials do not match any account query!` })
            }, 1000);
        }
    }());
}

module.exports = logintoAccount;