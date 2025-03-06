let { DataTypes, sequelize } = require("../lib/");

let course = sequelize.define("course", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { course };
