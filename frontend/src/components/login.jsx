import {  useState } from "react"
import LargeBtn from "./largeBtn"
import HighlightedText from "./home/highlighted"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { PiWarningCircleLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/operation/loginuser";

const Login = () => {
    const [accountType, setAccountType] = useState('Student')
    const navigate = useNavigate()
    // const [authType, setAuthType] = useState(authValue)
    const [showPassword, setShowPasssword] = useState(false)
    const [loginValue, setLoginValue] = useState({
        email: '',
        password: ''
    })

    // useEffect(() => {
    //     console.log(loginValue)
    // }, [loginValue])

    const [warning, setWarning] = useState({ email: null, password: null })
    const validateValue = () => {
        if (loginValue.email.length === 0) return setWarning({ ...warning, email: 'email is empty' })
        const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
            loginValue.email
        );
        if (!isEmailValid) return setWarning({ ...warning, email: 'invalid email' })

        if (loginValue.password.length < 7) {
            return setWarning({ email: null, password: 'password must contain more than 8 character' })
        }
        else {
            setWarning({ email: null, password: null })

            return true
        }

    }
    const dispatch = useDispatch()


    const loginHandler = () => {
        const response = validateValue()
        // console.log(response)
        // console.log(warning)
        if (response === true) {
            dispatch(login(loginValue.email,loginValue.password))
            // console.log(response)


        }
        // if (response) navigate('/')

    }

    return (
        <div className="lg:w-[36%] sm:w-1/2 min-[400px]:w-9/12 w-11/12  mx-auto my-20 bg-richblack-800 p-5 rounded-md flex flex-col items-center justify-center">


            <div className="text-center">
                <h1 className="text-richblack-25 my-2 text-2xl font-inter font-bold">
                    Welcome Back
                </h1>
                <p className="text-normal text-sm my-3 text-richblack-25">Build skills for today, tomorrow, and beyond. <HighlightedText content={'Education to future-proof your career.'}></HighlightedText></p>
            </div>
            <div className="xl:w-1/2 md:w-[60%] w-[70%] py-1 my-5  px-1 flex justify-between gap-2 items-center rounded-3xl bg-richblack-700 text-richblack-200">
                <button onClick={() => setAccountType('Student')} className={`transition-all duration-100 ease-out  px-3 py-1 w-1/2 ${accountType === 'Student' && 'bg-richblack-900 rounded-3xl   '}`}>Student</button>
                <button onClick={() => setAccountType('Instructor')} className={`transition-all duration-100 ease-out   px-3 py-1 w-1/2 ${accountType === 'Instructor' && 'bg-richblack-900 rounded-3xl px-2  py-1'}`}>Instructor</button>
            </div>



            <div className="w-full text-richblack-100 flex flex-col gap-3">


                <div className="w-full ">

                    <label className="" htmlFor="firstName">Enter email<span className="text-pink-300">*</span></label><br />
                    <input onChange={(e) => setLoginValue({ ...loginValue, email: e.target.value })} value={loginValue.email} className={`border-[1.3px] ${warning.email ? 'border-pink-400' : "border-transparent"} w-full rounded-md shadow-richblack-400 shadow-sm outline-none  my-1 bg-richblack-700 py-2 px-2`} id="firstName" type="email" placeholder="Enter your email" />
                    <p className="flex items-center gap-1 text-pink-400 text-sm">

                        {
                            warning.email && <> <PiWarningCircleLight className="-mb-[3px]" /> {warning.email}</>
                        }
                    </p>


                </div>






                <div className="w-full">

                    <label className="text-richblack-100" htmlFor="password">Password<span className="text-pink-300">*</span></label><br />

                    <div className={`border  ${warning.password ? 'border-pink-400' : "border-transparent"} flex rounded-md shadow-richblack-400 shadow-sm my-1 bg-richblack-700`}>


                        <input autoComplete="off" onChange={(e) => setLoginValue({ ...loginValue, password: e.target.value })} id="password" value={loginValue.password} className={`text-richblack-200 bg-transparent  outline-none border-none  w-[90%] py-2 px-2`} type={showPassword === true ? "text" : "password"} placeholder="Enter Your Password" />
                        <div className=" text-richblack-200 my-auto text-lg text-richblack" onClick={() => setShowPasssword(!showPassword)}>
                            {
                                showPassword === true ? <FaRegEyeSlash /> : <FaRegEye />
                            }
                        </div>

                    </div>
                    <p className="flex items-center gap-1 text-pink-400 text-sm">{warning.password && <>
                        <PiWarningCircleLight className="-mb-[3px]" />
                        {warning.password}</>}</p>
                </div>

            </div>


            <div className="w-1/2 my-5">
                <LargeBtn behaviour={loginHandler} content={'Login'}></LargeBtn>
            </div>
        </div>

    )
}
export default Login