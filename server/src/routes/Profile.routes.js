const express=require('express')
const routes=express.Router()

const {updateProfilePicture, getAllUserDetails, updateAdditionalDetails}=require('../controllers/Profile')
const { auth, isStudent } = require('../middleware/Auth.Mw')
const { resetPassword, forgetPassword } = require('../controllers/ForgetPass')
const { deleteUser } = require('../controllers/DeleteAcc')



routes.get('/user/details',[auth],getAllUserDetails)
routes.put('/Picture/update',[auth],updateProfilePicture)
routes.put('/update/details',[auth],updateAdditionalDetails)
routes.post('/password/forget',forgetPassword)
routes.post('/password/reset',resetPassword)

routes.delete('/delete/account',[auth],deleteUser)
module.exports=routes