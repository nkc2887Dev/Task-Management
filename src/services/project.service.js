const Project = require('../models/project.model');
const Team = require('../models/team.model');
const cache = require('../utils/cache');

const createProject = async (data, user) => {
  try {
    const { name, desc, teamId } = data;

    const team = await Team.findById(teamId);
    if (!team) {
      return { flag: false, msg: 'Team not found.' };
    }

    const project = await Project.create({
      name,
      desc,
      team: teamId,
      createdBy: user._id,
    });
    cache.set(project._id.toString(), project); 
    return { flag: true, data: project };
  } catch (error) {
    console.error('Error - createProject ', error);
    return { flag: false, msg: error.message };
  }
};

const getProject = async (id) => {
  try {
    const cached = cache.get(id);
    if (cached) {
      return { flag: true, data: cached };
    }

    const project = await Project.findById(id).lean();
    cache.set(id, project);

    return { flag: true, data: project };
  } catch (error) {
    console.error('Error - getProject ', error);
    return { flag: false, msg: error.message };
  }
};

const updateProject = async (id, data) => {
  try {
    const project = await Project.findByIdAndUpdate(id, data, {
      new: true,
    });

    cache.set(id, project);
    return { flag: true, data: project };
  } catch (error) {
    console.error('Error - updateProject ', error);
    return { flag: false, msg: error.message };
  }
};

module.exports = {
  createProject,
  getProject,
  updateProject,
};
