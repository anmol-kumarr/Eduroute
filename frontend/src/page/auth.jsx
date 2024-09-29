import {  useParams } from "react-router-dom"
import SignUp from "../components/signup"
import Login from "../components/login"
const Auth = () => {
    // const location = useLocation().pathname.split('/')
    const authValue = useParams().authValue
    // console.log(authValue)
    return (
        <div className="w-full bg-richblack-900  min-h-screen flex items-center justify-center">
            {
                authValue==='login'?<Login></Login>:<SignUp></SignUp>
            }
        </div>
    )
}
export default Auth