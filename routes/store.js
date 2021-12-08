'use strict';

const schemas = require('../lib/schemas');
const express = require('express');
const router = express.Router();

router.get('/inventory', (req, res) => {
  const storefrontData = global['sellerData']['storefrontData'];
  res.status('200').send(storefrontData);
});

module.exports = router;
