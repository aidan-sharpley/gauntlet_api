'use strict'

const express = require('express')
const router = express.Router();
const storefront = global.storefrontData;

router.get('/:productId', (req, res) => {
    console.log('prod')
    console.log(storefront)

})

module.exports = router;