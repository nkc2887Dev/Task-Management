const express = require('express');
const router = express.Router();
const {
  createTeam,
  getTeamsByOrg,
  getTeamById,
  addTeamMember,
  removeTeamMember,
} = require('../controllers/team.controller');
const { authentication, checkPermission } = require('../middlewares/auth.middleware');
const { ROLES } = require('../utils/constants/common');

router.post('/create', authentication, createTeam);
router.get('/org/:orgId', authentication, getTeamsByOrg);
router.get('/:id', authentication, getTeamById);
router.post(
  '/:id/members',
  authentication,
  checkPermission([ROLES.TEAM_LEAD, ROLES.SUPER_ADMIN]),
  addTeamMember
);
router.delete(
  '/:id/members',
  authentication,
  checkPermission([ROLES.TEAM_LEAD, ROLES.SUPER_ADMIN]),
  removeTeamMember
);

module.exports = router;
