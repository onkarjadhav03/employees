let { sequelize, DataTypes } = require("../lib");
let { author } = require("./Author.model");
let { genre } = require("./Genre.model");
let { bookGenre } = require("./BookGenre");

let book = sequelize.define("book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  publicationYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
book.belongsTo(author, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});

book.belongsToMany(genre, { through: bookGenre });
genre.belongsToMany(book, { through: bookGenre });
module.exports = { book };
