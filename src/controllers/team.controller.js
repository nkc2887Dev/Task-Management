const {
  createTeamService,
  getTeamsByOrgService,
  removeTeamMemberService,
  addTeamMemberService,
  getTeamService,
} = require('../services/team.service');

const createTeam = async (req, res) => {
  const result = await createTeamService(req.body, req.userId);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'Team create successfully!',
    data: result.data,
  });
};

const getTeamById = async (req, res) => {
  const result = await getTeamService(req.params.id);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'Team create successfully!',
    data: result.data,
  });
};

const getTeamsByOrg = async (req, res) => {
  const result = await getTeamsByOrgService(req.params.orgId);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'Get teams by organization successfully!',
    data: result.data,
  });
};

const addTeamMember = async (req, res) => {
  const result = await addTeamMemberService(req.params.id, req.body);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'member added successfully successfully!',
    data: result.data,
  });
};

const removeTeamMember = async (req, res) => {
  const result = await removeTeamMemberService(req.params.id, req.body);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'member remove successfully ',
    data: result.data,
  });
};

module.exports = {
  createTeam,
  getTeamsByOrg,
  getTeamById,
  addTeamMember,
  removeTeamMember,
};
