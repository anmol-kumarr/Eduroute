import { Outlet, useParams } from "react-router-dom"
import Header from "../components/header"
import { useEffect, useState } from "react"
import { apiConnector } from "../services/apiconnector"
import { enrolledCourse } from "../services/api"
import Spinner from "../components/spinner"
import Sidebar from "../components/videoLecture/sidebar"
import Footer from "../components/footer"
import RatingModal from "../components/videoLecture/ratingModal"

const LectureSection = () => {
    const { courseId } = useParams()
    const [modal, setModal] = useState(false)
    const [courseData, setCourseData] = useState([])
    const [loading, setLoading] = useState(false)
    const [playVideo, setPlayVideo] = useState('')
    const [subSection, setSubSection] = useState(null)
    const [date, setDate] = useState('')
    const fetchLectureData = async () => {
        const api = `${enrolledCourse.getEnrolledCourse}/${courseId}`
        setLoading(true)
        try {
            const response = await apiConnector('GET', api, { courseId })

            setCourseData(response?.data?.data)
            setPlayVideo(response?.data?.data?.courseContent[0]?.subSection[0]?.videoUrl)
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
            console.log(err)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchLectureData()
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
                <Header></Header>
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
                                            <p>Please contact cutomer service</p>
                                        </div>
                                    ) : (
                                        <div className="flex  justify-between">
                                            <Sidebar setModal={setModal} setDate={setDate} setPlayVideo={setPlayVideo} setSubSection={setSubSection} courseData={courseData}></Sidebar>
                                            <div className="min-h-[calc(100vh-5rem)] w-9/12 mx-auto flex flex-col justify-center">

                                                <div className="my-2 max-h-[calc(100vh-5rem)] w-9/12 mx-auto flex justify-center">
                                                    <video controls controlsList="nodownload" className="h-full w-96" src={playVideo}></video>
                                                </div>

                                                <div className="text-richblack-50 my-5 border border-richblack-600 p-3 rounded-md">
                                                    <h2 className="font-inter text-lg font-semibold">{subSection?.title}</h2>
                                                    <p className="font-inter">
                                                        {subSection?.description}
                                                    </p>
                                                    <p>{date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                }

            </div>

            <div className="bg-richblack-800 border-t-[1px] border-richblack-700">
                <Footer></Footer>
            </div>
            {
                modal ? (

                    <div className="absolute top-0 left-0 right-0 bg-richblack-800 bg-opacity-70  bottom-0">

                        <RatingModal setModal={setModal}></RatingModal>

                    </div>
                ) : ''
            }
        </div >
    )
}
export default LectureSection