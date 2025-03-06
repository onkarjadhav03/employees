const request = require("supertest");
const {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
} = require("../index");

const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addDeveloper: jest.fn(),
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

  it("should retrive all games", async () => {
    const mockGames = [
      {
        id: 1,
        title: "The Legend of Zelda",
        genre: "Adventure",
        developer: "Nintendo",
      },
      {
        id: 2,
        title: "Super Mario Bros",
        genre: "Platformer",
        developer: "Nintendo",
      },
    ];

    getAllGames.mockResolvedValue(mockGames);

    const result = await request(server).get("/games");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });

  it("should retrieve a game by id", async () => {
    const mockGames = {
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
      developer: "Nintendo",
    };

    getGameById.mockResolvedValue(mockGames);
    const result = await request(server).get("/games/details/1");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });

  it("should add a game", async () => {
    const mockGames = {
      id: 3,
      title: "Half-Life",
      genre: "FPS",
      developer: "Valve",
    };
    addGame.mockResolvedValue(mockGames);

    const result = await request(server).post("/games/new").send(mockGames);
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(mockGames);
  });

  it("should retrieve a developer by id", async () => {
    const mockDev = { id: 1, name: "Nintendo", country: "Japan" };
    getDeveloperById.mockResolvedValue(mockDev);
    const res = await request(server).get("/developer/details/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDev);
  });

  it("should add a new developer", async () => {
    const mockDev = {
      id: 2,
      name: "Epic Games",
      country: "USA",
    };
    addDeveloper.mockResolvedValue(mockDev);
    const res = await request(server)
      .post("/developer/new")
      .send({ name: "Epic Games", country: "USA" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockDev);
  });

  it("should return a 404 for an non-existing game id", async () => {
    getGameById.mockResolvedValue(null);

    const res = await request(server).get("/games/details/111");
    expect(res.statusCode).toEqual(404);
  });

  it("should return a 404 for an non-existing developer id", async () => {
    getDeveloperById.mockResolvedValue(null);

    const res = await request(server).get("/developer/details/111");
    expect(res.statusCode).toEqual(404);
  });
});
