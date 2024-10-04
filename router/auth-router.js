const express = require("express");
const router=express.Router();
const {home,register,login,user} =require('../controllers/auth-controller');
const signupSchema=require("../validation/auth-validation");
const validate=require('../middlewares/validate-middleware');
const authMiddleware=require('../middlewares/auth-Middleware');

router.route("/").get(home);
router.route("/register").post(validate(signupSchema),register);
router.route("/login").post(login);
router.route("/user").get(authMiddleware,user);
module.exports=router;