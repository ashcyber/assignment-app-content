const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

const passport = require("passport");

const hostAuth = passport.authenticate("jwt-user-rule", { session: false });

/**
 * Public Routes
 */
router.post("/register", userCtrl.registerUser);
router.post("/login", userCtrl.loginUser);

/**
 * Private Routes
 */
router.get("/get-vehicles", hostAuth, userCtrl.getAllVehicles);
router.get("/get-tolls", hostAuth, userCtrl.getAllTolls);

router.post("/add-vehicle", hostAuth, userCtrl.addVehicle);
router.post("/validate-receipt", hostAuth, userCtrl.validateReceipt);
router.post("/issue-receipt", hostAuth, userCtrl.issueReceipt);

module.exports = router;
