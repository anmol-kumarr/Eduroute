import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import toast from "react-hot-toast";
import { profileImage } from "../../services/operation/updateDetails";
const Setting = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const token=useSelector(state=>state.auth.token)
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)





    const fileHandler = (e) => {
        const file = e.target.files[0]

        // console.log(file)


        const supportedFileTypes = ['image/avif', 'image/jpeg', 'image/png', 'image/jpg'];

        if (!supportedFileTypes.includes(file.type)) {
            return toast.error('File type not supported');
        }
        if (file.size > 1024 * 1024 * 2) {
            return toast.error('image size should be less than 2mb')
        }
        setFile(file)

    }

    return (
        <div className="p-5">
            <button onClick={() => navigate(-1)} className="flex  items-center gap-1 text-richblack-500">
                <IoIosArrowBack />
                Back
            </button>
            <h1 className="my-5 text-2xl mx-2">
                Edit profile
            </h1>
            <div className="w-10/12 mx-auto">
                <div className="bg-richblack-800 p-5 flex justify-between items-center rounded-md mt-5  border border-richblack-700">
                    <div className="flex gap-3 items-center">
                        <div className="w-14 h-14 rounded-full overflow-hidden">
                            <img className="w-full h-full" src={user.image} alt="" />
                        </div>
                        <div>
                            <p className="">Change profile picture</p>
                            <div className="flex gap-2 my-3">
                            
                                <label className="py-2 px-3 bg-richblack-600 text-sm rounded-md text-richblack-100 cursor-pointer hover:bg-richblack-700">
                                    Select File
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={fileHandler}
                                    />
                                </label>
                                <button onClick={()=>dispatch(profileImage(file,token))} className="flex items-center font-medium text-sm gap-1 bg-yellow-50 text-richblack-900 py-1 px-3 rounded-md">
                                    Upload
                                    <LuUpload></LuUpload>
                                </button>
                            </div>
                            {
                                file?.name && <p className="bg-richblack-600 text-richblack-200 py-1 px-2 rounded-md">
                                    {file.name}
                                </p>
                            }

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Setting