import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPasswordToken from "../services/operation/passwordtoken";
const ResetPassword = () => {
    const { loading } = useSelector(state => state.auth)
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("");
    const dispatch = useDispatch()
    const [warning, setWarning] = useState(null)


    useEffect(() => {
        console.log('warning', warning)
    }, [warning])

    const messageSetter = (message) => {
        setWarning(message)
    }
    const handleResetPassword = (e) => {

        e.preventDefault();
        if (email.length === 0) return alert('Email is empty')
        const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
            email
        );
        if (!isEmailValid) return alert('invalid email')
        // handle reset password logic here

        dispatch(getPasswordToken(email, setEmailSent, messageSetter))


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-richblack-900">


            {loading === true ? <div>Loading...</div> :

                <div className="w-full max-w-md  p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-white mb-4">{!emailSent ? 'Reset your password' : 'Check your email'}</h2>
                    <p className="text-richblack-100 mb-8">

                        {!emailSent ? <>Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery.</> : <>we have sent the reset email to {email}</>
                        }
                    </p>

                    <form >

                        <>
                            {

                                !emailSent && <div className="mb-6">
                                    <label htmlFor="email" className="  block text-richblack-25 mb-1">Email Address <span className="text-pink-500">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 bg-gray-800 text-white rounded-md border focus:outline-none outline-none border-none bg-richblack-700"
                                        placeholder="youremail@example.com"
                                        required
                                    />
                                </div>

                            }
                        </>

                        <button onClick={handleResetPassword}
                            type="submit"
                            className="w-full py-3 bg-yellow-50 text-black font-semibold font-inter rounded-md  transition-all duration-200"
                        >
                            {!emailSent ? 'Reset Password' : 'Resend email'}
                        </button>
                    </form>

                    <p className="text-[#FF0000] text-center mt-4 ">{warning && <>{warning}</>}</p>
                    <div className="mt-4 text-center">
                        <a href="/auth/login" className="text-white">
                            ← Back to login
                        </a>
                    </div>
                </div>
            }
        </div>
    );
};

export default ResetPassword;
