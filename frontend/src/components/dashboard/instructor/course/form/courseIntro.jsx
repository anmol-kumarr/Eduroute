import { useState } from "react"
import { useForm } from "react-hook-form"
import {useDispatch} from 'react-redux'

const CourseIntro=()=>{
    const dispatch=useDispatch()
    const {register,handleSubmit,setValue,getValue,formState:{errors}}=useForm()
    const courseCategories=useState(state=>state.course.courseCategories)
    return (
        <div>

        </div>
    )
}
export default CourseIntro