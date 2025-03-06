  let express = require("express");
let { sequelize } = require("./lib/index");
let { book } = require("./models/book.model");
let { author } = require("./models/author.model");

let app = express();
app.use(express.json());

let books = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

let authors = [{ name: "J.K Rowling", birthYear: 1965 }];

//seed the data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await author.bulkCreate(authors);

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 1
async function newAuthor(authordata) {
  let authors = await author.create(authordata);
  return { authors };
}

//Exercise 1: Create New Author
app.post("/authors/new", async (req, res) => {
  try {
    let authorData = req.body.newAuthor;
    let result = await newAuthor(authorData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 2
async function updateAuthor(id, authorData) {
  let authors = await author.findOne({ where: { id } });
  if (!authors) {
    return {};
  }
  authors.set(authorData);
  let updatedData = await authors.save();

  return { message: "author updated successfully", updatedData };
}

//Exercise 2: Update Author by ID
app.post("/authors/update/:id", async (req, res) => {
  let id = req.params.id;
  let newAuthorData = req.body;
  try {
    let result = await updateAuthor(id, newAuthorData);
    if (!result.message) {
      res.status(404).json({ message: "author not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3010, () => {
  console.log("Server is running on port 3000");
});
