const Role = require('../models/role.model');

async function initSeed() {
  try {
    await seedRoles();
    return true;
  } catch (error) {
    console.error('Error - initSeed ', error);
    throw error;
  }
}

const seedRoles = async () => {
  try {
    const rolesJSON = require('./roles.json');
    Promise.all(
      rolesJSON.map(async (data) => {
        await Role.findOneAndUpdate({ code: data.code }, data, { new: true, upsert: true });
      })
    );
    console.info('Roles seeded successfully! 👥');
    return true;
  } catch (error) {
    console.error('Error - seedRoles ', error);
    throw error;
  }
};

module.exports = initSeed;
