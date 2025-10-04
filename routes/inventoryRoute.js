// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const invController = require("../controllers/invController")
const regValidate = require("../utilities/inv-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
router.get("/edit/:invId", utilities.handleErrors(invController.editInventoryView));

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

/* ****************************************
*  Process add-classification
*  
* *************************************** */
router.post(
  "/add-classification",
  regValidate.classificationRules(),
  regValidate.checkClsData,
  utilities.handleErrors(invController.addClassification)
)

/* ****************************************
*  Process add-inventory
* *************************************** */
router.post(
  "/add-inventory",
  regValidate.inventoryRules(),
  regValidate.checkInvData,
  utilities.handleErrors(invController.addInventory)
)

/* ****************************************
*  Process edit-inventory
* *************************************** */
router.post(
  "/update/", 
  regValidate.inventoryRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory))

module.exports = router;