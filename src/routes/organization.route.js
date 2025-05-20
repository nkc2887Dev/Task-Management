const express = require('express');
const router = express.Router();
const { authentication, checkPermission } = require('../middlewares/auth.middleware');
const { createOrg, getOrg } = require('../controllers/organization.controller');
const { ROLES } = require('../utils/constants/common');

router.post('/create', authentication, checkPermission([ROLES.SUPER_ADMIN]), createOrg);
router.get('/', authentication, checkPermission([ROLES.SUPER_ADMIN]), getOrg);

module.exports = router;
