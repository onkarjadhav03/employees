let { DataTypes, sequelize } = require("../lib/");
let { book } = require("./book.model");
let { genre } = require("./genre.model");

let bookGenre = sequelize.define("bookGenre", {
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: author,
      key: "id",
    },
  },
  genreId: {
    type: DataTypes.INTEGER,
    references: {
      model: genre,
      key: "id",
    },
  },
});

book.belongsToMany(genre, { through: bookGenre });
genre.belongsToMany(book, { through: bookGenre });
module.exports = { bookGenre };
