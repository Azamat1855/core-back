const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, editUser } = require('../controllers/userControllers');

// Create User
router.post('/create', createUser);

// Get All Users (Teachers and Students)
router.get('/users', getAllUsers);

// Edit User by ID
router.put('/users/:id', editUser);

module.exports = router;
