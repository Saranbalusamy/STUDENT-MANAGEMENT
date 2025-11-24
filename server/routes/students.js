// routes/studentRoutes.js
import express from "express";
const router = express.Router();

import {
  getAllStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/students.js";

router.route("/").get(getAllStudents).post(createStudent);
router.route("/:id").get(getStudent).patch(updateStudent).delete(deleteStudent);

export default router;
