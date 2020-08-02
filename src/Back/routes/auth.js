const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const auth = require("../middleware/auth");


;
router.post("/register", AuthController.register1);
router.post("/login", AuthController.login1);
router.post("/tokenIsValid", AuthController.tokenIsValid)
router.get("/my-page", auth, AuthController.getUser)
router.post("/report", AuthController.report1)
//router.get("/reports", AuthController.getAllReports);
router.get("/yes", AuthController.getReportYes);
router.get("/no", AuthController.getReportNo);

module.exports = router;
