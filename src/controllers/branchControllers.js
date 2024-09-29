const Branch = require('../models/BranchModel');

// Create Branch
const createBranch = async (req, res) => {
  const { name, location } = req.body;
  try {
    const branch = await Branch.create({ name, location });
    res.status(201).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit Branch
const editBranch = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;
  try {
    const branch = await Branch.findByIdAndUpdate(id, { name, location }, { new: true });
    if (!branch) return res.status(404).json({ error: 'Branch not found' });
    res.status(200).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createBranch,
  getAllBranches,
  editBranch
};
