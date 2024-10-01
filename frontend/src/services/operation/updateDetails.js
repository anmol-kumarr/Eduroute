import { useSelector } from "react-redux"
import { updateProfileApi } from "../api"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../redux/slice/profileSlice"
import toast from "react-hot-toast"

export const profileImage = (image) => {

    const api = updateProfileApi.updateImage

    return async (dispatch) => {
        toast.loading('Updating')
        try {
            // const authToken = {
            //     Authorization: `Bearer ${token}`,
            // }

            
            const formData = new FormData();
            formData.append('profilePicture', image);
            // console.log()
            const response = await apiConnector('PUT', api, formData)
            dispatch(setUser(response.data.user))
            // setFile(null)
            console.log(response.data.user)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            toast.remove()
            toast.success('Profile picture updated')
        } catch (err) {
            console.log(err)
            toast.error('Cannot update profile')
        }
        // toast.dismiss()
    }

} 