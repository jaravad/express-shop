const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res) => {
  const products = adminData.products;
  res.render('shop', { products, pageTitle: 'Shop', path: '/' });
});

module.exports = router;
