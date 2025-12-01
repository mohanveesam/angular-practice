const express = require("express");
const router = express.Router();
const { post, getAll, deleteUser, updateUser, getUserById } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require('../middleware/upload');


router.post("/", post);
router.get("/", getAll);
router.delete("/:id", deleteUser);
router.patch("/:id", upload.single('image'), updateUser);
router.get("/:id", getUserById);

module.exports = router;
