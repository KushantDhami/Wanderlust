const Review = require("../Models/review")
const Listing = require("../Models/Listing")
module.exports.createReview=async(req,res)=>{
    let {id} = req.params;
    let listing= await Listing.findById(id)
    let newreview= new Review(req.body.review)
    newreview.author=req.user._id
    listing.reviews.push(newreview)


    await newreview.save()
    await listing.save()
    req.flash("success","New Review Created")
    res.redirect(`/listings/${listing._id}`)
}

module.exports.deleteReview=async (req,res)=>{
    const {id,reviewId } = req.params
    let listing=await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId }})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review delete")
    res.redirect(`/listings/${listing._id}`)
}