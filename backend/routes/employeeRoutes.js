const express = require("express");
const router = express.Router();
const { getEmployee, updateEmployee } = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require('../middleware/upload');

router.get("/:id", getEmployee);
router.patch("/:id", upload.single('image'), updateEmployee);

module.exports = router;