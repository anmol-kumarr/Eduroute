const razorpay=require('razorpay')
require('dotenv').config()


exports.instance=new razorpay({
    key_id:process.env.RAZROPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET,
})