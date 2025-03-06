const express = require("express");
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

function getProducts() {
  return products;
}

function getProductsById(id) {
  return products.find((product) => product.id === id);
}

function addProduct(product) {
  products.push(product);
  return product;
}

app.get("/products", (req, res) => {
  res.json(getProducts());
});

app.get("/products/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let product = getProductsById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("product not found");
  }
});

app.post("/products/new", (req, res) => {
  let productdetails = req.body;
  let newProduct = addProduct(productdetails);
  res.status(200).json(newProduct);
});

module.exports = { app, getProducts, getProductsById, addProduct };
