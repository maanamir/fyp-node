const express = require("express");
const router = express.Router();

const UserController = require('../controllers/users.controllers');
const checkAuth = require('../middleware/check-auth');
const upload = require('./../config/upload');

// router.get("/",UserController.sampleUser);
router.get("/",UserController.getAll);


router.post("/login",UserController.loginUser);
router.post("/checkPass",UserController.checkPassword);
router.post("/register",UserController.registerUser);
router.get("/:_id",UserController.getSingleUser);
router.get("/getmyWishList/:_id",checkAuth, UserController.GetMyWishList);
// router.post("/",UserController.addUser);
router.put("/:_id",checkAuth, UserController.updateUser);
router.put("/updatePass/:_id",checkAuth, UserController.updatePassword);


//_id (which is the id of the user to be updated )
router.put("/addtoWishList/:_id", UserController.AddProductToWishList);
router.put("/removeFromWishList/:_id", UserController.removeProductFromWishList);
router.delete("/:_id", UserController.deleteUser);
router.put("/upload/:type/:id",upload.single('file'), UserController.uploadAvatar);
//router.get("uploads", UserController.getAvatar);

router.get("/confirmation/:token",UserController.confirmationToken);

module.exports = router;