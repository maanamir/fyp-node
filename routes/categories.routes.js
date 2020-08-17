const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const categoryController = require('../controllers/categories.controllers');

// router.get("/",productController.getAll);
// router.post("/add",productController.addProduct);
// // router.get("/:_id",productController.getSingleProduct);
// // router.put("/:_id", productController.updateProduct);
// router.delete("/:_id", productController.deleteProduct);
// router.put("/:_id", productController.updateProduct);

//router.get("/:_id",checkAuth,categoryController.getMyProducts);
router.get("/",categoryController.getAll);
router.post("/add",categoryController.addCategory);
//router.put("/:_id",checkAuth, categoryController.updateProduct);
//router.delete("/:_id",checkAuth, categoryController.deleteProduct);

module.exports = router;