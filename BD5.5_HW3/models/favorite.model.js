let { DataTypes, sequelize } = require("../lib/");
let { recipe } = require("./recipe.model.js");
let { user } = require("./user.model.js");

let favorite = sequelize.define("favorite", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    references: {
      model: recipe,
      key: "id",
    },
  },
});

recipe.belongsToMany(user, { through: favorite });
user.belongsToMany(recipe, { through: favorite });
module.exports = { favorite };
