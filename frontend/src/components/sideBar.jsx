import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setSideBar } from "../redux/slice/responsive";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

import { setUser } from "../redux/slice/profileSlice";
import { setToken } from "../redux/slice/authSlice";
import toast from "react-hot-toast";


const SideBar = () => {
    const location = useLocation()

    const sidebar = useSelector(state => state.responsive.sidebar);
    const courseCategories = useSelector(state => state.course.courseCategories)
    const divRef = useRef(null)
    const user = useSelector(state => state.auth.token)
    // const 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openCatelog, setOpenCatelog] = useState(true)


    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        dispatch(setUser(null))
        dispatch(setToken(null))
        toast.success('Logged out')
        navigate('/')
    }



    useEffect(() => {
        if (sidebar) {
            // Disable scroll
            document.body.style.overflow = "hidden";
        } else {
            // Enable scroll
            document.body.style.overflow = "auto";
        }

        // Clean up on unmount
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [sidebar]);
    useEffect(() => {
        if (sidebar === true) {

            removeSidebar()
        }
    }, [location])

    const removeSidebar = () => {
        dispatch(setSideBar())
    }

    const handleSidebar = (e) => {
        if (divRef.current && divRef.current.contains(e.target)) {
            removeSidebar()
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleSidebar)
        return () => document.removeEventListener('click', handleSidebar)
    }, [])

    return (
        <div className={`flex justify-end fixed 850px:hidden bg-richblack-700 bg-opacity-70 text-richblack-50 h-screen right-0 w-full top-0 duration-200 z-50  ${sidebar ? 'translate-x-0' : 'translate-x-full'
            }`}>

            <div className="w-2/3 bg-richblack-900 font-inter pt-5 px-10 text-lg">
                <div ref={divRef} className="flex mt-5 mb-2  w-full flex-col gap-2">
                    <Link onClick={removeSidebar} ref={divRef} to='/'>Home</Link>
                    <Link onClick={removeSidebar} to='/dashboard/my-profile'>My account</Link>
                    <details open onClick={() => setOpenCatelog(!openCatelog)} >

                        <summary><p className="flex gap-1 items-center">
                            Categlog
                            {
                                openCatelog ? <IoIosArrowDown /> : <IoIosArrowForward />
                            }


                        </p></summary>
                        <div className="px-5">
                            <ul onClick={removeSidebar}>
                                {
                                    Array.isArray(courseCategories) && courseCategories.map((category) => (
                                        <Link to={`/catelog/${category.name}/${category._id}`} key={category._id}>
                                            <li className="my-1">{category?.name}</li>
                                        </Link>
                                    ))
                                }
                            </ul>
                        </div>
                    </details>

                    <Link onClick={removeSidebar} ref={divRef} to='/aboutUs'>About Us</Link>
                    <Link onClick={removeSidebar} ref={divRef} to='/contact'>Contact Us</Link>





                </div>
                {
                    user && <p onClick={logout} className="cursor-pointer">Logout</p>
                }
                <div className="flex justify-center my-8">

                    <button className="bg-richblack-700 rounded-full p-3" onClick={removeSidebar}><FaXmark></FaXmark></button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
