const Log = require('../models/log.model');
const Team = require('../models/team.model');

const getLogByTempId = async (teamId) => {
  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return { flag: false, msg: 'Team not found' };
    }
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const logs = await Log.find({
      createdAt: { $gte: weekAgo },
      team: team._id,
    }).lean();
    return { flag: true, data: logs };
  } catch (error) {
    console.error('Error - getOrganizationsService ', error);
    return { flag: false, msg: error.message };
  }
};

module.exports = {
  getLogByTempId,
};
