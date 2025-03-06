let { DataTypes, sequelize } = require("../lib/");
let { book } = require("./Book.model");
let { author } = require("./Author.model");

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

book.belongsTo(author, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});
module.exports = { bookAuthor };
