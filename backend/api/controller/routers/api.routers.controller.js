const express = require('express');
const router = express.Router();
const controller = require('../errors/404.error.controller');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection } = require('../../model/connection/model.connection');
 
router.route('/').get((request, response) => {
    response.statusCode = 201;
        response.contentType = 'application/json';
        if(request.accepts('application/json')) global.setTimeout(() => response.status(403).json({ "message": "Welcome to Eco Market", "message": "look for and shop any item of your choice like foods, accessories and cloths" }), 1000);
});

router.route('/welcome').get((request, response) => {
    response.statusCode = 201;
        response.contentType = 'application/json';
        if(request.accepts('application/json')) global.setTimeout(() => response.status(403).json({ "company": "Eco Market", "message": "Welcome to Eco Market, look for and shop any item of your choice like foods, accessories and cloths" }), 1000);
});

// api routers
router.use('/products', require('./handler/api.products.handler'));
router.use('/users', require('./handler/api.users.handler')); // no get request it should not have it
router.use('/payments', require('./handler/api.payments.handler')); // no get request it should not have it
// api user accounts authentication
router.use('/login', require('../../authentication/login/api.account.login'));
router.use('/register', require('../../authentication/register/api.account.register'));
// router.use('/logout', require('../../authentication/logout/api.account.logout'));

// 404
router.use(controller.NotFound);
module.exports = router;