const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
// const regValidate = require('../utilities/account-validation')


/* ****************************************
*  Deliver login view
*  
* *************************************** */
router.get("/login", utilities.handleErrors(accountController.buildLogin))
/* ****************************************
*  Deliver registration view
*  
* *************************************** */
router.get("/register", utilities.handleErrors(accountController.buildRegister))


// Process the registration data
// router.post("/registration", utilities.handleErrors(accountController.registerAccount))
// router.post(
//   "/registration",
//   regValidate.registationRules(),
//   regValidate.checkRegData,
//   utilities.handleErrors(accountController.registerAccount)
// )

module.exports = router;