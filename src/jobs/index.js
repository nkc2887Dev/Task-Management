const cron = require('node-cron');
const Task = require('../models/task.model');
const JobRunLog = require('../models/jobs.model');
const { TASK_STATUS } = require('../utils/constants/common');

cron.schedule('* * * * *', async () => {
  console.info('Cron for update over due status started...');
  const now = new Date();
  const result = await Task.updateMany(
    { dueDate: { $lt: now }, status: TASK_STATUS.IN_PROGRESS },
    { $set: { status: TASK_STATUS.OVER_DUE } }
  );
  result.modifiedCount > 0 && (await JobRunLog.create({ count: result.modifiedCount, runAt: now }));
  console.info(`${result.modifiedCount} tasks marked as Overdue.`);
});
