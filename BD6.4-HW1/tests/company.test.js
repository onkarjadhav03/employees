const request = require("supertest");
const { app } = require("../index.js");
const {
  getDepartmentById,
  getDepartments,
  getEmployeeById,
  getEmployees,
} = require("../company.js");
const http = require("http");

jest.mock("../company.js", () => ({
  ...jest.requireActual("../company.js"),
  getDepartments: jest.fn(),
  getDepartmentById: jest.fn(),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
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

  it("/api/employees should return a 404 error when no employees are found", async () => {
    getEmployees.mockReturnValue([]);
    const res = await request(server).get("/api/employees");
    expect(res.status).toEqual(404);
    expect(res.body.error).toBe("No employees found");
  });

  it("/api/employees/:id should return a 404 error when no employee is found", async () => {
    getEmployeeById.mockReturnValue(null);

    const res = await request(server).get("/api/employees/11");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("employees not found");
  });

  it("/api/departments should return a 404 error when no departments are found", async () => {
    getDepartments.mockReturnValue([]);
    const res = await request(server).get("/api/departments");
    expect(res.status).toEqual(404);
    expect(res.body.error).toBe("No departments found");
  });

  it("/api/departments/:id should return a 404 error when no department is found", async () => {
    getDepartmentById.mockReturnValue(null);

    const res = await request(server).get("/api/departments/11");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("departments not found");
  });
});
