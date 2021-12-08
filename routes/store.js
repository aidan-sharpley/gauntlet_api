'use strict'

const schemas = require('../lib/schemas')
const express = require('express')
const router = express.Router();

router.get('/inventory', (req, res) => {
    try {
        const storefront = global['storefrontData'];
        console.log('inv')
        console.log(storefront)
        res.status('200').send(storefront.storefrontData);
        
    } catch (error) {
        res.status(500).send(new schemas.error(error))
    }


})

module.exports = router;