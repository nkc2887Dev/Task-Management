const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: { type: String },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: Schema.Types.ObjectId, ref: 'Role' },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Team = mongoose.model('Team', teamSchema, 'Team');

module.exports = Team;
