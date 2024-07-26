"use strict";
const jwt = require('jsonwebtoken');
const configuration = require('../../model/config/configuration.json');

function authorization(request, response, next) {
        try {
            const refreshToken = jwt.sign(request.body, configuration.tokens.secrete_key, { expiresIn: '1d' });
            const authorizationHeaders = request.headers['authorization'];
            var token = authorizationHeaders.split('')[1];
            if (!token) {
                response.sendStatus(403);
                return;
            }
            else {
                jwt.verify(token, 'secrete-key', (err, user) => {
                    request.user = user;
                    next();
                });
            }
        }
        catch (error) {
            response.sendStatus(403);
            console.log(error);
        }
    };
module.exports = authorization;
