let express = require("express");
let app = express();
app.use(express.json());

let employees = [
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

async function getEmployeeById(id) {
  return employees.find((emp) => emp.id === id);
}

async function addEmployee(data) {
  data.id = employees.length + 1;
  employees.push(data);
  return data;
}

async function getAllEmployees() {
  return employees;
}

app.get("/employees", async (req, res) => {
  let result = await getAllEmployees();
  res.json(result);
});

app.get("/employees/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getEmployeeById(id);
  if (!result) return res.status(404).send("Employee not found");
  res.json(result);
});

app.post("/employee/new", async (req, res) => {
  let newEmployee = await addEmployee(req.body);
  res.status(201).json(newEmployee);
});

module.exports = {
  app,
  getAllEmployees,
  getEmployeeById,
  addEmployee,
};
