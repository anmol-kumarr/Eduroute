const express = require('express')
const {signUp,login,createOtp}=require('../controllers/Auth')
const {getAllUserDetails}=require('../controllers/Profile')
const routes = express.Router()

routes.post('/login',login)
routes.post('/signup',signUp)
routes.post('/sendotp',createOtp)
routes.get('/user',getAllUserDetails)


module.exports = routes