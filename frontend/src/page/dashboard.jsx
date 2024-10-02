import { useSelector } from 'react-redux'
import Spinner from '../components/spinner'
import SideBar from '../components/dashboard/sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
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
                <div className=''>
                    <div className='w-[calc(100vw-13rem)] h-[calc(100vh-3rem)] overflow-y-scroll hide-scrollbar'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className='bg-richblack-800 border-t-[1px] shadow-[0px_-1px_4px_#fff] border-richblack-700'>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Dashboard