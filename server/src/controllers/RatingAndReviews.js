const { default: mongoose } = require('mongoose')
const Course = require('../models/course.Model.js')
const RatingAndReviews = require('../models/RatingAndReviews.Model.js')


exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id
        const { courseId, rating, reviews } = req.body
        const courseDetails = await Course.findOne({ _id: courseId, studentEnrolled: { $elemMatch: { $eq: userId } } })

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: 'Course not found'
            })
        }
        const alreadyRated = await RatingAndReviews.findOne({ user: userId, course: courseId })

        if (alreadyRated) {
            return res.status(403).json({
                success: false,
                message: 'Already reviewd by user'
            })
        }

        const ratingReviews=await RatingAndReviews.create({
            rating:rating,
            course:courseId,
            user:userId,
            reviews:reviews
        })

        await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReviews:ratingReviews._id}},{new:true})

        return res.status(200).json({
            succes:true,
            message:'Successfully added rating and reviews'
        })
    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success:false,
            message:'Fail while adding reviews'
        })
    }
}


exports.getAverageRating=async(req,res)=>{
    try{
        const courseId=req.body.courseId
        const result=await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:'$rating'}
                }
            }
        ])

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }else{
            return res.status(200).json({
                success:true,
                message:'Average rating is 0 till now no rating',
                averageRating:0
            })
        }
    }catch(err){
        //console.log(err)
        return res.status(500).json({
            success:false,
            message:'Something went wrong while fetching average rating'
        })
    }
}

exports.getAllRating=async(req,res)=>{
    try{
        const getAllReviews=await RatingAndReviews.find({}).sort({rating:'desc'}).populate({
            path:'user',
            select:'firstName lastName email image'
        }).populate({
            path:'course',
            select:'courseName'
        })

        return res.status(200).json({
            success:false,
            message:'All rating fetched successfully',
            data:getAllReviews
        })
    }catch(err){
        //console.log(err)
        return res.status(500).json({
            success:false,
            message:'Something went  wrong while fetching ratings'
        })
    }
}