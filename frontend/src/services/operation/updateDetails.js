import { useSelector } from "react-redux"
import { updateProfileApi } from "../api"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../redux/slice/profileSlice"
import toast from "react-hot-toast"

export const profileImage = (image, token) => {

    const api = updateProfileApi.updateImage

    return async (dispatch) => {
        try {
            const authToken = {
                Authorization: `Bearer ${token}`,
            }

        
            const formData = new FormData();
            formData.append('profilePicture', image);
            // console.log()
            const response = await apiConnector('PUT', api, formData, authToken)
            dispatch(setUser(response.data.user))
            console.log(response.data.user)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            toast.success('Profile picture updated')
        } catch (err) {
            console.log(err)
            toast.error('Cannot update profile')
        }
    }

} 