import { useEffect, useState } from "react"
import { apiConnector } from "../../../../services/apiconnector"
import { instructorApi } from "../../../../services/api"
import Spinner from "../../../spinner"
import InstructorChart from "./instructorChart"
import { useSelector } from "react-redux"

const InstructorDashboard = () => {
    const [loading, setLoading] = useState(false)
    const [dashboardData, setDashboardData] = useState([])
    const user=useSelector(state=>state.user.user)
    const fetchDashboard = async () => {
        const api = instructorApi.getDashboardData
        setLoading(true)
        try {
            const response = await apiConnector('GET', api)
            console.log(response)
            setDashboardData(response?.data?.data)

        } catch (err) {
            console.log(err)
            setDashboardData([])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchDashboard()

    }, [])

    const totalStudent = dashboardData?.reduce((total, course) => {
        return total + (course.totalEnrolledStudent | 0)
    }, 0)

    const totalIncome = dashboardData?.reduce((total, course) => { return total + (course.totalIncome) }, 0)


    return (
        <div className="w-full">
            {
                loading ? (
                    <div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center">

                        <Spinner></Spinner>
                    </div>
                ) : (
                    <div className="w-full">
                        <h2>Hii {user.firstName}</h2>
                        <p>Let's start something new</p>
                        {
                            dashboardData.length > 0 ? (
                                <div>
                                    <InstructorChart data={dashboardData}></InstructorChart>
                                    <div>
                                        <p>Statistics</p>
                                        <div>
                                            <p>
                                                Total Courses
                                            </p>
                                            <p>{totalStudent}</p>
                                        </div>
                                        <div>
                                            <p>Total income</p>
                                            <p>{totalIncome}</p>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full text-richblack-50 text-2xl h-[calc(100vh-5rem)] flex justify-center items-center">
                                    <p>No Data is available</p>
                                </div>
                            )
                        }

                    </div>
                )
            }

        </div>
    )
}
export default InstructorDashboard