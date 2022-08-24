const Product = require('../models/product');
const Order = require('../models/order');

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

exports.getCart = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts();
    res.render('shop/cart', {
      pageTitle: 'Cart',
      path: '/cart',
      products: cartProducts,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await req.user.getCart();
    let [product] = await cart.getProducts({ where: { id: productId } });
    let newQuantity = 1;
    if (product) {
      newQuantity = product.cartItem.quantity + 1;
      await cart.addProduct(product, { through: { quantity: newQuantity } });
      return res.redirect('/cart');
    }
    product = await Product.findByPk(productId);
    await cart.addProduct(product, {
      through: { quantity: newQuantity },
    });
    res.redirect('/cart');
  } catch (err) {
    console.log(err);
  }
};

exports.postCartDelete = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await req.user.getCart();
    const [product] = await cart.getProducts({ where: { id: productId } });
    await product.cartItem.destroy();
    res.redirect('/cart');
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};

exports.postOrder = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts();
    const order = await req.user.createOrder();
    await order.addProducts(
      cartProducts.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );
    await cart.setProducts(null);
    res.redirect('/orders');
  } catch (err) {
    console.log(err);
  }
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
