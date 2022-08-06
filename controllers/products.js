const Product = require('../models/product');

const products = [];

exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

/**
 * Send a callback to render the template as soon as the
 * asynchronous file reading in fetchAll finishes.
 */
exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop', {
      products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};
