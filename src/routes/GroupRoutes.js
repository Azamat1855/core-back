const router = require("express").Router();
const Group = require("../models/GroupModel");

router.post("/create", async (req, res) => {
  const { name, students, room, teacher, course, lesson_time } = req.body;

  try {
    const group = await Group.create({
      name,
      students,
      room,
      teacher,
      course,
      lesson_time
    });

    return res.status(200).json({ message: "Group created successfully!", data: group });
  } catch (error) {
    console.log(`Error creating group: ${error}`);
    return res.status(400).json({ message: "Error creating group!" });
  }
}); 

// Get all groups with student names
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find().populate("students", "fullname");  // Populate student names
    return res.status(200).json({ data: groups });
  } catch (error) {
    console.log(`Error fetching groups: ${error}`);
    return res.status(400).json({ message: "Error fetching groups!" });
  }
});

// Delete a group
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByIdAndDelete(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    return res.status(200).json({ message: "Group deleted successfully!" });
  } catch (error) {
    console.log(`Error deleting group: ${error}`);
    return res.status(400).json({ message: "Error deleting group!" });
  }
});

// Add students to a group
router.put("/add-students/:id", async (req, res) => {
  const { students } = req.body; // array of student IDs
  const { id } = req.params;

  try {
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    group.students.push(...students);  // Add new students
    const updatedGroup = await group.save();

    return res.status(200).json({ message: "Students added successfully!", data: updatedGroup });
  } catch (error) {
    console.log(`Error adding students: ${error}`);
    return res.status(400).json({ message: "Error adding students!" });
  }
});

// Remove students from a group
router.put("/remove-students/:id", async (req, res) => {
  const { students } = req.body; // array of student IDs
  const { id } = req.params;

  try {
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    group.students = group.students.filter((student) => !students.includes(student.toString()));  // Remove students
    const updatedGroup = await group.save();

    return res.status(200).json({ message: "Students removed successfully!", data: updatedGroup });
  } catch (error) {
    console.log(`Error removing students: ${error}`);
    return res.status(400).json({ message: "Error removing students!" });
  }
});

// Update group lesson time
router.put("/update-time/:id", async (req, res) => {
  const { lesson_time } = req.body;
  const { id } = req.params;

  try {
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    group.lesson_time = lesson_time; // Update lesson time
    const updatedGroup = await group.save();

    return res.status(200).json({ message: "Lesson time updated successfully!", data: updatedGroup });
  } catch (error) {
    console.log(`Error updating lesson time: ${error}`);
    return res.status(400).json({ message: "Error updating lesson time!" });
  }
});

// Update group room
router.put("/update-room/:id", async (req, res) => {
  const { room } = req.body;
  const { id } = req.params;

  try {
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    group.room = room; // Update room
    const updatedGroup = await group.save();

    return res.status(200).json({ message: "Room updated successfully!", data: updatedGroup });
  } catch (error) {
    console.log(`Error updating room: ${error}`);
    return res.status(400).json({ message: "Error updating room!" });
  }
});

module.exports = router;