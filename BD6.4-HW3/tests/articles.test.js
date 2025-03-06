const request = require("supertest");
const { app } = require("../index.js");
const {
  getAllArticles,
  getAllComments,
  getArticleById,
  getCommentById,
  getUserById,
} = require("../articles.js");
const http = require("http");

jest.mock("../articles.js", () => ({
  ...jest.requireActual("../articles.js"),
  getAllArticles: jest.fn(),
  getAllComments: jest.fn(),
  getArticleById: jest.fn(),
  getCommentById: jest.fn(),
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
  it("/articles should return a 404 error when no articles are found", async () => {
    getAllArticles.mockReturnValue([]);
    const res = await request(server).get("/articles");
    expect(res.status).toEqual(404);
    expect(res.body.error).toBe("No articles found");
  });

  it("/articles/:id should return a 404 error when no article is found", async () => {
    getArticleById.mockReturnValue(null);

    const res = await request(server).get("/articles/11");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("article not found");
  });

  it("/comments should return a 404 error when no comments are found", async () => {
    getAllComments.mockReturnValue([]);
    const res = await request(server).get("/comments");
    expect(res.status).toEqual(404);
    expect(res.body.error).toBe("No comments found");
  });

  it("/comments/:id should return a 404 error when no comment is found", async () => {
    getCommentById.mockReturnValue(null);

    const res = await request(server).get("/comments/11");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("comment not found");
  });
  it("/user/:id should return a 404 error when no user is found", async () => {
    getUserById.mockReturnValue(null);

    const res = await request(server).get("/users/11");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("user not found");
  });
});
