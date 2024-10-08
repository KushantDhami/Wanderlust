if(process.env.NODE_ENV!="production")
{
    require("dotenv").config();
}

const express=require("express")
const app=express()
let port=8080
const path=require("path")

const ExpressError = require("./utils/ExpressError.js")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
const mongoose=require("mongoose")
const methodOverride=require("method-override")
app.use(methodOverride("_method"))
let ejsengine =require("ejs-mate")
app.engine("ejs",ejsengine)
const listingsRouter = require("./routes/listing.js");
const reviewRouter =   require("./routes/review.js")
const userRouter = require("./routes/user.js")
const session = require("express-session")
const flash = require("connect-flash")
const passport=require("passport")
const LocalStrategy = require("passport-local")
const User = require("./Models/User.js")



const sessionOption = {
    secret:"the secret key",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24  * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}

app.use(session(sessionOption))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.currUser=req.user
    next()
})

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then((res)=>{console.log("connection success")
}).catch((err)=>{console.log("Error")})

app.use("/listings",listingsRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)

app.listen(port,()=>{
    console.log(`port is listning on ${port}`)
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})

app.use((err,req,res,next)=>{
   let {statuscode=500,message="something went wrong"}= err
   res.render("error.ejs",{message})
})

