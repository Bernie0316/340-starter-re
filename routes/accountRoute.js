const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister))
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))
router.get("/update/:accountId", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountUpdate))
router.get("/logout", accountController.accountLogout)

/* ****************************************
*  Process Registration
* *************************************** */
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

/* ****************************************
*  Process Registration
* *************************************** */
router.post(
  "/login",
  // regValidate.loginRules(),
  // regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

/* ****************************************
*  Process Account imformation update
* *************************************** */
router.post(
  "/update-account",
  regValidate.accountRules(),
  regValidate.checkAccountData,
  utilities.handleErrors(accountController.updateAccount)
)

/* ****************************************
*  Process password update
* *************************************** */
router.post(
  "/update-password",
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.updatePassword)
)

module.exports = router;