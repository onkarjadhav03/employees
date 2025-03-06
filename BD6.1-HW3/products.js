let products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

function getProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addNewProduct(product) {
  let newProduct = {
    id: products.length + 1,
    name: "Tablet",
    category: "Electronics",
  };
  products.push(newProduct);

  return newProduct;
}

module.exports = { getProducts, getProductById, addNewProduct };
