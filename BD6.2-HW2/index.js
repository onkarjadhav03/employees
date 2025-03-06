const express = require("express");
const app = express();
app.use(express.json());

let movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

function getMovies() {
  return movies;
}

function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

function addMovie(movie) {
  movies.push(movie);
  return movie;
}

app.get("/movies", (req, res) => {
  res.json(getMovies());
});

app.get("/movies/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let movie = getMovieById(id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send("movie not found");
  }
});

app.post("/movie/new", (req, res) => {
  let moviedetails = req.body;
  let newmovie = addMovie(moviedetails);
  res.status(200).json(newmovie);
});

module.exports = { app, getMovies, getMovieById, addMovie };
