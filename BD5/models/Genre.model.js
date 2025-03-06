let { sequelize, DataTypes } = require("../lib");

let genre = sequelize.define("book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = { genre };
