const Employee = require("../models/userModel");


// Get employee details
exports.getEmployee = async (req, res) => {
  const userId = req.params.id;

  let employee = await Employee.findOne({ userId });

  // if (!employee) {
  //   employee = await Employee.create({
  //     userId,
  //     phone: "",
  //     email: "",
  //     imageUrl: ""
  //   });
  // }

  res.status(200).json(employee || null);
};


// Update employee profile
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
