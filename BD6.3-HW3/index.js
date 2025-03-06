let express = require("express");
let app = express();
app.use(express.json());

let recipies = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

async function getRecipieById(id) {
  return recipies.find((recipie) => recipie.id === id);
}

async function addRecipie(data) {
  data.id = recipies.length + 1;
  recipies.push(data);
  return data;
}

async function getAllRecipies() {
  return recipies;
}

app.get("/recipies", async (req, res) => {
  let result = await getAllRecipies();
  res.json(result);
});

app.get("/recipies/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getRecipieById(id);
  if (!result) return res.status(404).send("recipies not found");
  res.json(result);
});

app.post("/recipies/new", async (req, res) => {
  let newRecipie = await addRecipie(req.body);
  res.status(201).json(newRecipie);
});

module.exports = {
  app,
  getAllRecipies,
  getRecipieById,
  addRecipie,
};
