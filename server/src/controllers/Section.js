const Section = require('../models/Section.Model.js')
const SubSectionModel = require('../models/SubSection.Model.js')
const Course = require('../models/course.Model.js')
// const { User } = require('./Profile')


exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const sectionCreate = await Section.create({ sectionName })
        const updateCourse = await Course.findByIdAndUpdate(courseId, { $push: { courseContent: sectionCreate._id } }, { new: true }).populate('courseContent')

        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            data: updateCourse
        })

    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while created section'
        })
    }
}


exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId,courseId } = req.body
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'Fields are required'
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })
        const response=await  Course.findById(courseId).populate({
            path:'courseContent',
            populate:{
                path:'subSection'
            }
        })

        return res.status(200).json({
            success: true,
            message: 'section updated successfully',
            data:response
        })

    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating section'
        })
    }
}


exports.deleteSection = async (req, res) => {
    try {
        // //console.log('req.params-',req.params)
        const {courseId,sectionId } = req.body
        // //console.log('sectionId',id)
        const sectionData = await Section.findById(sectionId)
        const subsectionIds = sectionData?.subSection

        subsectionIds && await SubSectionModel.deleteMany({ _id: { $in: subsectionIds } })

        await Section.findByIdAndDelete(sectionId)
        const response=await Course.findByIdAndUpdate(courseId,{$pull:{ courseContent: sectionId }}).populate({
            path:'courseContent',
            populate:{
                path:'subSection'
            }
        })
        // Todo:do we need to delete from course
        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully',
            data:response
        })
    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting section'
        })
    }
}