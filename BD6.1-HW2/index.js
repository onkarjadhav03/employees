let { getAllEmployees, getEmployeeById, addEmloyee } = require("./employee");
let express = require("express");
let app = express();
let port = 3000;

app.use(express.json());

app.get("/api/employee", (req, res) => {
  res.json(getAllEmployees());
});

app.get("/api/employee/:id", (req, res) => {
  let employee = getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send("employee not found");
  res.json(employee);
});

app.post("/employee", (req, res) => {
  let employee = addEmloyee(req.body);
  res.status(201).json(employee);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
