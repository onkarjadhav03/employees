const request = require("supertest");
const {
  app,
  getAllEmployees,
  getEmployeeById,
  addEmployee,
} = require("../index.js");

const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
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

  it("should retrive all employees", async () => {
    const mockEmployees = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
      },
    ];

    getAllEmployees.mockResolvedValue(mockEmployees);

    const result = await request(server).get("/employees");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployees);
  });

  it("should retrieve a employee by id", async () => {
    const mockEmployees = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };

    getEmployeeById.mockResolvedValue(mockEmployees);
    const result = await request(server).get("/employees/details/1");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployees);
  });

  it("should return a 404 for an non-existing employee id", async () => {
    getEmployeeById.mockResolvedValue(null);

    const res = await request(server).get("/employee/details/111");
    expect(res.statusCode).toEqual(404);
  });

  it("should add a new employee", async () => {
    const mockEmployees = {
      id: 3,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    };
    addEmployee.mockResolvedValue(mockEmployees);
    const res = await request(server)
      .post("/employee/new")
      .send({
        name: "Alice Brown",
        email: "alice.brown@example.com",
        department: "Sales",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockEmployees);
  });
});
