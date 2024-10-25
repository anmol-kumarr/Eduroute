const express=require('express')
const { auth, isStudent } = require('../middleware/Auth.Mw')
const { capturPayment, verifyPayemnt, sendPaymentEmail } = require('../controllers/Payments')

const router=express.Router()

router.post('/capture',[auth,isStudent],capturPayment)
router.post('/verify',[auth,isStudent],verifyPayemnt)
router.post('/mail',[auth,isStudent],sendPaymentEmail)
// router.post('/mail',sendPaymentEmail)

module.exports=router