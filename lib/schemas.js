'use strict';

// class BaseProduct {
//     constructor(vendorProduct) {
//         this.title = vendorProduct.title;

//     }
// }

class product {
  constructor(vendorProduct) {
    this.code = vendorProduct.id;
    this.title = vendorProduct.title;
    this.vendor = vendorProduct.vendor;
    this.bodyHtml = vendorProduct.body_html;

    // Create product variant and populate images
    this.variants = [];
    vendorProduct.variants.forEach((vendorVariant) => {
      try {
        this.variants.push(new variant(vendorVariant));
      } catch (error) {
        console.error(`Failed to create variant: ${vendorVariant}`);
      }

      this.images = [];
      if (vendorVariant.images !== undefined && vendorVariant.images.length > 0)
        vendorVariant.images.forEach((img) => {
          try {
            this.images.push(new image(img.src, vendorVariant.id));
          } catch (error) {
            console.error(`Failed to create image: ${vendorVariant}`);
          }
        });
    });

    console.log(this.variants);
    console.log(this.images);
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

exports.product = product;
