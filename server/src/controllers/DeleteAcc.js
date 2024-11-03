const Profile = require('../models/Profile.Model.js')
const User = require('../models/User.Model.js')
const Course = require('../models/course.Model.js')


exports.deleteUser = async (req, res) => {
    try {
        const id = req.user.id
        const findUser = await User.findById(id)
        //console.log(findUser)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const findProfile = await Profile.findByIdAndDelete(findUser.addtionalDetails)
        //console.log(findProfile)
        await User.findByIdAndDelete(findUser._id)

        // todo delete student from enrolled course 
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting Account'
        })
    }
}
