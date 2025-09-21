// Needed Resources 
const express = require("express")
const router = new express.Router() 
// const invController = require("../controllers/invController")
const triggerController = require("../controllers/triggerController")

// Route to build a system error
// router.get("/error/trigger", triggerController.throwError)
router.get("/trigger", triggerController.triggerController);

module.exports = router;