const Organization = require('../models/organization.model');

const createOrganizationService = async (data, userId) => {
  try {
    const findOrg = await User.findOne({ name: data.name });
    if (findOrg) {
      return { flag: false, msg: 'Organization already exists.' };
    }
    const org = await Organization.create({ ...data, createdBy: userId });
    return { flag: true, data: org };
  } catch (error) {
    console.error('Error - createOrganizationService ', error);
    return { flag: false, msg: error.message };
  }
};

const getOrganizationsService = async () => {
  try {
    const orgs = await Organization.find().lean();
    return { flag: true, data: orgs };
  } catch (error) {
    console.error('Error - getOrganizationsService ', error);
    return { flag: false, msg: error.message };
  }
};

module.exports = {
  createOrganizationService,
  getOrganizationsService,
};
