const express =require('express')
const { auth, isStudent } = require('../middleware/Auth.Mw')
const { addToCart, getCart, removeFromCart } = require('../controllers/cart')

const router=express.Router()


router.post('/add-to-cart',[auth,isStudent],addToCart)
router.put('/remove-from-cart',[auth,isStudent],removeFromCart)
router.get('/cart-data',[auth,isStudent],getCart)

module.exports=router
