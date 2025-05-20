const router = require('express').Router();
const { authentication } = require('../middlewares/auth.middleware');
const { createTaskController, updateTaskController } = require('../controllers/task.controller');

router.post('/create', authentication, createTaskController);
router.put('/:taskId', authentication, updateTaskController);

module.exports = router;
