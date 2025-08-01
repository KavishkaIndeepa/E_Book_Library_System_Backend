const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const { getUsers } = require("../controllers/userController");
const { deleteUser } = require("../controllers/userController");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");


router.get("/", verifyToken, getUsers);
router.delete("/:id", deleteUser);
router.get("/me", verifyToken, getUserProfile);
router.put("/me", verifyToken, updateUserProfile);

module.exports = router;
