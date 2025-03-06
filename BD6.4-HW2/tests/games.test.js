const request = require("supertest");
const { app } = require("../index.js");
const {
  getAllGames,
  getGameById,
  getAllGenre,
  getGenreById,
} = require("../games.js");
const http = require("http");

jest.mock("../games.js", () => ({
  ...jest.requireActual("../games.js"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  getAllGenre: jest.fn(),
  getGenreById: jest.fn(),
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

  it("/api/games should return a 404 error when no games are found", async () => {
    getAllGames.mockReturnValue([]);
    const res = await request(server).get("/api/games");
    expect(res.status).toEqual(404);
    expect(res.body.error).toBe("No games found");
  });

  it("/api/games/:id should return a 404 error when no games is found", async () => {
    getGameById.mockReturnValue(null);

    const res = await request(server).get("/api/games/11");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("game not found");
  });

  it("/api/genres should return a 404 error when no games are found", async () => {
    getAllGenre.mockReturnValue([]);
    const res = await request(server).get("/api/genres");
    expect(res.status).toEqual(404);
    expect(res.body.error).toBe("No genres found");
  });

  it("/api/genres/:id should return a 404 error when no games is found", async () => {
    getGenreById.mockReturnValue(null);

    const res = await request(server).get("/api/genres/11");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("genre not found");
  });
});
