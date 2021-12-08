'use strict';

const schemas = require('../lib/schemas');
const express = require('express');
const router = express.Router();

router.get('/:productId?', (req, res) => {
  // Get product data
  const sellerData = global['sellerData']['productData'];

  // Check if querying for specific product
  if (req.params && req.params.productId) {
    // Handle success/error responses
    if (isNaN(req.params.productId)) {
      res.status(400).send(new schemas.error('Invalid ID supplied'));
    } else if (sellerData[req.params.productId] == undefined) {
      res.status(404).send(new schemas.error('Product not found'));
    } else {
      res.status(200).send(sellerData[req.params.productId]);
    }
  } else {
    // Serve all products
    let productRollup = [];
    for (const [_key, product] of Object.entries(sellerData)) {
      productRollup.push(product);
    }
    // Contract doesn't seem to make sense on this, but return 404 if no products
    productRollup.length > 0
      ? res.status('200').send(productRollup)
      : res.status('404').send(new schemas.error('Product not found'));
  }
});

module.exports = router;
