const express = require("express");
const {
  getStudents,
  getStudentByID,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentControllers");

//router object
const router = express.Router();

//routes

//Get all student list || Get
router.get("/getall", getStudents);

//get student by ID
router.get("/get/:id", getStudentByID);

//create student || Post
router.post("/create", createStudent);

//update student  || PUT 
router.put("/update/:id", updateStudent)

//Delete student || DELETE
router.delete("/delete/:id", deleteStudent)

module.exports = router;
