import toast from "react-hot-toast"
import { addToCart } from "../../redux/slice/cartSlice"
import { cartApi } from "../api"
import { apiConnector } from "../apiconnector"

export const cartHandler = async (dispatch, courseId) => {
    toast.loading('loading')
    try {

        const api = cartApi.addToCart
        const response = await apiConnector('POST', api, {courseId})
        if (response.data.success === false) {
            toast.error(response?.response?.data?.message)
            throw new Error('error while adding to cart')
        }
        dispatch(addToCart(response?.data?.data))
        toast.dismiss()
        toast.success('Course added to cart')

    } catch (err) {
        console.log(err)
        toast.dismiss()
        toast.error('Cannot add to cart')
    }

}


export const reomveFromCart=async(dispatch,courseId)=>{
    toast.loading("loading")
    const api=cartApi.removeFromCart
    try{
        const response=await apiConnector("PUT",api,courseId)
        console.log(response)
        toast.dismiss()
        dispatch(addToCart(response?.data?.data))
        toast.success('item removed from cart')

    }catch(err){
        toast.dismiss()
        console.log(err)
    }
    
}