const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const { createUser } = require("../controllers/userController");

router.post("/create", verifyToken, createUser);

module.exports = router;