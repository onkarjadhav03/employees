let movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
  { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
];

function getAllmovies() {
  return movies;
}

function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

function addMovie(movie) {
  let newMovie = {
    id: movies.length + 1,
    title: "Inception",
    director: "Christopher Nolan",
  };
  movies.push(newMovie);
  return newMovie;
}

module.exports = { getAllmovies, getMovieById, addMovie };
