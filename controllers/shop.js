const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products,
      pageTitle: 'Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.getById(
    productId,
    (product) => {
      res.render('shop/product-detail', {
        product: product,
        path: '/products',
        pageTitle: product.title,
      });
    },
    next
  );
};

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res) => {
  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart' });
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};