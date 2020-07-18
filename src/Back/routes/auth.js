const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.register1);
router.post("/login", AuthController.login1);

module.exports = router;
