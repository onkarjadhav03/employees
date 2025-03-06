let express = require("express");
let app = express();
app.use(express.json());

let games = [
  {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Adventure",
    developer: "Nintendo",
  },
  {
    id: 2,
    title: "Super Mario Bros",
    genre: "Platformer",
    developer: "Nintendo",
  },
];

let developer = [{ id: 1, name: "Nintendo", country: "Japan" }];
async function getAllGames() {
  return games;
}

async function getGameById(id) {
  return games.find((game) => game.id === id);
}

async function addGame(data) {
  data.id = games.length + 1;
  games.push(data);
  return data;
}

async function getDeveloperById(id) {
  return developer.find((dev) => dev.id === id);
}

async function addDeveloper(data) {
  data.id = developer.length + 1;
  developer.push(data);
  return data;
}

app.get("/games", async (req, res) => {
  let result = await getAllGames();
  res.json(result);
});

app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getGameById(id);
  if (!result) return res.status(404).send("Game not found");
  res.json(result);
});

app.post("/games/new", async (req, res) => {
  let newGame = await addGame(req.body);
  res.status(201).json(newGame);
});

app.get("/developer/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getDeveloperById(id);
  if (!result) return res.status(404).send("developer not found");
  res.json(result);
});

app.post("/developer/new", async (req, res) => {
  let newDeveloper = await addDeveloper(req.body);
  res.status(201).json(newDeveloper);
});

module.exports = {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
};
