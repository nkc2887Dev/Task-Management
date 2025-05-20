const Log = require('../models/log.model');
const Project = require('../models/project.model');
const Task = require('../models/task.model');
const Team = require('../models/team.model');
const { TASK_ACTION } = require('../utils/constants/common');

const createTask = async (data, user) => {
  try {
    const project = await Project.findById(data.project);

    if (!project) {
      return { flag: false, msg: 'project not found.' };
    }

    const team = await Team.findById(project.team);
    if (!team) {
      return { flag: false, msg: 'Team not found.' };
    }
    const task = await Task.create({ ...data, createdBy: user._id });
    await Log.create({
      userId: user._id,
      action: TASK_ACTION.CREATED,
      resourceId: task._id,
      resourceType: 'Task',
      team: team._id,
    });
    return { flag: true, data: task };
  } catch (error) {
    console.error('Error - createTask ', error);
    return { flag: false, msg: error.message };
  }
};

const updateTask = async (data, user, taskId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return { flag: false, msg: 'Task not found.' };
    }
    const project = await Project.findById(task.project);
    const team = await Team.findById(project.team);

    const isAssignee = task?.assignedTo && task.assignedTo.toString() === user._id.toString();
    if (isAssignee) {
      return { flag: false, msg: 'Members can update status of their own tasks.' };
    }
    const statusChanged = data.status && data.status !== task.status;

    task.title = data.title || task.title;
    task.desc = data.desc || task.desc;
    task.status = data.status || task.status;
    task.priority = data.priority || task.priority;
    task.dueDate = dueDate || task.dueDate;

    if (assignedTo && data.assignedTo !== task.assignedTo?.toString()) {
      task.assignedTo = data.assignedTo;

      await Log.create({
        userId: user._id,
        action: TASK_ACTION.ASSIGNED,
        resourceId: task._id,
        resourceType: 'Task',
        team: team._id,
      });
    }
    await task.save();
    if (statusChanged) {
      await Log.create({
        userId: user._id,
        action: TASK_ACTION.STATUS_CHANGED,
        resourceId: task._id,
        resourceType: 'Task',
        team: team._id,
      });
    }
    return { flag: true, data: task };
  } catch (error) {
    console.error('Error - updateTask ', error);
    return { flag: false, msg: error.message };
  }
};

module.exports = {
  createTask,
  updateTask,
};
