const express=require("express")
const router=express.Router()
const User=require("../Models/User")
const wrapAsync=require("../utils/wrapasync")
const passport=require("passport")
const { saveRedirectUrl } = require("../middleware")
const userController = require("../controllers/user")

router.route("/singup")
.get(userController.renderSingUpForm)
.post(wrapAsync(userController.singUp))


router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
wrapAsync(userController.login))

router.get("/logout",userController.logout)

module.exports=router