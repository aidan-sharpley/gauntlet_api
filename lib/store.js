'use strict';
const util = require('./util');
const schemas = require('./schemas');

class store {
  constructor(vendorApiUrl) {
    this.productData = null;
    this.storefrontData = null;
    this.vendorApiUrl = vendorApiUrl;
  }

  loadStoreData = () => {
    return new Promise(async(resolve, reject) => {
      try {
        // Pull product data from vendor API url
        const vendorData = await util.pullProductData(this.vendorApiUrl);

        // Translate vendor data into required output
        this.productData = await util.parseProductData(vendorData);

        // Use product data to get inventory information for storefront
        this.storefrontData = [];
        for (const [_key, product] of Object.entries(this.productData)) {
          // Iterate thru variants and create inventory information
          product.variants.forEach((variant) => {
            this.storefrontData.push(
              new schemas.inventory(
                product.code,
                variant.id,
                variant.inventory_quantity
              )
            );
          });
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

exports.createStore = store;
