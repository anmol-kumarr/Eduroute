const Course=require('../models/course.Model')

exports.addToCart = async (req, res) => {
    try {
        const {courseId} =req.body
        const userId=req.user.id

        const response=await Course.findByIdAndUpdate({userId},{$push:{cart:courseId}},{new:true}).populate({
            path:'cart'
        }).exec()

        if(response.length===0){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }

        return res.status(200).json({
            success:false,
            message:'Course removed from cart',
            data:response.cart
        })
        

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'error while adding to cart'
        })
    }
}


exports.removeFromCart = async (req, res) => {
    try {
        const {courseId} =req.body
        const userId=req.user.id

        const response=await Course.findByIdAndUpdate({userId},{$pull:{cart:courseId}},{new:true}).populate({
            path:'cart'
        }).exec()

        if(response.length===0){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }

        return res.status(200).json({
            success:false,
            message:'Course removed from cart',
            data:response.cart
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error while removing from cart'
        })
    }
}