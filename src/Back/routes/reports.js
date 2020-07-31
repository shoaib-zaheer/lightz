const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/ReportController");

router.post("/reports", ReportController.create);


module.exports = router;
