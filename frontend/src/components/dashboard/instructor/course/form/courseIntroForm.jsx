import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import Requirement from "./requirement";
import { changeState } from "../../../../../redux/slice/courseSlice";
import FormBtn from "../formBtn";
import { IoIosArrowForward } from "react-icons/io";
import CourseThumbnail from "./courseThumbnail";
import Tags from "./tags";

const CourseIntroForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, getValue, formState: { errors } } = useForm()
    const courseCategories = useSelector(state => state.course.courseCategories)
    const editCourse = useSelector(state => state.course.editCourse)

    useEffect(() => {

        if (editCourse) {
            setValue("courseTitle", editCourse.courseTitle)
            setValue("description", editCourse.description)
            setValue("price", editCourse.price)
            setValue("category", editCourse.category)
            setValue("benefits", editCourse.benefits)
            setValue("requirements", editCourse.requirements)
        }
    },[editCourse,setValue])

    const onSubmit = (data) => {
        
        console.log(data)
        
    }

    const isFormUpdate = () => {
        const currentValues = getValue()

        if (currentValues.courseTitle !== editCourse.courseTitle ||
            currentValues.description !== editCourse.description ||
            currentValues.price !== editCourse.price ||
            currentValues.category !== editCourse.category ||
            currentValues.benefits !== editCourse.benefits ||
            currentValues.requirements !== editCourse.requirements
        ) {
            return true
        }
        else {
            return false
        }
    }


    return (
        <div className="bg-richblack-800 px-3 py-3  rounded-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2" >

                <div className="">
                    <label htmlFor="courseTitle">Course title <span className="text-pink-500 text-lg">*</span> </label>
                    <br />
                    <input className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter course name" type="text" id="courseTitle" {...register("courseTitle", { required: true })} />
                    {errors.courseTitle && (
                        <span>Course name is required</span>
                    )}
                </div>


                <div className="">
                    <label htmlFor="description">Description <span className="text-pink-500 text-lg">*</span></label>
                    <br />


                    <textarea id="description" cols={3} rows={5} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Description" {...register('description', { required: true })}></textarea>
                    {errors.description && <span>Course description is required</span>}
                </div>



                <div className="">
                    <label htmlFor="price">Price <span className="text-pink-500 text-lg">*</span></label>
                    <br />
                    <div className="flex gap-1 items-center w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm  px-2">
                        <RiMoneyRupeeCircleFill className="text-lg text-richblack-200 -mb-1" />

                        <input className="text-base bg-transparent my-2 outline-none border-none w-full h-full" placeholder="course price" type="text" id="price" {...register("price", { required: true, valueAsNumber: true })} />
                    </div>
                    {errors.price && (
                        <span>Course price is required</span>
                    )}
                </div>

                <div>
                    <label htmlFor="categories">Categories <span className="text-pink-500 text-lg">*</span></label>
                    <br />
                    <select defaultValue="" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" name="categories" id="categories"  {...register('category', { required: true })}>
                        <option value="" disabled>Choose a category</option>
                        {
                            courseCategories && courseCategories.map((item) => (
                                <option key={item._id} id="" value={item._id}>{item.name}</option>
                            ))
                        }
                    </select>

                    {
                        errors.category && (
                            <span>Please select course category</span>
                        )
                    }
                </div>

                <Tags register={register} errors={errors} handleSubmit={handleSubmit} setValue={setValue} getValue={getValue} ></Tags>
                <CourseThumbnail></CourseThumbnail>
                <div>


                    <label htmlFor="benefits">Benefits of course <span className="text-pink-500 text-lg">*</span></label>
                    <br />


                    <textarea id="benefits" cols={3} rows={5} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter benefits of course" {...register('benefits', { required: true })}></textarea>
                    {errors.benefits && <span>Course benefits is required</span>}


                </div>

                <Requirement register={register} errors={errors} handleSubmit={handleSubmit} setValue={setValue} getValue={getValue} ></Requirement>


                <div className="flex justify-end mr-5">

                    {
                        editCourse && (
                            <button onClick={() => dispatch(changeState(2))}>Continue without saving</button>
                        )
                    }
                    <FormBtn active={true} text={!editCourse ? <>Next <IoIosArrowForward className="-mb-0.5" /></> : 'Save changes'}></FormBtn>
                </div>
            </form>
        </div>
    )
}
export default CourseIntroForm