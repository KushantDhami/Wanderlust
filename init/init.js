const mongoose=require("mongoose")
let Listing=require("../Models/Listing")
const ans =require("./data")

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then((res)=>{console.log("connection success")
}).catch((err)=>{console.log("Error")})


const List=async ()=>{
    await Listing.deleteMany({});
     ans.data= ans.data.map((obj)=>({...obj,owner:'66e94c24464c8bf1b3002986'}))
    await Listing.insertMany(ans.data)
}
List()