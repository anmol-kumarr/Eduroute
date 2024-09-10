const nodemailer = require('nodemailer')
require('dotenv').config


const sendVerification = async (email,title,body) => {

    try{
        let transporter=nodemailer.createTransport({
            host:process.env.HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        
        })

        let response=await transporter.sendMail({
            from:'',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })

        console.log(response)

        return response
    }
    catch(err){
        console.log('err in sending mail',err)
    }

}

module.exports=sendVerification