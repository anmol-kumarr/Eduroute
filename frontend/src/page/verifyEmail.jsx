import { useState } from 'react';
import { Link } from 'react-router-dom';

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

    const handleVerify = (e) => {
        e.preventDefault();
        // Handle verification logic here
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

                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-100 text-black font-bold rounded-md hover:bg-yellow-100 transition-all duration-200"
                    >
                        Verify email
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link to='/auth/login'>
                    ← Back to login
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
