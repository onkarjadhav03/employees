let { sequelize } = require("./lib/index");
let { employee } = require("./models/employee.model");
let { department } = require("./models/department.model");
let { role } = require("./models/role.model");
let { employeeDepartment } = require("./models/employeeDepartment.model");
let { employeeRole } = require("./models/employeeRole.model");
let express = require("express");
let app = express();

app.use(express.json());

app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await department.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ]);

  const roles = await role.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ]);

  const employees = await employee.bulkCreate([
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Ankit Verma", email: "ankit.verma@example.com" },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: "Database seeded!" });
});

// Helper function to get employee's associated departments
async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  });

  let departmentData;
  for (let empDep of employeeDepartments) {
    departmentData = await department.findOne({
      where: { id: empDep.departmentId },
    });
  }

  return departmentData;
}

// Helper function to get employee's associated Roles
async function getEmployeeRoles(employeeId) {
  const employeeRoles = await employeeRole.findAll({
    where: { employeeId },
  });

  let roleData;
  for (let empRole of employeeRoles) {
    roleData = await role.findOne({
      where: { id: empRole.roleId },
    });
  }

  return roleData;
}

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id);
  const role = await getEmployeeRoles(employeeData.id);

  return {
    id: employeeData.id,
    name: employeeData.name,
    email: employeeData.email,
    createdAt: employeeData.createdAt,
    updatedAt: employeeData.updatedAt,
    department,
    role,
  };
}

//function 1
async function getAllEmployees() {
  let employees = await employee.findAll();

  const employeeDetailsArray = [];

  for (const employeeData of employees) {
    const detailedemployee = await getEmployeeDetails(employeeData);
    employeeDetailsArray.push(detailedemployee);
  }

  return { employees: employeeDetailsArray };
}

//Exercise 1: Get All Employees
app.get("/employees", async (req, res) => {
  try {
    let result = await getAllEmployees();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

//function 2
async function fetchEmployeeById(id) {
  let employees = await employee.findOne({ where: { id } });
  const employeeDetails = await getEmployeeDetails(employees);

  return { employees: employeeDetails };
}
//Exercise 2:  Get Employee by ID
app.get("/employees/details/:id", async (req, res) => {
  let employeeId = req.params.id;
  try {
    let result = await fetchEmployeeById(employeeId);
    if (result.employees.length === 0) {
      res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employees details",
      error: error.message,
    });
  }
});

//function 3
async function fetchEmployeeByDepartment(department) {
  let employeeDepts = await employeeDepartment.findAll({
    where: { departmentId: department },
  });
  const employeeDetailsArray = [];

  for (const employeeData of employeeDepts) {
    const detailedEmployee = await getEmployeeDetails(employeeData);
    employeeDetailsArray.push(detailedEmployee);
  }

  return { employees: employeeDetailsArray };
}
//Exercise 3: Get Employees by Department
app.get("/employees/department/:departmentId", async (req, res) => {
  let department = req.params.departmentId;
  try {
    let result = await fetchEmployeeByDepartment(department);
    if (result.employees.length === 0) {
      res.status(404).json({ message: "No employee found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employee details",
      error: error.message,
    });
  }
});

//function 4
async function fetchEmployeesByRole(role) {
  let empRoles = await employeeRole.findAll({
    where: { roleId: role },
  });
  const employeeDetailsArray = [];

  for (const employeeData of empRoles) {
    const detailedEmployee = await getEmployeeDetails(employeeData);
    employeeDetailsArray.push(detailedEmployee);
  }

  return { employees: employeeDetailsArray };
}
//Exercise 3: Get All Employees by Role
app.get("/employees/role/:roleId", async (req, res) => {
  let role = req.params.roleId;
  try {
    let result = await fetchEmployeesByRole(role);
    if (result.employees.length === 0) {
      res.status(404).json({ message: "No employee found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employee details",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
