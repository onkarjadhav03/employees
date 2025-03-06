let { DataTypes, sequelize } = require("../lib/");
let { student } = require("./student.model");
let { course } = require("./course.model");

let studentCorse = sequelize.define("studentCourse", {
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: student,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: course,
      key: "id",
    },
  },
});

student.belongsToMany(course, { through: studentCorse });
course.belongsToMany(student, { through: studentCorse });
module.exports = { studentCorse };
