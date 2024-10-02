import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./setting/profilepicture";
import Personal from "./setting/perosnal";
import Password from "./setting/password";
import DeleteAccount from "./setting/deleteAcc";
const Setting = () => {
    const navigate = useNavigate()


    return (
        <div className="p-5">
            <button onClick={() => navigate(-1)} className="flex  items-center gap-1 text-richblack-500">
                <IoIosArrowBack />
                Back
            </button>
            <h1 className="my-5 text-2xl mx-2">
                Edit profile
            </h1>
            <div className="w-[75%] mx-auto">
                {/* <div className="bg-richblack-800 p-5 flex justify-between items-center rounded-md mt-5  border border-richblack-700"> */}

                <ProfilePicture></ProfilePicture>

                <Personal></Personal>

                <Password></Password>
                <DeleteAccount></DeleteAccount>
















                </div>
            </div>
        // </div>
    )
}
export default Setting