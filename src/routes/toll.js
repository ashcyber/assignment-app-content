const express = require("express");
const router = express.Router();

const tollCtrl = require("../controllers/toll");

router.post("/create-toll", tollCtrl.createToll);
router.get("/check-history", tollCtrl.checkHistory);

module.exports = router;
