const { getProject, updateProject, createProject } = require('../services/project.service');

const createProjectController = async (req, res) => {
  const result = await createProject(req.body, req.user);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'Project fetch successfully!',
    data: result.data,
  });
};

const getProjectController = async (req, res) => {
  const result = await getProject(req.params.id);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'Project fetch successfully!',
    data: result.data,
  });
};

const updateProjectController = async (req, res) => {
  const result = await updateProject(req.params.id);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'Project update successfully!',
    data: result.data,
  });
};

module.exports = {
  createProjectController,
  getProjectController,
  updateProjectController,
};
