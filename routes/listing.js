const express=require("express")
const router=express.Router()
let Listing=require("../Models/Listing")
const wrapAsync=require("../utils/wrapasync.js")
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer=require("multer")
const {storage}=require("../cloudconfig.js")
const upload= multer({storage})
router
.route("/").get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing))

    

router.get("/new",isLoggedIn,listingController.renderNewForm)

router.route("/:id").get(wrapAsync(listingController.showListings))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.editListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))



module.exports=router