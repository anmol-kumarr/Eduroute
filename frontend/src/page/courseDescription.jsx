import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../components/header"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { courseDetailsApi } from "../services/api"
import { apiConnector } from "../services/apiconnector"
import { IoIosInformationCircleOutline, IoMdTime } from "react-icons/io"
import LargeBtn from "../components/largeBtn"
import { FaArrowPointer } from "react-icons/fa6"
import { MdDevices } from "react-icons/md"
import { PiCertificateFill } from "react-icons/pi";
import CourseContent from "../components/course/courseContent"
import { useDispatch, useSelector } from "react-redux"
import Modal from "../components/modal"
import { buyCourse } from "../services/operation/payment"
import RatingStars from "../components/course/ratingStar"
import { cartHandler } from '../services/operation/cart'


const CourseDescription = () => {
    const { courseId } = useParams()
    const [loading, setLoading] = useState(false)
    const [courseDescription, setCourseDescription] = useState({})
    const [date, setDate] = useState('')
    // const cartData = useSelector(state => state.cart.cart)
    // const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.user.user)
    const [modal, setModal] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourseDescription = async () => {
            setLoading(true)
            const api = `${courseDetailsApi.getCourseDetails}/${courseId}`
            try {
                const response = await apiConnector('GET', api)
                // console.log(response?.data?.data)
                setCourseDescription(response?.data?.data)

            } catch (err) {
                // console.log(err)
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
        if (user) {
            if (user.accountType === 'Student') {

                cartHandler(

                    dispatch,
                    courseId
                )
            } else {
                toast.error('Instuctor cannot add to cart course')
            }

        } else {
            setModal({
                textOne: 'You are not logged In',
                textTwo: 'Please login or signIn  for add to cart any course',
                btnOneText: 'login',
                btnTwoText: 'cancel',
                btnOneHandler: () => navigate('/auth/login'),
                btnTwoHandler: () => setModal(null)
            })
        }
    }
    const handleBuyNow = () => {
        const Ids = []
        Ids.push(courseId)
        if (user) {
            if (user.accountType === 'Student') {

                buyCourse(
                    Ids,
                    user,
                    dispatch,
                    navigate
                )
            } else {
                toast.error('Instuctor cannot buy course')
            }

        } else {

            setModal({
                textOne: 'You are not logged In',
                textTwo: 'Please login or signIn  for buying any course',
                btnOneText: 'login',
                btnTwoText: 'cancel',
                btnOneHandler: () => navigate('/auth/login'),
                btnTwoHandler: () => setModal(null)
            })
        }
    }

    // useEffect(() => {
    // }, [cartData])
    return (
        <div className="relative w-full h-full overflow-auto">
            <div className="bg-richblack-800">
                <Header></Header>
            </div>

            <div className="bg-richblack-800 lg:h-72  sm:h-[550px] h-[600px] mb-80  lg:mb-10 overflow-visible flex flex-col lg:flex-row lg:justify-between">


                <div className="lg:w-[60%] md:w-[80%] sm:w-11/12  lg:ml-20 ml-5 py-5 ">
                    <div className="w-full lg:border-r-[1px] border-richblack-500">


                        <p className="text-richblack-400 text-sm my-4">
                            <Link className="px-1" to={'/'}>Home</Link>/
                            <span className="px-1">Course</span>/
                            <span className="text-yellow-100 px-1">{courseDescription?.categories?.name}</span>
                        </p>

                        <h2 className="font-inter text-richblack-50 text-4xl">{courseDescription?.courseName}</h2>
                        <p className="text-richblack-200">{courseDescription?.courseDescription}</p>
                        <div className="text-yellow-100 flex items-center">
                            <span className="mx-1">{
                                Math.floor(courseDescription?.ratingAndReviews?.reduce((total, rating) => {
                                    return total + (rating?.rating | 0)
                                }, 0)/courseDescription?.ratingAndReviews?.length)||0 }.0+

                                
                            </span>
                            {/* <GoStarFill></GoStarFill>
                            <GoStarFill></GoStarFill>
                            <GoStarFill></GoStarFill>
                            <GoStarFill></GoStarFill>
                            <GoStar></GoStar> */}
                            <RatingStars reviewCount={courseDescription?.ratingAndReviews?.reduce((total, rating) => {
                                return total + (rating?.rating | 0)
                            }, 0)} size={20}  ></RatingStars>

                            <p className="mx-1">({courseDescription?.ratingAndReviews?.length}+ ratings)</p>
                        </div>
                        <p className="text-richblack-100">Created by: {courseDescription?.intructor?.firstName} {courseDescription?.intructor?.lastName}</p>
                        <p className="flex items-center text-richblack-200 gap-1"><IoIosInformationCircleOutline className="-mb-[2px]"></IoIosInformationCircleOutline>
                            Created at: {
                                date
                            }
                        </p>
                        <p className="text-richblack-100">({courseDescription?.studentEnrolled?.length}) Students enrolled</p>
                    </div>
                </div>


                <div className="lg:w-[40%] sm:w-8/12 w-11/12 mx-auto sm:mb-10  lg:z-10 lg:flex justify-center" >
                    <div className="lg:w-80 w-full lg:-mb-[400px] pb-5  lg:mt-10 bg-richblack-700 rounded-md overflow-hidden my-5">
                        <div className="w-full h-60">

                            <img className="w-full h-full" src={courseDescription?.thumbnail} alt="thumbnail" />
                        </div>
                        <div className="px-3 py-2 flex flex-col h-[320px]  max-h-[320px] gap-3">

                            <h2 className="text-richblack-50 font-semibold p-1 text-2xl">Rs: {courseDescription?.price}/-</h2>

                            <div className="">
                                {
                                    user?.courses?.includes(courseId) ? (
                                        <LargeBtn behaviour={() => user.accountType === 'Student' ? navigate('/dashboard/enrolled-courses') : navigate('/dashboard/my-courses')} content={'View course'}></LargeBtn>
                                    ) : (

                                        <div className="flex flex-col gap-3">

                                            <LargeBtn behaviour={handleBuyNow} content={'Buy now'}></LargeBtn>


                                            <LargeBtn behaviour={handleAddToCart} active={true} content={'Add to cart'}></LargeBtn>

                                        </div>
                                    )
                                }
                            </div>
                            <p className="text-center text-richblack-200">30 Days money back gurantee</p>
                            <div className="text-caribbeangreen-200 font-semibold ">This Course Include
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



            </div >



            <div className="text-richblack-100 lg:w-3/5 sm:w-10/12 w-11/12 mx-auto lg:mx-10 my-10  ">
                <h2 className="text-xl font-inter text-richblack-100 my-2">What will you learn</h2>
                <div className="border-[1px]  text-richblack-200 p-5 border-richblack-400">
                    {
                        courseDescription?.whatYouWillLearn
                    }
                </div>
            </div>
            <div className="lg:w-3/5  mx-auto sm:w-10/12 w-11/12 lg:mx-10">
                <CourseContent course={courseDescription}></CourseContent>
            </div>

            <div className="lg:mx-10 mx-auto text-richblack-50 my-5 p-3">
                <h2 className="font-inter lg:text-start text-center text-xl my-3">
                    Author
                </h2>
                <div className="flex gap-2 justify-center lg:justify-start items-center text-lg text-richblack-50 ">

                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img className="w-full h-full" src={courseDescription?.intructor?.image} alt="thumbnail" />
                    </div>
                    <p className="text-richblack-100">{courseDescription?.intructor?.firstName} {courseDescription?.intructor?.lastName}</p>
                </div>
                <p className="lg:w-3/5 w-10/12 mx-auto lg:mx-2 my-2 text-richblack-300">{courseDescription?.intructor?.addtionalDetails?.about}</p>
            </div>
            {
                modal && (<Modal
                    {...modal}
                ></Modal>)
            }
        </div >
    )
}
export default CourseDescription