import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { apiConnector } from "../../services/apiconnector"
import { cartApi } from "../../services/api"
import toast from "react-hot-toast"
import { addToCart } from "../../redux/slice/cartSlice"
import Spinner from "../spinner"
import { GoStar, GoStarFill } from "react-icons/go"
import { FaTrashAlt } from "react-icons/fa"
import { PiDotOutlineFill } from 'react-icons/pi'
import LargeBtn from "../largeBtn"
import { buyCourse } from "../../services/operation/payment"
import { reomveFromCart } from "../../services/operation/cart"

const Cart = () => {
    const navigate = useNavigate()
    const cartData = useSelector(state => state.cart.cart)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
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
    // useEffect(() => {

    let price = cartData?.reduce((total, item) => {
        return total + item?.price
    }, 0)
    // }, [cartData])

    const buyNowHandler = () => {
        const Ids = cartData?.map((course) => course._id)
        // console.log(Ids)
        buyCourse(
            Ids,
            user,
            dispatch,
            navigate
        )

    }
    const removeItemHandler = (id) => {
        reomveFromCart(dispatch, { courseId: id })
    }
    return (
        <div className="text-richblack-100">
            <div className="md:w-11/12 w-full p-2 1050px:p-2 mx-auto my-14">
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
                                <hr className="text-richblack-700 mt-5 " />
                                <div className="mt-5 min-[850px]:flex min-[850px]:flex-wrap w-full">
                                    <div className="lg:w-9/12 w-11/12 mx-auto">

                                        {
                                            cartData && cartData.map((item, index) => (



                                                <div className=" w-full flex justify-center" key={item?._id}>
                                                    <div className="sm:border-none border-[1px] border-richblack-500 flex flex-col sm:flex-row lg:gap-7 gap-3 lg:h-36 my-4 rounded-md overflow-hidden lg:w-10/12 w-[99%]">
                                                        {/* Thumbnail */}
                                                        <div className="sm:w-48 w-full h-52 sm:h-auto overflow-hidden">
                                                            <img className="w-full h-full object-cover" src={item.thumbnail} alt="" />
                                                        </div>

                                                        {/* Content Section */}
                                                        <div className="flex flex-col sm:items-start items-center sm:block">
                                                            <h3 className="text-xl text-richblack-50 font-inter">{item.courseName}</h3>
                                                            <p>By: {item?.intructor?.firstName} {item?.intructor?.lastName}</p>
                                                            <div className="text-yellow-100 my-1 flex items-center">
                                                                <span className="mx-1">4.5 </span>
                                                                <GoStarFill />
                                                                <GoStarFill />
                                                                <GoStarFill />
                                                                <GoStarFill />
                                                                <GoStar />
                                                            </div>
                                                            <div className="my-2 flex items-center">
                                                                {Array.isArray(JSON.parse(item?.tag || "[]")) &&
                                                                    JSON.parse(item?.tag || "[]").map((tag, index) => (
                                                                        <React.Fragment key={index}>
                                                                            <span>{tag}</span>
                                                                            {JSON.parse(item?.tag || "[]").length - 1 > index && (
                                                                                <PiDotOutlineFill className="-mb-[2px]" />
                                                                            )}
                                                                        </React.Fragment>
                                                                    ))}
                                                            </div>
                                                        </div>

                                                        {/* Button and Pricing */}
                                                        <div className="py-2 lg:mx-5 mx-2 flex flex-col items-center lg:items-center">
                                                            <button
                                                                onClick={() => removeItemHandler(item._id)}
                                                                className="flex items-center gap-1 bg-richblack-500 bg-opacity-60 px-2 py-1 rounded-md text-[#ff0000]"
                                                            >
                                                                <FaTrashAlt className="-mb-[2px]" />
                                                                Remove
                                                            </button>
                                                            <p className="text-yellow-100 font-medium text-xl my-3">
                                                                Rs: {item?.price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))
                                        }


                                    </div>
                                    {
                                        cartData && cartData.length > 0 && (
                                            // <div className=" min-[850px]:w-3/12 mx-auto sm:my-5 my-0  max-h-[fit-content]  bg-richblack-700 rounded-md p-3">
                                            //     <p>Total:</p>
                                            //     <h2 className="my-1 text-yellow-100 font-semibold text-xl">Rs: {price}</h2>
                                            //     <LargeBtn content={'Buy now'} behaviour={buyNowHandler}></LargeBtn>
                                            // </div>

                                            <div className="w-9/12 sm:w-8/12 md:w-6/12 min-[850px]:w-5/12 lg:w-3/12 mx-auto sm:my-5 my-0 max-h-[fit-content] bg-richblack-700 rounded-md p-3">
                                                <p>Total:</p>
                                                <h2 className="my-1 text-yellow-100 font-semibold text-xl">Rs: {price}</h2>
                                                <LargeBtn content={'Buy now'} behaviour={buyNowHandler}></LargeBtn>
                                            </div>







                                        )
                                    }
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    )
}
export default Cart