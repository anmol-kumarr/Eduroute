const User = require('../models/User.Model')

const mailSender = require('../utils/MailSender')
const bcrypt = require('bcrypt')

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(401).json({
                success: false,
                message: 'Email is not registered'
            })
        }

        const token = crypto.randomUUID()
        const updateToken = await User.findOneAndUpdate({ email: email }, { token: token, expiresIn: Date.now() + 3 * 60 * 1000 }, { new: true })
        //console.log(updateToken)
        const forgetPasswordUrl = ` http://localhost:3000/update-password/${token}`;
    
        await mailSender(email, "password reset link", `Password reset link${forgetPasswordUrl}`)
        return res.status(200).json({
            success: true,
            message: 'Mail sent successfully'
        })

    } catch (err) {
        //console.log(err)
        res.status(500).json({
            success: false,
            message: 'error while forget password'
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Confirm Password not matching'
            })
        }
        const userDetails = await User.findOne({ token })
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token'
            })
        }
        if (userDetails.expiresIn < Date.now()) {
            return res.status(401).json({
                success: false,
                message: 'Token is expries'
            })
        }

        const hashedPassword =await bcrypt.hash(password,10)

        const updatePassword = await User.findByIdAndUpdate({_id:userDetails._id }, { password: hashedPassword }, { new: true })

        return res.status(200).json({
            success: true,
            message: 'Password rest successfully'
        })


    } catch (err) {
        //console.log(err)
        res.status(500).json({
            success: false,
            message: 'error While password forget'
        })
    }
}