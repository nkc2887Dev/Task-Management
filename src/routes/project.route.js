const express = require('express');
const router = express.Router();
const { authentication, checkPermission } = require('../middlewares/auth.middleware');
const {
  getProjectController,
  updateProjectController,
  createProjectController,
} = require('../controllers/project.controller');
const { ROLES } = require('../utils/constants/common');

router.post(
  '/create',
  authentication,
  checkPermission([ROLES.TEAM_LEAD, ROLES.SUPER_ADMIN]),
  createProjectController
);
router.get('/:id', authentication, getProjectController);
router.put(
  '/:id',
  authentication,
  checkPermission([ROLES.TEAM_LEAD, ROLES.SUPER_ADMIN]),
  updateProjectController
);

module.exports = router;
