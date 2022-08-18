const Product = require('../models/product');

exports.getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products,
      pageTitle: 'Admin products',
      path: '/admin/products',
    });
  });
};

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(
    null,
    title,
    imageUrl,
    description,
    parseFloat(price)
  );
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === 'true';
  if (!editMode) {
    return res.redirect('/');
  }
  const { productId } = req.params;
  Product.getById(
    productId,
    (product) => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit product',
        path: '/admin/edit-product',
        editing: editMode,
        product,
      });
    },
    next
  );
};

exports.postEditProduct = (req, res) => {
  const { productId } = req.body;
  const {
    title: updatedTitle,
    price: updatedPrice,
    imageUrl: updatedImageUrl,
    description: updatedDescription,
  } = req.body;
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    parseFloat(updatedPrice)
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.deleteById(productId);
  res.redirect('/admin/products');
};
