import { useNavigate } from "react-router-dom"
import Step from "./step"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import CourseIntro from "./courseIntro"
import CourseBuilder from "./courseBuilder"
import CoursePublish from "./coursePublish"

const AddCourse = () => {
    const navigate = useNavigate()
    const step = useSelector(state => state.course.step)
    return (
        <div className="w-11/12 mx-auto my-5 flex gap-5">
            <div className="w-[60%] mx-auto">

                <button onClick={() => navigate(-1)} className="flex  items-center gap-1 text-richblack-500">
                    <IoIosArrowBack />
                    Back
                </button>

                <div className="w-full ">

                    <Step></Step>

                    {
                        step === 1 && <CourseIntro></CourseIntro>
                    }
                    {
                        step === 2 && <CourseBuilder></CourseBuilder>
                    }
                    {
                        step === 3 && <CoursePublish></CoursePublish>
                    }


                </div>
            </div>
            <div className="w-[40%] bg-richblack-800 p-5 rounded-md border border-richblack-600">
                <h2 className="text-xl font-semibold text-richblack-200 my-2">⚡ Course Upload Tips</h2>
                <ul className="list-disc text-richblack-25 px-5 ">
                    <li>
                        Set the Course Price option or make it free.
                    </li>
                    <li>
                        Standard size for the course thumbnail is 1024x576.
                    </li>
                    <li>
                        Video section controls the course overview video.
                    </li>
                    <li>
                        Course Builder is where you create & organize a course.
                    </li>
                    <li>
                        Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
                    </li>
                    <li>
                        Information from the Additional Data section shows up on the course single page.
                    </li>
                    <li>
                        Make Announcements to notify any important
                    </li>
                    <li>
                        Notes to all enrolled students at once.
                    </li>
                </ul>
            </div>


        </div>
    )
}
export default AddCourse