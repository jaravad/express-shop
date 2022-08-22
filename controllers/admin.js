const Product = require('../models/product');

exports.getAdminProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        products,
        pageTitle: 'Admin products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
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
  Product.create({
    title,
    price,
    imageUrl,
    description,
  })
    .then(() => {
      console.log('Product created');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit === 'true';
    if (!editMode) {
      return res.redirect('/');
    }
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit product',
      path: '/admin/edit-product',
      editing: editMode,
      product,
    });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.postEditProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const {
      title: updatedTitle,
      price: updatedPrice,
      imageUrl: updatedImageUrl,
      description: updatedDescription,
    } = req.body;
    const product = await Product.findByPk(productId);
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDescription;
    await product.save();
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.deleteById(productId);
  res.redirect('/admin/products');
};
