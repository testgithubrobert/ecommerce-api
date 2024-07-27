"use strict";
var { UsersDbPool_connection, ProductsDbPool_connection, PaymentsDbPool_connection, AccountsDbPool_connection } = require('../../../model/connection/model.connection');
var { v4:uuid } = require('uuid');
const format = require('date-fns').format;

async function makeProductPayment(request, response) {
    response.statusCode = 201;
        response.contentType = 'application/json';

    var productsGroupOne = await ProductsDbPool_connection.query('SELECT * FROM food_products');
    var productsGroupTwo = await ProductsDbPool_connection.query('SELECT * FROM cloths_products');
    var productsGroupThree = await ProductsDbPool_connection.query('SELECT * FROM machines_products');

    const products = [ ...productsGroupOne[0], ...productsGroupTwo[0], ...productsGroupThree[0] ];
    const foundProduct = products.filter((product) => { return product.product_name === request.body.cart })

    const users = await UsersDbPool_connection.query("SELECT * FROM users");
    let foundCustomer = users[0].find((customer) => { return customer.email === request.body.customer });
    var paymentDate = JSON.stringify(format(new Date(), "dd/MM/yyyy\tHH:mm:ss"));

    if(!foundCustomer) {
            global.setTimeout(() => {
                response.status(404).json({ "message": `Customer "${request.body.customer}" not found, please register for account to shopping access!` })
            }, 1000);
    } else if(!foundProduct[0]){
            global.setTimeout(() => {
                response.status(404).json({ "message": `Product "${request.body.cart}" not available on market!` })
            }, 1000);
    } else if(request.body.payment < foundProduct[0].cost) {
            global.setTimeout(() => {
                response.status(400).json({ "message": `Provided amount does not equal to required amount for "${request.body.cart}"` });
            }, 1000);
    } else {
        // record payments made by customers
        await PaymentsDbPool_connection.query(`INSERT INTO payments VALUES(
            ${JSON.stringify(uuid())}, ${JSON.stringify(request.body.customer)}, ${request.body.cart.length}, ${request.body.payment}, 'cash', ${paymentDate}
        )`);
        // record payments receipts given customers
        await PaymentsDbPool_connection.query(`INSERT INTO payment_receipts VALUES(
            ${JSON.stringify(uuid())}, 'Eco Market', ${request.body.cart.length}, ${request.body.payment}, ${request.body.payment - foundProduct[0].cost}, 'cash', " ", ${paymentDate}, ${JSON.stringify(request.body.cart)}
        )`);

    global.setTimeout(() => response.json({ "uuid": uuid(),
            "shop": "Eco Market",
            "from": "Eco Market",
            "to": request.body.customer,
            "item/s": `${request.body.cart}`,
            "total_payment": `$${request.body.payment}`,
            "charge": `$${foundProduct[0].cost}`,
            "change": `$${request.body.payment - foundProduct[0].cost}`,
            "method": "cash",
            "paid": true,
            "credit": "",
            "date": paymentDate,
            "message": "Thank you for visiting Eco Market"
         }), 
        1000);
    }
}

module.exports = makeProductPayment;