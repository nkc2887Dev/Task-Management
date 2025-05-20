const Role = require('../models/role.model');
const Team = require('../models/team.model');
const User = require('../models/user.model');
const { ROLES } = require('../utils/constants/common');

const createTeamService = async (data, userId) => {
  try {
    const findTeam = await Team.findOne({ name: data.name });
    if (findTeam) {
      return { flag: false, msg: 'Team already exists.' };
    }
    const team = await Team.create({ ...data, createdBy: userId });
    return { flag: true, data: team };
  } catch (err) {
    console.error('Error - createTeamService ', err);
    return { flag: false, msg: err.message };
  }
};

const getTeamService = async (id) => {
  try {
    const team = await Team.findById(id);
    if (!team) {
      return { flag: false, msg: 'Team not found.' };
    }
    return { flag: true, data: team };
  } catch (err) {
    console.error('Error - getTeamService ', err);
    return { flag: false, msg: err.message };
  }
};

const getTeamsByOrgService = async (orgId) => {
  try {
    const teams = await Team.find({ organization: orgId })
      .populate('members.user', 'name email')
      .lean();
    return { flag: true, data: teams };
  } catch (err) {
    console.error('Error - getTeamsByOrgService ', err);
    return { flag: false, msg: err.message };
  }
};

const addTeamMemberService = async (id, data) => {
  try {
    const { userId } = data;
    const team = await Team.findById(id);
    if (!team) {
      return { flag: false, msg: 'Team not found.' };
    }
    const user = await User.findById(userId);
    if (!user) {
      return { flag: false, msg: 'User not found.' };
    }

    if (user.organization.toString() !== team.organization.toString()) {
      return { flag: false, msg: 'User not present in current organization.' };
    }
    const isMember = team.members.some((member) => member.user.toString() === userId);

    if (isMember) {
      return { flag: false, msg: 'User is already a member' };
    }
    const memberRole = await Role.findOne({ code: ROLES.TEAM_MEMBER });
    team.members.push({
      user: userId,
      role: memberRole?._id,
      createdBy: user._id,
    });

    await team.save();

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          teams: {
            team: team._id,
            role: memberRole?._id,
          },
        },
      }
    );
    return { flag: true, data: team };
  } catch (err) {
    console.error('Error - addTeamMemberService ', err);
    return { flag: false, msg: err.message };
  }
};

const removeTeamMemberService = async (id, data) => {
  try {
    const { userId } = data;
    const team = await Team.findById(id);
    if (!team) {
      return { flag: false, msg: 'Team not found.' };
    }

    const memberIndex = team.members.findIndex((member) => member.user.toString() === userId);

    if (memberIndex === -1) {
      return { flag: false, msg: 'User is not a member of this team.' };
    }

    team.members.splice(memberIndex, 1);
    await team.save();

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          teams: {
            team: team._id,
          },
        },
      }
    );
    return { flag: true, data: team };
  } catch (err) {
    console.error('Error - removeTeamMemberService ', err);
    return { flag: false, msg: err.message };
  }
};

module.exports = {
  createTeamService,
  getTeamService,
  getTeamsByOrgService,
  addTeamMemberService,
  removeTeamMemberService,
};
