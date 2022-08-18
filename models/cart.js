const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch previous cart if any
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      // Add new product / increase quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProducts(productId, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const currentCart = JSON.parse(fileContent);
      const updatedCart = { ...currentCart };
      const product = updatedCart.products.find((p) => p.id === productId);
      const productQuantity = product.quantity;
      updatedCart.products = updatedCart.products.filter(
        (p) => p.id !== productId
      );
      updatedCart.totalPrice -= productPrice * productQuantity;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
