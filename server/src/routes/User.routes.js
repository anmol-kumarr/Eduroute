const express = require('express')
const {signUp,login,createOtp}=require('../controllers/Auth.js')
const {getAllUserDetails}=require('../controllers/Profile.js')
const routes = express.Router()

routes.post('/login',login)
routes.post('/signup',signUp)
routes.post('/sendotp',createOtp)
routes.get('/user',getAllUserDetails)


module.exports = routes