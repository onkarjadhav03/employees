let { DataTypes, sequelize } = require("../lib/");
let { book } = require("./book.model");
let { author } = require("./author.model");

let bookAuthor = sequelize.define("bookAuthor", {
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: author,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: book,
      key: "id",
    },
  },
});

book.belongsToMany(author, { through: bookAuthor });
author.belongsToMany(book, { through: bookAuthor });
module.exports = { bookAuthor };
