const Role = require('../models/role.model');
const User = require('../models/user.model');
const Task = require('../models/task.model');
const { ROLES, TASK_STATUS } = require('../utils/constants/common');

const createAdminService = async (data) => {
  try {
    const findUser = await User.findOne({ email: data.email });
    if (findUser) {
      return { flag: false, msg: 'Admin already exists.' };
    }
    const adminRole = await Role.findOne({ code: ROLES.SUPER_ADMIN });
    data.role = adminRole?._id;
    const user = await User.create(data);
    return { flag: true, data: user };
  } catch (error) {
    console.error('Error - createAdminService ', error);
    return { flag: false, msg: error.message };
  }
};

const getStatsDetails = async () => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: '$organization',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'Organization',
          localField: '_id',
          foreignField: '_id',
          as: 'organizationDetails',
        },
      },
      {
        $unwind: '$organizationDetails',
      },
      {
        $project: {
          _id: 0,
          organization: '$organizationDetails.name',
          organizationId: '$_id',
          userCount: '$count',
        },
      },
    ]);

    const overdueTasks = await Task.aggregate([
      {
        $match: {
          status: TASK_STATUS.OVER_DUE,
        },
      },
      {
        $lookup: {
          from: 'Project',
          localField: 'project',
          foreignField: '_id',
          as: 'projectDetails',
        },
      },
      {
        $unwind: '$projectDetails',
      },
      {
        $group: {
          _id: '$projectDetails.team',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'Team',
          localField: '_id',
          foreignField: '_id',
          as: 'teamDetails',
        },
      },
      {
        $unwind: '$teamDetails',
      },
      {
        $project: {
          _id: 0,
          team: '$teamDetails.name',
          teamId: '$_id',
          overdueTaskCount: '$count',
        },
      },
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const topUsers = await Task.aggregate([
      {
        $match: {
          status: TASK_STATUS.COMPLETED,
          updatedAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: '$assignedTo',
          completedTaskCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          username: '$userDetails.username',
          firstName: '$userDetails.firstName',
          lastName: '$userDetails.lastName',
          email: '$userDetails.email',
          completedTaskCount: 1,
        },
      },
      {
        $sort: { completedTaskCount: -1 },
      },
      {
        $limit: 3,
      },
    ]);
    return { flag: true, data: { users, overdueTasks, topUsers } };
  } catch (error) {
    console.error('Error - getStatsDetails ', error);
    return { flag: false, msg: error.message };
  }
  const [users, overdueTasks, topUsers] = await Promise.all([
    User.aggregate([{ $group: { _id: '$organization', count: { $sum: 1 } } }]),
    Task.aggregate([
      { $match: { status: 'Overdue' } },
      { $group: { _id: '$project', count: { $sum: 1 } } },
    ]),
    Task.aggregate([
      {
        $match: {
          status: 'Completed',
          dueDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      { $group: { _id: '$assignedTo', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]),
  ]);
  return { flag: true, data: { users, overdueTasks, topUsers } };
};

module.exports = {
  createAdminService,
  getStatsDetails,
};
