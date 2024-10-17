import { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'
import { instructorApi } from "../../../../services/api";
import { apiConnector } from '../../../../services/apiconnector.js'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from "../../../spinner.jsx";
import { setLoading } from "../../../../redux/slice/courseSlice.js";
import CourseTable from "./courseTable.jsx";
import { setMyCourse } from "../../../../redux/slice/instructorSlice.js";
const MyCourse = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.course.loading)
    // const myCourse = useSelector(state => state.instructor.myCourse)
    const [myCourseData, setMyCourseData] = useState([])


    const getMyCourse=async()=>{
            const api=instructorApi.getInstructorCourse
            const response=await apiConnector('GET',api)
            setMyCourseData(response.data.data)
    }
    useEffect(() => {
        getMyCourse()
    }, [])

    useEffect(()=>{

    },[])



    return (
        <div className="w-full">
            {
                loading === true ? (
                    <div className="w-full h-[calc(100vh-13rem)] flex justify-center items-center">


                        <Spinner></Spinner>
                    </div>

                ) : (
                    <div>


                        <div className="w-10/12 mx-auto my-10 text-richblack-100 flex justify-between">
                            <h2 className="font-semibold text-2xl">My courses</h2>
                            <button onClick={() => navigate('/dashboard/add-course')} className="bg-yellow-100 flex items-center gap-1 text-black font-medium px-2 py-1 rounded-md">Add Courses

                                <HiOutlinePlus className="-mb-[2px] font-semibold"></HiOutlinePlus>
                            </button>

                        </div >
                        <div>
                            <CourseTable course={myCourseData} setCourse={setMyCourse}></CourseTable>
                        </div>
                    </div>
                )
            }



        </div >
    )
}
export default MyCourse