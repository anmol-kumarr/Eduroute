const User = require('../models/User.Model')


exports.getCart=async(req,res)=>{
    try{

        const userId=req.user.id

        const findUser=await User.findById(userId).populate({
            path:'cart',
            populate:{
                path:'intructor'
            }
        }).exec()
        // //console.log('cart',findUser)
        return res.status(200).json({
            success:true,
            message:'Cart data fetched',
            data:findUser.cart
        })

    }catch(err){
        //console.log(err)
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }

}





exports.addToCart = async (req, res) => {
    try {
        const { courseId } = req.body

        
        const userId = req.user.id
        if (!courseId) {
            // //console.log('error')
            return res.status(203).json({
                success: false,
                message: 'CourseId is empty'
            })
        }
    
        const findUser = await User.findById(userId)
        

        if (findUser?.cart?.includes(courseId)) {

            return res.status(400).json({
                success: false,
                message: 'Course already added in cart'
            })
        }




        const response = await User.findByIdAndUpdate(userId, { $push: { cart: courseId } }, { new: true }).populate({
            path: 'cart'
        }).exec()
        //console.log("user",response)


        if (response.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Course removed from cart',
            data: response.cart
        })


    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'error while adding to cart'
        })
    }
}



exports.removeFromCart = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id

        const response = await User.findByIdAndUpdate( userId , { $pull: { cart: courseId } }, { new: true }).populate({
            path: 'cart'
        }).exec()


        if (response.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        return res.status(200).json({
            success: false,
            message: 'Course removed from cart',
            data: response.cart
        })

    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error while removing from cart'
        })
    }
}