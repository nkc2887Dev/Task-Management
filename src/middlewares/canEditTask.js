const Task = require('../models/task.model');
const Team = require('../models/team.model');

const canEditTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  const userId = req.user._id;
  const userRole = req.user.role;

  const task = await Task.findById(taskId).populate({
    path: 'project',
    populate: { path: 'team' },
  });

  if (!task) return res.status(404).json({ message: 'Task not found' });

  const isTeamLead = task.project.team.members.some(
    (member) => member.user.toString() === userId.toString() && member.role === 'TeamLead'
  );

  const isAssignedTo = task.assignedTo.toString() === userId.toString();

  if (userRole === 'SuperAdmin' || isTeamLead || isAssignedTo) {
    req.task = task;
    return next();
  }

  return res.status(403).json({ message: 'You do not have permission to modify this task.' });
};

module.exports = canEditTask;
