const {
  createOrganizationService,
  getOrganizationsService,
} = require('../services/organization.service');

const createOrg = async (req, res) => {
  const result = await createOrganizationService(req.body, req.user);
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(201).json({
    success: true,
    message: 'Organization create successfully!',
    data: result.data,
  });
};

const getOrg = async (req, res) => {
  const result = await getOrganizationsService();
  if (!result?.flag) {
    res.status(500).json({
      success: false,
      message: result?.msg,
      data: {},
    });
  }
  res.status(200).json({
    success: true,
    message: 'Organization fetch successfully!',
    data: result.data,
  });
};

module.exports = {
  createOrg,
  getOrg,
};
