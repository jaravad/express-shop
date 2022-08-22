const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        products,
        pageTitle: 'Products',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findByPk(productId)
    .then((product) => {
      res.render('shop/product-detail', {
        product,
        path: '/products',
        pageTitle: product.title,
      });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
  /** Other way to find a product with findAll:
   * - findAll always returns an array, even if the result is only one element
   *
   * Product.findAll({where: {id: productId}})
   * .then(products => console.log(products[0]))
   *  */
};

exports.getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        products,
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
