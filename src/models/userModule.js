import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide user name"],
        unique:[true,"creat a unique Username"]
    },
    email:{
        type:String,
        required:[true,"please provide user email"],
        unique:[true,"creat a unique email"]
    },
    password:{
        type:String,
        required:[true,"please provide user password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})
const User = mongoose.models.User || mongoose.model("User",userSchema)
export default User;