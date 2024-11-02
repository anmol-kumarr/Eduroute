const mongoose=require('mongoose')

const ratingAndReviewsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rating:{
        type:Number,
        required:true
    },
    reviews:{
        type:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }
},{timestamps:true})

module.exports=mongoose.model('Rating',ratingAndReviewsSchema)