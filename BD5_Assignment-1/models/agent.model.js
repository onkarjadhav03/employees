let { DataTypes, sequelize } = require("../lib/");

let agent = sequelize.define("agent", {
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = { agent };
