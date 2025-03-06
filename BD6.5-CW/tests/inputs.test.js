const request = require("supertest");
const {
  app,
  validateBook,
  validateUser,
  validateReview,
} = require("../index.js");

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
  it("should add a user with valid inputs", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "John", email: "john@amail.com" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John",
      email: "john@amail.com",
    });
  });

  it("should return 400 for invalid user inputs", async () => {
    const res = await request(server).post("/api/users").send({ name: "John" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Email is required and should be a string");
  });

  it("should add a new book with valid inputs", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "Harry Potter", author: "J.K.Rowling" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual([
      {
        id: 1,
        title: "Harry Potter",
        author: "J.K.Rowling",
      },
    ]);
  });

  it("should return 400 for invalid book inputs", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "Harry Potter" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("author is required and should be a string");
  });

  it("should add a new review with valid inputs", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great Writting", userId: 1 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual([
      {
        id: 1,
        content: "Great Writting",
        userId: 1,
      },
    ]);
  });

  it("should return 400 for invalid review inputs", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great Writting" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("userId is required and should be a number");
  });
});

describe("validate functions", () => {
  it("should validate user input correctly", () => {
    expect(validateUser({ name: "John", email: "john@mail.com" })).toBeNull();

    expect(validateUser({ name: "John" })).toEqual(
      "Email is required and should be a string",
    );

    expect(validateUser({ email: "john@mail.com" })).toEqual(
      "Name is required and should be a string",
    );
  });

  it("should validate book input correctly", () => {
    expect(
      validateBook({ title: "Harry Potter", author: "J.K.Rowling" }),
    ).toBeNull();

    expect(validateBook({ title: "Harry Potter" })).toEqual(
      "author is required and should be a string",
    );

    expect(validateBook({ author: "J.K.Rowling" })).toEqual(
      "title is required and should be a string",
    );
  });

  it("should validate review input correctly", () => {
    expect(validateReview({ content: "Great Writting", userId: 1 })).toBeNull();

    expect(validateReview({ content: "Great Writting" })).toEqual(
      "userId is required and should be a number",
    );

    expect(validateReview({ userId: 1 })).toEqual(
      "content is required and should be a string",
    );
  });
});
