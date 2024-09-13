const { instance } = require('../config/Razorpay')
const Course = require('../models/course.Model')
const User = require('../models/User.Model')
const mailSender = require('../utils/MailSender')
const courseEnrollmentEmail = require('../mail/CourseEntrollment')
const mongoose = require('mongoose')


exports.capturePayment = async (req, res) => {
    try {
        const{courseId}=req.body
        const{userId}=req.user.id
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: 'Course id is missing',
            })
        }
        const course=await Course.findById(courseId)
        if(!course){
            return res.status(400).json({
                success: false,
                message: 'Cannot find course',
            })
        }
        const uid=new mongoose.Types.ObjectId(userId)
        if(course.studentEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:'Student allready enrolled'
            })
        }

        const amount =course.price
        const currency="INR"
        const options={
            amount:amount*100,
            currency:currency,
            receipt:Date.now().toString(),
            notes:{
                courseId:courseId,
                userId:userId
            }
        }
        const paymentResponse=await instance.orders.create(options)
        console.log(paymentResponse)
        return res.status(200).json({
            success:true,
            message:'Payment done successfully',
            courseName:course.courseName,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            amount:paymentResponse.amount
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error while making payment',
        })
    }
}

