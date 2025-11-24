import Student from "../models/Student.js";
import { StatusCodes } from "http-status-codes";

const createStudent = async (req, res, next) => {
  try {
    const { studentID, name, phone, email, grades } = req.body;

    // Check for duplicate studentID or email
    const existingStudent = await Student.findOne({
      $or: [{ studentID }, { email }],
    });

    if (existingStudent) {
      // Duplicate found, return error response
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "DuplicateData",
        message: "Student with the same ID or email already exists.",
      });
    }

    // Create new student if no duplicate is found
    const newStudent = await Student.create({
      studentID,
      name,
      phone,
      email,
      grades,
    });

    res.status(StatusCodes.CREATED).json({ student: newStudent });
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    res.status(StatusCodes.OK).json({ students });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const { id: studentID } = req.params;
    const student = await Student.findById(studentID);

    if (!student) {
      throw new Error(`Student not found with id: ${studentID}`);
    }

    res.status(StatusCodes.OK).json({ student });
  } catch (error) {
    next(error);
  }
};

const updateStudentById = async (req, res, next) => {
  try {
    const { id: studentID } = req.params;
    const student = await Student.findByIdAndUpdate(studentID, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      throw new Error(`Student not found with id: ${studentID}`);
    }

    res.status(StatusCodes.OK).json({ student });
  } catch (error) {
    next(error);
  }
};

const deleteStudentById = async (req, res, next) => {
  try {
    const { id: studentID } = req.params;
    const student = await Student.findByIdAndDelete(studentID);

    if (!student) {
      throw new Error(`Student not found with id: ${studentID}`);
    }

    res.status(StatusCodes.OK).json({ student });
  } catch (error) {
    next(error);
  }
};

export {
  createStudent,
  getAllStudents,
  getStudentById as getStudent,
  updateStudentById as updateStudent,
  deleteStudentById as deleteStudent,
};
