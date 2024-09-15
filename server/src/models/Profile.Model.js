const mongoose=require('mongoose')

const profileSchema=new mongoose.Schema({
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String
    },
    about:{
        type:String,
        trim:true
    },
    mobile:{
        type:Number,
        trim:true
    }
},{timestamps:true})

module.exports=mongoose.model('Profile',profileSchema)
