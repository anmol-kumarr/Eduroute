const express=require('express')
const { auth, isStudent } = require('../middleware/Auth.Mw')
const { capturPayment, verifyPayemnt } = require('../controllers/Payments')

const router=express.Router()

router.post('POST',[auth,isStudent],capturPayment)
router.post('POST',[auth,isStudent],verifyPayemnt)

module.exports=router