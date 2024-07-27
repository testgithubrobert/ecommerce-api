const express = require('express');
const router = express.Router();
const controller = require('../../errors/404.error.controller');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../../model/connection/model.connection');

router.route('/').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

    const data = await UsersDbPool_connection.query("SELECT * FROM users");
    if(request.accepts('application/json')) global.setTimeout(() => response.status(200).json(data[0]), 1000);
});

// 404
router.use(controller.NotFound);
module.exports = router;