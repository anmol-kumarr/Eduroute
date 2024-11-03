const express=require('express')
const routes=express.Router()

const {updateProfilePicture, getAllUserDetails, updateAdditionalDetails}=require('../controllers/Profile.js')
const { auth, isStudent, isInstructor } = require('../middleware/Auth.Mw.js')
const { resetPassword, forgetPassword } = require('../controllers/ForgetPass.js')
const { deleteUser } = require('../controllers/DeleteAcc.js')
const { getDashboardInfo } = require('../controllers/instructorDashboard.js')



routes.get('/user/details',[auth],getAllUserDetails)
routes.put('/Picture/update',[auth],updateProfilePicture)
routes.put('/update/details',[auth],updateAdditionalDetails)
routes.post('/password/forget',forgetPassword)
routes.post('/password/reset',resetPassword)

routes.delete('/delete/account',[auth],deleteUser)


routes.get('/get-dashboard-info',[auth,isInstructor],getDashboardInfo)
module.exports=routes