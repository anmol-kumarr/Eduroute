const Course = require('../models/course.Model')
const Tag = require('../models/Tags.model')
const User = require('../models/User.Model')
const { ImageUpload } = require('../utils/Cloudinary')

exports.createCrouse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body
        const thumbnail = req.files.thumbnailImage
        if (!courseName, !courseDescription, !whatYouWillLearn, !price, !tag) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required'
            })
        }
        // check intructor
        const userId = req.user.id
        const instructorDetails = await User.findById(userId)
        console.log("instructor details", instructorDetails)

        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: 'Instructor details not found'
            })
        }
        // check tag 
        const tagDetails = await Tag.findById(tag)
        if (!tagDetails) {
            return res.status(400).json({
                success: false,
                message: 'Tag details not found'
            })
        }

        // upload thumbnail

        const thumbnailUpload = ImageUpload(thumbnail, process.env.FOLDER_NAME)
        // create entry for course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            intructor: instructorDetails._id,
            price,
            whatYouWillLearn,
            tag: tagDetails._id,
            thumbnail: thumbnailUpload.secure_url
        })

        // add the new course to instructor


        const addCourseInstructor = await User.findByIdAndUpdate({ _id: instructorDetails._id }, { $push: { courses: newCourse._id } }, { new: true })


        return res.status(200).json({
            success: true,
            message: 'Course created successfully',
            data: newCourse
        })



    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while created course'
        })
    }
}



exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            whatYouWillLearn: true,
            price: true,
            instructor: true,
            ratingAndReviews: true,
            studentEnrolled: true
        }).populate('instructor')

        return res.status(200).json({
            success:true,
            message:'courses fetched successfully',
            data:allCourses
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching courses'
        })
    }
}