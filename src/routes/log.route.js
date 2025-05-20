const express = require('express');
const router = express.Router();
const { authentication } = require('../middlewares/auth.middleware');
const { getLog } = require('../controllers/log.controller');

router.get('/:teamId', authentication, getLog);

module.exports = router;
