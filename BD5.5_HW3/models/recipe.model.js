let { DataTypes, sequelize } = require("../lib/");

let recipe = sequelize.define("recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chef: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preparationTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { recipe };
