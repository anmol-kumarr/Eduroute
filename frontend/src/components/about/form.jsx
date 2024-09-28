import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import countrycode from '../../data/countrycode.json'
const Form = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                mobileNumber:"",
                message: "",
                countryCode:'+91'
            });
        }
    }, [isSubmitSuccessful, reset]);
    const submitContactForm = async (data) => {
        setLoading(true)
        console.log(errors)
        // if (errors) {
        //     return toast.error('cannot submit')
        // }

        try {
            console.log(data)
        }
        catch (err) {
            console.log(err)
            toast.error('Cannot send message')
        }
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitContactForm)}>
                <div className="text-richblack-100 flex  gap-4 ">
                    <div className="w-1/2">

                        <label htmlFor="firstname">First Name</label>
                        <br />
                        <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter your first name" type="text" id="firstname" {...register("firstName", { required: true })} />
                        {errors.firstName && (
                            <span>First name is required</span>
                        )}
                    </div>

                    <div className="w-1/2">

                        <label htmlFor="lastname">Last Name</label>
                        <br />
                        <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 text-sm px-2" placeholder="Enter your last name" type="text" id="lastname" {...register("lastName", { required: true })} />
                        {errors.lastName && (
                            <span>Last name is required</span>
                        )}
                    </div>


                </div>


                <div className="text-richblack-100">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input placeholder="Enter your email" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" type="email" id="email" {...register("email", { required: true })} />


                    {
                        errors.email && (
                            <span>Email is required</span>
                        )
                    }
                </div>

                <label className="text-richblack-100" htmlFor="mobile">Mobile number</label>
                <div className="flex gap-2  text-richblack-100">
                    <div className="w-[25%]">


                        <select value={"+91"} className="w-full text-richblack-100 rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" name="dropdown" id="dropdown" {...register('countryCode', { required: true })}>

                            {
                                countrycode.map((code, index) => (
                                    <option  key={index} value={code.code}>
                                        {code.code}-{code.country.length > 10 ? <>{code.country.slice(0, 10)}...</> : <>{code.country}</>}
                                    </option>
                                ))
                            }
                        </select>
                    </div>






                    <div className="w-[75%]">

                        <input className="w-full  rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" id="mobile" name="mobile" type="text" placeholder="Enter mobile number"
                            {...register("mobileNumber",
                                {
                                    required: { value: true, message: 'mobile number is required' },
                                    maxLength: { value: 10, message: 'Invalid phone number' },
                                    minLength: { value: 10, message: 'invalid phone number' }
                                })} />
                    </div>
                    {
                        errors.mobileNumber&& <span>{errors.mobileNumber.message}</span>
                    }
                </div>


                <div className="text-richblack-100">
                    <label htmlFor="message">Message</label>
                    <br />
                    <textarea cols={30} rows={5} placeholder="Enter your message" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" type="text" id="message" {...register("message", { required: true })} />

                    {
                        errors.message && (
                            <span>Message is required</span>
                        )
                    }
                </div>

                <div>
                    <button className="bg-yellow-100 duration-150 ease-in-out active:scale-95 text-black font-medium py-2 w-full rounded-md font-inter  px-5 " type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;