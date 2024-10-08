const mongoose=require("mongoose")
let Listing=require("../Models/Listing")
const ans =require("./data")

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then((res)=>{console.log("connection success")
}).catch((err)=>{console.log("Error")})


const List=()=>{
    Listing.insertMany(ans.data)
}
List()