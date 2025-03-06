let employees = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", departmentId: 1 },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    departmentId: 2,
  },
];

let departments = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
];

function getEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.filter((employee) => employee.id === id);
}

function getDepartments() {
  return departments;
}

function getDepartmentById(id) {
  return departments.filter((department) => department.id === id);
}

module.exports = {
  getDepartmentById,
  getDepartments,
  getEmployeeById,
  getEmployees,
};
