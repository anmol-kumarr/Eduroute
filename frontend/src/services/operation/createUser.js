import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../redux/slice/authSlice"
import { apiConnector } from "../apiconnector"
import { mailApi } from "../api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const otpSender = (email,navigate) => {
    // const navigate=useNavigate()
    // const {email}=useSelector(state=>state.auth.signUpData)

    return async (dispatch) => {
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", mailApi.emailVerification, { email })

            if (!response.data.success) {

                throw new Error(response.data.message)
            }
            console.log(response)
            toast.success('otp sent on email')
            navigate('/verify-email')



        } catch (err) {
            console.log("err in email verification", err)
        }
        dispatch(setLoading(false))
    }
}





export const signUp = () => {
    // const navigate=useNavigate()
    // const {email}=useSelector(state=>state.auth.signUpData)

    return async (dispatch, navigate) => {
        dispatch(setLoading(true))
        const url = mailApi.emailVerification
        console.log('url', url)
        try {
            const response = await apiConnector("POST", mailApi.emailVerification, {  })

            if (!response.data.success) {

                throw new Error(response.data.message)
            }
            console.log(response)
            // toast.success('otp sent on email')
            // navigate('/verify-email')



        } catch (err) {
            console.log("err in email verification", err)
        }
        dispatch(setLoading(false))
    }
}