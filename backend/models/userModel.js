const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
  role: { type: Number},
  // imageUrl: { type: String },
});

// Hash password before creating a new user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hash password before updating a user
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
    if (!update || !update.password) {
    return next();
    }
  try {
    const hashed = await bcrypt.hash(update.password, 10);
    this.setUpdate({ ...update, password: hashed });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
