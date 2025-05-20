const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin.route');
const organizationRoutes = require('./organization.route');
const userRoutes = require('./user.route');
const teamRoutes = require('./team.route');
const projectRoutes = require('./project.route');
const logRoutes = require('./log.route');
const tasksRoutes = require('./task.routes');

router.use('/admin', adminRoutes);
router.use('/organizations', organizationRoutes);
router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/projects', projectRoutes);
router.use('/activity', logRoutes);
router.use('/tasks', tasksRoutes);

module.exports = router;
