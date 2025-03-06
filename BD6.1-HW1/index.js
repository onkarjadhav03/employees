let { getAllmovies, getMovieById, addMovie } = require("./movie");
let express = require("express");
let app = express();
let port = 3000;

app.use(express.json());

app.get("/api/movies", (req, res) => {
  res.json(getAllmovies());
});

app.get("/api/movies/:id", (req, res) => {
  let movie = getMovieById(parseInt(req.params.id));
  if (!movie) return res.status(404).send("movie not found");
  res.json(movie);
});

app.post("/api/movie", (req, res) => {
  let movie = addMovie(req.body);
  res.status(201).json(movie);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
