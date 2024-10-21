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