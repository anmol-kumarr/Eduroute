require('dotenv').config()
const User = require('../models/User.Model')
const Otp = require('../models/Otp.model')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const Profile = require('../models/Profile.Model')
const jwt = require('jsonwebtoken')
//--------------------------- create otp --------------------------

exports.createOtp = async (req, res) => {
    try {
        const { email } = req.body
        const findEmail = await User.findOne({ email })
        if (findEmail) {
            return res.status(401).json(({
                success: false,
                message: 'user already exists'
            }))
        }
        // otp generator 
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })

        // const findOtp = await Otp.findOne({ otp })
        // check if genertaed otp is present in db or not if yes then it may create conflict
        // while (findOtp) {
        //     otp = otpGenerator.generate(6, {
        //         lowerCaseAlphabets: false,
        //         upperCaseAlphabets: false,
        //         specialChars: false
        //     })
        //     findOtp = await Otp.findOne({ otp })
        // }
        // when findotp is false means otp is not in db and otp is unique and while loop breaked 
        const payload = { email, otp }

        const otpBody = await Otp.create(payload)
        console.log(otpBody)
        // create entry in db of otp

        res.status(200).json({
            success: true,
            message: 'Otp generated'
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'some thing went wrong '
        })
    }
}


// ------------------------------ sign up ------------------------


// exports.signUp = async (req, res) => {

//     try {

//         const { firstName, mobileNumber, lastName, email, password, confirmPassword, accountType, otp } = req.body

//         console.log('email', email,
//             'firstname', firstName,
//             lastName,
//             password,
//             confirmPassword,
//             accountType,
//             otp)


//         if (!firstName || !lastName || !email || !password || !otp || !mobileNumber) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'All fields are required'
//             })
//         }




//         if (password.trim() !== confirmPassword.trim()) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Confirm password not matched"
//             })
//         }

//         const existingUser = await User.findOne({ email })
//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'user already exist'
//             })
//         }
//         // find latest otp
//         const existOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1)

//         console.log(existOtp)

//         if (existOtp.length === 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: 'Otp not found'
//             })

//         } else if (otp !== existOtp[0].otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid otp"
//             })
//         }

//         // hash password
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const profileDetails = await Profile.create({
//             gender: null,
//             dateOfBirth: null,
//             mobile: mobileNumber
//         })
//         const user = await User.create({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             accountType,
//             addtionalDetails: profileDetails._id,
//             image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
//         })

//         res.status(200).json({
//             success: true,
//             message: 'user sucessfully registered',
//             user
//         })

//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             success: false,
//             message: 'error While Signup'
//         })
//     }

// }

// --------------------------login Controller---------------------

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill the all field'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })

            user.toObject()
            user.token = token
            user.password = null
            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie('token', token, option).status(200).json({
                success: true,
                token,
                user,
                message: 'Logged in successfully'
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'Password incorrect'
            })
        }


    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Some thing went wrong'
        })
    }
}



exports.signUp = async (req, res) => {
    try {
        // Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            mobileNumber,
            otp,
        } = req.body
        // Check if All Details are there or not
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            })
        }
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            })
        }

        // Find the most recent OTP for the email
        const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1)
        console.log(response)
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the user
        let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true)

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            mobileNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: "",
        })

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        })
    }
}

