import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import LargeBtn from '../components/largeBtn';

const VerifyEmail = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            let newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            // Automatically move to the next input if current is filled
            if (value !== "" && index < 5) {
                document.getElementById(`code-${index + 1}`).focus();
            }
        }
    };

    const handleVerify = async (e) => {
        // e.preventDefault();
        const url = `${process.env.REACT_APP_BASE_URL}auth/signup`
        const data = [...code]
        try {

            const response = await apiConnector("POST", url, data)
            console.log(response)
            // Handle verification logic here
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-richblack-900 text-richblack-25">



            {/* Main Form Section */}
            <div className="w-full max-w-md  p-8 rounded-lg shadow-lg mt-10">
                <h2 className="text-2xl font-semibold mb-2">Verify email</h2>
                <p className="text-gray-400 mb-8">A verification code has been sent to you. Enter the code below</p>

                <form onSubmit={handleVerify}>
                    <div className="flex justify-around mb-8">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                id={`code-${index}`}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                className="w-11 bg-richblack-800 h-11 text-center text-xl font-bold bg-gray-500 text-richblack-500 rounded-md border-none focus:ring-2 focus:ring-yellow-100 outline-none"
                            />
                        ))}
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
        </div>
    );
};

export default VerifyEmail;
