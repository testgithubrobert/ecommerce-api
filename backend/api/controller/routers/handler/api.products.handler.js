"use strict";
const express = require('express');
const router = express.Router();
const controller = require('../../errors/404.error.controller');
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../../model/connection/model.connection');
const { v4:uuid } = require('uuid');
const authentication = require('../../jwt/verify.jwt');


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
}).post(authentication, async (request, response) => {
    response.statusCode = 201;
        response.contentType = 'application/json';
        await ProductsDbPool_connection.query(`INSERT INTO food_products VALUES(${JSON.stringify(uuid())}, ${JSON.stringify(request.body.product_name)}, ${request.body.cost}, 'food', 'ok')`);
        global.setTimeout(() => response.json({"message": "product added for sale!"}), 1000);
});
// get single item
router.route('/foods/:name').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var product = await ProductsDbPool_connection.query(`SELECT * FROM food_products WHERE product_name = ${JSON.stringify(request.params.name)}`);
       
        if(product[0].length < 1) response.status(404).json({ "message": `No matching queries for "${request.params.name}" product was found!` });
        else global.setTimeout(() => response.json(product[0]), 1000); 
}).put(authentication, async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        try {
            var products = await ProductsDbPool_connection.query('SELECT * FROM food_products');
            const foundProduct = products[0].find((product) => { return product.product_name === request.params.name });
    
            foundProduct.product_name = request.body.product_new_name;
            foundProduct.cost = request.body.new_cost; 
    
            await ProductsDbPool_connection.query(`UPDATE food_products SET product_name = ${JSON.stringify(request.body.product_new_name)}, cost = ${request.body.new_cost} WHERE product_name = ${JSON.stringify(request.params.name)}`);
            
            global.setTimeout(() => {
                response.json({ "message": `product ${request.params.name} has been updated to ${request.body.product_new_name} and price to ${request.body.new_cost}` })
            }, 1000);
          } catch (error) {
               global.setTimeout(() => {
                response.status(404).json({ "message": `No such product "${request.params.name}" was found!` })
            }, 1000);
          }
}).delete(authentication, async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        await ProductsDbPool_connection.query(`DELETE FROM food_products WHERE product_name = ${JSON.stringify(request.params.name)}`);
        global.setTimeout(() => response.json({ "message": `product ${request.params.name} has been deleted` }), 1000);
});



// route products group 2
router.route('/cloths').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var products = await ProductsDbPool_connection.query('SELECT * FROM cloths_products');
        global.setTimeout(() => response.json(products[0]), 1000);
}).post(authentication, async (request, response) => {
    response.statusCode = 201;
        response.contentType = 'application/json';
        await ProductsDbPool_connection.query(`INSERT INTO cloths_products VALUES(${JSON.stringify(uuid())}, ${JSON.stringify(request.body.product_name)}, ${request.body.cost}, 'cloths', 'ok')`);
        global.setTimeout(() => response.json({"message": "product added for sale!"}), 1000);
})
// get single item
router.route('/cloths/:name').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var product = await ProductsDbPool_connection.query(`SELECT * FROM cloths_products WHERE product_name = ${JSON.stringify(request.params.name)}`);
        
        if(product[0].length < 1) response.status(404).json({ "message": `No matching queries for "${request.params.name}" product was found!` });
        else global.setTimeout(() => response.json(product[0]), 1000);
}).put(authentication, async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

       try {
         var products = await ProductsDbPool_connection.query('SELECT * FROM cloths_products');
         const foundProduct = products[0].find((product) => { return product.product_name === request.params.name });
 
         foundProduct.product_name = request.body.product_new_name;
         foundProduct.cost = request.body.new_cost; 
 
         await ProductsDbPool_connection.query(`UPDATE cloths_products SET product_name = ${JSON.stringify(request.body.product_new_name)}, cost = ${request.body.new_cost} WHERE product_name = ${JSON.stringify(request.params.name)}`);
         
         global.setTimeout(() => {
            response.json({ "message": `product ${request.params.name} has been updated to ${request.body.product_new_name} and price to ${request.body.new_cost}` })
        }, 1000);
       } catch (error) {
            global.setTimeout(() => response.status(404).json({ "message": `No such product "${request.params.name}" was found!` }), 1000);
       }
}).delete(authentication, async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        await ProductsDbPool_connection.query(`DELETE FROM cloths_products WHERE product_name = ${JSON.stringify(request.params.name)}`);
        global.setTimeout(() => response.json({ "message": `product ${request.params.name} has been deleted` }), 1000);
});



// route products group 3
router.route('/machines').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var products = await ProductsDbPool_connection.query('SELECT * FROM machines_products');
        global.setTimeout(() => response.json(products[0]), 1000);
}).post(authentication, async (request, response) => {
    response.statusCode = 201;
        response.contentType = 'application/json';
        await ProductsDbPool_connection.query(`INSERT INTO machines_products VALUES(${JSON.stringify(uuid())}, ${JSON.stringify(request.body.product_name)}, ${request.body.cost}, 'machines', 'ok')`);
        global.setTimeout(() => response.json({"message": "product added for sale!"}), 1000);
})
// get single item
router.route('/machines/:name').get(async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        var product = await ProductsDbPool_connection.query(`SELECT * FROM machines_products WHERE product_name = ${JSON.stringify(request.params.name)}`);

        if(product[0].length < 1) response.status(404).json({ "message": `No matching queries for "${request.params.name}" product was found!` });
        else global.setTimeout(() => response.json(product[0]), 1000);
}).put(authentication, async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        try {
            var products = await ProductsDbPool_connection.query('SELECT * FROM machines_products');
            const foundProduct = products[0].find((product) => { return product.product_name === request.params.name });
    
            foundProduct.product_name = request.body.product_new_name;
            foundProduct.cost = request.body.new_cost; 
    
            await ProductsDbPool_connection.query(`UPDATE machines_products SET product_name = ${JSON.stringify(request.body.product_new_name)}, cost = ${request.body.new_cost} WHERE product_name = ${JSON.stringify(request.params.name)}`);
            
            global.setTimeout(() => {
                response.json({ "message": `product ${request.params.name} has been updated to ${request.body.product_new_name} and price to ${request.body.new_cost}` })
            }, 1000);
          } catch (error) {
               global.setTimeout(() => response.status(404).json({ "message": `No such product "${request.params.name}" was found!` }), 1000);
          }
}).delete(authentication, async (request, response) => {
    response.statusCode = 200;
        response.contentType = 'application/json';

        await ProductsDbPool_connection.query(`DELETE FROM machines_products WHERE product_name = ${JSON.stringify(request.params.name)}`);
        global.setTimeout(() => response.json({ "message": `product ${request.params.name} has been deleted` }), 1000);
});

// 404
router.use(controller.NotFound);
module.exports = router;