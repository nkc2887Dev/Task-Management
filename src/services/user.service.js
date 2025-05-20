const User = require('../models/user.model');
const { generateToken } = require('./common');

const createUserService = async (data) => {
  try {
    const findUser = await User.findOne({ email: data.email });
    if (findUser) {
      return { flag: false, msg: 'User already exists.' };
    }
    const user = await User.create(data);
    return { flag: true, data: user };
  } catch (error) {
    console.error('Error - createUserService : ', error);
    return { flag: false, msg: error.message };
  }
};

const loginUserService = async (data) => {
  try {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user?.password) {
      return { flag: false, msg: 'User not found.' };
    }

    const isPasswordMatched = await user.isPasswordMatch(password);
    if (!isPasswordMatched) {
      return { flag: false, msg: 'Your password is Incorrect.' };
    }

    const token = await generateToken(user._id, user.email);
    user.token = token;
    await user.save();

    return { flag: true, data: user };
  } catch (error) {
    console.error('Error - loginUserService : ', error);
    return { flag: false, msg: error.message };
  }
};

const getUsersByOrgService = async (orgId) => {
  try {
    const users = await User.find({ organization: orgId }).populate('teams', 'name').lean();
    return { flag: true, data: users };
  } catch (error) {
    console.error('Error - getUsersByOrgService ', error);
    return { flag: false, msg: error.message };
  }
};

module.exports = {
  createUserService,
  loginUserService,
  getUsersByOrgService,
};
