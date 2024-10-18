require('dotenv').config()
const Course = require('../models/course.Model')
const Categories = require('../models/Categories.model')
const User = require('../models/User.Model')
const { ImageUpload } = require('../utils/Cloudinary')
const Section = require('../models/Section.Model')

const SubSection =require('../models/SubSection.Model')
exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag, categories, status, instruction } = req.body
        const thumbnail = req.files.thumbnailImage
        if (!courseName, !courseDescription, !whatYouWillLearn, !price, !tag, !categories, !status, !instruction) {
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

        const thumbnailUpload = await ImageUpload(thumbnail, 'eduroute/thumbnail')
        console.log(thumbnailUpload)
        // create entry for course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            intructor: instructorDetails._id,
            price,
            tag,
            instruction,
            whatYouWillLearn,
            status,
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

exports.updateCourse = async (req, res) => {
    try {
        const { status, courseId } = req.body
        console.log('body', req.body)
        if (!status || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Data is missing'
            })
        }

        const response = await Course.findByIdAndUpdate(courseId, { status }).populate({
            path: 'intructor',
            populate: {
                path: 'addtionalDetails'
            }
        }).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        })
            .populate('categories').exec()


        return res.status(200).json({
            success: true,
            message: 'Course published',
            data: response
        })





    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
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
            success: true,
            message: 'courses fetched successfully',
            data: allCourses
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching courses'
        })
    }
}


exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params
        console.log(courseId)
        const courseDetails = await Course.findById({ _id: courseId }).populate({
            path: 'intructor',
            populate: {
                path: 'addtionalDetails'
            }
        }).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }).populate('categories')
        // .populate('ratingAndReviews').
        exec()
        console.log(courseDetails)
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: 'cannot find course'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Course detail fetched successfully',
            data: courseDetails
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Something went wrong fetching course details'
        })
    }
}


exports.getInstructorCourse = async (req, res) => {
    try {
        const instructorId = req.user.id
        const response = await Course.find({ intructor: instructorId }).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }).populate({
            path: 'categories'
        }).populate({
            path: 'studentEnrolled'
        }).exec()
        // console.log(response)

        if (!response) {
            return res.status(404).json({
                success: true,
                message: 'No course found',
                data: null,
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'Course fetched successfully',
                data: response
            })
        }


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.body
        const instructorId = req.user.id
        const course = await Course.findById(id)
        const section = course?.courseContent
        if (section && section.length > 0) {
            for (const sectionId of section) {

            

                const sectionResponse = await Section.findById(sectionId)
                if (sectionResponse) {

                    console.log('section response:', sectionResponse)
                    const subSectionIds = sectionResponse?.subSection


                    if (subSectionIds && subSectionIds.length > 0) {

                        console.log('section ids:', subSectionIds)
                        await SubSection.deleteMany({ _id: { $in: subSectionIds } })

                    }
                    
                    await Section.findByIdAndDelete(sectionId)
                }

            
            }

        }

        const delCourse = await Course.findByIdAndDelete(id)
        const courseResponse = await Course.find({ intructor: instructorId }).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }).populate({
            path: 'categories'
        }).populate({
            path: 'studentEnrolled'
        }).exec()
        // console.log(response)


        return res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
            data: courseResponse
        })



    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error while deleting course',
            data:err.message
        })
    }
}


exports.getCategoryCourse=async(req,res)=>{
    const {id}=req.params
    try{
        const courseResponse=await Course.find({categories:id}).populate({
            path: 'intructor',
            populate: {
                path: 'addtionalDetails'
            }
        }).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        })
        // .populate('ratingAndReviews')
        .populate('categories').exec()
        console.log(courseResponse)
        if(courseResponse.length===0){
            return res.status(404).json({
                success:true,
                message:'Course not found releated to this categories'
            })
        }else{
            return res.status(200).json({
                success:true,
                message:'Course fechted successfully',
                data:courseResponse
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}