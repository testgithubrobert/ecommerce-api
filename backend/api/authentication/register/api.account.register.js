"use strict";
const express = require('express');
const router = express.Router();
const controller = require('../../../api/controller/errors/404.error.controller');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../model/connection/model.connection');
const registerAccount = require('../modules/module.register');
const bcrypt = require('bcrypt');
const authentication = require('../../controller/jwt/verify.jwt')

router.route('/')
    .get((request, response) => {
        response.statusCode = 200;
        response.contentType = 'application/json';

        if(request.accepts('application/json')) global.setTimeout(() => response.status(200).json({ "message": "Welcome to Eco Market register new account page!" }), 1000);
    })
    .post(async (request, response) => {
        registerAccount(request, response);
    })
    .delete(authentication, async (request, response) => {
        response.statusCode = 200;
            response.contentType = 'application/json';

        let registeredAccounts = await AccountsDbPool_connection.query("SELECT * FROM accounts");
        const foundAccount = registeredAccounts[0].find((account) => { return account.email === request.body.email });
        var passwordMatch = bcrypt.compare(`${request.body.password}`, foundAccount.password);

        passwordMatch === false ? (async function(){ response.status(403).json({ "message": "provided credentials do not match any account query!" }) }()) : (async function(){ 
            await AccountsDbPool_connection.query(`DELETE FROM accounts WHERE email = ${foundAccount.email}`)
            response.status(200).json({ "message": `account ${foundAccount.first_name} ${foundAccount.last_name} has been deleted!` });
        }());
    });

// 404
router.use(controller.NotFound);
module.exports = router;