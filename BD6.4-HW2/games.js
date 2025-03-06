let games = [
  { id: 1, title: "The Legend of Zelda", genreId: 1 },
  { id: 2, title: "Super Mario Bros", genreId: 2 },
];

let genres = [
  { id: 1, name: "Action-Adventure" },
  { id: 2, name: "Platformer" },
];

function getAllGames() {
  return games;
}
function getGameById(id) {
  return games.filter((game) => game.id === id);
}

function getAllGenre() {
  return genres;
}

function getGenreById(id) {
  return genres.filter((genre) => genre.id === id);
}

module.exports = {
  getAllGames,
  getGameById,
  getAllGenre,
  getGenreById,
};
