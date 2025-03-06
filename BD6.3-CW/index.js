const express = require("express");
const app = express();
app.use(express.json());

let reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
];

let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  { id: 2, name: "Jane smith", email: "jane.smith@example.com" },
];

//functions
async function getAllReviews() {
  return reviews;
}

async function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

async function addReview(data) {
  data.id = reviews.length + 1;
  reviews.push(data);
  return data;
}

async function getUserById(id) {
  return users.find((user) => user.id === id);
}

async function addUser(user) {
  user.id = users.length + 1;
  users.push(user);
  return user;
}

//API's
//get all reviews
app.get("/reviews", async (req, res) => {
  const reviews = await getAllReviews();
  res.json(reviews);
});
  
//Get review by id
app.get("/reviews/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  if (!review) return res.status(404).send("review not found");
  res.json(review);
});

//Add review
app.post("/review/new", async (req, res) => {
  const newReview = await addReview(req.body);
  res.status(201).json(newReview);
});

//get user by id
app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  if (!user) return res.status(404).send("user not found");
  res.json(user);
});

//add user
app.post("/users", async (req, res) => {
  const newUser = await addUser(req.body);
  res.status(201).json(newUser);
});

module.exports = {
  app,
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
};
