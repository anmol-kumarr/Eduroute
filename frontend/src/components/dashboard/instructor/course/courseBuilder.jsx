import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { changeState, setEditCourse } from "../../../../redux/slice/courseSlice";
import { createSection, deleteSection, sectionEdit } from "../../../../services/operation/course";
import CourseContent from "./courseContent";

const CourseBuilder = () => {
    const { register, handleSubmit, setValue, getValue, formState: { errors } } = useForm()
    const [editSection, setEditSection] = useState(null)
    const course = useSelector(state => state.course.course)

    // const editCourse = useSelector()
    const dispatch = useDispatch()



    const cancelEdit = () => {
        setEditSection(null)
        setValue('section', "")
    }

    const backHandler = () => {
        dispatch(setEditCourse(true))
        dispatch(changeState(1))
    }
    const submit = (data) => {
        const values = {
            courseId: course?._id,
            sectionName: data.section
        }
        console.log(data)
        if (editSection) {
            return
        }
        else {
            dispatch(createSection(values))
        }

    }
    const editSectionHandler=(sectionName,sectionId)=>{
        const values={
            sectionName:sectionName,
            sectionId:sectionId
        }
        dispatch(sectionEdit(values))
    }
    const deleteSectionHandler=(sectionId)=>{
        dispatch(deleteSection(sectionId))
    }


    return (
        <div className="text-richblack-50 bg-richblack-800 px-3 py-3 rounded-md">
            <h2 className="text-xl font-semibold ">Course Builder</h2>
            <form onSubmit={handleSubmit(submit)}>


                <div className="mt-5">
                    <label htmlFor="section">Create Section <span className="text-[#ff0000]">*</span></label>
                    <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter Section name" type="text" id="section" {...register("section", { required: true })} />
                </div>

                <div className="flex justify-between mx-2 mt-5 items-center">
                    <div>
                        <button onClick={backHandler} type="button" className="text-white">Back</button>
                    </div>




                    <div className="flex gap-5 items-center">

                        <button type="submit" className=" text-yellow-100 flex gap-1 items-center px-3 py-1 border border-yellow-100 rounded-md">{
                            editSection ? (<>Edit section</>) : (<>Create Section</>)
                        }
                            <IoAddCircleOutline className="-mb-[3px] text-lg"></IoAddCircleOutline>
                        </button>
                        {

                            editSection && (

                                <button onClick={cancelEdit} type="button" className="px-3  py-1" >Cancel</button>
                            )
                        }
                    </div>


                </div>
            </form>




            <div>
                <CourseContent deleteSectionHandler={deleteSectionHandler} editSectionHandler={editSectionHandler}></CourseContent>
            </div>

        </div>
    )
}
export default CourseBuilder