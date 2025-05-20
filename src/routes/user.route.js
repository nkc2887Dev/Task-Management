const express = require('express');
const { createUser, loginUser, getUsersByOrg } = require('../controllers/user.controller');
const { authentication } = require('../middlewares/auth.middleware');
// const validate = require("../middlewares/validate.middleware");
// const { createUserValidate, loginUser } = require("../validations/user.validate");
const router = express.Router();

// router.post("/create", validate(createUserValidate), createUser);
// router.post("/login", validate(loginUser), createUser);
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/:orgId', authentication, getUsersByOrg);

module.exports = router;
