import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { IoIosArrowBack } from "react-icons/io";
import { changeState } from "../../../../redux/slice/courseSlice";
import { uploadCourseStatus } from "../../../../services/operation/course";
import { useNavigate } from "react-router-dom";
const CoursePublish = () => {
    const { register, getValues, setValue, handleSubmit } = useForm()
    const course = useSelector(state => state?.course?.MyCourse)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const submitHandler = (data) => {
        // const formData = new FormData()
        // console.log(data)
        if (data.publishCourse === true) {
            const status='Published'
            // formData.append('status','Published')
            dispatch(uploadCourseStatus(status,course._id,navigate))
            
        }
        else{
            const status='Draft'
            // formData.append('status','Draft')
            dispatch(uploadCourseStatus(status,course._id,navigate))
        }
    }
    return (
        <div className=" flex flex-col gap-5 ">
            <form onSubmit={handleSubmit(submitHandler)} action="">
                <div className="bg-richblack-800 p-5 rounded-md">
                    <h2 className="text-white font-semibold text-xl mb-5">Publish setting</h2>

                    <input className="mx-1 border-richblack-600 outline-richblack-600 bg-richblack-400" height={10} width={10} type="checkbox" id="publishCourse" {...register('publishCourse')} />
                    <label htmlFor="publichCourse" className="text-sm font-medium text-richblack-300">Make this Course Public</label>
                </div>
                <div className="flex my-5 justify-between">
                    <div>
                        <button type="button" onClick={() => dispatch(changeState(2))} className="bg-richblack-700 flex items-center shadow-[1px_1px_0px_#424854] px-2 py-1 rounded-md">
                            <IoIosArrowBack className="-mb-1"></IoIosArrowBack> Back
                        </button>
                    </div>
                    <div className="flex gap-3 items-center">
                        <button type="submit" className="bg-richblack-700 flex items-center shadow-[1px_1px_0px_#424854] px-2 py-1 rounded-md">
                            Save as Draft
                        </button>
                        <button type="" className="bg-yellow-100 text-black flex items-center shadow-[1px_1px_0px_#FFF970] px-2 py-1 rounded-md">
                            Save and Publish
                        </button>

                    </div>
                </div>
            </form>
        </div>
    )
}
export default CoursePublish