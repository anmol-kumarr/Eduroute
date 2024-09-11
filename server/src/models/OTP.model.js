const mongoose = require('mongoose')
const sendVerification = require('../utils/MailSender')


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 2 * 60
    }

})


const sendMail = async (email, otp) => {
    try {
        let response = sendVerification(email, "Verification mail send by Eduroute", otp)
        console.log(response)
    }
    catch (err) {
        console.log('error in sending mail in schema file', err)
    }
}

otpSchema.pre('save', async (next) => {
    await sendMail(this.email,this.otp)
})

module.exports = mongoose.Schema('Otp', otpSchema)