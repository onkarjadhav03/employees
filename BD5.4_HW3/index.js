let express = require("express");
let { sequelize } = require("./lib/index");
let { dish } = require("./models/dish.model");
let { chef } = require("./models/chef.model");

let app = express();
app.use(express.json());

let chefData = [
  { name: "Gordon Ramsay", birthYear: 1966 },
  { name: "Masaharu Morimoto", birthYear: 1955 },
  { name: "Ricardo Larrivée", birthYear: 1967 },
];

let dishData = [
  {
    name: "Margherita Pizza",
    cuisine: "Italian",
    preparationTime: 20,
  },
  {
    name: "Sushi",
    cuisine: "Japanese",
    preparationTime: 50,
  },
  {
    name: "Poutine",
    cuisine: "Canadian",
    preparationTime: 30,
  },
];

//seeding data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await chef.bulkCreate(chefData);
    res.status(200).json("Database seeded successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 1
async function addNewChef(chefData) {
  let chefs = await chef.create(chefData);
  return { chefs };
}

//Exercise 1: Create New Chef
app.post("/chefs/new", async (req, res) => {
  try {
    let newChef = req.body.newChef;
    let result = await addNewChef(newChef);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 2
async function updateChefById(id, chefData) {
  let findChef = await chef.findOne({ where: { id } });
  if (!findChef) {
    return {};
  }

  findChef.set(chefData);
  let updatedChef = await findChef.save();

  return { message: "Chef updated successfully", updatedChef };
}
//Exercise 2: Update Chef by ID
app.post("/chefs/update/:id", async (req, res) => {
  let id = req.params.id;
  let newChefData = req.body;
  try {
    let result = await updateChefById(id, newChefData);
    if (!result.message) {
      res.status(404).json({ message: "Chef not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3010, () => {
  console.log("Server is running on port 3000");
});
