import { useSelector } from "react-redux"
import EditBtn from "./editBtn"
import { useNavigate } from "react-router-dom"

const MyProfile = () => {
    const user = useSelector(state => state.user.user)
    console.log(user)
    const navigate=useNavigate()
    return (
        <div className="flex flex-col w-3/4 mx-auto my-5 ">
            <h2 className="text-xl font-inter text-richblack-100">My Profile</h2>
            <div>
                <div className="bg-richblack-800 p-5 flex justify-between items-center rounded-md mt-5">
                    <div className="flex gap-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img className="w-full h-full" src={user.image} alt="" />
                        </div>
                        <div>
                            <p className="">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-richblack-300">{user.email}</p>
                        </div>
                    </div>
                    <div>
                        <EditBtn onClick={()=>navigate('/dashboard/setting')} ></EditBtn>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default MyProfile