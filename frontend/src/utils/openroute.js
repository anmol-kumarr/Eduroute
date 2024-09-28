import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

function OpenRoute({ children }) {
    const  token  = useSelector((state) => state.auth.token)
    const location=useLocation()

    if (token === null) {
        return children
    }
    if (token !== null && location.pathname === '/dashboard/my-profile') {
        return children
    }
    else {
        return <Navigate to={`/dashboard/${'my-profile'}`} />
    }
}

export default OpenRoute