const { instance } = require('../config/Razorpay')
const Course = require('../models/course.Model')
const User = require('../models/User.Model')
const mailSender = require('../utils/MailSender')
const { courseEnrollmentEmail } = require('../mail/CourseEntrollment')
const mongoose = require('mongoose')
const { paymentSuccessEmail } = require('../mail/PaymentSuccessfull')
const { createHmac } = require('node:crypto');


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
            course = await Course.findById(course_id)
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Cannot find course'
                })
            }
            const uid = new mongoose.Types.ObjectId(userId)
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
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),

    }

    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success: true,
            data: paymentResponse
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'could not initiate order'
        })
    }

}
exports.verifyPayemnt = async (req, res) => {
    const razorpayOrderId = req.body?.razorpay_order_id
    const razorpayPaymentId = req.body?.razorpay_payment_id
    const razorpaySignature = req.body?.razorpay_signature
    const courses = req?.body?.courseId
    const userId = req.user.id


    console.log('req.body?.razorpayOrderId', req.body?.razorpay_order_id)
    console.log('req.body?.razorpayPaymentId', req.body?.razorpay_payment_id)
    console.log('req.body?.razorpaySignature', req.body?.razorpay_signature)
    console.log('req.body?.courses', req.body?.courseId)


    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !courses) {
        return res.status(204).json({
            success: false,
            message: 'Payment failed'
        })
    }

    let body = razorpayOrderId + "|" + razorpayPaymentId
    const expectedSignature = createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex')

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

    let courseList = []

    for (const courseId of courses) {
        try {

            const enrolledCourse = await Course.findByIdAndUpdate(courseId, { $push: { studentEnrolled: userId } }, { new: true })
            if (!enrolledCourse) {
                // return res.status(400).json({
                //     success: false,
                //     message: 'Course not found'
                // })
                continue
            }
            

            const userEnroll = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true })
            console.log(1)

            const template = courseEnrollmentEmail(enrolledCourse?.courseName, userEnroll?.firstName)
            const emailResponse = await mailSender(userEnroll.email, 'Confirmation mail from Eduroute', template)
            console.log("emailResponse", emailResponse)

            
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'internal server error'
            })
        }


    }

    // try {

    // const template = courseEnrollmentEmail

    // } catch (err) {
    //     console.log(err)
    //     return res.status(500).json({
    //         success: false,
    //         message: 'cannot send Enrollment mail'
    //     })
    // }
}


exports.sendPaymentEmail = async (req, res) => {
    try {
        console.log(req.body)
        const userId = req.user.id
        // const userId=req.body
        const { orderId, razorpay_payment_id, amount } = req.body
        console.log('orderId', orderId)
        console.log('razorpay_payment_id', razorpay_payment_id)
        console.log('amount', amount)

        if (!orderId || !razorpay_payment_id || !amount) {
            return res.status(203).json({
                success: false,
                message: 'field are empty',
            })
        }

        const findUser = await User.findById(userId)
        if (findUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }


        const mailTemplate = paymentSuccessEmail(findUser.firstName, amount / 100, orderId, razorpay_payment_id)
        const mailResponse = await mailSender(findUser.email, 'Payment successfully mail', mailTemplate)
        if (mailResponse) {
            return res.status(200).json({
                success: true,
                message: 'Payment verification mail send successfully'
            })
        }

    } catch (err) {
        console.log('mail error', err)
        return res.status(500).json({
            success: false,
            message: 'Error while sending mail'
        })
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
