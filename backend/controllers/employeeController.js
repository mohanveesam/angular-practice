const Employee = require("../models/employeeModel");
const upload = require("../middleware/upload");

// Get employee details
exports.getEmployee = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId)
  let employee = await Employee.findOne({ userId });
  res.status(200).json(employee || null);
};

// Update employee profile
// exports.updateEmployee = async (req, res) => {
//   try {
//     const updated = await Employee.findOneAndUpdate(
//       { userId: req.params.id },
//       req.body,
//       { new: true }
//     );

//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.updateEmployee = async (req, res) => {
  try {
    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }

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

