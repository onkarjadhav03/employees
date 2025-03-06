const request = require("supertest");
const {
  app,
  getAllRecipies,
  getRecipieById,
  addRecipie,
} = require("../index.js");

const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllRecipies: jest.fn(),
  getRecipieById: jest.fn(),
  addRecipie: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrive all recipies", async () => {
    const mockRecipies = [
      {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
      },
    ];

    getAllRecipies.mockResolvedValue(mockRecipies);

    const result = await request(server).get("/recipies");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipies);
  });

  it("should retrieve a recipie by id", async () => {
    const mockRecipie = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };

    getRecipieById.mockResolvedValue(mockRecipie);
    const result = await request(server).get("/recipies/details/1");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipie);
  });

  it("should return a 404 for an non-existing recipie id", async () => {
    getRecipieById.mockResolvedValue(null);

    const res = await request(server).get("/recipies/details/111");
    expect(res.statusCode).toEqual(404);
  });

  it("should add a new recipie", async () => {
    const mockRecipie = {
      id: 3,
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    };
    addRecipie.mockResolvedValue(mockRecipie);
    const res = await request(server).post("/recipies/new").send({
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockRecipie);
  });
});
