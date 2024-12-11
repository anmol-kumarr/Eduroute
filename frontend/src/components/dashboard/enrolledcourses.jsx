import { useEffect, useState } from "react"
import { studentEnrolledCourseApi } from "../../services/api"
import { toast } from 'react-hot-toast'
import { apiConnector } from "../../services/apiconnector"
import Spinner from "../spinner"

import { Line } from 'rc-progress';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { useMediaQuery } from "usehooks-ts"

const EnrolledCourses = () => {
    const [activeBtn, setActiveBtn] = useState('All')
    const [loading, setLoading] = useState(false)
    const [enrolledCourse, setEnrolledCourse] = useState([])
    const [courseDuration, setCourseDuration] = useState([])
    const [courseSubsection, setCourseSubsection] = useState([])
    const [courseProgress, setCourseProgress] = useState([])
    const [width, setWidth] = useState(false)
    const progress = useSelector(state => state.user.user.courseProgress)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deviceWidth = useMediaQuery('(min-width: 850px)')

    const fetchedEnrolledCourse = async () => {
        const api = studentEnrolledCourseApi.getEnrolledCourse
        setLoading(true)
        try {
            const response = await apiConnector('GET', api)
            // console.log(response?.data)
            setEnrolledCourse(response?.data?.data?.courses)
            setCourseDuration(response?.data?.totalTimeDuration)
            setCourseSubsection(response?.data?.totalSubsection)
            setCourseProgress(response?.data?.data?.courseProgress)

            // response?.data?.data?.courseProgress?.forEach((item) => 
            //     dispatch(setCompletedLecture({courseId:item.courseID,completedVideo:item.completedVideo}))
            // )




            // console.log('response?.data?.totalSubsection', response?.data?.totalSubsection)
            // console.log('response?.data?.data?.courseProgress', response?.data?.data?.courseProgress)

        } catch (err) {
            // console.log(err)
            setEnrolledCourse([])
            toast.error('Cannot get enrolled course')
        }
        setLoading(false)
    }
    useEffect(() => {

        fetchedEnrolledCourse()

    }, [])
    useEffect(() => {
        setWidth(deviceWidth)
        // console.log(deviceWidth)
    }, [deviceWidth])
    return (
        <div className="w-full">
            <div className="w-11/12 mx-auto my-10">
                <p className="text-sm text-richblack-500 font-inter">
                    <span className="mx-[3px]">Home</span>
                    /
                    <span className="mx-[3px]">Dashboard</span>
                    /
                    <span className="text-yellow-100 font-medium mx-[3px]">Enrolled course</span>
                </p>
                <h2 className="text-3xl text-richblack-25 font-inter pt-5">Enrolled course</h2>
                <div className="my-2 max-w-max flex gap-2 px-1 cursor-pointer py-1 rounded-full bg-richblack-700">
                    <div onClick={() => setActiveBtn('All')} className={`px-5 py-1 flex items-center ${activeBtn === 'All' ? 'bg-richblack-800 rounded-full' : ''}`}>All</div>
                    <div onClick={() => setActiveBtn('Pending')} className={`px-5 flex items-center ${activeBtn === 'Pending' ? 'bg-richblack-800 rounded-full' : ''}`}>Pending</div>
                    <div onClick={() => setActiveBtn('Complete')} className={`px-5 flex items-center ${activeBtn === 'Complete' ? 'bg-richblack-800 rounded-full' : ''}`}>Complete</div>
                </div>

                <div className="w-full">
                    {
                        loading ? (
                            <div className="h-[calc(100vh-15rem)] w-full flex justify-center items-center">

                                <Spinner></Spinner>
                            </div>
                        ) : (
                            <div className="text-white w-full">
                                {
                                    !enrolledCourse?.length > 0 ? (
                                        <div>
                                            You are not  enrolled in any course
                                        </div>
                                    ) : (
                                        <div className="w-full my-5 rounded-md border border-richblack-600">
                                            <div className="hidden w-full sm:flex justify-between rounded-md p-2 bg-richblack-800">
                                                <div className="w-[40%] text-center">Course name</div>
                                                <div className="w-[30%] text-center">Course duration</div>
                                                <div className="w-[30%] text-center">Course progress</div>
                                            </div>
                                            <div className="w-full">
                                                {
                                                    enrolledCourse.map((course, index) => (
                                                        <div key={course._id} onClick={() => !width ? navigate(`/lecture/${course?._id}`) : navigate(`/lecture/${course._id}`)} >
                                                            <div className="sm:flex justify-between items-center">
                                                                <div className="p-2 sm:flex sm:w-[40%] gap-3 items-center">

                                                                    <div className="sm:max-w-40 overflow-hidden rounded-md max-h-[200px] sm:max-h-20">
                                                                        <img className="w-full h-full" src={course.thumbnail} alt="thumbnail" />
                                                                    </div>
                                                                    <p className="font-inter sm:text-start text-center sm:text-lg text-2xl font-medium">{course?.courseName}</p>

                                                                </div>
                                                                <div className="sm:w-[30%]  text-center">
                                                                    <span className="sm:hidden font-inter">Total duration: </span>
                                                                    {
                                                                        courseDuration.map((duration) => (
                                                                            duration.id === course._id && duration.totalTime
                                                                        ))
                                                                    }
                                                                </div>

                                                                <div className="my-2 sm:my-0 sm:w-[30%] w-9/12 mx-auto text-center px-5">
                                                                    {


                                                                        courseProgress?.map((progress) => (
                                                                            progress.courseID === course._id &&

                                                                            courseSubsection?.map((cour) => (
                                                                                cour.id === course._id &&
                                                                                <div key={cour.id}>
                                                                                    <p className="mb-1">Progress {cour?.totalLength
                                                                                        ? `${Math.floor((progress.completedVideo?.length || 0) / cour.totalLength * 100)}%`
                                                                                        : "0 %"}</p>
                                                                                    <Line key={progress._id} percent={progress.completedVideo?.length / cour?.totalLength * 100} strokeWidth={5} trailWidth={5} trailColor={'#6E727F'} strokeColor={'#05A77B'} ></Line>
                                                                                </div>
                                                                            ))



                                                                        ))


                                                                    }

                                                                </div>


                                                            </div>
                                                            {
                                                                enrolledCourse.length - 1 > index && <hr className="text-richblack-500" />
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default EnrolledCourses