import { useNavigate, useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCompletedLecture } from '../../redux/slice/lecture'
import { apiConnector } from '../../services/apiconnector'
import { enrolledCourse } from '../../services/api'
import Sidebar from './sidebar'

const CoursePage = () => {
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

        
        try {
            const response = await apiConnector('GET', api, { courseId })

            console.log(response)

            setCourseData(response?.data?.data)
            setPlayVideo(response?.data?.data?.courseContent[0]?.subSection[0]?.videoUrl)
            setSection(response?.data?.data?.courseContent[0])
            setSubSection(response?.data?.data?.courseContent[0]?.subSection[0])

        }
        catch (err) {
            setCourseData([])
            console.log(err)
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
            console.log(err)
        }
    }
    useEffect(() => {
        setLoading(true)
        fetchLectureData()
        // fetchProgress()
    }, [])

    useEffect(() => {
        console.log(courseData)
    }, [courseData])



    return (
        <div className="h-screen bg-richblack-900 text-white">
            {
                !loading && (
                    <Sidebar sectionData={section} setSection={setSection} subSectionData={subSection} setSubSection={setSubSection} courseData={courseData}></Sidebar>
                )
            }
            {
                courseData.length > 0 && 'hello'
            }
        </div>
    )
}

export default CoursePage