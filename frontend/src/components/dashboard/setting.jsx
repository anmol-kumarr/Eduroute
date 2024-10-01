import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import toast from "react-hot-toast";
import { profileImage } from "../../services/operation/updateDetails";
import { techProfessions } from "../../data/professionData";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Setting = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPasssword] = useState(false)
    const [showConfirmPassword, setShowConfirmPasssword] = useState(false)
    const user = useSelector(state => state.user.user)
    // const token = useSelector(state => state.auth.token)
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
        e.target.value = ''

    }
    // useEffect(() => {
    //     console.log(file)
    // }, [file])
    const sendFile = () => {
        console.log(file)
        dispatch(profileImage(file))
        setFile(null)
    }

    const [selectedGender, setSelectedGender] = useState('male'); // Set the initial state to 'male'

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };

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
                <div className="bg-richblack-800 p-5 flex justify-between items-center rounded-md mt-5  border border-richblack-700">
                    <div className="flex gap-3 items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
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
                                <button onClick={sendFile} className="flex items-center font-medium text-sm gap-1 bg-yellow-50 text-richblack-900 py-1 px-3 rounded-md">
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

                <div className="bg-richblack-800  p-5 rounded-md border border-richblack-700 my-2">
                    <h2 className="text-richblack-50 text-xl mb-5">Profile information</h2>
                    <div className="flex justify-between my-2 w-full text-richblack-100">
                        <div className="w-[45%]">

                            <label htmlFor="name">Display name</label>
                            <br />
                            <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 " name="name" type="text" id="name" placeholder="Enter your name" />
                        </div>

                        <div className="w-[45%] ">
                            <label htmlFor="profession">Profession</label><br />
                            <select name="profession" id="profession" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 ">
                                {
                                    techProfessions.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>



                    <div className="flex justify-between items-center w-full">


                        <div className="w-[45%] text-richblack-100">
                            <div className="">
                                <label htmlFor="dateOfBirth">Date of birth</label><br />
                                <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 " type="date" />
                            </div>
                        </div>
                        <div className="w-[45%]" >
                            <p>Gender</p>
                            <div className="bg-richblack-700 my-1 py-2 px-3 rounded-md flex justify-between shadow-richblack-400 shadow-sm ">
                                <div>

                                    <input class="" checked={selectedGender === 'male'} onChange={handleGenderChange} className="" type="radio" id="male" value='male' name="gender" />

                                    <label htmlFor="male">Male</label>
                                </div>
                                <div>

                                    <input className="border-yellow-50" checked={selectedGender === 'female'} onChange={handleGenderChange} type="radio" id="female" value='female' name="gender" />
                                    <label htmlFor="female">Female</label>
                                </div>
                                <div>

                                    <input checked={selectedGender === 'others'} onChange={handleGenderChange} type="radio" id="others" value='others' name="gender" />
                                    <label htmlFor="others">Others</label>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-between my-3 w-full text-richblack-100">
                        <div className="w-[45%]">

                            <label htmlFor="mobile">Mobile number</label>
                            <br />
                            <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 " name="mobile" type="text" id="mobile" placeholder="1234567890" />
                        </div>
                        <div className="w-[45%]">

                            <label htmlFor="bio">About</label>
                            <br />
                            <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 " name="bio" type="text" id="bio" placeholder="Enter your bio" />
                        </div>
                    </div>
                </div>

                <div class='bg-richblack-800'>

                    <div className=" flex gap-4  p-5 rounded-md border border-richblack-700 my-2">
                        <div className="w-1/2">

                            <label htmlFor="password">Password<span className="text-pink-300">*</span></label><br />
                            <div className=" flex rounded-md shadow-richblack-400 shadow-sm my-1 bg-richblack-700">


                                <input id="password" className="w-5/6 text-richblack-200 bg-transparent  outline-none border-none   py-2 px-2" type={showPassword === true ? "text" : "password"} placeholder="Enter Password" />
                                <div className="mx-2 text-richblack-200 my-auto text-lg text-richblack" onClick={() => setShowPasssword(!showPassword)}>
                                    {
                                        showPassword === true ? <FaRegEyeSlash /> : <FaRegEye />
                                    }
                                </div>
                            </div>
                        </div>


                        <div className="w-1/2 ">

                            <label htmlFor="confirmPassword">Confirm Password<span className="text-pink-300">*</span></label><br />
                            <div className=" flex rounded-md shadow-richblack-400 shadow-sm my-1 bg-richblack-700">


                                <input id="confirmPassword" className="text-richblack-200 bg-transparent  outline-none border-none w-5/6  py-2 px-2" type={showConfirmPassword === true ? "text" : "password"} placeholder="Enter confirm Password" />
                                <div className="mx-2 text-richblack-200 my-auto text-lg text-richblack" onClick={() => setShowConfirmPasssword(!showConfirmPassword)}>
                                    {
                                        showConfirmPassword === true ? <FaRegEyeSlash /> : <FaRegEye />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Setting