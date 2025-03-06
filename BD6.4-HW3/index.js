let express = require("express");
let app = express();

let {
  getAllArticles,
  getAllComments,
  getArticleById,
  getCommentById,
  getUserById,
} = require("./articles");

app.get("/articles", async (req, res) => {
  try {
    let result = await getAllArticles();
    if (result.length === 0)
      return res.status(404).json({ error: "No articles found" });
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const games = await getArticleById(id);
    if (!games) {
      return res.status(404).json({ error: "article not found" });
    }
    return res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/comments", async (req, res) => {
  try {
    let result = await getAllComments();
    if (result.length === 0)
      return res.status(404).json({ error: "No comments found" });
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/comments/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const genres = await getCommentById(id);
    if (!genres) {
      return res.status(404).json({ error: "comment not found" });
    }
    return res.json(genres);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const games = await getUserById(id);
    if (!games) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
