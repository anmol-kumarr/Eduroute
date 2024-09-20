import { useEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import HighlightedText from "../components/home/highlighted"
import LargeBtn from "../components/largeBtn"
import countryCode from '../data/countrycode.json'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
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