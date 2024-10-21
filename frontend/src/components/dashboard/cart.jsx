import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { apiConnector } from "../../services/apiconnector"
import { cartApi } from "../../services/api"
import toast from "react-hot-toast"
import { addToCart } from "../../redux/slice/cartSlice"

const Cart = () => {
    const navigate = useNavigate()
    const cartData = useSelector(state => state.cart.cart)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCartData = async () => {
            setLoading(true)
            const api = cartApi.getCartData
            try {
                const response = await apiConnector('GET', api)
                dispatch(addToCart(response?.data?.data))
                setLoading(false)
            } catch (err) {
                console.log(err)
                toast.error('Internal server error')
            }
            setLoading(false)
        }
        fetchCartData()
    }, [])
    return (
        <div className="text-richblack-100">
            <div className="w-10/12 mx-auto my-14">
                <p className="text-sm mb-2">
                    <span className="cursor-pointer px-1">
                        Home
                    </span>/
                    <span className="px-1">Dashboard</span>/
                    <span className="px-1 text-yellow-100">WishList</span>
                </p>

                <h2 className="text-3xl text-richblack-25 font-inter">My WishList</h2>

                <div>
                    {
                        cartData && cartData.map((item) => (
                            <div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Cart