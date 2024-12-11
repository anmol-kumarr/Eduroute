import toast from "react-hot-toast"
import { setLoading, setToken } from "../../redux/slice/authSlice"
import { authApi } from "../api"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../redux/slice/profileSlice"

export const login = (email, password) => {
    return async (dispatch, navigate) => {
        dispatch(setLoading(true))
        toast.loading('Please wait')
        try {
            const response = await apiConnector('POST', authApi.login, { email, password })
            if (!response.data.success) {

                throw new Error(response.data.message)
            }

            // console.log(response)
            toast.dismiss()
            toast.success('logged in successfully')
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))

            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('authToken', JSON.stringify({ token: response.data.token, expiresIn: Date.now()+7*24*60*60*1000 }))
            // localStorage.setItem()


            navigate(`/dashboard/${'my-profile'}`)

        }
        catch (err) {
            // console.log('error while logged in', err)
            toast.dismiss()
            toast.error('cannot logged in')
        }
        dispatch(setLoading(false))
    }
}


export const logout = (navigate) => {
    // console.log('hello')
    return (dispatch) => {


        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        dispatch(setUser(null))
        dispatch(setToken(null))
        toast.success('Logged out')
        navigate('/')


    }
}