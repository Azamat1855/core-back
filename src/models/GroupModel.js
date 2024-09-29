const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentsTest" }],
  room: { type: String, enum: ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4"] },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teachers" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
  lesson_time: {
    start: { type: String },
    end: { type: String }
  }
});

module.exports = mongoose.model("Group", groupSchema);
