const { STRING, Model } = require("sequelize");
let { DataTypes, sequelize } = require("../lib/");

let track = sequelize.define("track", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  album: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { track };
