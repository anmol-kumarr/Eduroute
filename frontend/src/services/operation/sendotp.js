import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../redux/slice/authSlice"
import { apiConnector } from "../apiconnector"
import { mailApi} from "../api"

export const otpSender = (email) => {
    // const {email}=useSelector(state=>state.auth.signUpData)
    
    return async (dispatch) => {
        dispatch(setLoading(true))
        const url=mailApi.emailVerification
        console.log('url',url)
        try {
            const response=await apiConnector("POST",url,{email})
            console.log(response)


        } catch (err) {
            console.log("err in email verification",err)
        }
        dispatch(setLoading(false))
    }
}