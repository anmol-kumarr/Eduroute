import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const Form = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
            });
        }
    }, [isSubmitSuccessful, reset]);
    const submitContactForm = async (data) => {
        setLoading(true)
        if(errors){
            return toast.error('Please fill all the fields')
        }

        try{
            console.log(register)
        }
        catch(err){
            console.log(err)
            toast.error('Cannot send message')
        }
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitContactForm)}>
                <div className="text-richblack-100 flex gap-4">
                    <div>

                        <label htmlFor="firstname">First Name</label>
                        <br />
                        <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter your first name" type="text" id="firstname" {...register("firstName", { required: true })} />
                        {errors.firstName && (
                            <span>First name is required</span>
                        )}
                    </div>

                    <div>

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
                    <input placeholder="Enter your email" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" type="email" id="email" {...register("email",{required:true})}/>


                    {
                        errors.email&&(
                            <span>Email is required</span>
                        )
                    }
                </div>


                <div className="text-richblack-100">
                    <label htmlFor="message">Message</label>
                    <br />
                    <textarea cols={30} rows={5} placeholder="Enter your message" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2" type="text" id="message" {...register("message",{required:true})}/>

                    {
                        errors.message&&(
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