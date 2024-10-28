import { Outlet, useParams } from "react-router-dom"
import Header from "../components/header"
import { useEffect, useState } from "react"
import { apiConnector } from "../services/apiconnector"
import { enrolledCourse } from "../services/api"
import Spinner from "../components/spinner"
import Sidebar from "../components/videoLecture/sidebar"

const LectureSection = () => {
    const { courseId } = useParams()
    const [courseData, setCourseData] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchLectureData = async () => {
        const api = `${enrolledCourse.getEnrolledCourse}/${courseId}`
        setLoading(true)
        try {
            const response = await apiConnector('GET', api, { courseId })
            setCourseData(response?.data?.data)
            console.log(response)
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
    return (
        <div className="text-white w-full">
            <div className="bg-richblack-700 w-full">
                <Header></Header>
            </div>


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
                                        <div className="flex justify-between">
                                            <Sidebar courseData={courseData}></Sidebar>
                                            <div className="w-9/12 bg-richblack-400 h-5">
                                                <Outlet></Outlet>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                }

            </div>
        </div >
    )
}
export default LectureSection