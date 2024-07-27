"use strict";
const { v4:uuid } = require('uuid');
const bcrypt = require('bcrypt');

var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../model/connection/model.connection');

async function registerAccount(request, response) {
    response.statusCode = 201;
        response.contentType = 'application/json';

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(`${request.body.password}`, salt);

        let duplicates = await AccountsDbPool_connection.query("SELECT * FROM accounts");
        const alreadyExistingAccount = duplicates[0].find((account) => { return account.first_name === request.body.first_name });

        try {
            if(alreadyExistingAccount || request.body.password.length < 5 || !request.body.email.includes('@gmail.com')) {
                global.setTimeout(() => {
                    response.status(400).json({ "message": "user account already exists or password length is not strong!" });
                }, 1000)
                return;
            } else {
                // register new api account
                await AccountsDbPool_connection.query(`INSERT INTO accounts VALUES(
                    ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)}, ${JSON.stringify(hashedPassword)})`);
                // register new api account history
                await AccountsDbPool_connection.query(`INSERT INTO accounts_history VALUES(
                    ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)}, ${JSON.stringify(hashedPassword)} )`);
                // register new api users
                await UsersDbPool_connection.query(`INSERT INTO users VALUES(
                    ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)} )`);
                // register new api users history
                await UsersDbPool_connection.query(`INSERT INTO users_history VALUES(
                    ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.first_name)}, ${JSON.stringify(request.body.last_name)}, ${JSON.stringify(request.body.email)} )`);
    
                global.setTimeout(() => {
                    response.json({"message": `Account ${request.body.first_name} ${request.body.last_name} has been registered!, now log into account to get token`})
                }, 1000);
            }
        } catch (error) {
            // console.log(error);
            global.setTimeout(() => {
                response.status(400).json({ "message": "user account already exists or password length is not strong!" });
            }, 1000)
        }
}

module.exports = registerAccount;