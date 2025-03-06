let express = require("express");
let { sequelize } = require("./lib/index");
let { recipe } = require("./models/recipe.model");
let { user } = require("./models/user.model");
let { favorite } = require("./models/favorite.model");
let { Op } = require("@sequelize/core");

let app = express();
app.use(express.json());

let userData = [
  {
    username: "foodlover",
    email: "foodlover@example.com",
    password: "securepassword",
  },
];

let recipeData = [
  {
    title: "Spaghetti Carbonara",
    chef: "Chef Luigi",
    cuisine: "Italian",
    preparationTime: 30,
    instructions:
      "Cook spaghetti. In a bowl, mix eggs, cheese, and pepper. Combine with pasta and pancetta.",
  },
  {
    title: "Chicken Tikka Masala",
    chef: "Chef Anil",
    cuisine: "Indian",
    preparationTime: 45,
    instructions:
      "Marinate chicken in spices and yogurt. Grill and serve with a creamy tomato sauce.",
  },
  {
    title: "Sushi Roll",
    chef: "Chef Sato",
    cuisine: "Japanese",
    preparationTime: 60,
    instructions:
      "Cook sushi rice. Place rice on nori, add fillings, roll, and slice into pieces.",
  },
  {
    title: "Beef Wellington",
    chef: "Chef Gordon",
    cuisine: "British",
    preparationTime: 120,
    instructions:
      "Wrap beef fillet in puff pastry with mushroom duxelles and bake until golden.",
  },
  {
    title: "Tacos Al Pastor",
    chef: "Chef Maria",
    cuisine: "Mexican",
    preparationTime: 50,
    instructions:
      "Marinate pork in adobo, grill, and serve on tortillas with pineapple and cilantro.",
  },
];

//seeding the data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await user.bulkCreate(userData);

    await recipe.bulkCreate(recipeData);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 1
async function favoriteRecipe(data) {
  let newlike = await favorite.create({
    userId: data.userId,
    recipeId: data.recipeId,
  });
  return { message: "recipe liked", newlike };
}

//Exercise 1: Favorite a Recipe
app.get("/users/:id/favorite", async (req, res) => {
  try {
    let userId = req.params.id;
    let recipeId = req.query.recipeId;
    let result = await favoriteRecipe({ userId, recipeId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 2
async function unfavoriteRecipe(data) {
  let count = await favorite.destroy({
    where: {
      userId: data.userId,
      recipeId: data.recipeId,
    },
  });

  if (count === 0) return {};

  return { message: "recipe unfavorited" };
}
//Exercise 2: Unfavorite a Recipe
app.get("/users/:id/unfavorite", async (req, res) => {
  try {
    let userId = req.params.id;
    let recipeId = req.query.recipeId;
    let result = await unfavoriteRecipe({ userId, recipeId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 3
async function getAllFavoritedRecipes(userId) {
  let recipeIds = await favorite.findAll({
    where: { userId },
    attributes: ["recipeId"],
  });
  let recipeRecords = [];
  for (let i = 0; i < recipeIds.length; i++) {
    recipeRecords.push(recipeIds[i].recipeId);
  }
  let likerecipe = await recipe.findAll({
    where: { id: { [Op.in]: recipeRecords } },
  });

  return { likerecipe };
}

//Exercise 3: Get All Favorited Recipes
app.get("/users/:id/favorites", async (req, res) => {
  try {
    let userId = req.params.id;
    let response = await getAllFavoritedRecipes(userId);
    if (response.likerecipe.length === 0) {
      res.status(404).json("No liked recipe found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
