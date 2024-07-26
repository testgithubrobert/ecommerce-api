const express = require('express');
const router = express.Router();
const controller = require('../../errors/404.error.controller');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../../model/connection/model.connection');
const { v4:uuid } = require('uuid');


// route all products
router.get('/', async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var productsGroupOne = await ProductsDbPool_connection.query('SELECT * FROM food_products');
        var productsGroupTwo = await ProductsDbPool_connection.query('SELECT * FROM cloths_products');
        var productsGroupThree = await ProductsDbPool_connection.query('SELECT * FROM machines_products');

        const products = [ ...productsGroupOne[0], ...productsGroupTwo[0], ...productsGroupThree[0] ]
        global.setTimeout(() => response.json(products), 1000);
});


// route products group 1
router.route('/foods').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var products = await ProductsDbPool_connection.query('SELECT * FROM food_products');
        global.setTimeout(() => response.json(products[0]), 1000);
}).post(async (request, response) => {
    response.statusCode = 201;
        response.contentType = 'application/json';
        await ProductsDbPool_connection.query(`INSERT INTO food_products VALUES(${JSON.stringify(uuid())}, ${JSON.stringify(request.body.product_name)}, ${request.body.cost}, 'food', 'ok')`);
        global.setTimeout(() => response.json({"message": "product added for sale!"}), 1000);
});
// get single item
router.get('/foods:name', async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var products = await ProductsDbPool_connection.query('SELECT * FROM food_products');
        global.setTimeout(() => response.json(products[0].filter((product) => { return product.product_name === request.params.name })), 1000);
});


// route products group 2
router.route('/cloths').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var products = await ProductsDbPool_connection.query('SELECT * FROM cloths_products');
        global.setTimeout(() => response.json(products[0]), 1000);
}).post(async (request, response) => {
    response.statusCode = 201;
        response.contentType = 'application/json';
        await ProductsDbPool_connection.query(`INSERT INTO cloths_products VALUES(${JSON.stringify(uuid())}, ${JSON.stringify(request.body.product_name)}, ${request.body.cost}, 'cloths', 'ok')`);
        global.setTimeout(() => response.json({"message": "product added for sale!"}), 1000);
})
// get single item
router.get('/cloths:name', async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var products = await ProductsDbPool_connection.query('SELECT * FROM cloths_products');
        global.setTimeout(() => response.json(products[0].filter((product) => { return product.product_name === request.params.name })), 1000);
});


// route products group 3
router.route('/machines').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var products = await ProductsDbPool_connection.query('SELECT * FROM machines_products');
        global.setTimeout(() => response.json(products[0]), 1000);
}).post(async (request, response) => {
    response.statusCode = 201;
        response.contentType = 'application/json';
        await ProductsDbPool_connection.query(`INSERT INTO machines_products VALUES(${JSON.stringify(uuid())}, ${JSON.stringify(request.body.product_name)}, ${request.body.cost}, 'machines', 'ok')`);
        global.setTimeout(() => response.json({"message": "product added for sale!"}), 1000);
})
// get single item
router.get('/machines:name', async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var products = await ProductsDbPool_connection.query('SELECT * FROM machines_products');
        const foundProduct = products[0].find((product) => { return product.product_name === request.params.name });
        global.setTimeout(() => response.json(foundProduct), 1000);
});

// 404
router.use(controller.NotFound);
module.exports = router;