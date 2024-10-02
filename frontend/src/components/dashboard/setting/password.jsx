import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import DashBoardBtn from "../dashboardbtn"
import { useState } from "react"

const Password=()=>{
    const [showPassword, setShowPasssword] = useState(false)
    const [showConfirmPassword, setShowConfirmPasssword] = useState(false)
    return (
        <div class='bg-richblack-800 border border-richblack-700 p-5 rounded-md  my-2'>

        <div className=" flex gap-4  ">
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
        <div className="flex justify-end items-center gap-2 py-2 mt-5">
            <DashBoardBtn classname={'text-black bg-yellow-100 px-3 py-1 rounded-md'} text={'Submit'}></DashBoardBtn>
            <DashBoardBtn classname={'text-richblack-100 bg-richblack-700 px-3 py-1 rounded-md'} text={'Cancel'}></DashBoardBtn>
        </div>

    </div>
    )
}

export default Password