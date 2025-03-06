let express = require("express");
let { sequelize } = require("./lib/index");
let { book } = require("./models/book.model");
let { user } = require("./models/user.model");
let { like } = require("./models/like.model");
let { Op } = require("@sequelize/core");

let app = express();
app.use(express.json());

let userData = [
  {
    username: "booklover",
    email: "booklover@gmail.com",
    password: "password123",
  },
];

let bookData = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    summary: "A novel about the serious issues of rape and racial inequality.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    summary:
      "A novel presenting a dystopian future under a totalitarian regime.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
    summary:
      "The narrative of the sailor Ishmael and the obsessive quest of Ahab.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    summary:
      "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    summary: "A novel about the American dream and the roaring twenties.",
  },
];
//seeding the data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(bookData);

    await user.bulkCreate(userData);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 1
async function likeBook(data) {
  let newlike = await like.create({
    userId: data.userId,
    bookId: data.bookId,
  });
  return { message: "book liked", newlike };
}

//Exercise 1: Like a Book
app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let result = await likeBook({ userId, bookId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 2
async function dislikeBook(data) {
  let count = await like.destroy({
    where: {
      userId: data.userId,
      bookId: data.bookId,
    },
  });
  if (count === 0) return {};
  return { message: "book disliked" };
}
//Exercise 2: Dislike a Book
app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let result = await dislikeBook({ userId, bookId });
    if (!result.message) {
      res.status(404).json("Book not found");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 3
async function getAllLikedBooks(userId) {
  let bookIds = await like.findAll({
    where: { userId },
    attributes: ["bookId"],
  });
  let bookRecords = [];
  for (let i = 0; i < bookIds.length; i++) {
    bookRecords.push(bookIds[i].bookId);
  }
  let likebooks = await book.findAll({
    where: { id: { [Op.in]: bookRecords } },
  });

  return { likebooks };
}

//Exercise 3: Get All Liked Books
app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = req.params.id;
    let response = await getAllLikedBooks(userId);
    if (response.likebooks.length === 0) {
      res.status(404).json("No liked books found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


app.listen(3010, () => {
  console.log("Server is running on port 3000");
});
