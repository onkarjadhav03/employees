const request = require("supertest");
const { app, validateArticle, validateAuthor } = require("../index.js");

const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API endpoints to add data", () => {
  it("should add a article with valid inputs", async () => {
    const res = await request(server).post("/api/article").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });

  it("should return 400 for invalid article inputs", async () => {
    const res = await request(server)
      .post("/api/article")
      .send({ title: "Mastering Node.js" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("content is required and should be a string");
  });

  it("should add a author with valid inputs", async () => {
    const res = await request(server).post("/api/author").send({
      name: "Alice Johnson",
      articleId: 3,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      name: "Alice Johnson",
      articleId: 3,
    });
  });
  it("should return 400 for invalid author inputs", async () => {
    const res = await request(server)
      .post("/api/author")
      .send({ name: "Alice Johnson" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("articleId is required and should be a number");
  });
});

describe("validate functions", () => {
  it("should validate article input correctly", () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toBeNull();

    expect(validateArticle({ title: "Mastering Node.js" })).toEqual(
      "content is required and should be a string",
    );

    expect(
      validateArticle({
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toEqual("title is required and should be a string");
  });

  it("should return error message for invalid inputs", () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toBeNull();

    expect(validateArticle({ title: "Mastering Node.js" })).toEqual(
      "content is required and should be a string",
    );
    expect(
      validateArticle({
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toEqual("title is required and should be a string");
  });

  it("should validate author input correctly", () => {
    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: 3,
      }),
    ).toBeNull();

    expect(validateAuthor({ name: "Alice Johnson" })).toEqual(
      "articleId is required and should be a number",
    );

    expect(
      validateAuthor({
        articleId: 3,
      }),
    ).toEqual("name is required and should be a string");
  });

  it("should return error message for invalid inputs", () => {
    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: 3,
      }),
    ).toBeNull();

    expect(validateAuthor({ name: "Alice Johnson" })).toEqual(
      "articleId is required and should be a number",
    );
    expect(
      validateAuthor({
        articleId: 3,
      }),
    ).toEqual("name is required and should be a string");
  });
});
