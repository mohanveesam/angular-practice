const User = require("../models/userModel");
const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");

// Add user
// exports.post = async (req, res) => {
//   try {
//     const newuser = new User(req.body);
//     await newuser.save();
//     res.status(201).json(newuser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(400).json({ error: error.message });
//   }
// };

exports.post = async (req, res) => {
  try {
    // 1️⃣ Create user
    const newUser = new User(req.body);
    await newUser.save();

    // 2️⃣ Create employee automatically (IMPORTANT)
    await Employee.create({
      userId: newUser._id,   // ✅ ObjectId (correct)
      phone: "",
      email: ""
    });

    // 3️⃣ Respond
    res.status(201).json(newUser);

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all users
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // Only updates provided fields (partial update)
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    // const { id } = req.params;
    const user = await User.findById(req.params);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
