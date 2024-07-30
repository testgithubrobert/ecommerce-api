"use strict";
const express = require('express');
const router = express.Router();
const controller = require('../errors/404.error.controller');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection } = require('../../model/connection/model.connection');
 
(async function(){
    router.route('/').get((request, response) => {
        response.statusCode = 200;
            response.contentType = 'application/json';
            if(request.accepts('application/json') || request.headers) {
                global.setTimeout(() => {
                    response.status(200).json({ "message": "Welcome to Eco Market", "message": "look for and shop any item of your choice like foods, accessories and cloths" })
                }, 1000);
                return;
            } else return;
    });
}());

(async function(){
    router.route('/welcome').get((request, response) => {
        response.statusCode = 200;
            response.contentType = 'application/json';
            if(request.accepts('application/json') || request.headers) {
                global.setTimeout(() => {
                    response.status(200).json({ "company": "Eco Market", "message": "Welcome to Eco Market, look for and shop any item of your choice like foods, accessories and cloths" })
                }, 1000);
                return;
            } else return;
    });
}());

(async function(){
    // api resource routers
    router.use('/products', require('./handler/api.products.handler'));
    router.use('/users', require('./handler/api.users.handler'));
    router.use('/payments', require('./handler/api.payments.handler'));
    // api user accounts authentication routers
    router.use('/login', require('../../authentication/login/api.account.login'));
    router.use('/register', require('../../authentication/register/api.account.register'));
    // about api information router
    router.use('/about', require('./handler/api.about.handler'));
    // router.use('/logout', require('../../authentication/logout/api.account.logout'));
}());

// 404
router.use(controller.NotFound);
module.exports = router;