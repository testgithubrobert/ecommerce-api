"use strict";
const express = require('express');
const api = express();
const http = require('node:http');
const server = http.createServer(api);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let path = require('node:path');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
require('dotenv').configDotenv();

// middleware
const middleware = require('../api/controller/middleware/api.middleware.controller');
api.use(middleware.logs);
api.use(cookieParser());
api.use(bodyParser.json());
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(bodyParser.urlencoded({ extended: false }));
api.use(express.static(path.join(__dirname, '../../frontend/public')));
api.use(express.static(path.join(__dirname, '../../frontend/public/imgs')));
api.use(cors());
// io server
const io = require('socket.io')(server);
io.on("connection", (socket) => console.log(socket.id));

// api routers
api.use('/ecomarket.com/api', require('../api/controller/routers/api.routers.controller'));

// 404 controller
const controller = require('../api/controller/errors/404.error.controller');
api.use(controller.NotFound);

// server
(async function(){
    server.listen(process.env.port, process.env.host, () => {
        server.listening ? console.log('api server running!') : '';
    });
}())