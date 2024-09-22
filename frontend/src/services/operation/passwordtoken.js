import { toast } from "react-toastify"
import { setLoading } from "../../redux/slice/authSlice"
import { profileApi } from "../../utils/api"
import { apiConnector } from "../apiconnector"

const getPasswordToken=(email,setEmailSent,messageSetter)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
    
        try{
            const response=await apiConnector('POST',profileApi.forgetPassword,{email})
            console.log('reset password token response',response)

            if(!response.data.success){
                messageSetter(response.data.message)
                throw new Error(response.data.message)
            }
            toast.success('Reset email sent', {
                position: "top-center"})
            messageSetter(null)
            setEmailSent(true)
            
            
            
            
        }catch(err){
            messageSetter(err.response.data.message)
            console.log(err)
        }
        dispatch(setLoading(false))
    }
}
export default getPasswordToken