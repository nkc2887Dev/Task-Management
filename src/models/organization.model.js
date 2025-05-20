const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgSchema = new Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false }
);

orgSchema.index({ name: 1 });

const Organization = mongoose.model('Organization', orgSchema, 'Organization');

module.exports = Organization;
