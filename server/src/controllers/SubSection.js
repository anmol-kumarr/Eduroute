const SubSection = require('../models/SubSection.Model')
const Section = require('../models/SubSection.Model')
const cloudinary = require('../utils/Cloudinary')

exports.subSectionCreate = async (req, res) => {
    try {
        const { sectionID, title, timeDuration, description } = req.body

        const { video } = req.files.video
        if (!sectionID, !title, !timeDuration, !description, !video) {

            return res.status(400).json({
                success: false,
                message: 'Fields cannot be empty'
            })
        }

        const uploadVideo = await cloudinary(video, process.env.FOLDER_NAME)

        const subSection = await SubSection.create({
            title, timeDuration, description, videoUrl: uploadVideo.secure_url
        })
        const updateSection = await Section.findByIdAndUpdate({ _id: sectionID }, { $push: { subSection: subSection._id } }, { new: true }).populate('SubSection')

        // log updated data by populating
        return res.status(200).json({
            success: true,
            message: 'Sub section added successfully',
            data: updateSection
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
        const { subSectionId,sectionID } = req.body
        if (!subSectionId) {

            return res.status(400).json({
                success: false,
                message: 'Subsection id is must'
            })
        }
        const deletedSubSection=await SubSection.findByIdAndDelete(subSectionId)
        const updateOnSection=await sectionID.findByIdAndUpdate({sectionID},{$pull:{subSection:subSectionId}},{new:true})
        return res.status(200).json({
            success:false,
            message:'subsection deleted successfully'
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting SubSection'
        })
    }
}