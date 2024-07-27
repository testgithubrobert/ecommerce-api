"use strict";
const express = require('express');
const router = express.Router();
const controller = require('../../errors/404.error.controller');
const authentication = require('../../jwt/verify.jwt');
const makeProductPayment = require('../../modules/routers.handler/api.payments.handler.module');

router.route('/').get((request, response) => {
    response.statusCode = 200;
    response.contentType = 'application/json';

        if(request.accepts('application/json')) {
            global.setTimeout(() => {
                response.status(200).json({ "message": "Welcome to Eco Market cart payment page!" })
            }, 1000);
            return;
        } else return;
}).post(authentication, async (request, response) => {
    makeProductPayment(request, response)
});

// 404
router.use(controller.NotFound);
module.exports = router;