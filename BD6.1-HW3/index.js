let { getProducts, getProductById, addNewProduct } = require("./products");
let express = require("express");
let app = express();
let port = 3000;

app.use(express.json());

app.get("/products", (req, res) => {
  res.json(getProducts());
});

app.get("/products/:id", (req, res) => {
  let product = getProductById(parseInt(req.params.id));
  if (!product) return res.status(404).send("product not found");
  res.json(product);
});

app.post("/products/new", (req, res) => {
  let product = addNewProduct(req.body);
  res.status(201).json(product);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
