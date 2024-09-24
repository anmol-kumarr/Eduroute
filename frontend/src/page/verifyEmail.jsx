import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import LargeBtn from '../components/largeBtn';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/spinner';

const VerifyEmail = () => {
    const [otp, setOtp] = useState(null);

    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { loading, signUpData } = useSelector(state => state.auth)
    useEffect(()=>{
        // if(!signUpData) navigate('/auth/signup')
    },[])
    const handleVerify = async (e) => {
        const {firstName,lastName,confirmPassword,password,mobile}=signUpData
        e.preventDefault();
        dispatch({ otp, firstName,lastName,password,confirmPassword,mobile})
    };
    // useEffect(() => {
    //     console.log(code.join())
    // }, [code])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-richblack-900 text-richblack-25">

            {
                loading?<Spinner></Spinner>:<div className="w-full max-w-md  p-8 rounded-lg shadow-lg mt-10">
                    <h2 className="text-2xl font-semibold mb-2">Verify email</h2>
                    <p className="text-gray-400 mb-8">A verification code has been sent to you. Enter the code below</p>

                    <form>
                        <div className="flex justify-around mb-8">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input className='input-field' {...props} />}
                            />
                        </div>

                    </form>
                    <div className='text-richblack-800 font-medium font-inter'>
                        <LargeBtn behaviour={handleVerify} content={'Verify email'}></LargeBtn>
                    </div>

                    <div className="mt-4 text-center">
                        <Link to='/auth/login'>
                            ← Back to login
                        </Link>

                    </div>
                </div>
            }
        </div>
    );
};

export default VerifyEmail;
