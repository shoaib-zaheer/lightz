const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const auth = require("../middleware/auth")


router.post("/register", AuthController.register1);
router.post("/login", AuthController.login1);
router.post("/tokenIsValid", AuthController.tokenIsValid)
router.get("/", auth, AuthController.getUser)

module.exports = router;
