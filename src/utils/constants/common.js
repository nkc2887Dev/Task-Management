const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  TEAM_LEAD: 'TEAM_LEAD',
  TEAM_MEMBER: 'TEAM_MEMBER',
};

const TASK_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  OVER_DUE: 'Overdue',
};

const TASK_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
};

const TASK_ACTION = {
  CREATED: 'task_created',
  STATUS_CHANGED: 'task_status_changed',
  ASSIGNED: 'task_assigned',
};

module.exports = {
  ROLES,
  TASK_STATUS,
  TASK_PRIORITY,
  TASK_ACTION,
};
