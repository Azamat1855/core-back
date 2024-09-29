const AuthModel = require("../models/AuthModel");
const Feedback = require("../models/feedbackModel");

const createFeedback = async (req, res) => {
  const { studentId, teacherId, rating, comment } = req.body;

  try {
    if (
      !studentId ||
      !teacherId ||
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5 ||
      !comment
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const student = await AuthModel.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const teacher = await AuthModel.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const feedback = await Feedback.create({
      studentId,
      teacherId,
      rating,
      comment,
    });

    res
      .status(201)
      .json({ message: "Feedback created successfully", data: feedback });
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createFeedback };
