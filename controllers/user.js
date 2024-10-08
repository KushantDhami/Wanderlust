const User = require("../Models/User")

module.exports.renderSingUpForm=(req,res)=>{
  res.render("users/singup.ejs",{name:"sing Up"})
}

module.exports.singUp=async (req,res,next)=>{
  try{
  let {username,email,password}=req.body
  const newUser=new User({email,username})
  const registereduser= await User.register(newUser,password)

  req.login(registereduser , function (err){
      if(err){
        return next(err)
      }
      req.flash("success",`welcome ${username}`)
    res.redirect("/listings")
   })
   }
  catch(e){
      req.flash("error",e.message)
    return  res.redirect("/singup")
  }
}

module.exports.renderLoginForm=(req,res)=>{
  res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
  req.flash("success","Welcome to Wanderlust")
  let redirectUrl = res.locals.redirectUrl || "/listings"
  res.redirect(redirectUrl)
  }

  module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
       if(err){
          return next(err)
       }
       req.flash("success","Logout")
     return  res.redirect("/listings")
    })
}