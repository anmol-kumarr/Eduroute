import { GoStarFill ,GoStar} from "react-icons/go";
import { useNavigate } from "react-router-dom";
const CourseCard=({course,width,height})=>{
    const navigate=useNavigate()
    return (
        <div onClick={()=>navigate(`/course/${course._id}`)} className={`${width?width:'min-w-80'}`}>
            <div className={`w-full  rounded-md overflow-hidden ${height?height:'h-40'}`}>
                <img className="w-full h-full" src={course?.thumbnail} alt="" />
            </div>
            <div className="flex flex-col py-1 px-2">
                <p>{course.courseName}</p>
                <p className="text-richblack-50"><span className="text-richblack-300">Instructor:</span> {course?.intructor?.firstName} {course?.intructor?.lastName}</p>
                <div className="flex text-yellow-100">
                    <GoStarFill></GoStarFill>
                    <GoStarFill></GoStarFill>
                    <GoStarFill></GoStarFill>
                    <GoStarFill></GoStarFill>
                    <GoStar></GoStar>
                </div>
                <p className="text-richblack-50">Rs: {course.price} /-</p>
            </div>

        </div>
    )
}
export default  CourseCard