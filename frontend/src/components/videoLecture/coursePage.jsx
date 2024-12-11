




import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { enrolledCourse } from "../../services/api"
import { apiConnector } from "../../services/apiconnector"
import { setCompletedLecture } from "../../redux/slice/lecture"
import Spinner from "../spinner"
// import Sidebar from "./sidebar"
import CourseContent from "./courseContent"


const LectureSection = () => {
    const { courseId } = useParams()
    const [modal, setModal] = useState(false)
    const [courseData, setCourseData] = useState([])
    const [loading, setLoading] = useState(false)
    const [playVideo, setPlayVideo] = useState('')
    const [subSection, setSubSection] = useState(null)
    const [date, setDate] = useState('')
    const [section, setSection] = useState(null)
    const dispatch = useDispatch()

    const fetchLectureData = async () => {
        const api = `${enrolledCourse.getEnrolledCourse}/${courseId}`

        setLoading(true)
        try {
            const response = await apiConnector('GET', api, { courseId })


            setCourseData(response?.data?.data)
            setPlayVideo(response?.data?.data?.courseContent[0]?.subSection[0]?.videoUrl)
            setSection(response?.data?.data?.courseContent[0])
            setSubSection(response?.data?.data?.courseContent[0]?.subSection[0])

            const createdAt = response?.data?.data?.courseContent[0]?.subSection[0]?.createdAt;
            const date = new Date(createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "2-digit",

            });
            setDate(date)


        }
        catch (err) {
            setCourseData([])
            // console.log(err)
        }
        setLoading(false)
    }

    const fetchProgress = async () => {
        try {
            const api = `${enrolledCourse.getCourseProgress}/${courseId}`
            const response = await apiConnector('GET', api)
            // console.log(response)
            dispatch(setCompletedLecture(response?.data?.data))
        } catch (err) {
            // console.log(err)
        }
    }
    useEffect(() => {
        fetchLectureData()
        fetchProgress()
    }, [])


    useEffect(() => {
        const date = new Date(subSection?.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",

        })
        setDate(date)
    }, [subSection])


    useEffect(() => {
        // console.log(courseData)
        if (!courseData.length === 0) setPlayVideo(courseData?.courseContent[0]?.subSection[0]?.videoUrl)

        // console.log(courseData?.courseContent[0]?.subSection[0]?.videoUrl)
    }, [courseData])







    return (
        <div className="text-white w-full relative">
            <div className="bg-richblack-800 w-full">
                {/* <Header></Header> */}
            </div>
            <hr className="text-richblack-600" />

            <div className="w-full">

                {
                    loading ? (
                        <div className="h-[calc(100vh-3rem)] w-full flex justify-center items-center">
                            <Spinner></Spinner>
                        </div>
                    )
                        : (
                            <>
                                {
                                    courseData.length === 0 ? (
                                        <div className="h-[calc(100vh-3rem)] w-full flex flex-col justify-center items-center"><h2 className="text-2xl font-inter">
                                            404 Course not found
                                        </h2>
                                            <p>Please contact Customer service</p>
                                        </div>
                                    ) : (
                                        <div className="flex  justify-between">
                                            <CourseContent sectionData={section} setSection={setSection} subSectionData={subSection} setModal={setModal} setDate={setDate} setPlayVideo={setPlayVideo} setSubSection={setSubSection} courseData={courseData}></CourseContent>






                                        </div>
                                    )
                                }
                            </>
                        )
                }

            </div>

            <div className="bg-richblack-800 border-t-[1px] border-richblack-700">
                {/* <Footer></Footer> */}
            </div>
            {
                modal ? (

                    <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-80  bottom-0">

                        {/* <RatingModal setModal={setModal}></RatingModal> */}

                    </div>
                ) : ''
            }
        </div >
    )
}
export default LectureSection