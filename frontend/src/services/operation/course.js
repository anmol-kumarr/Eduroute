import { useState } from "react"
import { categoriesApi, createCourseApi } from "../api"
import { apiConnector } from "../apiconnector"
import { useDispatch } from "react-redux"
import { changeState, setCourseCategories } from "../../redux/slice/courseSlice"
import toast from "react-hot-toast"

export const fetchCourseCategories = () => {
    // const dispatch=useDispatch()
    return async (dispatch) => {

        try {
            const response = await apiConnector('GET', categoriesApi.getAllCategories)
            dispatch(setCourseCategories(response.data.data))

        } catch (err) {
            console.log(err)
        }

    }
}


export const createCourse = (formData) => {
    return async (dispatch) => {
        const api = createCourseApi.createIntro
        toast.loading('loading')
        try {
            const response = await apiConnector('POST', api, formData)
            console.log(response)
            toast.success("course created")
            // toast.dismiss()
            dispatch(changeState(2))
        } catch (err) {
            console.log(err)
            toast.error('Error while creating course')
        }

        toast.remove()

    }
}