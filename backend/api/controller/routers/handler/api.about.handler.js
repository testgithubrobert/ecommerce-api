"use strict";
const express = require('express');
const router = express.Router();
const controller = require('../../errors/404.error.controller');
const aboutInfor = require('../../../model/bin/about.json');

(async function(){
    router.get('/', async (request, response) => {
        response.statusCode = 200;
            response.contentType = 'application/json';
    
        request || request.headers ? (async function(){
            global.setTimeout(() => response.json(aboutInfor), 1000);
            return;
        }()) : (async function(){ return }());
    });
}());

// 404
router.use(controller.NotFound);
module.exports = router;