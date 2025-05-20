const { mongoose } = require('../config/db.config');
const { TASK_STATUS, TASK_PRIORITY } = require('../utils/constants/common');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: TASK_STATUS.PENDING,
    },
    priority: {
      type: String,
      default: TASK_PRIORITY.LOW,
    },
    dueDate: { type: Date },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model('Task', taskSchema, 'Task');

module.exports = Task;
