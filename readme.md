This is a simple ecommerce API build with node.js and mainly you can access it through these routes

GET http://127.0.0.1:3000/ecomarket.com/api/users 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2Fyb2JlcnRzQGdtYWlsLmNvbSIsImlhdCI6MTcyMjA2NTg4OSwiZXhwIjoxNzIyMDY1OTA5fQ.nz3th6lRHouAX21N34c5oXDk_HbZUDu0qFB6_onEfns

#### get all registered users
GET http://127.0.0.1:3000/ecomarket.com/api/register
### go to register page
POST http://127.0.0.1:3000/ecomarket.com/api/register
Content-Type: application/json

{
    "first_name": "first name",
    "last_name": "last name",
    "email": "exampleRegisteredUserEmail@gmail.com",
    "password": "password"
}
### register an account
POST http://127.0.0.1:3000/ecomarket.com/api/login
Content-Type: application/json

{
    "email": "exampleRegisteredUserEmail@gmail.com",
    "password": "password"
} 
### log into an account
GET http://127.0.0.1:3000/ecomarket.com/api/about
### get about page or info
DELETE http://127.0.0.1:3000/ecomarket.com/api/products/machines/exampleProductToDelete
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2Fyb2JlcnRzQGdtYWlsLmNvbSIsImlhdCI6MTcyMjA2NTg4OSwiZXhwIjoxNzIyMDY1OTA5fQ.nz3th6lRHouAX21N34c5oXDk_HbZUDu0qFB6_onEfns

{
    "product": "product to delete"
} 
####  delete a single product
PUT http://127.0.0.1:3000/ecomarket.com/api/products/machines/exampleProductToUpdate
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2Fyb2JlcnRzQGdtYWlsLmNvbSIsImlhdCI6MTcyMjA2NTg4OSwiZXhwIjoxNzIyMDY1OTA5fQ.nz3th6lRHouAX21N34c5oXDk_HbZUDu0qFB6_onEfns

{
    "product_new_name": "exampleProductToUpdate",
    "new_cost": 00.00
} 
#### update a single product
GET http://127.0.0.1:3000/ecomarket.com/api/products
### fetch all available products
POST http://127.0.0.1:3000/ecomarket.com/api/payments
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2Fyb2JlcnRzQGdtYWlsLmNvbSIsImlhdCI6MTcyMjE1MTcyMCwiZXhwIjoxNzIyMTUxNzQwfQ.cf0mONTlxTdywW8B37EndecdLdpaN42U3nVQkhNi92w

{
    "customer": "exampleRegisteredUserEmail@gmail.com",
    "cart": "product to buy",
    "payment": 00.00
} 
### make payment for your product you would like to buy
POST http://127.0.0.1:3000/ecomarket.com/api/products/machines
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNzIyMDI5ODc4LCJleHAiOjE3MjIxMTYyNzh9.jVutAu9S4aMKTkE4CoEbtLBptX1zs8IRo2k6gCEDHVk

{
    "product_name": "product",
    "cost": 00.00
} 
#### add new products to the stock for machines
POST http://127.0.0.1:3000/ecomarket.com/api/products/foods
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNzIyMDI5ODc4LCJleHAiOjE3MjIxMTYyNzh9.jVutAu9S4aMKTkE4CoEbtLBptX1zs8IRo2k6gCEDHVk

{
    "product_name": "product",
    "cost": 00.00
} 
#### add new products to the stock for foods
POST http://127.0.0.1:3000/ecomarket.com/api/products/cloths
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNzIyMDI5ODc4LCJleHAiOjE3MjIxMTYyNzh9.jVutAu9S4aMKTkE4CoEbtLBptX1zs8IRo2k6gCEDHVk

{
    "product_name": "product",
    "cost": 00.00
} 
#### add new products to the stock for cloths
GET http://127.0.0.1:3000/ecomarket.com/api/products/cloths
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNzIyMDI5ODc4LCJleHAiOjE3MjIxMTYyNzh9.jVutAu9S4aMKTkE4CoEbtLBptX1zs8IRo2k6gCEDHVk

#### get products from the stock for cloths
GET http://127.0.0.1:3000/ecomarket.com/api/products/machines
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNzIyMDI5ODc4LCJleHAiOjE3MjIxMTYyNzh9.jVutAu9S4aMKTkE4CoEbtLBptX1zs8IRo2k6gCEDHVk

#### get products from the stock for machines
GET http://127.0.0.1:3000/ecomarket.com/api/products/foods
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNzIyMDI5ODc4LCJleHAiOjE3MjIxMTYyNzh9.jVutAu9S4aMKTkE4CoEbtLBptX1zs8IRo2k6gCEDHVk

#### get products from the stock for foods
