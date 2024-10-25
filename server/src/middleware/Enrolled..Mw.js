const mongoose  = require('mongoose')
const Course=require('../models/course.Model')
exports.isEnrolled=async(req,res,next)=>{
    try{
        const {courseId}=req.body
        const userId=req.user.id

        const course=await Course.findById(courseId)
        const uid=new mongoose.Types.ObjectId(userId)
        if(!course.studentEnrolled.includes(uid)){
            return res.status(404).json({
                success:false,
                message:'Student is not ernolled in this course'
            })
        }

        next()


    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:'Error while verifying student'
        })
    }
}