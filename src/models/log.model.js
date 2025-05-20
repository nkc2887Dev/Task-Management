const { mongoose } = require('../config/db.config');
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    name: { type: String },
    desc: { type: String },
    action: { type: String },
    resourceType: { type: String },
    resourceId: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true, versionKey: false }
);

logSchema.index({ userId: 1 });
logSchema.index({ resourceId: 1 });

const Log = mongoose.model('Log', logSchema, 'Log');

module.exports = Log;
