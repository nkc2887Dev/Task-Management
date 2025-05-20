const { createTask, updateTask } = require('../services/task.service');

const createTaskController = async (req, res) => {
  const result = await createTask(req.body, req.user);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'Task created successfully!',
    data: result.data,
  });
};

const updateTaskController = async (req, res) => {
  const result = await updateTask(req.body, req.user, req.params.taskId);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'Task updated successfully!',
    data: result.data,
  });
};

module.exports = {
  createTaskController,
  updateTaskController,
};
