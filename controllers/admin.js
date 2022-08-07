const Product = require('../models/product');

exports.getAdminProducts = (req, res) => {
  res.render('admin/products', {
    pageTitle: 'Admin products',
    path: '/admin/products',
  });
};

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};
