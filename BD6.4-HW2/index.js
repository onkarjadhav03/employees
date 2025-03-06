let express = require("express");
let app = express();
app.use(express.json());
let {
  getAllGames,
  getGameById,
  getAllGenre,
  getGenreById,
} = require("./games");

app.get("/api/games", async (req, res) => {
  try {
    let result = await getAllGames();
    if (result.length === 0)
      return res.status(404).json({ error: "No games found" });
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/games/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const games = await getGameById(id);
    if (!games) {
      return res.status(404).json({ error: "game not found" });
    }
    return res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    let result = await getAllGenre();
    if (result.length === 0)
      return res.status(404).json({ error: "No genres found" });
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/genres/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const genres = await getGenreById(id);
    if (!genres) {
      return res.status(404).json({ error: "genre not found" });
    }
    return res.json(genres);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
