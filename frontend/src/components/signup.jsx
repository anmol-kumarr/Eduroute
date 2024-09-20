import {useRef,useState } from "react"
// import { useLocation, useParams } from "react-router-dom"
import HighlightedText from "../components/home/highlighted"
import LargeBtn from "../components/largeBtn"
// import countryCode from '../data/countrycode.json'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"



const SignUp = () => {
    // const authValue = useParams().authValue
    // console.log(authValue)

    const [accountType, setAccountType] = useState('Student')

    // const [authType, setAuthType] = useState(authValue)
    const [showPassword, setShowPasssword] = useState(false)
    const password = useRef(null)
    // useEffect(() => {
    //     setAuthType(authValue)
    // }, [authValue])
    return (
      

            <div className="w-[36%] mx-auto my-20 bg-richblack-800 p-5 rounded-md flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-richblack-25 my-3 text-2xl font-inter font-bold">
                        Join the millions learning to code with StudyNotion for free

                    </h1>
                    <p className="text-normal text-sm my-3 text-richblack-25">Build skills for today, tomorrow, and beyond. <HighlightedText content={'Education to future-proof your career.'}></HighlightedText></p>
                </div>
                <div className="w-1/2 py-1 my-5  px-1 flex justify-between gap-2 items-center rounded-3xl bg-richblack-700 text-richblack-200">
                    <button onClick={() => setAccountType('Student')} className={`transition-all duration-100 ease-out  px-3 py-1 w-1/2 ${accountType === 'Student' && 'bg-richblack-900 rounded-3xl   '}`}>Student</button>
                    <button onClick={() => setAccountType('Instructor')} className={`transition-all duration-100 ease-out   px-3 py-1 w-1/2 ${accountType === 'Instructor' && 'bg-richblack-900 rounded-3xl px-2  py-1'}`}>Instructor</button>
                </div>

                <div className="w-full flex flex-col">

                    <div className="flex justify-center gap-5  text-richblack-200 text-sm">
                        <div className="w-1/2">
                            <label htmlFor="firstName">First Name<span className="text-pink-300">*</span></label><br />
                            <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="firstName" type="text" placeholder="Enter first name" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="firstName">First Name<span className="text-pink-300">*</span></label><br />
                            <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="firstName" type="text" placeholder="Enter first name" />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="firstName">First Name<span className="text-pink-300">*</span></label><br />
                        <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="firstName" type="text" placeholder="Enter first name" />

                    </div>


                    <div className="w-full">

                        <label htmlFor="firstName">First Name<span className="text-pink-300">*</span></label><br />
                        <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="firstName" type="text" placeholder="Enter first name" />


                    </div>


                    {/* <div className="flex justify-center gap-5 p-2 text-richblack-25 text-sm">
                    <div className="">
                        <label htmlFor="firstName">Password<span className="text-pink-300">*</span></label><br />
                        <input className="rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="firstName" type="text" placeholder="Enter first name" />
                    </div>
                    <div>
                        <label htmlFor="firstName">Confirm password<span className="text-pink-300">*</span></label><br />
                        <input className="rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="firstName" type="text" placeholder="Enter first name" />
                    </div>
                </div> */}


                    <div className="w-full">
                        <div className={`flex justify-between gap-4 rounded-md bg-input-grey sm:w-full w-full`}>

                            <div className="w-1/2">

                                <label htmlFor="password">Password<span className="text-pink-300">*</span></label><br />
                                <div className=" flex rounded-md shadow-richblack-400 shadow-sm my-1 bg-richblack-700">


                                    <input id="password" ref={password} className="w-5/6 text-richblack-200 bg-transparent  outline-none border-none   py-2 px-2" type={showPassword === true ? "text" : "password"} placeholder="Enter Your Password" />
                                    <div className="mx-2 text-richblack-200 my-auto text-lg text-richblack" onClick={() => setShowPasssword(!showPassword)}>
                                        {
                                            showPassword === true ? <FaRegEyeSlash /> : <FaRegEye />
                                        }
                                    </div>
                                </div>
                            </div>


                            <div className="w-1/2 ">

                                <label htmlFor="password">Password<span className="text-pink-300">*</span></label><br />
                                <div className=" flex rounded-md shadow-richblack-400 shadow-sm my-1 bg-richblack-700">


                                    <input id="password" ref={password} className="text-richblack-200 bg-transparent  outline-none border-none w-5/6  py-2 px-2" type={showPassword === true ? "text" : "password"} placeholder="Enter Your Password" />
                                    <div className="mx-2 text-richblack-200 my-auto text-lg text-richblack" onClick={() => setShowPasssword(!showPassword)}>
                                        {
                                            showPassword === true ? <FaRegEyeSlash /> : <FaRegEye />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>


                <div className="w-5/6 my-4">
                    <LargeBtn content={'Login'}></LargeBtn>
                </div>
            </div>
        
    )
}
export default SignUp