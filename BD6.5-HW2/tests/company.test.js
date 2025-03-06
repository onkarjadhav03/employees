const request = require("supertest");
const { app, validateCompany, validateEmployee } = require("../index.js");

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
  it("should add a employee with valid inputs", async () => {
    const res = await request(server)
      .post("/api/employees")
      .send({ name: "John Doe", companyId: 1 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      companyId: 1,
    });
  });

  it("should return 400 for invalid employee inputs", async () => {
    const res = await request(server)
      .post("/api/employees")
      .send({ name: "John Doe" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("companyId is required and should be a number");
  });

  it("should add a company with valid inputs", async () => {
    const res = await request(server)
      .post("/api/company")
      .send({ name: "TechCorp" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "TechCorp",
    });
  });

  it("should return 400 for invalid company inputs", async () => {
    const res = await request(server).post("/api/company").send({ name: 1234 });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("name is required and should be a string");
  });
});

describe("validate functions", () => {
  it("should validate employee input correctly", () => {
    expect(validateEmployee({ name: "John Doe", companyId: 1 })).toBeNull();

    expect(validateEmployee({ name: "John Doe" })).toEqual(
      "companyId is required and should be a number",
    );

    expect(validateEmployee({ companyId: 1 })).toEqual(
      "name is required and should be a string",
    );
  });

  it("should return error message for invalid inputs", () => {
    expect(validateEmployee({ name: "John Doe", companyId: 1 })).toBeNull();

    expect(validateEmployee({ name: "John Doe" })).toEqual(
      "companyId is required and should be a number",
    );
  });
  it("should validate company input correctly", () => {
    expect(validateCompany({ name: "TechCorp" })).toBeNull();

    expect(validateCompany({ name: "TechCorp" })).toEqual(null);
  });

  it("should return error message for invalid inputs", () => {
    expect(validateCompany({ name: "TechCorp" })).toBeNull();

    expect(validateCompany({ name: "TechCorp" })).toEqual(null);
  });
});
