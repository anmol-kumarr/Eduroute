const Section = require('../models/Section.Model')
const Course = require('../models/course.Model')


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
        const updateCourse = await Course.findByIdAndUpdate({ courseId }, { $push: { courseContent: sectionCreate._id } }, { new: true }).populate('Section').populate('Section.SubSection')

        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            data: updateCourse
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while created section'
        })
    }
}


exports.updateSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body
        if (!sectionName, courseId) {
            return res.status(400).json({
                success: false,
                message: 'Fields are required'
            })
        }

        const updatedSection = await Section.findByIdAndUpdate({ courseId }, { sectionName }, { new: true })

        return res.status(200).json({
            success: true,
            message: 'section updated successfully'
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating section'
        })
    }
}


exports.deleteSection = async (req, res) => {
    try {
        const { secitonID } = req.params
        await Section.findByIdAndDelete(secitonID)
        // Todo:do we need to delete from course
        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting section'
        })
    }
}