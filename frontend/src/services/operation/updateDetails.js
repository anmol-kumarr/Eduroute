import { useSelector } from "react-redux"
import { updateProfileApi } from "../api"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../redux/slice/profileSlice"
import toast from "react-hot-toast"
import { json } from "react-router-dom"

export const profileImage = (image) => {

    const api = updateProfileApi.updateImage

    return async (dispatch) => {
        try {
            // const authToken = {
            //     Authorization: `Bearer ${token}`,
            // }

            toast.loading('Updating')

            const formData = new FormData();
            formData.append('profilePicture', image);
            // console.log()
            const response = await apiConnector('PUT', api, formData)
            dispatch(setUser(response.data.user))
            // setFile(null)
            console.log(response.data.user)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            toast.remove()
            toast.success('Profile picture updated')
        } catch (err) {
            toast.remove()
            console.log(err)
            toast.error('Cannot update profile')
        }
        // toast.dismiss()
    }

}

export const updateUserDetails = (navigate,{ name, profession, dateOfBirth, gender, mobileNumber, about }) => {
    return async (dispatch) => {
        const api=updateProfileApi.updateUserDetails

        const fullName=name.split(' ')
        const firstName=fullName[0]
        const lastName=fullName[1]
        console.log(firstName,lastName)
        try {
            toast.loading("loading")
            const response=await apiConnector("PUT",api,{
                firstName,
                lastName,
                profession,
                dateOfBirth,
                gender,
                mobileNumber,
                about
            })
            console.log(response)
            toast.remove()
            localStorage.setItem('user',JSON.stringify(response.data.updateName))
            dispatch(setUser(response.data.updateName))
            toast.success('Details updated')
            navigate('/dashboard/my-profile')
        } catch (err) {
            toast.remove()
            console.log(err)
            toast.error("error while updating")
        }

    }
}