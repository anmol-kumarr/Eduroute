import { useEffect } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { instructorApi } from "../../../../services/api";
import {apiConnector} from '../../../../services/apiconnector.js'
const MyCourse = () => {
    useEffect(() => {
        const api = instructorApi.getInstructorCourse
        console.log(api)

        return async () => {
            const response=await apiConnector('GET',api)
            console.log(response)
        }
    }, [])
    return (
        <div className="w-full">
            <div className="w-10/12 mx-auto my-10 text-richblack-100 flex justify-between">
                <h2 className="font-semibold text-2xl">My courses</h2>
                <button className="bg-yellow-100 flex items-center gap-1 text-black font-medium px-2 py-1 rounded-md">Add Courses

                    <HiOutlinePlus className="-mb-[2px] font-semibold"></HiOutlinePlus>
                </button>
            </div>


        </div>
    )
}
export default MyCourse