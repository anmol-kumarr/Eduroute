const User = require('../models/User.Model')
const Otp = require('../models/OTP.model')
const otpGenerator=require('otp-generator')




exports.createOtp = async (req, res) => {
    try {
        const { email } = req.body
        const findEmail = await User.findOne({email})
        if(findEmail){
            return res.status(401).json(({
                success:false,
                message:'user already exists'
            }))
        }
        // otp generator 
        let otp=otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })

        const findOtp=await Otp.findOne({otp})
        // check if genertaed otp is present in db or not if yes then it may create conflict
        while(findOtp){
            otp=otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            })
            findOtp=await Otp.findOne({otp})
        }
        // when findotp is false means otp is not in db and otp is unique and while loop breaked 
        const payload={email,otp}

        const otpBody=await Otp.create(payload)
        console.log(otpBody)
        // create entry in db of otp

        res.status(200).json({
            success:true,
            message:'Otp generated'
        })



    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message:'some thing went wrong '
        })
    }
}