let { DataTypes, sequelize } = require("../lib/");
let { book } = require("./book.model");
let { user } = require("./user.model");

let like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
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

user.belongsToMany(book, { through: like });
book.belongsToMany(user, { through: like });
module.exports = { like };
