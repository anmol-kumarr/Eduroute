const Profile = require('../models/Profile.Model')
const User = require('../models/User.Model')
const Course = require('../models/course.Model')


exports.deleteUser = async (req, res) => {
    try {
        const id = req.body.User
        const findUser = await User.findById(id)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const findProfile = await Profile.findByIdAndDelete({ _id: findUser.addtionalDetails })
        await User.findByIdAndDelete({ _id: findUser._id })

        // todo delete student from enrolled course 
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting Account'
        })
    }
}
