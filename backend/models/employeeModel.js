const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  phone: { type: String },
  email: { type: String },
  imageUrl: { type: String }, // URL/path of uploaded profile picture
});

module.exports = mongoose.model("Employee", employeeSchema);
