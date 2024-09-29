import React, { useState } from "react";
import LargeBtn from "../components/largeBtn";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setResetPassword } from "../services/operation/setPasswordfn";

const PasswordResetForm = () => {
    const dispatch=useDispatch()
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)


    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;
    // useEffect(()=>{
        
    // },[password])

    // Password requirements validation
    const location=useLocation()
    const changePasswordHandler=()=>{
        if(password.length>=8 &&  password===confirmPassword){
            const token=location.pathname.split('/').at(-1)
            dispatch(setResetPassword(password,confirmPassword,token))
        }
    }
    

    return (
        <div className="min-h-screen  flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8  rounded-lg shadow-md">
                <div className="mb-8">

                    <h2 className="text-2xl font-inter my-2 text-richblack-50  font-semibold">Choose new password</h2>
                    <p className="text-sm  mb-2 text-gray-400">
                        Almost done. Enter your new password and you're all set.
                    </p>
                </div>

                {/* New Password Input */}
                <div className="mb-2">
                    <label className="text-richblack-100" htmlFor="password">Password<span className="text-pink-300">*</span></label><br />

                    <div className={`mb-4 flex rounded-md shadow-richblack-400 shadow-sm my-1 bg-richblack-700`}>


                        <input onChange={(e) =>setPassword(e.target.value) } id="password" value={password} className={`text-richblack-200 bg-transparent  outline-none border-none  w-[90%] py-2 px-2`} type={showPassword === true ? "text" : "password"} placeholder="Enter Your Password" />
                        <div className=" text-richblack-200 my-auto text-lg text-richblack" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword === true ? <FaRegEyeSlash /> : <FaRegEye />
                            }
                        </div>

                    </div>





                    <label className="text-richblack-100" htmlFor="confirmPassword">Confirm password<span className="text-pink-300">*</span></label><br />

                    <div className={` flex rounded-md shadow-richblack-400 shadow-sm my-1 bg-richblack-700`}>


                        <input onChange={(e) =>setConfirmPassword(e.target.value) } id="confirmPassword" value={confirmPassword} className={`text-richblack-200 bg-transparent  outline-none border-none  w-[90%] py-2 px-2`} type={showPassword === true ? "text" : "password"} placeholder="Enter Your Password" />
                        <div className=" text-richblack-200 my-auto text-lg text-richblack" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {
                                showPassword === true ? <FaRegEyeSlash /> : <FaRegEye />
                            }
                        </div>

                    </div>


                

                
                </div>

                {/* Password Requirements */}
                <div className="text-sm flex list-none gap-3 mt-2">
                    <div>
                        <li className={hasLowercase ? "text-green-400" : "text-gray-400"}>
                            ✔ one lowercase character
                        </li>
                        <li className={hasUppercase ? "text-green-400" : "text-gray-400"}>
                            ✔ one uppercase character
                        </li>
                        <li className={hasNumber ? "text-green-400" : "text-gray-400"}>
                            ✔ one number
                        </li>
                    </div>
                    <div>
                        <li className={hasSpecialChar ? "text-green-400" : "text-gray-400"}>
                            ✔ one special character
                        </li>
                        <li className={isValidLength ? "text-green-400" : "text-gray-400"}>
                            ✔ 8 character minimum
                        </li>
                    </div>



                </div>

                {/* Reset Password Button */}
                <div className="w-full mt-3">
                    <LargeBtn behaviour={changePasswordHandler} content={'Reset Password'}></LargeBtn>
                </div>

                {/* Back to login link */}
                <p className="mt-4 text-sm text-gray-400 hover:text-white cursor-pointer">
                    ← Back to login
                </p>
            </div>
        </div>
    );
};

export default PasswordResetForm;
