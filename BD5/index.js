let express = require("express");
let { sequelize } = require("./lib/index");
let { book } = require("./models/Book.model");
let { author } = require("./models/Author.model");
let { genre } = require("./models/Genre.model");
let { bookAuthor } = require("./models/BookAuthor");
let { bookGenre } = require("./models/BookGenre");

let app = express();
app.use(express.json());

const authorsData = [
  {
    name: "J.K. Rowling",
    birthdate: "1965-07-31",
    email: "jkrowling@books.com",
  },
  {
    name: "George R.R. Martin",
    birthdate: "1948-09-20",
    email: "grrmartin@books.com",
  },
];

const genresData = [
  { name: "Fantasy", description: "Magical and mythical stories." },
  {
    name: "Drama",
    description: "Fiction with realistic characters and events.",
  },
];

const bookData = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    description: "A young wizard's journey begins.",
    publicationYear: 1997,
    authorId: 1,
  },
  {
    title: "Game of Thrones",
    description: "A medieval fantasy saga.",
    publicationYear: 1996,
    authorId: 2,
  },
];
//Associations also added in this as per Requirement

// Association Called while seeding db
// Reference: After BulkCreate Each

// Set up the many-to-many relationship between books and genres
// await books[0].setGenres([genres[0]]);
// await books[1].setGenres([genres[0], genres[1]]);

//seeded data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    //await author.bulkCreate(authorsData);
    //await genre.bulkCreate(genresData);
    await book.bulkCreate(bookData);
    // await book[0].setGenres([genre[0]]);
    // await book[1].setGenres([genre[0], genre[1]]);

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function1
async function findAllBooks() {
  let books = await book.findAll();
  return { books };
}

//getAll books
app.get("/books", async (req, res) => {
  try {
    let result = await findAllBooks();
    if (result.length === 0) {
      res.status(404).json({ error: "No books found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3010, () => {
  console.log("Server is running on port 3000");
});
