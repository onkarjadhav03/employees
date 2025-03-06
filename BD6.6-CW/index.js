const cors = require("cors");
const express = require("express");
const { getAllEmployees, getEmployeesByID } = require("./controllers");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/employees", async (req, res) => {
  const employees = await getAllEmployees();
  res.json(employees);
});

app.get("/employees/:id", async (req, res) => {
  let employee = await getEmployeesByID(req.params.id);
  res.json({ employee });
});

module.exports = { app };
