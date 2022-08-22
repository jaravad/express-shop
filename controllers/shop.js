const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/product-list', {
        products: rows,
        pageTitle: 'Products',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
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
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/index', {
        products: rows,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProduct = cart.products.find((p) => p.id === product.id);
        if (cartProduct) {
          cartProducts.push({
            ...product,
            quantity: cartProduct.quantity,
          });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res) => {
  const { productId } = req.body;
  Product.getById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });

  res.redirect('/cart');
};

exports.postCartDelete = (req, res, next) => {
  const { productId } = req.body;
  Product.getById(
    productId,
    (p) => {
      Cart.deleteProduct(productId, p.price);
      res.redirect('/cart');
    },
    next
  );
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
