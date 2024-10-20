const { instance } = require('../config/Razorpay')
const Course = require('../models/course.Model')
const User = require('../models/User.Model')
const mailSender = require('../utils/MailSender')
const courseEnrollmentEmail = require('../mail/CourseEntrollment')
const mongoose = require('mongoose')



exports.capturPayment = async (req, res) => {
    const { courseId } = req.body
    const userId = req.user.id

    if (courseId?.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'CourseId is empty'
        })
    }

    let totalAmount = 0

    for (const course_id of courseId) {
        let course
        try {
            course = await Course.findById(courseId)
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot find course'
                })
            }
            const uid = new mongoose.Schema.ObjectId(userId)
            if (course.studentEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: 'Student allready enrolled'
                })
            }
            totalAmount += course.price
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'internal server error'
            })
        }
    }
    const options = {
        amount: totalAmount,
        currency: "INR",
        receipt: Math.random(Date.now().toString())
    }

    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success: true,
            message: paymentResponse
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'could not intiate order'
        })
    }

}
exports.verifyPayemnt = async (req, res) => {
    const razorpayOrderId = req.body?.razorpayOrderId
    const razorpayPaymentId = req.body?.razorpayPaymentId
    const razorpaySignature = req.body?.razorpaySignature
    const courses = req?.body?.courses
    const userId = req.user.id


    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !courses) {
        return res.status(204).json({
            success: false,
            message: 'Payment failed'
        })
    }

    let body = razorpayOrderId + "|" + razorpayPaymentId
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex')

    if (razorpaySignature === expectedSignature) {

        await enrollStudent(courses, userId, res)

        return res.status(200).json({
            success: true,
            message: 'payment verified'
        })
    }
    return (500).json({
        success: false,
        message: 'Payment verification failed'
    })
}





const enrollStudent = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(204).json({
            success: false,
            message: 'Fields are missing'
        })
    }

    for (const courseId of courses) {
        try {

            const enrolledCourse = await Course.findByIdAndUpdate({ courseId }, { $push: { studentEnrolled: userId } }, { new: true })
            if (!enrolledCourse) {
                return res.status(400).json({
                    success: false,
                    message: 'Course not found'
                })
            }

            const userEnroll = await User.findByIdAndUpdate({ userId }, { $push: { courses: courseId } }, { new: true })
            const template = courseEnrollmentEmail(enrolledCourse?.courseName, userEnroll?.firstName)
            const emailResponse = await mailSender(userEnroll.email, 'Confirmation mail from Eduroute', template)
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:'internal server error'
            })
        }
        }

}























// exports.capturePayment = async (req, res) => {
//     try {
//         const { courseId } = req.body
//         const { userId } = req.user.id
//         if (!courseId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Course id is missing',
//             })
//         }
//         const course = await Course.findById(courseId)
//         if (!course) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Cannot find course',
//             })
//         }
//         const uid = new mongoose.Types.ObjectId(userId)
//         if (course.studentEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Student allready enrolled'
//             })
//         }

//         const amount = course.price
//         const currency = "INR"
//         const options = {
//             amount: amount * 100,
//             currency: currency,
//             receipt: Date.now().toString(),
//             notes: {
//                 courseId: courseId,
//                 userId: userId
//             }
//         }
//         const paymentResponse = await instance.orders.create(options)
//         console.log(paymentResponse)
//         return res.status(200).json({
//             success: true,
//             message: 'Payment done successfully',
//             courseName: course.courseName,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             amount: paymentResponse.amount
//         })

//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: 'Error while making payment',
//         })
//     }
// }

// exports.verifySignature = async (req, res) => {
//     const webHooksSecret = '123456789'
//     const signature = req.header["x-razorpay-signature"]

//     const shasum = crypto.createHmac('sha256', webHooksSecret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest('hex')

//     if (signature === digest) {
//         console.log('payment is authorized')
//         const { courseId, userId } = req.body.payload.payment.entity.notes
//         try {

//             const enrolledCourse = await Course.findByIdAndUpdate({ _id: courseId }, { $push: { studentEnrolled: userId } }, { new: true })

//             if (!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Course not found'
//                 })
//             }

//             const student=await User.findOneAndUpdate({_id:userId},{$push:{course:courseId}},{new:true})

//             console.log(student)

//             // send mail

//             const emailResponse=await mailSender(
//                 student.email,
//                 "Congratulation from codehelp",
//                 "You are enrolled into Our course"
//             )
//             console.log(emailResponse)
//             return res.status(200).json({
//                 success:true,
//                 message:'Student enrolled'
//             })

//         } catch (err) {
//             console.log(err)
//             res.status.json({
//                 success:false,
//                 message:'server error while enrolling student'
//             })
//         }
//     }

//     else{
//         return res.status(400).json({
//             success:false,
//             message:'Signature not matched'
//         })
//     }


// }
