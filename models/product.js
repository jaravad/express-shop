const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) =>
          console.error(err)
        );
      } else {
        this.id = uuidv4();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => console.error(err));
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static getById(id, callback, errorCallback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      product ? callback(product) : errorCallback();
    });
  }
};
