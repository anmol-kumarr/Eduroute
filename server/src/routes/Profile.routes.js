const express=require('express')
const routes=express.Router()

const {updateProfilePicture, getAllUserDetails, updateAdditionalDetails}=require('../controllers/Profile')
const { auth } = require('../middleware/Auth.Mw')
const { resetPassword, forgetPassword } = require('../controllers/ForgetPass')



routes.get('/user/details',[auth],getAllUserDetails)
routes.put('/Picture/update',[auth],updateProfilePicture)
routes.put('/update/details',[auth],updateAdditionalDetails)
routes.post('/password/forget',forgetPassword)
routes.post('/password/reset',resetPassword)

module.exports=routes