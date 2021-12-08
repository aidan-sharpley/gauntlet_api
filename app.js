// app.js
// @author aidan sharpley
'use strict';

const express = require('express')
const util = require('./lib/util')

const main = async() => {
    // Init web server
const app = express();
app.listen(8080);

// Error Handler
app.use((err, req, res, next) => {
    const resMsg = `Uncaught API error, ${err}`
  console.error(resMsg);
  res.status(500).send(resMsg);
});

// Populate product data. We could potentially read in a list of urls
// representing distinct product APIs using process.env or pointing to
// a config file with the urls. The ids for each product would need to be unique
// when combining multiple product APIs.
let productData;
try {
    productData = await util.pullProductData('http://my-json-server.typicode.com/convictional/engineering-interview-api/products')    
} catch (error) {
    console.error(error)
}

// Validate product data and transform to required output
let storefrontData;
try {
    storefrontData = await util.parseProductData(productData)    
} catch (error) {
    console.error(error)
}

console.log(storefrontData)

// Init routes
const router = express.Router();

}

main();