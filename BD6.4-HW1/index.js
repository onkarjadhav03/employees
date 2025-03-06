let express = require("express");
let app = express();
app.use(express.json());
let {
  getDepartmentById,
  getDepartments,
  getEmployeeById,
  getEmployees,
} = require("./company");

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await getEmployees();
    if (employees.length === 0) {
      return res.status(404).json({ error: "No employees found" });
    }
    return res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const employees = await getEmployeeById(id);
    if (!employees) {
      return res.status(404).json({ error: "employees not found" });
    }
    return res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/departments", async (req, res) => {
  try {
    const departments = await getDepartments();
    if (departments.length === 0) {
      return res.status(404).json({ error: "No departments found" });
    }
    return res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/departments/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const departments = await getDepartmentById(id);
    if (!departments) {
      return res.status(404).json({ error: "departments not found" });
    }
    return res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
