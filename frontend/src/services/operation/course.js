import { useState } from "react"
import { categoriesApi } from "../api"
import { apiConnector } from "../apiconnector"
import { useDispatch } from "react-redux"
import { setCourseCategories } from "../../redux/slice/courseSlice"

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