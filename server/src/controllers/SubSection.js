const { mongoose } = require('mongoose')
const SubSection = require('../models/SubSection.Model.js')
const Section = require('../models/Section.Model.js')
const Course = require(('../models/course.Model.js'))
const { ImageUpload } = require('../utils/Cloudinary.js')

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, courseId, title, timeDuration, description } = req.body

        const video = req?.files?.video

        //console.log('data of sub section creation',sectionId,title,timeDuration,description,video)
        if (!sectionId, courseId, !title, !timeDuration, !description, !video) {

            return res.status(400).json({
                success: false,
                message: 'Fields cannot be empty'
            })
        }

        const uploadVideo = await ImageUpload(video, 'eduroute/videos')

        const subSection = await SubSection.create({
            title, timeDuration, description, videoUrl: uploadVideo.secure_url
        })

        //console.log(subSection)
        //console.log('seciton id-',sectionId)

        const updateSection = await Section.findByIdAndUpdate(sectionId, { $push: { subSection: subSection._id } }, { new: true }).populate('subSection')
        const response = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        })

        //console.log(updateSection)


        // const find=await Section.findById(sectionId)
        // //console.log("find-",find)

        return res.status(200).json({
            success: true,
            message: 'Sub section added successfully',
            data: response

        })

    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while created Sub Section'
        })
    }
}







exports.updateSubsection = async (req, res) => {
    try {
        const { sectionId, timeDuration, video, subSectionId, title, description } = req.body
        const files = req?.files

        if (!subSectionId ||!timeDuration || !title || !description || !sectionId) {

            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        let uploadVideo
        if (files?.video) {
            console.log(files?.video)
            const video = files.video
            uploadVideo = await ImageUpload(video, 'eduroute/videos')
        }



        const updateSubSectionData = await SubSection.findByIdAndUpdate(subSectionId, {
            title,
            description,
            timeDuration,
            videoUrl: uploadVideo ? uploadVideo.secure_url : video

        }, { new: true })

        console.log(updateSubSectionData)
        return res.status(200).json({
            success: true,
            message: "sub section updated successfully",
            data: updateSubSectionData,
            subSectionId,
            sectionId
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating sub section'
        })
    }
}





exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        if (!subSectionId) {

            return res.status(400).json({
                success: false,
                message: 'Subsection id is must'
            })
        }
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId)
        const updateOnSection = await Section.findByIdAndUpdate(sectionId, { $pull: { subSection: subSectionId } }, { new: true })
        return res.status(200).json({
            success: false,
            message: 'subsection deleted successfully',
        })

    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting SubSection'
        })
    }
}