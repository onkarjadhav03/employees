let { getBooks, getBookById, addBook } = require("./book");
let express = require("express");
let app = express();
let port = 3000;

app.use(express.json());

app.get("/api/books", (req, res) => {
  res.json(getBooks());
});

app.get("/api/books/:id", (req, res) => {
  let book = getBookById(parseInt(req.params.id));
  if (!book) return res.status(404).send("Books not found");
  res.json(book);
});

app.post("/api/books", (req, res) => {
  let book = addBook(req.body);
  res.status(201).json(book);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
