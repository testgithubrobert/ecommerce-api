const express = require('express');
const router = express.Router();
const controller = require('../../errors/404.error.controller');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../../model/connection/model.connection');

router.get('/', (request, response) => {
    response.send('yap bob')
});

// 404
router.use(controller.NotFound);
module.exports = router;