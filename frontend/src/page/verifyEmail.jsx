import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LargeBtn from '../components/largeBtn';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/spinner';
import { IoTimerOutline } from "react-icons/io5";
import { otpSender, signUp } from '../services/operation/createUser';

const VerifyEmail = () => {
    const [otp, setOtp] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { loading, signUpData } = useSelector(state => state.auth)
    useEffect(() => {
        // if(!signUpData) navigate('/auth/signup')
    }, [])
    const handleVerify = () => {
        const { firstName, lastName, confirmPassword, password, mobileNumber, email, accountType } = signUpData
        // e.preventDefault();
        dispatch(signUp(otp, firstName, lastName, password, confirmPassword, mobileNumber, email, accountType))
    };
    // useEffect(() => {
    //     console.log(code.join())
    // }, [code])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-richblack-900 text-richblack-25">

            {
                loading ? <Spinner></Spinner> : <div className="w-full max-w-md  p-8 rounded-lg shadow-lg mt-10">
                    <h2 className="text-2xl font-semibold mb-2">Verify email</h2>
                    <p className="text-gray-400 mb-8">A verification code has been sent to you. Enter the code below</p>

                    <form>
                        <div className="flex justify-around mb-8">
                            {/* <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input className='input-field' {...props} />}
                            /> */}
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                // style={{ width: '3.5rem !important' }}
                                renderSeparator={<span className="mx-2">-</span>}  // Adjust spacing and color of separator
                                renderInput={(props) => (
                                    <div className='h-10 w-10 bg-richblack-700'>
                                        <input
                                            placeholder='*'
                                            {...props}
                                            className='h-full w-full   text-center   bg-richblack-700  text-richblack-100  rounded-md'
                                        />
                                    </div>
                                )}
                            />

                        </div>

                    </form>
                    <div className='text-richblack-800 font-medium font-inter'>
                        <LargeBtn behaviour={handleVerify} content={'Verify email'}></LargeBtn>
                    </div>

                    <div className="mt-4 text-center flex justify-between">
                        <Link to='/auth/login'>
                            ← Back to login
                        </Link>
                        <div onClick={() => otpSender(signUpData.email)} className='flex items-center gap-1 cursor-pointer text-caribbeangreen-300'>
                            <IoTimerOutline className='mt-1' /> resend it
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default VerifyEmail;
