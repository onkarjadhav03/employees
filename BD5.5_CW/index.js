let express = require("express");
let { sequelize } = require("./lib/index");
let { track } = require("./models/track.model");
let { user } = require("./models/user.model");
let { like } = require("./models/like.model");
let { Op } = require("@sequelize/core");

let app = express();
app.use(express.json());

let userData = [
  {
    username: "testuser",
    email: "testuser@gmail.com",
    password: "testuser",
  },
];

let trackData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

//seeding the data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(trackData);

    await user.bulkCreate(userData);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//function 1
async function likeTrack(data) {
  let newlike = await like.create({
    userId: data.userId,
    trackId: data.trackId,
  });
  return { message: "Track liked ", newlike };
}

//Exercise 1: Like a Track
app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = req.params.id;
    let trackId = req.query.trackId;

    let result = await likeTrack({ userId, trackId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 2
async function dislikeTrack(data) {
  let count = await like.destroy({
    where: {
      userId: data.userId,
      trackId: data.trackId,
    },
  });
  if (count === 0) return {};
  return { message: "Track disliked" };
}
//Exercise 2: Dislike a Track
app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = req.params.id;
    let trackId = req.query.trackId;
    let result = await dislikeTrack({ userId, trackId });
    if (!result.message) {
      res.status(404).json("Track not found");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 3
async function getAllLikedTracks(userId) {
  let trackIds = await like.findAll({
    where: { userId },
    attributes: ["trackId"],
  });
  let trackRecords = [];
  for (let i = 0; i < trackIds.length; i++) {
    trackRecords.push(trackIds[i].trackId);
  }
  let likeTracks = await track.findAll({
    where: { id: { [Op.in]: trackRecords } },
  });

  return { likeTracks };
}

//Exercise 3: Get All Liked Tracks
app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = req.params.id;
    let response = await getAllLikedTracks(userId);
    if (response.likeTracks.length === 0) {
      res.status(404).json("No liked tracks found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//functon 4
async function getAllLikedTracksByArtists(userId, artist) {
  let trackIds = await like.findAll({
    where: { userId },
    attributes: ["trackId"],
  });
  let trackRecords = [];
  for (let i = 0; i < trackIds.length; i++) {
    trackRecords.push(trackIds[i].trackId);
  }
  let likeTracks = await track.findAll({
    where: { id: { [Op.in]: trackRecords }, artist },
  });

  return { likeTracks };
}

//Exercise 4: Get All Liked Tracks by Artist
app.get("/users/:id/liked-artist", async (req, res) => {
  try {
    let userId = req.params.id;
    let artist = req.query.artist;
    let response = await getAllLikedTracksByArtists(userId, artist);
    if (response.likeTracks.length === 0) {
      res.status(404).json("No liked tracks found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
