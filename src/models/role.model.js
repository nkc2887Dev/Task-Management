const { mongoose } = require('../config/db.config');
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    seq: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Role = mongoose.model('Role', roleSchema, 'Role');

module.exports = Role;
