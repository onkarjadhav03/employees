const request = require("supertest");
const { app } = require("../index.js");
const {
  getBooks,
  getBookById,
  getAllReviews,
  getReviewById,
  getUserById,
} = require("../books.js");
const http = require("http");

jest.mock("../books.js", () => ({
  ...jest.requireActual("../books.js"),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  getUserById: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Error Handeling Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("/api/books should return a 404 error when no books are found", async () => {
    getBooks.mockReturnValue([]);
    const res = await request(server).get("/api/books");
    expect(res.status).toEqual(404);
    expect(res.body.error).toBe("No books found");
  });

  it("/api/books/:id should return a 404 error when no book is found", async () => {
    getBookById.mockReturnValue(null);

    const res = await request(server).get("/api/books/11");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("books not found");
  });

  it("/api/reviews should return a 404 error when no reviews are found", async () => {
    getAllReviews.mockReturnValue([]);

    const res = await request(server).get("/api/reviews");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("No reviews found");
  });

  it("/api/reviews/:id should return a 404 error when no review is found", async () => {
    getReviewById.mockReturnValue(null);
    const res = await request(server).get("/api/reviews/18");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("reviews not found");
  });

  it("/api/users/:id should return a 404 error when no user is found", async () => {
    getUserById.mockReturnValue(null);
    const res = await request(server).get("/api/users/18");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("No users found");
  });
});
