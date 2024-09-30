import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

const CloseRoute = ({ children }) => {
    const location = useLocation().pathname
    const user = useSelector(state => state.auth.token)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/auth/login');
        }
    }, [user, location, navigate]);


    // useEffect(() => {
        if (user) {
            // console.log('world')
            return children
        }
    //     else navigate('/auth/login')
    // }, [location])



}
export default CloseRoute