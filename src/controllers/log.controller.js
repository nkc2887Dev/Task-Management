const { getLogByTempId } = require('../services/log.service');

const getLog = async (req, res) => {
  const result = await getLogByTempId(req.params.teamId);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'Log fetch successfully!',
    data: result.data,
  });
};

module.exports = {
  getLog,
};
