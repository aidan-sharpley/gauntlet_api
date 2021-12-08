'use strict';
const http = require('http');
const { urlToHttpOptions } = require('url');
const schemas = require('./schemas')

async function pullProductData(url) {
  if (url) {
    return new Promise((resolve, reject) => {
      // Call the API
      const httpOptions = urlToHttpOptions(new URL(url));
      http.get(httpOptions, (res) => {
        // Build the response
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          responseData.length > 0
            ? resolve(responseData)
            : reject(`Failed to pull data from ${url} ...`);
        });
      });
    });
  } else {
    throw Error('Must provide url to pull data.');
  }
}

async function parseProductData(productData) {
  return new Promise((resolve, reject) => {
    if (productData) {
        let storefrontData = {};
      // Iterate through vendor product data and build out storefront
      JSON.parse(productData).forEach((data) => {
        try {
            let _product = new schemas.product(data);
            storefrontData[_product.code] = _product;
        } catch (error) {
            console.error(`Failed unexpectedly on ${data}, ${error}`)
        }
      });

      resolve(storefrontData);
    } else {
      reject('Must provide product data to be parsed.');
    }
  });
}

exports.parseProductData = parseProductData;
exports.pullProductData = pullProductData;
