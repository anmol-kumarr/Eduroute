const mongoose=require('mongoose')


const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:2*60
    }

})

module.exports=mongoose.Schema('OTP',otpSchema)