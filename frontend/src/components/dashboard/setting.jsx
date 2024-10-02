import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import toast from "react-hot-toast";
import { profileImage } from "../../services/operation/updateDetails";
import { techProfessions } from "../../data/professionData";
import { FaRegEye, FaRegEyeSlash, FaTrashAlt } from "react-icons/fa";
import DashBoardBtn from "./dashboardbtn";
import ProfilePicture from "./setting/profilepicture";
import Personal from "./setting/perosnal";
import Password from "./setting/password";
import DeleteAccount from "./setting/deleteAcc";
const Setting = () => {
    const navigate = useNavigate()







    // useEffect(() => {
    //     console.log(file)
    // }, [file])




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