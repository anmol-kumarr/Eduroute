const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
        required: true
    },
    courseDescription: {
        type: String,
        trim: true,
        required: true
    },
    intructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    whatYouWillLearn: {
        type: String,
        required: true
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section'
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rating"
        }
    ],
    price: {
        type: Number,
        required: true
    },
    tag:{
        type:String,
        require:true
    },
    thumbnail: {
        type: String,
        required: true
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    },
    studentEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }]
})

module.exports = mongoose.model('Course', courseSchema)