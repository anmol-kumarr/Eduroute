import { useDispatch, useSelector } from "react-redux"
import { sidebarLinks } from '../../data/dashboard'
import SideBarLinks from "./sidebarlinks"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { logout } from "../../services/operation/loginuser"
import Modal from "../modal"
const SideBar = () => {
    const { loading: authLoading } = useSelector(state => state.auth)
    const { loading: profileLoading, user } = useSelector(state => state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [modal,setModal]=useState('')
    return (
        <div className="text-richblack-100 h-">
            <div className="flex flex-col p-5">
                {
                    sidebarLinks.map((data, index) => {
                        if (data.type && user.accountType !== data.type) return null

                        return <SideBarLinks key={data.id} {...data}></SideBarLinks>
                    })
                }
            </div>
            <hr></hr>
            <div>
                <SideBarLinks path={'/setting'} iconName={''} name={'setting'} ></SideBarLinks>
                <button onClick={
                    ()=>setModal({
                        textOne:"Are you sure",
                        textTwo:'You will be logged out of your account',
                        btnOneText:'Logout',
                        btnTwoText:'Cancel',
                        btnOneHandler:()=>dispatch(logout(navigate)),
                        btnTwoHandler:()=>setModal(null)
                    })
                }></button>
            </div>
            <div>
                {
                    modal&& <Modal {...setModal}></Modal>
                }
            </div>
        </div>
    )
}
export default SideBar