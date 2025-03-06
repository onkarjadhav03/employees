let express = require("express");
let { sequelize } = require("./lib/index");
let { student } = require("./models/student.model");
let { course } = require("./models/course.model");

let app = express();
app.use(express.json());

let courseData = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

let studentData = [{ name: "John Doe", age: 24 }];

//seed the data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await student.bulkCreate(studentData);

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 1
async function newStudent(studentData) {
  let students = await student.create(studentData);
  return { students };
}

//Exercise 1: Create New Student
app.post("/students/new", async (req, res) => {
  try {
    let studentData = req.body;
    console.log(studentData);
    let result = await newStudent(studentData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 2
async function updateStudentById(id, studentData) {
  let students = await student.findOne({ where: { id } });
  if (!students) {
    return {};
  }
  students.set(studentData);
  let updatedData = await students.save();

  return { message: "student updated successfully", updatedData };
}

//Exercise 2: Update student by ID
app.post("/students/update/:id", async (req, res) => {
  let id = req.params.id;
  let newStudentData = req.body;
  try {
    let result = await updateStudentById(id, newStudentData);
    if (!result.message) {
      res.status(404).json({ message: "student not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3010, () => {
  console.log("Server is running on port 3000");
});
