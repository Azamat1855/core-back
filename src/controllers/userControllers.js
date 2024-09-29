const Auth = require('../models/AuthModel');

// Create User
const createUser = async (req, res) => {
  const { name, surname, password, role } = req.body;

  if (!['teacher', 'student'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const user = await Auth.create({ name, surname, password, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Users (Teachers and Students)
const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find({ role: { $in: ['teacher', 'student'] } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit User
const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, password } = req.body;

  try {
    const user = await Auth.findByIdAndUpdate(id, { name, surname, password }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  editUser
};
