const bcrypt = require('bcrypt');
const { mongoose } = require('../config/db.config');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: { type: String },
    isActive: { type: Boolean, default: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    teams: [
      {
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
        role: { type: Schema.Types.ObjectId, ref: 'Role' },
      },
    ],
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ email: 1 });
userSchema.index({ organization: 1 });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;
