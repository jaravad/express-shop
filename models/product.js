const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }

  // A static method can be executed without creating an instance.
  static fetchAll() {
    return products;
  }
};
