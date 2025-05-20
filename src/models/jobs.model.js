const { mongoose } = require('../config/db.config');
const Schema = mongoose.Schema;

const jobsSchema = new Schema(
  {
    name: { type: String },
    count: { type: Number },
    runAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

jobsSchema.index({ name: 1 });

const JobRunLog = mongoose.model('JobRunLog', jobsSchema, 'JobRunLog');

module.exports = JobRunLog;
