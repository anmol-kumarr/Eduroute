import { LiaTimesSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { GoStar, GoStarFill } from "react-icons/go";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { apiConnector } from "../../services/apiconnector";
import { useParams } from "react-router-dom";
import { enrolledCourse } from "../../services/api";
import toast from "react-hot-toast";
const RatingModal = ({ setModal }) => {
    const user = useSelector(state => state.user.user)
    const { courseId } = useParams()
    const [number, setNumber] = useState(0)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()

    const submitHandler = async (data) => {
        const formData = new FormData()
        console.log(data)
        console.log(errors)

        formData.append('courseId', courseId)
        formData.append('reviews', data.description)
        formData.append('rating', number+1)
        const api = enrolledCourse.rateCourse
        toast.loading('loading')
        try {

            const response = await apiConnector('POST', api, formData)
            toast.dismiss()
            toast.success('Thank you for rating us')
            console.log(response)

        } catch (err) {
            toast.dismiss()
            console.log(err)
            toast.error('Cannot rate this course')
        }
        setModal(false)
    }
    return (
        <div className="flex justify-center sm:my-[10%] my-[60%]  items-center">
            <div className="sm:w-96 w-11/12 bg-richblack-800 rounded-md overflow-hidden">
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
                    <div className="w-full flex flex-col gap-1  items-center">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="flex flex-col items-center p-1 text-sm">

                                <label className="text-richblack-200 text-sm mb-1" htmlFor="review">Add your Experience <span className="text-[#ff0000] text-start">*</span></label>

                                <textarea placeholder="Enter your review" {...register('description', { required: true })} rows={5} cols={50} className="p-1 rounded-md bg-richblack-700 outline-none w-full  border-richblack-500" name="description" id="review"></textarea>

                                <p>{errors.description && 'Error'}</p>


                            </div>
                            <div className="mb-5 mt-3 flex gap-2 w-full sm:px-0 px-2 justify-end">
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