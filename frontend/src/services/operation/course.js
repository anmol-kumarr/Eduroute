import { useState } from "react"
import { categoriesApi, createCourseApi, editCourse } from "../api"
import { apiConnector } from "../apiconnector"
import { useDispatch } from "react-redux"
import { changeState, setCourse, setCourseCategories, setEditSubSection, setLoading } from "../../redux/slice/courseSlice"
import toast from "react-hot-toast"
import { setMyCourse } from "../../redux/slice/instructorSlice"


export const fetchCourseCategories = () => {
    
    // const dispatch=useDispatch()
    return async (dispatch) => {
        try {
        
            const response = await apiConnector('GET', categoriesApi.getAllCategories)
            dispatch(setCourseCategories(response.data.data))
            // toast.dismiss()

        } catch (err) {
            // console.log(err)
        }

    }
}


export const createCourse = (formData) => {
    return async (dispatch) => {
        const api = createCourseApi.createIntro
        toast.loading('loading')
        try {
            const response = await apiConnector('POST', api, formData)
            // console.log(response)
            toast.dismiss()
            toast.success("course created")
            // toast.dismiss()
            dispatch(setCourse(response.data.data))
            dispatch(changeState(2))
        } catch (err) {
            // console.log(err)
            toast.dismiss()
            toast.error('Error while creating course')
        }

        // toast.remove()

    }
}

export const deleteCourse = (id, setCourse) => {
    return async (dispatch) => {
        const api = editCourse.deleteCourse
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('DELETE', api, { id })
            dispatch(setMyCourse(response?.data?.data))
            // console.log(response)
            toast.success("Course deleted")
            // setCourse(response?.data?.data)

        } catch (err) {
            // console.log(err)
            toast.error('Cannot be deleted')
        }
        dispatch(setLoading(false))
    }
}

export const createSection = (data) => {
    toast.loading('loading')
    const api = createCourseApi.createSection
    return async (dispatch) => {
        try {

            const response = await apiConnector('POST', api, data)
            // console.log(response)
            dispatch(setCourse(response.data.data))
            toast.dismiss()
            toast.success('Section created')
        } catch (err) {
            toast.dismiss()
            // console.log(err)
            toast.error('Cannot create section')
        }

    }
}


export const uploadCourseStatus = (formData, courseId, navigate) => {
    return async (dispatch) => {
        toast.loading('loading')
        const api = editCourse.publishCourse
        try {
            const response = await apiConnector('PUT', api, { status: formData, courseId })
            // console.log(response)
            dispatch(setCourse(response?.data?.data))
            navigate('/dashboard/my-courses')
            toast.dismiss()
            toast.success('course uploaded')
            dispatch(changeState(1))
        } catch (err) {
            // console.log(err)
            toast.dismiss()
            toast.error('Error while saving course')
        }
    }
}


export const sectionEdit = (data, setEditSection, setValue) => {
    return async (dispatch) => {
        toast.loading('loading')
        try {
            const api = editCourse.editSection
            const response = await apiConnector('PUT', api, data)
            // console.log(response)
            toast.remove()

            toast.success('Section edited successfully')
            setEditSection(null)
            setValue('section', '')
            // const value={
            //     ...course,

            // }
            dispatch(setCourse(response.data.data))


        } catch (err) {
            // console.log(err)
            toast.dismiss()
            toast.error('Cannot edit section')
        }
    }
}

export const deleteSection = (courseId, sectionId) => {
    // console.log(sectionId)
    return async (dispatch) => {
        toast.loading('loading')
        const api = editCourse.deleteSection
        try {
            const response = await apiConnector('DELETE', api, { courseId, sectionId })
            // console.log(response)
            toast.dismiss()
            toast.success('Section deleted')
            dispatch(setCourse(response.data.data))

        } catch (err) {
            // console.log(err)
            toast.dismiss()
            toast.error('Cannot delete section')

        }
    }
}


export const createSubSection = (formData) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        toast.loading('loading')
        const api = editCourse.addSubSection
        try {
            const response = await apiConnector('POST', api, formData)
            // console.log(response)
            dispatch(setCourse(response?.data?.data))
            toast.dismiss()
            toast.success("lecture added")
            dispatch(setLoading(false))
        } catch (err) {
            // console.log(err)
            toast.remove()
            toast.error("cannot add lecture")
        }
    }
}



export const editSubSection = (formData, setSubSectionModal) => {
    return async (dispatch) => {

        try {
            const api = editCourse.updateSubSection
            const response = await apiConnector('PUT', api, formData)
            // console.log(response)
            toast.success('Sub section updated')
            setSubSectionModal(false)
            dispatch(setEditSubSection({ data: response?.data?.data, sectionId: response?.data?.sectionId, subSectionId: response?.data?.subSectionId }))
        } catch (err) {
            // console.log(err)
        }
    }
}



export const updateCourse = (formData) => {
    return async (dispatch) => {
        toast.loading('loading')
        const api = editCourse.updateCourseDetails
        // console.log(formData)
        try {
            const response = await apiConnector('PUT', api, formData)
            // console.log(response)
            dispatch(setCourse(response?.data?.data))
            toast.dismiss()
            toast.success('Course updated')
            dispatch(changeState(2))
        } catch (err) {
            // console.log(err)
            toast.dismiss()
            toast.error('Cannot update course')
        }
    }
}