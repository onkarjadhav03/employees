let sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BD5_Assignment-2/database.sqlite",
});

module.exports = {
  sequelize,
  DataTypes: sq.DataTypes,
};
