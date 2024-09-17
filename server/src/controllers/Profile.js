const Profile = require('../models/Profile.Model')
const User = require('../models/User.Model')
const { ImageUpload } = require('../utils/Cloudinary')
const cloudinary = require('cloudinary')


exports.User = async (req, res) => {
    try {
        const { dateOfBirth = '', gender = '', about = null, contactNumber = '', } = req.body
        const id = req.user.id
        const userDetails = await User.findById(id)
        const profileId = userDetails.addtionalDetails

        const profileDetils = await Profile.findById(profileId)

        profileDetils.dateOfBirth = dateOfBirth
        profileDetils.gender = gender
        profileDetils.about = about
        profileDetils.contactNumber = contactNumber
        await profileDetils.save()
        return res.status(200).json({
            success: true,
            messsage: 'Profile updated successfully',
            profileDetails: profileDetils
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while Updating Updating user details'
        })
    }
}


exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id).populate({
            path: 'addtionalDetails'
        })


        if (!userDetails) {
            return res.status(404).json({
                succes: false,
                message: 'Cannot find user'
            })
        }

        return res.status(200).json({
            success: false,
            message: 'User details fetched successfully',
            data: userDetails
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching User'
        })
    }
}


exports.updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id
        const profilePicture = req.files.profilePicture
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Cannot find user'
            })
        }
        if (user.imageProfilePublicId) {
            const cloudinaryDestroyer = await cloudinary.uploader.destroy(user.imageProfilePublicId, function (error, result) {
                if (error) {
                    console.error('Error:', error);
                } else {
                    console.log('Deleted:', result);
                }
            })
        }

        const uploadImage = await ImageUpload(profilePicture, 'eduroute/profile',)
        console.log(uploadImage)
        const updateResponse = await User.findByIdAndUpdate(userId, {
            image: uploadImage.secure_url, imageProfilePublicId: uploadImage.public_id
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully',
            user: updateResponse
        })


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while uploading profile picture'
        })
    }
}


exports.updateAdditionalDetails = async (req, res) => {
    try {
        const userId = req.user.id
        const { gender, dateOfBirth, about, mobile } = req.body
        console.log(gender, dateOfBirth, about, mobile)

        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Cannot find user'
            })
        }

        const updateDetails = await Profile.findByIdAndUpdate(user.addtionalDetails, { gender, dateOfBirth, about, mobile }, { new: true })

        console.log(updateDetails)
        return res.status(200).json({
            success: false,
            message: 'User details updated successfully',
            updateDetails
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server error while updating profile details'
        })
    }
}