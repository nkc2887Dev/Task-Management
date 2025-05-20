const { createUserService, loginUserService } = require('../services/user.service');

const createUser = async (req, res) => {
  const result = await createUserService(req.body);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: result.data,
  });
};

const loginUser = async (req, res) => {
  const result = await loginUserService(req.body);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'User login successfully!',
    data: result.data,
  });
};

const getUsersByOrg = async (req, res) => {
  const result = await getUsersByOrgService(req.params.orgId);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'Get Usr with organisation successfully!',
    data: result.data,
  });
};

module.exports = {
  createUser,
  loginUser,
  getUsersByOrg,
};
