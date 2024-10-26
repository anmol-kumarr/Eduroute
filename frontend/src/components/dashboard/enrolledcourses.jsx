import { useEffect, useState } from "react"
import { studentEnrolledCourseApi } from "../../services/api"
import { toast } from 'react-hot-toast'
import { apiConnector } from "../../services/apiconnector"
import Spinner from "../spinner"
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table"
const EnrolledCourses = () => {
    const [activeBtn, setActiveBtn] = useState('All')
    const [loading, setLoading] = useState(false)
    const [enrolledCourse, setEnrolledCourse] = useState([])

    const fetchedEnrolledCourse = async () => {
        const api = studentEnrolledCourseApi.getEnrolledCourse
        setLoading(true)
        try {
            const response = await apiConnector('GET', api)
            console.log(response)
            setEnrolledCourse(response?.data?.data)

        } catch (err) {
            console.log(err)
            setEnrolledCourse([])
            toast.error('Cannot get enrolled course')
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchedEnrolledCourse()

    }, [])
    return (
        <div className="w-full">
            <div className="w-10/12 mx-auto my-10">
                <p className="text-sm text-richblack-500 font-inter">
                    <span className="mx-[3px]">Home</span>
                    /
                    <span className="mx-[3px]">Dashboard</span>
                    /
                    <span className="text-yellow-100 font-medium mx-[3px]">Enrolled course</span>
                </p>
                <h2 className="text-3xl text-richblack-25 font-inter pt-5">Enrolled course</h2>
                <div className="my-2 max-w-max flex gap-2 px-1 cursor-pointer py-1 rounded-full bg-richblack-700">
                    <div onClick={() => setActiveBtn('All')} className={`px-5 py-1 flex items-center ${activeBtn === 'All' ? 'bg-richblack-800 rounded-full' : ''}`}>All</div>
                    <div onClick={() => setActiveBtn('Pending')} className={`px-5 flex items-center ${activeBtn === 'Pending' ? 'bg-richblack-800 rounded-full' : ''}`}>Pending</div>
                    <div onClick={() => setActiveBtn('Complete')} className={`px-5 flex items-center ${activeBtn === 'Complete' ? 'bg-richblack-800 rounded-full' : ''}`}>Complete</div>
                </div>

                <div className="w-full">
                    {
                        loading ? (
                            <div className="h-[calc(100vh-15rem)] w-full flex justify-center items-center">

                                <Spinner></Spinner>
                            </div>
                        ) : (
                            <div>
                                {
                                    enrolledCourse?.length > 0 ? (
                                        <div>
                                            You are not  enrolled in any course
                                        </div>
                                    ) : (
                                        <div>
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>
                                                            Course name
                                                        </Th>
                                                        <Th>
                                                            Time duration
                                                        </Th>
                                                        <Th>
                                                            Progress
                                                        </Th>
                                                    </Tr>
                                                </Thead>

                                                <Tbody>
                                                    <Tr>
                                                        <Th>

                                                        </Th>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default EnrolledCourses