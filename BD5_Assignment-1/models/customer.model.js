let { DataTypes, sequelize } = require("../lib/");

let customer = sequelize.define("customer", {
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = { customer };
