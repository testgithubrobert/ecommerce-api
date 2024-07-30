"use strict";
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').configDotenv();

function authorization(request, response, next) {
        try {
            const authorizationHeaders = request.headers['authorization'];
            var token = authorizationHeaders.split('')[1];
            if (!token || typeof token === 'undefined') {
                response.status(404).send("Token undefined!");
                return;
            }
            else {
                jwt.verify(token, process.env.secrete_key, (err, user) => {
                    request.user = user;
                    next();
                });
            }
        }
        catch (error) {
            response.status(401).json({ "message": "user unauthorized, login to get authentication token!" });
            // console.log(error);
        }
    };
    
module.exports = authorization;