import { LiaTimesSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { GoStar, GoStarFill } from "react-icons/go";
import { useState } from "react";
import { useForm } from "react-hook-form"
const RatingModal = ({ setModal }) => {
    const user = useSelector(state => state.user.user)
    const [number, setNumber] = useState(0)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()

    const submitHandler = (data) => {
        console.log(data, number)
        console.log(errors)
    }
    return (
        <div className="flex justify-center my-[20%]  items-center">
            <div className="w-96 bg-richblack-800 rounded-md overflow-hidden">
                <div className="flex justify-between items-center px-3 py-2 border-b-[1px] border-richblack-400 bg-richblack-700">
                    <p>Add review</p>
                    <button onClick={() => setModal(false)}>
                        <LiaTimesSolid className="-mb-[2px]"></LiaTimesSolid>
                    </button>

                </div>
                <div className="flex flex-col items-center">

                    <div className="flex  gap-1 items-center my-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img className="w-full h-full" src={user.image} alt="" />
                        </div>
                        <div className="">
                            <p >{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-richblack-500 font-medium">Posting publicly</p>
                        </div>
                    </div>
                    <div className="text-yellow-100 flex gap-[2px] my-1">
                        {[...Array(5)].map((_, i) => (

                            number >= i ? (
                                <GoStarFill key={i} onClick={() => setNumber(i)}></GoStarFill>
                            ) : (
                                <GoStar key={i} onClick={() => setNumber(i)}></GoStar>
                            )

                        ))}
                    </div>
                    <div className=" flex flex-col gap-1  items-center">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="flex flex-col items-center p-1 text-sm">

                                <label className="text-richblack-200 text-sm mb-1" htmlFor="review">Add your Experience <span className="text-[#ff0000] text-start">*</span></label>

                                <textarea placeholder="" {...register('ratingdescription', { required: true })} rows={5} cols={50} className="p-1 rounded-md bg-richblack-700 outline-none  border-richblack-500" name="review" id="review"></textarea>

                                <p>{errors.description && 'Error'}</p>


                            </div>
                            <div className="mb-5 mt-3 flex gap-2 justify-end">
                                <button className="bg-richblack-400 px-2 py-1 rounded-md shadow-[2px_2px_0px_#2C333F]">Cancel</button>
                                <button type="submit" className="text-black bg-yellow-100 px-2 py-1 rounded-md shadow-[2px_2px_0px_#FFE83D]">Submit</button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}
export default RatingModal