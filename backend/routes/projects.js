const express = require('express');
const router = express.Router();
const { getAllProjects, getProject, createProject } = require('../controllers/projectController');

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', createProject);

module.exports = router;
