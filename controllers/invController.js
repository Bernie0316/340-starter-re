const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getDetailByInvId(inv_id)
  const grid = await utilities.buildDetailGrid(data)
  let nav = await utilities.getNav()
  const invName = `${data[0].inv_make} ${data[0].inv_model}`
  res.render("./inventory/detail", {
    title: invName + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  // const data = await invModel.getAllInventory()
  // const grid = await utilities.buildManagementGrid(data)
  let nav = await utilities.getNav()

  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    // grid,
    Message: req.flash("notice"),
  })
}

/* ***************************
 *  Build inventory by AddClassification view
 * ************************** */
invCont.buildAddClassification = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add-classification",
    nav,
    errors: null
  })
}

/* ****************************************
*  Process add-classification
* *************************************** */
invCont.addClassification = async function(req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(
    classification_name
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you added ${classification_name} to the database.`
    )
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", 'Sorry, there was an error adding the classification.')
    res.status(501).render("inventory/add-classification", {
      title: "Add-classification",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 *  Build inventory by AddInventory view
 * ************************** */
invCont.buildAddInventory = async function(req, res, next) {
  // const classification_id = req.params.classificationId
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add-inventory",
    nav,
    classificationSelect,
    errors: null
  })
}

/* ****************************************
*  Process add-inventory
* *************************************** */
invCont.addInventory = async function(req, res) {
  let nav = await utilities.getNav()
  const {
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  } = req.body

  const regResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you added ${inv_make} ${inv_model} to the database.`
    )
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    let classificationSelect = await utilities.buildClassificationList()
    req.flash("notice", 'Sorry, there was an error adding the inventory item.')
    res.status(501).render("inventory/add-inventory", {
      title: "Add-inventory",
      nav,
      classificationSelect,
      errors: null,
    })
  }
} 

module.exports = invCont