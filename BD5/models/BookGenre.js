let { DataTypes, sequelize } = require("../lib/");
let { book } = require("./Book.model");
let { genre } = require("./Genre.model");

let bookGenre = sequelize.define("bookGenre", {
  
},{timestamps:false});


module.exports = { bookGenre };
