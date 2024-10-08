const Listing =require("../Models/Listing.js")

module.exports.index=async(req,res)=>{
    let listings=await Listing.find() 
    res.render("index.ejs",{listings})
}

module.exports.renderNewForm =(req,res)=>{
    res.render("new.ejs")
}

module.exports.showListings =async (req,res)=>{
    let {id}=req.params
    let listing = await Listing.findById(id).populate({path :"reviews",
        populate:{path : "author"}}).populate("owner")
    if(!listing){
        req.flash("error","listing not found")
        res.redirect("/listings")
    }
    res.render("show.ejs",{listing})
}

module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path
    let filename=req.file.filename
    let listing= new Listing(req.body.listing)
    listing.image={url ,filename}
    listing.owner = req.user._id
    await listing.save()

    req.flash("success","New Listing Created")
    res.redirect("/listings")
}

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params
    let listing=await  Listing.findById(id)
    if(!listing){
        req.flash("error","listing not found")
        res.redirect("/listings")
    }
    let originalUrl=  listing.image.url
   let image = originalUrl.replace("/upload","/upload/w_250")
    res.render("edit.ejs",{listing,image})
}

module.exports.editListing=async (req,res)=>{
    let {id}=req.params
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file!== "undefined")
        {
         let url=req.file.path
         let filename=req.file.filename
         listing.image={url,filename}
         await listing.save()
        }
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`)
}

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params
    let list=await Listing.findByIdAndDelete(id)
    req.flash("success","Listing delete")
    res.redirect("/listings")
}