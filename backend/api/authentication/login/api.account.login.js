const express = require('express');
const router = express.Router();
const controller = require('../../../api/controller/errors/404.error.controller');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../model/connection/model.connection');
const logintoAccount = require('../modules/module.login');

router.route('/')
    .get((request, response) => {
        response.statusCode = 200;
        response.contentType = 'application/json';

        if(request.accepts('application/json')) global.setTimeout(() => response.status(200).json({ "message": "Welcome to Eco Market login page!" }), 1000);
    })
    .post(async (request, response) => {
        logintoAccount(request, response);
    })

// 404
router.use(controller.NotFound);
module.exports = router;