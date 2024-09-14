const Course = require('../models/course.Model')
const Categories = require('../models/Categories.model')
const User = require('../models/User.Model')
const { ImageUpload } = require('../utils/Cloudinary')

exports.createCrouse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag,categories } = req.body
        const thumbnail = req.files.thumbnailImage
        if (!courseName, !courseDescription, !whatYouWillLearn, !price, !tag,!categories) {
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
        const categoriesDetails = await Categories.findById(categories)
        if (!categoriesDetails) {
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
            tag,
            whatYouWillLearn,
            categories: categoriesDetails._id,
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
            studentEnrolled: true,
            // categories:true
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


exports.getCourseDetails=async(req,res)=>{
    try{
        const {courseId}=req.body
        const courseDetails=await Course.findById({_id:courseId}).populate({
            path:'instructor',
            populate:{
                path:'addtionalDetails'
            }
        }).populate({
            path:'courseContent',
            populate:{
                path:'subSection'
            }
        }).populate('ratingAndReviews').populate('categories').exec()

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:'cannot find course'
            })
        }

        return res.status(200).json({
            success:true,
            message:'Course detail fetched successfully',
            data:courseDetails
        })

    }catch(err){
        console.log(err)
        res.status(200).json({
            success:false,
            message:'Something went wrong fetching course details'
        })
    }
}