import { useEffect,useState } from "react"
import HighlightedText from "../components/home/highlighted"
import LargeBtn from "../components/largeBtn"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { otpSender } from "../services/operation/createUser"
import Spinner from "./spinner"
import {setSignUp} from "../redux/slice/authSlice"



const SignUp = () => {
    
    const [accountType, setAccountType] = useState('Student')
    const dispatch = useDispatch()
    
    const [showPassword, setShowPasssword] = useState(false)
    const [showConfirmPassword, setShowConfirmPasssword] = useState(false)
    const { loading } = useSelector(state => state.auth)
    const navigate = useNavigate()
    

    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: ''
    })
    const [warning, setWarning] = useState(null)
    


    const formValidator = () => {
        if (signUpData.firstName < 3) {
            return setWarning('Enter valid first name')
        }


        if (signUpData.lastName.length === 0) {
            return setWarning('Enter last name')
        }

        if (signUpData.email.length === 0) return setWarning('email cannot be empty')
        const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
            signUpData.email
        );
        if (!isEmailValid) return setWarning('invalid email')

        let mob = /^[0-9]{10}$/

        if (signUpData.mobileNumber.length !== 10 || !mob.test(signUpData.mobileNumber)) {
            console.log('mobile');
            return setWarning('Please enter a valid 10-digit mobile number');
        }



        if (signUpData.password.length < 7) {
            return setWarning('Password must contain atleast 8 character')
        }
        if (signUpData.password !== signUpData.confirmPassword) {
            return setWarning('confirm password not matching')
        }

        return setWarning(true)
    }

    useEffect(() => {
        // console.log(signUpData)
        // console.log(typeof (signUpData.mobile))
        formValidator()
    }, [signUpData])



    
    const [showWarning, setShowWarning] = useState(false)

    // navigate('/')
    // console.log('form')
    // const {
    //     firstName, lastName, email, mobile, password, confirmPassword,accountType
    // } = signUpData
    // const data = { ...signUpData, accountType }
    
    
    const signupHandler = () => {
        setShowWarning(true)
        if (warning === true) {
            // console.log('Dispatching signUpData:', {...signUpData, accountType});

            dispatch(setSignUp({...signUpData,accountType}))

            dispatch(otpSender(signUpData.email,navigate))


            // console.log(data)
            // dispatch(otpSender(signUpData.email))
            
        }
    }

    return (
        <>
            {loading ? <Spinner></Spinner> :

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

                    <div className="w-full gap-3 text-sm flex flex-col text-richblack-200">

                        <div className="flex justify-center gap-5  text-richblack-200 text-sm">
                            <div className="w-1/2">
                                <label htmlFor="firstName">First Name<span className="text-pink-300">*</span></label><br />
                                <input onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })} value={signUpData.firstName} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="firstName" type="text" placeholder="Enter first name" />
                            </div>


                            <div className="w-1/2">
                                <label htmlFor="lastName">Last Name<span className="text-pink-300">*</span></label><br />
                                <input value={signUpData.lastName} onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="lastName" type="text" placeholder="Enter last name" />
                            </div>
                        </div>






                        <div className="w-full">
                            <label htmlFor="email">Email<span className="text-pink-300">*</span></label><br />
                            <input value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="email" type="email" placeholder="Enter your email" />

                        </div>






                        <div className="w-full">

                            <label htmlFor="mobile">Mobile number<span className="text-pink-300">*</span></label><br />
                            <input pattern="[0-9]{10}" value={signUpData.mobileNumber} onChange={(e) => setSignUpData({ ...signUpData, mobileNumber: e.target.value })} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="mobile" type="text" placeholder="Enter your mobile number" />


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


                                        <input value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} id="password" className="w-5/6 text-richblack-200 bg-transparent  outline-none border-none   py-2 px-2" type={showPassword === true ? "text" : "password"} placeholder="Enter Password" />
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


                                        <input value={signUpData.confirmPassword} onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })} id="confirmPassword" className="text-richblack-200 bg-transparent  outline-none border-none w-5/6  py-2 px-2" type={showConfirmPassword === true ? "text" : "password"} placeholder="Enter confirm Password" />
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

                    <p className="text-pink-400 my-4">{showWarning && warning !== true && warning}</p>
                    <div className="w-2/3 ">
                        <LargeBtn behaviour={signupHandler}  content={'SignUp'}></LargeBtn>
                    </div>

                </div>
            }

        </>
    )
}
export default SignUp