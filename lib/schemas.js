'use strict';

class inventory {
  constructor(pId, vId, stock) {
    this.productId = pId;
    this.variantId = vId;
    this.stock = stock;
  }
}

class product {
  constructor(vendorProduct) {
    this.code = vendorProduct.id;
    this.title = vendorProduct.title;
    this.vendor = vendorProduct.vendor;
    this.bodyHtml = vendorProduct.body_html;

    // Create product variant and populate product images from variants
    this.variants = [];
    this.images = [];
    vendorProduct.variants.forEach((vendorVariant) => {
      try {
        this.variants.push(new variant(vendorVariant));
      } catch (error) {
        console.error(`Failed to create variant: ${vendorVariant}`);
      }

      if (vendorVariant.images !== undefined && vendorVariant.images.length > 0)
        vendorVariant.images.forEach((img) => {
          try {
            this.images.push(new image(img.src, vendorVariant.id));
          } catch (error) {
            console.error(`Failed to create image: ${vendorVariant}`);
          }
        });
    });
  }
}

class variant {
  constructor(vendorVariant) {
    this.id = vendorVariant.id;
    this.title = vendorVariant.title;
    this.sku = vendorVariant.sku;

    this.available =
      vendorVariant.inventory !== undefined && vendorVariant.inventory > 0
        ? true
        : false;

    this.inventory_quantity =
      vendorVariant.inventory !== undefined && !isNaN(vendorVariant.inventory)
        ? vendorVariant.inventory
        : 0;

    this.weight = new weight(vendorVariant.weight, vendorVariant.weight_unit);
  }
}

class weight {
  constructor(val, unitOfMeasure) {
    this.value = val;
    this.unit = unitOfMeasure;
  }
}

class image {
  constructor(src, variantId) {
    this.source = src;
    this.variantId = variantId;
  }
}

class error {
  constructor(msg) {
    this.message = msg;
  }
}

exports.product = product;
exports.inventory = inventory;
exports.error = error;