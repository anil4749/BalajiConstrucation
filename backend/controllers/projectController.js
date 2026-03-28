const Project = require('../models/Project');
const sampleProjects = require('../data/sampleProjects');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.log('Database error, using sample data:', error.message);
    // Fallback to sample data when database is unavailable
    const { status } = req.query;
    let filtered = sampleProjects;
    
    if (status && status !== 'all') {
      filtered = sampleProjects.filter(p => p.status === status);
    }
    
    res.json(filtered);
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.log('Database error, using sample data:', error.message);
    const sampleProject = sampleProjects.find(p => 
      p._id === req.params.id || 
      p.title.toLowerCase().includes(req.params.id.toLowerCase())
    );
    
    if (!sampleProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(sampleProject);
  }
};

// Create project (Admin)
exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.log('Database error, using sample response:', error.message);
    const newProject = { _id: Math.random().toString(36).substr(2, 9), ...req.body, createdAt: new Date() };
    res.status(201).json(newProject);
  }
};
