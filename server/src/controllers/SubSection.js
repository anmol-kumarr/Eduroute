const { mongoose } = require('mongoose')
const SubSection = require('../models/SubSection.Model')
const Section = require('../models/Section.Model')
const {ImageUpload} = require('../utils/Cloudinary')

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body

        const video  = req?.files?.video

        console.log('data of sub section creation',sectionId,title,timeDuration,description,video)
        if (!sectionId, !title, !timeDuration, !description, !video) {

            return res.status(400).json({
                success: false,
                message: 'Fields cannot be empty'
            })
        }

        const uploadVideo = await ImageUpload(video, 'eduroute/videos')

        const subSection = await SubSection.create({
            title, timeDuration, description, videoUrl: uploadVideo.secure_url
        })

        console.log(subSection)
        console.log('seciton id-',sectionId)
    
        const updateSection = await Section.findByIdAndUpdate(sectionId,{ $push:{subSection:subSection._id } }, { new: true }).populate('subSection')

        console.log(updateSection)


        // const find=await Section.findById(sectionId)
        // console.log("find-",find)
    
        return res.status(200).json({
            success: true,
            message: 'Sub section added successfully',
            data: updateSection,
            
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while created Sub Section'
        })
    }
}







exports.updateSubsection = async (req, res) => {
    try {
        const { subSectionId, title, description } = req.body

        if (!subSectionId, !title, !description) {

            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const updateSectionData = await SubSection.findByIdAndUpdate({ _id: subSectionId }, { title, description }, { new: true })
        return res.status(200).json({
            success: true,
            message: "sub section updated successfully",
            data: updateSectionData
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
        const { subSectionId,sectionId } = req.body
        if (!subSectionId) {

            return res.status(400).json({
                success: false,
                message: 'Subsection id is must'
            })
        }
        const deletedSubSection=await SubSection.findByIdAndDelete(subSectionId)
        const updateOnSection=await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true})
        return res.status(200).json({
            success:false,
            message:'subsection deleted successfully',
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting SubSection'
        })
    }
}