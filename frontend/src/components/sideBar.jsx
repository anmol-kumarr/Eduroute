import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSideBar } from "../redux/slice/responsive";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";


const SideBar = () => {
    const sidebar = useSelector(state => state.responsive.sidebar);
    const courseCategories = useSelector(state => state.course.courseCategories)
    const dispatch = useDispatch()
    const [openCatelog, setOpenCatelog] = useState(true)
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

    const removeSidebar = () => {
        dispatch(setSideBar())
    }



    return (
        <div className={`flex justify-end fixed 850px:hidden bg-richblack-700 bg-opacity-70 text-richblack-50 h-screen right-0 w-full top-0 duration-200 z-50 bg-richblack-800 ${sidebar ? 'translate-x-0' : 'translate-x-full'
            }`}>

            <div className="w-2/3   bg-richblack-900 font-inter pt-5 px-10 text-lg">
                <div className="flex w-full flex-col">
                    <Link to='/'>Home</Link>
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
                                            <li>{category?.name}</li>
                                        </Link>
                                    ))
                                }
                            </ul>
                        </div>
                    </details>

                    <Link to='/about us'>About Us</Link>
                    <Link to='/contact'>Contact Us</Link>





                </div>
                <div className="flex justify-center">

                    <button className="bg-richblack-700 rounded-full p-5" onClick={removeSidebar}><FaXmark></FaXmark></button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
