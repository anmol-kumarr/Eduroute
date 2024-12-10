import { useDispatch, useSelector } from "react-redux"
import { sidebarLinks } from '../../data/dashboard'
import SideBarLinks from "./sidebarlinks"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { logout } from "../../services/operation/loginuser"
import { LuLogOut } from "react-icons/lu";
import Modal from "../modal"

const SideBar = () => {
    const { loading: authLoading } = useSelector(state => state.auth)
    const { loading: profileLoading, user } = useSelector(state => state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [modal,setModal]=useState(null)
    // useEffect(()=>{
    //     // console.log(modal)
    // },[modal])
    return (
        <div className="hidden 850px:block text-richblack-100 h-[calc(100vh-3rem)] w-52  bg-richblack-800">
            <div className="flex flex-col py-10">
                {
                    sidebarLinks.map((data, index) => {
                        if (data.type && user.accountType !== data.type) return null

                        return <SideBarLinks key={data.id} {...data}></SideBarLinks>
                    })
                }
            </div>
            <hr className="text-richblack-700 mx-auto w-[90%]"></hr>
            <div>
                <SideBarLinks className='text-lg'  icon={'VscSettingsGear'} path={'/dashboard/setting'} iconName={''} name={'Setting'} ></SideBarLinks>
                <button className="flex gap-1 items-center px-3 py-1" onClick={
                    ()=>setModal({
                        textOne:"Are you sure",
                        textTwo:'You will be logged out of your account',
                        btnOneText:'Logout',
                        btnTwoText:'Cancel',
                        btnOneHandler:()=>dispatch(logout(navigate)),
                        btnTwoHandler:()=>setModal(null)
                    })
                }><LuLogOut></LuLogOut> Logout </button>
            </div>
            <div>
                {
                    modal&& <Modal {...modal}></Modal>
                }
            </div>
        </div>
    )
}
export default SideBar