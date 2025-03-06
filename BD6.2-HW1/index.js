const express = require("express");
const app = express();
app.use(express.json());

let employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
];

function getEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.find((emp) => emp.id === id);
}

function addEmployee(employee) {
  employees.push(employee);
  return employee;
}

app.get("/employees", (req, res) => {
  res.json(getEmployees());
});

app.get("/employees/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let employee = getEmployeeById(id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

app.post("/employees/new", (req, res) => {
  let empdetails = req.body;
  let employeeAddress = addEmployee(empdetails);
  res.status(200).json(employeeAddress);
});

module.exports = { app, getEmployees, getEmployeeById, addEmployee };
