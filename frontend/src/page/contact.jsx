const ContactPage = () => {
    return (
        <div className="flex flex-wrap sm:w-11/12 w-full mx-auto my-10 gap-10 text-richblack-100">

            <div className="lg:w-[45%] md:w-[30%] sm:w-11/12 w-full mx-auto  text-center min-w-[350px] p-8 rounded-lg">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Chat on us</h3>
                    <p>Our friendly team is here to help.</p>
                    <p className="text-yellow-500">Contact us</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Visit us</h3>
                    <p>Come say hello at our office HQ.</p>
                    <p>Address: Some address, 101</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Call us</h3>
                    <p>Mon-Fri from 8am to 5pm.</p>
                    <p className="text-yellow-500">+123 456 7890</p>
                </div>
            </div>




            <div className="sm:w-8/12 md:w-6/12 lg:w-[45%] w-11/12  mx-auto  border-richblack-200 border-[1px] sm:p-5 py-8 px-3 rounded-lg">
                <h2 className="text-3xl font-bold mb-4 text-white">Got a Idea? We've got the skills. Let's team up</h2>
                <p className="text-gray-400 mb-6">
                    Tell us more about yourself and what you’ve got in mind.
                </p>
                <form className="space-y-4 w-full">
                    <div className="flex w-full flex-col md:flex-row md:space-x-4">
                        <div className="w-full">
                            <label className="block text-gray-300 mb-1" htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Enter first name"
                                className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-gray-300 mb-1" htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Enter last name"
                                className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-300 mb-1" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2"
                        />
                    </div>

                    {/* <div className="flex flex-col md:flex-row md:space-x-4"> */}
                        <div className="w-full">
                            <label className="block text-gray-300 mb-1" htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="12345 67890"
                                className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2"
                            />
                        </div>
                    {/* </div> */}

                    <div className="w-full">
                        <label className="block text-gray-300 mb-1" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            placeholder="Enter your message"
                            className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-600 transition-all"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactPage