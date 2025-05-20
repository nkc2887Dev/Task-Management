const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT } = require('../config/processEnv.config');
const Role = require('../models/role.model');

const authentication = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access: No token',
        data: {},
      });
    }

    const decoded = jwt.verify(token, JWT.SECRET);
    const user = await User.findById(decoded.id).lean();

    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access: User inactive or not found',
        data: {},
      });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error('Error - authentication:', error.message);
    res.status(401).json({
      success: false,
      message: 'Unauthorized access: Invalid token',
      data: {},
    });
  }
};

const checkPermission = (roles) => async (req, res, next) => {
  try {
    if (!req.user?.role) {
      res.status(403).json({
        success: false,
        message: 'Access denied: No role assigned',
        data: {},
      });
    }

    const userRole = await Role.findById(req.user.role);
    if (!userRole) {
      res.status(403).json({
        success: false,
        message: 'Access denied: Role not found',
        data: {},
      });
    }
    if (!roles.includes(userRole.code)) {
      res.status(401).json({
        success: true,
        message: 'Access denied: You have not authrized',
        data: {},
      });
    }

    next();
  } catch (error) {
    console.error('Error - checkPermission:', error.message);
    return res.status(403).json({
      success: false,
      message: `Access denied: ${error.message}`,
      data: {},
    });
  }
};

module.exports = {
  authentication,
  checkPermission,
};
