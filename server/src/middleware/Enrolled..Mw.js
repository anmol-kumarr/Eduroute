const mongoose = require('mongoose')
const Course = require('../models/course.Model.js')
exports.isEnrolled = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const userId = req.user.id

        const course = await Course.findById(courseId)
        //console.log("course",course)
    
        const uid = new mongoose.Types.ObjectId(userId)
        if (course.studentEnrolled.includes(uid)) {
            next()
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'Student is not ernolled in this course'
            })
        }


    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error while verifying student'
        })
    }
}