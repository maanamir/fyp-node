const express = require("express");
const router = express.Router();
var schedule = require('node-schedule');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products.controllers');
const upload = require('./../config/upload');
// router.get("/",productController.getAll);
// router.post("/add",productController.addProduct);
// // router.get("/:_id",productController.getSingleProduct);
// // router.put("/:_id", productController.updateProduct);
// router.delete("/:_id", productController.deleteProduct);
// router.put("/:_id", productController.updateProduct);

router.get("/:_id",productController.getMyProducts);
router.get("/items/:_categorytype&:_key",productController.getSearchedProducts);
router.get("/basic/search",productController.getBasicProducts);
router.get("/items/:category&:brand&:city&:storeName&:name",productController.getAdvancedPlusProducts);
router.get("/",checkAuth,productController.getAll);
router.get("/advance/search",productController.getAdvancedSearch);
router.get("/newproductid/for/deallist",productController.newProductIdForDealList);
router.get("/newproductid/for/deallistUpload",productController.newProductIdForDealListUpload);
router.post("/add",checkAuth,productController.addProduct);
router.put("/:_id", productController.updateProduct);
router.get("/mid/Week/Sale",productController.getMidWeekProducts);
router.get("/week/End/Sale",productController.getWeekEndProducts);
router.put("/addtoReviewList/:pid", productController.AddToReviewList);


//router.get("/getmyReviewList/:pid", productController.AddToReviewList);
router.get("/getmyReviewList/:pid", productController.GetReviewList);
router.put("/removeFromReviewList/:pid", productController.removeReviewFromReviewList);
 //scheduling bro ;)
var j = schedule.scheduleJob('00 00 * * *', productController.deleteExpiredProducts);






router.delete("/:_id",checkAuth, productController.deleteProduct);

module.exports = router;