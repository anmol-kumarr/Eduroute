const mongoose = require('mongoose')
const sendVerification = require('../utils/MailSender')
const otpTemplate=require('../mail/EmailVerification')

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
        expires: 5*60*1000,
        required:true
    }

})


// const sendMail = async (email, otp) => {
//     try {
//         let response = sendVerification(email, "Verification mail send by Eduroute", otp)
//         console.log(response)
//     }
//     catch (err) {
//         console.log('error in sending mail in schema file', err)
//     }
// }

// otpSchema.pre('save', async (next) => {
//     await sendMail(this.email,this.otp)
//     next()
// })
otpSchema.pre('save', async function (next) {
    try {
        const template=otpTemplate(this.otp)
        await sendVerification(this.email, "Eduroute:SignUp Email ID verification", template);
        next(); // Proceed to save the document
    } catch (err) {
        console.error('Error sending verification mail:', err);
        next(err); // Pass the error to the next middleware or save process
    }
});

module.exports = mongoose.model('Otp', otpSchema)