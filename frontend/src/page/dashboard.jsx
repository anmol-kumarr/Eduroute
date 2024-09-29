import { useSelector } from 'react-redux'
import Spinner from '../components/spinner'
import SideBar from '../components/dashboard/sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
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
            <Header bg={'bg-richblack-800'}></Header>
            <div className='flex'>

                <SideBar></SideBar>
                <div>
                    <div className='w-[calc(100vw-13rem)]'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard