const express =require('express')
const { auth, isStudent } = require('../middleware/Auth.Mw')
const { addToCart } = require('../controllers/cart')

const router=express.Router()


router.post('/add-to-cart',[auth,isStudent],addToCart)
router.put('/remove-from-cart',[auth,isStudent],addToCart)

module.exports=router