const { getStatsDetails, createAdminService } = require('../services/admin.service');

const createAdmin = async (req, res) => {
  const result = await createAdminService(req.body);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'Admin Created successfully!',
    data: result.data,
  });
};

const getStats = async (req, res) => {
  const result = await getStatsDetails();
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'Get stats successfully!',
    data: result.data,
  });
};

module.exports = {
  createAdmin,
  getStats,
};
