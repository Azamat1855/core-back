const express = require('express');
const router = express.Router();
const { createBranch, getAllBranches, editBranch } = require('../controllers/branchControllers');

router.post('/create', createBranch);
router.get('/branches', getAllBranches);
router.put('/branches/:id', editBranch);

module.exports = router;
