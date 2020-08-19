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
router.post("/message", AuthController.getMessage); router.get("/yes3days", AuthController.getReport3dayYes);
router.get("/no3days", AuthController.getReport3dayNo);
router.get("/yes24", AuthController.getReports24hYes);
router.get("/no24", AuthController.getReports24hNo);
router.get("/yes", AuthController.getReportYes);
router.get("/no", AuthController.getReportNo);
router.put("/forgot-password", AuthController.forgotPassword);
router.put("/reset-password/:token", AuthController.resetPassword);

module.exports = router;
