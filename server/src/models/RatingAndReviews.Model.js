const mongoose=require('mongoose')

const ratingAndReviewsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    ratings:{
        type:Number,
        required:true
    },
    reviews:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Rating',ratingAndReviewsSchema)