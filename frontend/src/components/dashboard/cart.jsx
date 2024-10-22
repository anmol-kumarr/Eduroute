import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { apiConnector } from "../../services/apiconnector"
import { cartApi } from "../../services/api"
import toast from "react-hot-toast"
import { addToCart } from "../../redux/slice/cartSlice"
import Spinner from "../spinner"
import { GoStar, GoStarFill } from "react-icons/go"
import { FaTrashAlt } from "react-icons/fa"
import {PiDotOutlineFill} from 'react-icons/pi'

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
                // console.log(response?.data?.data)
                // console.log(JSON.parse(response?.data?.data[0]?.tag))
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
            <div className="w-11/12 mx-auto my-14">
                <p className="text-sm mb-2">
                    <span className="cursor-pointer px-1">
                        Home
                    </span>/
                    <span className="px-1">Dashboard</span>/
                    <span className="px-1 text-yellow-100">WishList</span>
                </p>

                <h2 className="text-3xl text-richblack-25 font-inter">My WishList</h2>

                <div className="flex w-full">
                    {
                        loading ? (
                            <div className="flex justify-center items-center h-[calc(100vh-15rem)] w-full">


                                <Spinner></Spinner>
                            </div>
                        ) : (
                            <div className="w-full">
                                <p>{
                                    cartData?.length
                                } Course in WishList</p>
                                {
                                    cartData && cartData.map((item) => (
                                        <div className="flex gap-5 rounded-md overflow-hidden w-10/12" key={item._id}>
                                            <div className="w-48  overflow-hidden">
                                                <img src={item.thumbnail} alt="" />
                                            </div>

                                            <div>
                                                <h3 className="text-xl text-richblack-50 font-inter">{item.courseName}</h3>
                                                <p>By: {item?.intructor?.firstName} {item?.intructor?.lastName}</p>
                                                <div className="text-yellow-100 my-1 flex items-center">
                                                    <span className="mx-1">4.5 </span>
                                                    <GoStarFill></GoStarFill>
                                                    <GoStarFill></GoStarFill>
                                                    <GoStarFill></GoStarFill>
                                                    <GoStarFill></GoStarFill>
                                                    <GoStar></GoStar>
                                                </div>
                                                <div className="my-2">
                                                    {
                                                        JSON.parse(item?.tag)?.map((tag, index) => (
                                                            <>
                                                                <span className="" key={index}>{tag}</span>
                                                                {
                                                                    JSON.parse(item?.tag)?.length-1>index&& <PiDotOutlineFill></PiDotOutlineFill>
                                                                }
                                                            </>
                                                            
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <button className="flex items-center gap-1 bg-richblack-500 bg-opacity-60 px-2 py-1 rounded-md text-[#ff0000]">
                                                <FaTrashAlt className="-mb-[2px]"></FaTrashAlt>
                                                    Remove</button>

                                                    <p className="text-yellow-100 font-medium text-xl my-3">Rs: {item?.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Cart