import { useSelector } from "react-redux"
import EditBtn from "./editBtn"
import { useNavigate } from "react-router-dom"

const MyProfile = () => {
    const user = useSelector(state => state.user.user)
    // console.log(user)
    const navigate = useNavigate()
    return (
        <div className="flex flex-col 850px:w-3/4 sm:w-10/12 w-[95%]  mx-auto my-5 ">
            <h2 className="text-xl font-inter text-richblack-100">My Profile</h2>
            <div>
                <div className="bg-richblack-800 p-5 flex justify-between items-center rounded-md mt-5  border border-richblack-700">
                    <div className="flex gap-3">
                        <div className="w-11 h-11 rounded-full overflow-hidden">
                            <img className="w-full h-full" src={user.image} alt="" />
                        </div>
                        <div>
                            <p className="">{user.firstName} {user.lastName}</p>
                            <p className="sm:text-sm text-xs  text-richblack-300">{user.email}</p>
                        </div>
                    </div>
                    <div>
                        <EditBtn onClick={() => navigate('/dashboard/setting')} ></EditBtn>
                    </div>
                </div>

                <div className="bg-richblack-800 p-5 rounded-md my-2 border border-richblack-700">
                    <div className="flex justify-between ">
                        <p className="text-lg">About</p>
                        <EditBtn onClick={()=>navigate('/dashboard/setting')}></EditBtn>
                    </div>

                    <p className="text-richblack-400 text-sm py-2 px-3">{user?.addtionalDetails?.about?(user.addtionalDetails.about):('Write somthing about your self')}</p>
                </div>


                <div className="bg-richblack-800 p-5 my-2 rounded-md border border-richblack-700">
                    <div className="flex justify-between my-4">
                        <p className="text-lg">Additional details</p>
                        <EditBtn onClick={() => navigate('/dashboard/setting')}></EditBtn>
                    </div>
                    <div className="my-4 flex">
                        <div className="w-1/2">

                            <p className="text-richblack-600">Account type</p>
                            <p className="text-richblack-25 py-1 px-2">{user.accountType}</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-richblack-600">Mobile no.</p>
                            <p className="text-richblack-25 py-1 px-2">{user.addtionalDetails.mobile}</p>
                        </div>
                    </div>
                    <div className="my-4 flex">
                        <div className="w-1/2">

                            <p className="text-richblack-600">Gender</p>
                            <p className="text-richblack-25 py-1 px-2">{
                                user.addtionalDetails.gender ? (user.addtionalDetails.gender) : ('--')
                            }</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-richblack-600">Date of birth</p>
                            <p className="text-richblack-25 py-1 px-2">{
                                user.addtionalDetails.dateOfBirth ? (user.addtionalDetails.dateOfBirth) : ('--')
                            }</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default MyProfile