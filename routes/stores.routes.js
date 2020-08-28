const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const storeController = require('../controllers/stores.controllers');

router.get("/",storeController.getAll);
router.get("/customlist/:storetype",storeController.getCustomList);
// router.post("/add",productController.addProduct);
// // router.get("/:_id",productController.getSingleProduct);
// // router.put("/:_id", productController.updateProduct);
// router.delete("/:_id", productController.deleteProduct);
// router.put("/:_id", productController.updateProduct);

//router.get("/:_id",productController.getMyProducts);
//router.get("/items/:_categorytype&:_key",productController.getSearchedProducts);
//router.get("/",checkAuth,productController.getAll);
router.post("/add",storeController.addStore);
router.get("/confirmation/:token",storeController.confirmationToken);
router.post("/login",storeController.loginStore);

router.post("/register",storeController.registerStore);
router.post("/createdeal",storeController.createdeal);
router.post("/addProductIdToDeal",storeController.addProductToDeal);
router.get("/getmyDealList/:_id", storeController.GetMyDealList);
//router.put("/:_id", productController.updateProduct);



//router.delete("/:_id",checkAuth, productController.deleteProduct);

module.exports = router;