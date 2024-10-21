import { Link, useParams } from "react-router-dom"
import Header from "../components/header"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { courseDetailsApi } from "../services/api"
import { apiConnector } from "../services/apiconnector"
import { GoStar, GoStarFill } from "react-icons/go"
import { IoIosInformationCircleOutline, IoMdTime } from "react-icons/io"
import LargeBtn from "../components/largeBtn"
import { FaArrowPointer } from "react-icons/fa6"
import { MdDevices } from "react-icons/md"
import { PiCertificateFill } from "react-icons/pi";
import CourseContent from "../components/course/courseContent"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/slice/cartSlice"
import { cartHandler } from "../services/operation/cart"


const CourseDescription = () => {
    const { courseId } = useParams()
    const [loading, setLoading] = useState(false)
    const [courseDescription, setCourseDescription] = useState({})
    const [date, setDate] = useState('')
    const cartData = useSelector(state => state.cart.cart)
    useEffect(() => {
        const fetchCourseDescription = async () => {
            setLoading(true)
            const api = `${courseDetailsApi.getCourseDetails}/${courseId}`
            try {
                const response = await apiConnector('GET', api)
                // console.log(response?.data?.data)
                setCourseDescription(response?.data?.data)

            } catch (err) {
                console.log(err)
                toast.error('Cannot get course')
            }
            setLoading(false)
        }
        fetchCourseDescription()

        const createdAt = courseDescription?.createdAt;
        const date = new Date(createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            // day: "2-digit",
            // hour: "2-digit",
            // minute: "2-digit",
            // second: "2-digit",
        });
        setDate(date)
    }, [])

    const dispatch = useDispatch()


    const handleAddToCart = () => {

        cartHandler(dispatch, courseId)
    }
    // useEffect(() => {
    // }, [cartData])
    return (
        <div className="">
            <div className="bg-richblack-800">
                <Header></Header>
            </div>

            <div className="bg-richblack-800 h-72 overflow-visible flex justify-between">
                <div className="w-[60%]  ml-20 py-5 ">
                    <div className="w-full border-r-[1px] border-richblack-500">


                        <p className="text-richblack-400 text-sm my-4">
                            <Link className="px-1" to={'/'}>Home</Link>/
                            <span className="px-1">Course</span>/
                            <span className="text-yellow-100 px-1">{courseDescription?.categories?.name}</span>
                        </p>

                        <h2 className="font-inter text-richblack-50 text-4xl">{courseDescription?.courseName}</h2>
                        <p className="text-richblack-200">{courseDescription?.courseDescription}</p>
                        <div className="text-yellow-100 flex items-center">
                            <span className="mx-1">4.5 </span>
                            <GoStarFill></GoStarFill>
                            <GoStarFill></GoStarFill>
                            <GoStarFill></GoStarFill>
                            <GoStarFill></GoStarFill>
                            <GoStar></GoStar>
                        </div>
                        <p className="text-richblack-100">Created by: {courseDescription?.intructor?.firstName} {courseDescription?.intructor?.lastName}</p>
                        <p className="flex items-center text-richblack-200 gap-1"><IoIosInformationCircleOutline className="-mb-[2px]"></IoIosInformationCircleOutline>
                            Created at: {
                                date
                            }
                        </p>
                    </div>
                </div>
                <div className="w-[40%]  z-10 flex justify-center" >
                    <div className="w-80 -mb-80 mt-10 bg-richblack-700 rounded-md overflow-hidden my-5">
                        <div className="w-full h-60">

                            <img className="w-full h-full" src={courseDescription?.thumbnail} alt="" />
                        </div>
                        <div className="px-3 py-2 flex flex-col max-h- gap-3">

                            <h2 className="text-richblack-50 font-semibold p-1 text-2xl">Rs: {courseDescription?.price}/-</h2>


                            <LargeBtn content={'Buy now'}></LargeBtn>


                            <LargeBtn behaviour={handleAddToCart} active={true} content={'Add to cart'}></LargeBtn>
                            <p className="text-center text-richblack-200">30 Days money back gurantee</p>
                            <div className="text-caribbeangreen-200 font-semibold">This Course Include
                                <ul className="font-normal px-2">
                                    <li className="flex items-center gap-1">
                                        <IoMdTime></IoMdTime>
                                        8 hours on-demand video
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <FaArrowPointer></FaArrowPointer>
                                        Full Lifetime access
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <MdDevices></MdDevices>
                                        Access on Mobile and TV
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <PiCertificateFill></PiCertificateFill>
                                        Certificate of completion
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-richblack-100 w-3/5 mx-10 my-10 ">
                <h2 className="text-xl font-inter text-richblack-100 my-2">What will you learn</h2>
                <div className="border-[1px] text-richblack-200 p-5 border-richblack-400">
                    {
                        courseDescription?.whatYouWillLearn
                    }
                </div>
            </div>
            <div className="w-3/5 mx-10">
                <CourseContent course={courseDescription}></CourseContent>
            </div>

            <div className="mx-10 text-richblack-50 my-5 p-3">
                <h2 className="font-inter text-xl my-3">
                    Author
                </h2>
                <div className="flex gap-2 items-center text-lg text-richblack-50 ">

                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img className="w-full h-full" src={courseDescription?.intructor?.image} alt="" />
                    </div>
                    <p className="text-richblack-100">{courseDescription?.intructor?.firstName} {courseDescription?.intructor?.lastName}</p>
                </div>
                <p className="w-3/5 my-2 text-richblack-300">{courseDescription?.intructor?.addtionalDetails?.about}</p>
            </div>

        </div>
    )
}
export default CourseDescription