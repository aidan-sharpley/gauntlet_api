// app.js
// @author aidan sharpley
'use strict';
const express = require('express');
const util = require('./lib/util');
const storeFactory = require('./lib/store');


// Routes
const productsRouter = require('./routes/products');
const storeRouter = require('./routes/store');


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

// Pull vendor data and translate to storefront data. We could potentially pass in a list of urls
// representing distinct product APIs using process.env or pointing to
// a config file with the urls. The ids for each product would need to be unique
// when combining multiple product APIs.
const storefrontData = new storeFactory.createStore('http://my-json-server.typicode.com/convictional/engineering-interview-api/products')
await storefrontData.loadStoreData();
global.storefrontData = storefrontData;

// Config API routes
app.use('/products', productsRouter);
app.use('/store', storeRouter);
}

main();