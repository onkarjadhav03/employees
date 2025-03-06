let { getAllEmployees, getEmployeeById, addEmloyee } = require("../employee");

describe("Employee Function", () => {
  it("should get all employees", () => {
    let employees = getAllEmployees();
    expect(employees.length).toBe(4);
    expect(employees).toEqual([
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
      { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
    ]);
  });

  it("should return a employee by id", () => {
    let employee = getEmployeeById(1);
    expect(employee).toEqual({
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
    });
  });

  it("should return undefined for a non-existant employee", () => {
    let employee = getEmployeeById(99);
    expect(employee).toBeUndefined();
  });

  it("should add a new employee", () => {
    let newEmployee = { name: "John Doe", position: "Software Engineer" };
    let addemployee = addEmloyee(newEmployee);
    expect(addemployee).toEqual({
      id: 5,
      name: "John Doe",
      position: "Software Engineer",
    });
  });
});
