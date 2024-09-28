import { useSelector } from 'react-redux'
import Spinner from '../components/spinner'
import SideBar from '../components/dashboard/sidebar'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
    const { loading: profileLoading } = useSelector(state => state.user)
    const { loading: authLoading } = useSelector(state => state.auth)

    if (profileLoading || authLoading) {
        return (

            <div>
                <Spinner></Spinner>
            </div>

        )
    }
    return (
        <div className="text-white">
            <SideBar></SideBar>
            <div>
                <div>
                        <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard