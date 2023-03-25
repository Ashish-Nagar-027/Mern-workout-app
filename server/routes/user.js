const express = require("express");
const router = express.Router();

const { signupUser, loginUser } = require("../controllers/user");

// login route
router.post("/login", loginUser);

// singup route
router.post("/signup", signupUser);

module.exports = router;
