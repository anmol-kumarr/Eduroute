import { useLocation } from "react-router-dom"

const DashBoardRoute = ({ children }) => {
    const location = useLocation().pathname.split('/')
    if (!location.includes('dashboard')) return children



}
export default DashBoardRoute