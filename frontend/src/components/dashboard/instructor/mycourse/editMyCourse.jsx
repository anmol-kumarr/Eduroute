import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { courseDetailsApi } from "../../../../services/api"
import { apiConnector } from "../../../../services/apiconnector"
import { useDispatch } from "react-redux"
import Spinner from "../../../spinner"
import { setCourse, setEditCourse } from "../../../../redux/slice/courseSlice"
import RenderSteps from "../course/renderSteps"

const EditMyCourse = () => {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const [loading, setLoading] = useState(false)
    const getCourseDetails = async () => {
        const api = `${courseDetailsApi.getCourseDetails}/${courseId}`
        setLoading(true)
        try {
            console.log(courseId)

            const response = await apiConnector('GET', api)
            console.log(response)
            dispatch(setCourse(response?.data?.data))
            dispatch(setEditCourse(true))

        } catch (err) {
            console.log(err)
        }
        setLoading(false)



    }
    useEffect(() => {
        getCourseDetails()
    }, [])

    return (
        <div className="w-full ">
            <h2 className="my-5 mx-5 text-2xl text-richblack-200">Edit Course</h2>
            {
                loading === true ? (
                    <Spinner></Spinner>
                ) : (
                    <div className="w-8/12 mx-auto my-5 ">
                        <RenderSteps></RenderSteps>
                    </div>
                )
            }
        </div>
    )
}
export default EditMyCourse