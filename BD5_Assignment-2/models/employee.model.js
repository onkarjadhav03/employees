let { DataTypes, sequelize } = require("../lib/");

let employee = sequelize.define("employee", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = { employee };
