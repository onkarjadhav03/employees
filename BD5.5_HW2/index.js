let express = require("express");
let { sequelize } = require("./lib/index");
let { movie } = require("./models/movie.model");
let { user } = require("./models/user.model");
let { like } = require("./models/like.model");
let { Op } = require("@sequelize/core");

let app = express();
app.use(express.json());

let userData = [
  {
    username: "moviefan",
    email: "moviefan@gmail.com",
    password: "password123",
  },
];

let movieData = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2010,
    summary:
      "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    year: 1972,
    summary:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    genre: "Crime",
    year: 1994,
    summary:
      "The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.",
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action",
    year: 2008,
    summary:
      "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    genre: "Drama",
    year: 1994,
    summary:
      "The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold from the perspective of an Alabama man with an IQ of 75.",
  },
];

//seeding the data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await movie.bulkCreate(movieData);

    await user.bulkCreate(userData);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 1
async function likeMovie(data) {
  let newlike = await like.create({
    userId: data.userId,
    movieId: data.movieId,
  });
  return { message: "book liked", newlike };
}

//Exercise 1: Like a Movie
app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = req.params.id;
    let movieId = req.query.movieId;
    let result = await likeMovie({ userId, movieId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 2
async function dislikeMovie(data) {
  let count = await like.destroy({
    where: {
      userId: data.userId,
      movieId: data.movieId,
    },
  });
  if (count === 0) return {};
  return { message: "Movie disliked" };
}
//Exercise 2: Dislike a Movie
app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = req.params.id;
    let movieId = req.query.movieId;
    let result = await dislikeMovie({ userId, movieId });
    if (!result.message) {
      res.status(404).json("Movie not found");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 3
async function getAllLikedMovies(userId) {
  let movieIds = await like.findAll({
    where: { userId },
    attributes: ["movieId"],
  });
  let movieRecords = [];
  for (let i = 0; i < movieIds.length; i++) {
    movieRecords.push(movieIds[i].movieId);
  }
  let likemovies = await movie.findAll({
    where: { id: { [Op.in]: movieRecords } },
  });

  return { likemovies };
}

//Exercise 3: Get All Liked Movies
app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = req.params.id;
    let response = await getAllLikedMovies(userId);
    if (response.likemovies.length === 0) {
      res.status(404).json("No liked movie found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(3010, () => {
  console.log("Server is running on port 3000");
});
