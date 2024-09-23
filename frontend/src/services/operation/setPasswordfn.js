// import { toast } from "react-toastify"
import { setLoading } from "../../redux/slice/authSlice"
import { profileApi } from "../../utils/api"
import { apiConnector } from "../apiconnector"
import { passwordApi } from "../api"
import { ToastBar,toast } from "react-hot-toast"

export const getPasswordToken = (email, setEmailSent, messageSetter) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        try {
            const response = await apiConnector('POST', profileApi.forgetPassword, { email })
            console.log('reset password token response', response)

            if (!response.data.success) {
                messageSetter(response.data.message)
                throw new Error(response.data.message)
            }
            toast.success('Reset email sent', {
                position: "top-center"
            })
            messageSetter(null)
            setEmailSent(true)

        } catch (err) {
            messageSetter(err.response.data.message)
            console.log(err)
        }
        dispatch(setLoading(false))
    }
}
export const setResetPassword = (password, confirmPassword, token) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('POST', passwordApi.resetPasswordApi, { password, confirmPassword, token })
            console.log(response)
            if (!response.data.success) {
            
                throw new Error(response.data.message)
            }
            toast.success('Reset password successfull')
        } catch (err) {
            console.log('error in setresetpassword', err)
            toast.error('Unable to reset password')
            // <ToastBar>
        }
        dispatch(setLoading(false))
    }
}