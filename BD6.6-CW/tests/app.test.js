const request = require("supertest");
const http = require("http");
const { app } = require("../index.js");
const { getAllEmployees, getEmployeesByID } = require("../controllers");
const { mock, describe, beforeEach } = require("node:test");
const { before } = require("node:test");
const { it } = require("node:test");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
}));

let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("controller function test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all employees", () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];
    getAllEmployees.mockReturnValue(mockEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
  });
});

describe("API endpoint test", () => {
  it("get/employee", async () => {
    const res = await request(server).get("/employees");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Priya Singh",
          email: "priya.singh@example.com",
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "Ankit Verma",
          email: "ankit.verma@example.com",
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });
  it("get/exployees/:id should  get an employee id", async () => {
    const res = await request(server).get("/employees/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});
