const express = require('express');
const router = express.Router();
const controller = require('../../errors/404.error.controller');
const authentication = require('../../jwt/verify.jwt');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../../model/connection/model.connection');

(async function(){
    router.route('/').get(authentication, async (request, response) => {
        response.statusCode = 200;
            response.contentType = 'application/json';
    
        const data = await UsersDbPool_connection.query("SELECT * FROM users");
        if(data[0].length < 1 && request) {
            global.setTimeout(() => response.status(200).json({ "message": "No registered users available at the moment!" }), 1000);
        } else {
            global.setTimeout(() => response.status(200).json(data[0]), 1000);
        }
    });
    
    // 404
    router.use(controller.NotFound);
}());

module.exports = router;