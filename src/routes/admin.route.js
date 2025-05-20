const express = require('express');
const router = express.Router();
const { authentication, checkPermission } = require('../middlewares/auth.middleware');
const { getStats, createAdmin } = require('../controllers/admin.controller');
const { ROLES } = require('../utils/constants/common');

router.post('/create', createAdmin);
router.get('/stats', authentication, checkPermission([ROLES.SUPER_ADMIN]), getStats);

module.exports = router;
