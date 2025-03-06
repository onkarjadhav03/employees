let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

let reviews = [{ id: 1, bookId: 1, content: "Great book!" }];

let users = [{ id: 1, name: "John Doe", email: "john@example.com" }];

function getBooks() {
  return books;
}

function getBookById(id) {
  return books.filter((book) => book.id === id);
}

function getAllReviews() {
  return reviews;
}

function getReviewById(id) {
  return reviews.filter((review) => review.id === id);
}

function getUserById(id) {
  return users.filter((user) => user.id === id);
}

module.exports = {
  getBooks,
  getBookById,
  getAllReviews,
  getReviewById,
  getUserById,
};
