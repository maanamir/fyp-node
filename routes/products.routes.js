const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products.controllers');

// router.get("/",productController.getAll);
// router.post("/add",productController.addProduct);
// // router.get("/:_id",productController.getSingleProduct);
// // router.put("/:_id", productController.updateProduct);
// router.delete("/:_id", productController.deleteProduct);
// router.put("/:_id", productController.updateProduct);

router.get("/:_id",productController.getMyProducts);
router.get("/items/:_categorytype&:_key",productController.getSearchedProducts);
router.get("/items/:category&:brand&:city&:storeName&:name",productController.getAdvancedPlusProducts);
router.get("/",checkAuth,productController.getAll);
router.get("/advance/search",productController.getAdvancedSearch);
router.get("/newproductid/for/deallist",productController.newProductIdForDealList);
router.post("/add",checkAuth,productController.addProduct);
router.put("/:_id", productController.updateProduct);




router.delete("/:_id",checkAuth, productController.deleteProduct);

module.exports = router;