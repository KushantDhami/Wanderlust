const express=require("express")
const router=express.Router({mergeParams:true})
const wrapAsync=require("../utils/wrapasync.js")
const ExpressError=require("../utils/ExpressError.js")
const Review=require("../Models/review.js")
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware")
let Listing=require("../Models/Listing")
const reviewController = require("../controllers/review")


router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))

module.exports=router