import { useState } from "react";

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const handleResetPassword = (e) => {
        e.preventDefault();
        // handle reset password logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-richblack-900">
            <div className="w-full max-w-md  p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">Reset your password</h2>
                <p className="text-richblack-100 mb-8">
                    Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery.
                </p>
                
                <form onSubmit={handleResetPassword}>
                    <div className="mb-6">
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

                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-50 text-black font-semibold font-inter rounded-md  transition-all duration-200"
                    >
                        Reset Password
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <a href="/login" className="text-gray-400 hover:text-white transition duration-200">
                        ← Back to login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
