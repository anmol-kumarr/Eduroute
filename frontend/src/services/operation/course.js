import { useState } from "react"
import { categoriesApi, createCourseApi, editCourse } from "../api"
import { apiConnector } from "../apiconnector"
import { useDispatch } from "react-redux"
import { changeState, setCourse, setCourseCategories } from "../../redux/slice/courseSlice"
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
            toast.dismiss()
            toast.success("course created")
            // toast.dismiss()
            dispatch(setCourse(response.data.data))
            dispatch(changeState(2))
        } catch (err) {
            console.log(err)
            toast.dismiss()
            toast.error('Error while creating course')
        }

        // toast.remove()

    }
}


export const createSection = (data) => {
    toast.loading('loading')
    const api = createCourseApi.createSection
    return async (dispatch) => {
        try {

            const response = await apiConnector('POST', api, data)
            console.log(response)
            dispatch(setCourse(response.data.data))
            toast.dismiss()
            toast.success('Section created')
        } catch (err) {
            toast.dismiss()
            console.log(err)
            toast.error('Cannot create section')
        }

    }
}



export const sectionEdit = (data) => {
    return async (dispatch) => {
        toast.loading('loading')
        try {
            const api = editCourse.editSection
            const response = await apiConnector('PUT', api, data)
            toast.remove()
            toast.success('Section edited successfully')
            dispatch(setCourse(response.data.data))


        } catch (err) {
            console.log(err)
            toast.dismiss()
            toast.error('Cannot edit section')
        }
    }
}

export const deleteSection = (sectionId) => {
    console.log(sectionId)
    return async (dispatch) => {
        toast.loading('loading')
        const api = editCourse.deleteSection
        try {
            // const response = await apiConnector('DELETE', api, { sectionId })
            // console.log(response)
            toast.dismiss()
            toast.success('Section deleted')
            // dispatch(setCourse(response.data.data))

        } catch (err) {
            console.log(err)
            toast.dismiss()
            toast.error('Cannot delete section')

        }
    }
}