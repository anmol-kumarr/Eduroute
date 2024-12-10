import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import Requirement from "./requirement";
import { changeState, setCourse, setEditCourse } from "../../../../../redux/slice/courseSlice";
import FormBtn from "../formBtn";
import { IoIosArrowForward } from "react-icons/io";
import CourseThumbnail from "./courseThumbnail";
import { json, useNavigate } from 'react-router-dom'
import Tags from "./tags";
import { createCourse, updateCourse } from "../../../../../services/operation/course";
import toast from "react-hot-toast";

const CourseIntroForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()
    const courseCategories = useSelector(state => state.course.courseCategories)
    const editCourse = useSelector(state => state.course.editCourse)
    const course = useSelector(state => state?.course?.MyCourse)
    const navigate = useNavigate()


    const onSubmit = (data) => {

        const currentValues = getValues()

        const formData = new FormData()
        if (editCourse) {
            // if (isFormUpdated()) {
            //     console.log('hello')
            //     console.log(isFormUpdated())
            //     if (course.courseName !== data.courseTitle) {
            //         formData.append('courseName', data.courseTitle)
            //     } if (course.courseDescription !== data.description) {
            //         formData.append('courseDescription', data.description)
            //     } if (course.whatYouWillLearn !== data.benefits) {
            //         formData.append('whatYouWillLearn', data.benefits)
            //     }
            //     if (course.price !== data.price) {
            //         formData.append('price', data.price)
            //     } if (course.categories._id !== data.category) {
            //         formData.append('categories', data.category)
            //     } if (course.thumbnail !== data.thumbnail) {
            //         formData.append('thumbnailImage', data.thumbnail)
            //     } if (JSON.stringify(course.instruction) !== JSON.stringify(data.requirement)) {
            //         formData.append('instruction', JSON.stringify(data.requirement))
            //     } if (JSON.stringify(course.tag) !== JSON.stringify(data.tags)) {
            //         formData.append('tag', JSON.stringify(data.tags))
            //         formData.append('status', 'Draft')
            //     }
            //     console.log('formdata:', formData)
            //     if (formData.entries().next().done) {
            //         return toast.error('No changes made to the course details')
            //     }
            //     dispatch(updateCourse(formData, course._id))
            // } else {

            //     return toast.error('No changes made to the course details')

            // }

            if (isFormUpdated()) {
                // console.log(data)
                const currentValues = getValues()
                const formData = new FormData()
                // console.log(data)
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }else{
                    formData.append("courseName", course.courseName)
                }

                if (currentValues.description !== course.courseDescription) {
                    formData.append("courseDescription", data.description)
                }else{
                    formData.append("courseDescription", course.courseDescription)
                }
                if (currentValues.price !== course.price) {

                    formData.append('price', data.price)
                }else{
                    formData.append('price', course.price)
                }
                // if (currentValues.tag.toString() !== course.tag.toString()) {
                //     formData.append('tag', JSON.stringify(data.tags))

                // }
                if (JSON.stringify(currentValues.tags) !== JSON.stringify(course.tag)) {
                    formData.append('tag', JSON.stringify(currentValues.tags));
                }else{
                    formData.append('tag', JSON.stringify(course.tag));
                }
                if (currentValues.benefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.benefits)
                }else{
                    formData.append("whatYouWillLearn", course.whatYouWillLearn)
                }
                if (currentValues.category !== course.categories._id) {
                    formData.append("category", data.category)
                }else{
                    formData.append("category", course.categories._id)
                }
                if (
                    JSON.stringify(currentValues.requirement) !== JSON.stringify(course.instruction)
                ) {

                    formData.append('instruction', JSON.stringify(data.requirement))
                }else{
                    formData.append('instruction', JSON.stringify(course.instruction))
                }
                if (currentValues.thumbnail !== course.thumbnail) {
                    formData.append("thumbnailImage", data.thumbnail)
                    // console.log('thumbnail:',data.thumbnail)
                }else{
                    formData.append("thumbnailImage", course.thumbnail)
                    // console.log('thumbnail:',course.thumbnail)
                }

                dispatch(updateCourse(formData))

                // }
            } else {
                toast.error("No changes made to the form")
            }
            return
        }

        else {

            // console.log(data.courseTitle)
            formData.append('courseName', data.courseTitle)

            formData.append('courseDescription', data.description)

            formData.append('whatYouWillLearn', data.benefits)

            formData.append('price', data.price)
            formData.append('categories', data.category)

            formData.append('thumbnailImage', data.thumbnail)

            formData.append('instruction', JSON.stringify(data.requirement))
            formData.append('tag', JSON.stringify(data.tags))

            formData.append('status', 'Draft')

            // console.log(formData)
            // for (let pair of formData.entries()) {
            //     console.log(`${pair[0]}: ${pair[1]}`);
            // }

            dispatch(createCourse(formData))
        }
    }

    useEffect(() => {
        if (editCourse) {

            setValue('courseTitle', course.courseName)
            setValue('description', course.courseDescription)
            setValue('benefits', course.whatYouWillLearn)
            setValue('price', course.price)
            setValue('category', course.categories._id)
            // console.log('id:',course.categories._id)
            setValue('thumbnail', course.thumbnail)
            setValue('requirement', JSON.parse(course.instruction))
            setValue('tags', JSON.parse(course.tag))
            // console.log('tags:',course.tag[0])
        }
    }, [])
    const cancelHandler = () => {
        dispatch(setCourse(null))
        dispatch(setEditCourse(false))
        navigate(-1)
    }



    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.description !== course.courseDescription ||
            currentValues.price !== course.price ||
            JSON.stringify(currentValues.tags) !== JSON.stringify(course.tag) ||
            currentValues.benefits !== course.whatYouWillLearn ||
            currentValues.category._id !== course.category._id ||
            JSON.stringify(currentValues.requirement) !== JSON.stringify(course.instruction) ||
            currentValues.thumbnail !== course.thumbnail
        ) {
            return true
        }
        return false
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

                        <input className="text-base bg-richblack-700 my-2 outline-none border-none w-full h-full" placeholder="course price" type="text" id="price" {...register("price", { required: true, valueAsNumber: true })} />
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


                <Tags register={register} errors={errors} handleSubmit={handleSubmit} setValue={setValue} getValue={getValues} ></Tags>

                <CourseThumbnail register={register} errors={errors} handleSubmit={handleSubmit} setValue={setValue} getValue={getValues} ></CourseThumbnail>



                <div>


                    <label htmlFor="benefits">Benefits of course <span className="text-pink-500 text-lg">*</span></label>
                    <br />


                    <textarea id="benefits" cols={3} rows={5} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter benefits of course" {...register('benefits', { required: true })}></textarea>
                    {errors.benefits && <span>Course benefits is required</span>}


                </div>


                <Requirement register={register} errors={errors} handleSubmit={handleSubmit} setValue={setValue} getValue={getValues} ></Requirement>



                <div className="flex justify-between my-5 mr-5">
                    <button onClick={cancelHandler} type="button" className="px-2 py-1 text-richblack-200">Cancel</button>
                    <div className="flex ">

                        {
                            editCourse && (
                                <button className="mx-4 px-2 py-1 rounded-md border border-richblack-400" type="button" onClick={() => dispatch(changeState(2))}>Continue without saving</button>
                            )
                        }

                        {/* <button type="submit">
                        Submit
                        </button> */}

                        <FormBtn type={'submit'} active={true} text={!editCourse ? <>Next <IoIosArrowForward className="-mb-0.5" /></> : 'Save changes'}></FormBtn>
                    </div>
                </div>




                {/* <button type="submit">Submit</button> */}
            </form>
        </div>
    )
}
export default CourseIntroForm


