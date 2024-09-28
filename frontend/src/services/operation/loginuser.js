import toast from "react-hot-toast"
import { setLoading, setToken } from "../../redux/slice/authSlice"
import { authApi } from "../api"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../redux/slice/profileSlice"

export const login = (email, password) => {
    return async (dispatch, navigate) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('POST', authApi.login, { email, password })
            if (!response.data.success) {

                throw new Error(response.data.message)
            }

            console.log(response)
            toast.success('logged in successfully')
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))

            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('authToken', JSON.stringify(response.data.token))
            // localStorage.setItem()


            navigate(`/dashboard/${'my-profile'}`)

        }
        catch (err) {
            console.log('error while logged in', err)
            toast.error('cannot logged in')
        }
        dispatch(setLoading(false))
    }
}


export const logout = (navigate) => {
    return (dispatch) => {


        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        dispatch(setUser(null))
        dispatch(setToken(null))
        toast.success('Logged out')
        navigate('/')


    }
}