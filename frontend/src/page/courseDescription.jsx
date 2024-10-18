import { useParams } from "react-router-dom"

const CourseDescription=()=>{
    const {courseId}=useParams()
    return (
        <div className="text-white">
            {courseId}
        </div>
    )
}
export default CourseDescription