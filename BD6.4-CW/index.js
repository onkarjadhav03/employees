let express = require("express");
let app = express();
app.use(express.json());
let {
  getBooks,
  getBookById,
  getAllReviews,
  getReviewById,
  getUserById,
} = require("./books");

app.get("/api/books", async (req, res) => {
  try {
    const books = await getBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    return res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/books/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ error: "books not found" });
    }
    return res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await getAllReviews();
    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found" });
    }
    return res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/reviews/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const reviews = await getReviewById(id);
    if (!reviews) {
      return res.status(404).json({ error: "reviews not found" });
    }
    return res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const users = await getUserById(id);
    if (!users) {
      return res.status(404).json({ error: "No users found" });
    }
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = { app };
