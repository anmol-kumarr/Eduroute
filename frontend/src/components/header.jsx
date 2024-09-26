import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categoriesApi } from '../services/api';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { logout } from '../services/operation/loginuser';

const Header = () => {
    const user = useSelector(state => state.auth.token)
    const image=useSelector(state=>state.user?.user?.image)
    const [catelogData, setCatelogData] = useState([])
    // const[dropdown,setDropdown]=useState(false)




    const getCatelog = async () => {
        try {
            const response = await apiConnector('GET', categoriesApi.getAllCategories)
            // console.log(response.data.data)
            setCatelogData(response.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        getCatelog()
    }, [])
    const dispatch=useDispatch()
    const navigate=useNavigate()


    // console.log(user)
    return (
        <header className='w-full  bg-richblack-900 border-b-[1.3px] border-richblack-700 '>
            <div className='w-11/12 py-2 mx-auto flex justify-between items-center'>
                <Link to='/'>
                    <div className="text-2xl font-bold font-edu-sa text-white">
                        eduroutes
                    </div>
                </Link>

                <div className='hidden 850px:flex text-richblack-50  font-inter text-base  gap-8'>
                    <NavLink to='/' className={({ isActive }) => `${isActive ? 'text-yellow-25' : ''}`}>
                        Home
                    </NavLink>

                    {/* <NavLink to='/catelog' className={({ isActive }) => `${isActive ? 'text-yellow-25' : ''}`}>
                        Catelog
                    </NavLink> */}
                    <div className='relative flex items-center gap-1 cursor-pointer group'>
                        <p>Catelog</p>
                        <MdOutlineKeyboardArrowDown />
                        <div className='p-3 w-[200%] gap-2 absolute top-[155%] -right-1/2 rounded-md opacity-0 transition-all duration-200 group-hover:visible invisible group-hover:opacity-100  bg-richblack-25 flex flex-col'>
                            {
                                catelogData && catelogData.length > 0 && catelogData.map((item) => (

                                    <Link key={item._id} to={`/catelog${item.name}`} className='text-sm text-richblack-800 font-inter '>{
                                        item.name.length > 20 ? <>{item.name.slice(0, 20)}...</> : item.name
                                    }</Link>
                                ))
                            }


                        </div>


                    </div>
                    <NavLink to='/aboutUs' className={({ isActive }) => `${isActive ? 'text-yellow-25' : ''}`}>About us</NavLink>
                    <NavLink to='/contact' className={({ isActive }) => `${isActive ? 'text-yellow-25' : ''}`}>Contact us</NavLink>
                </div>

                <div className='flex text-richblack-50 items-center gap-3'>
                    {user ?
                        <>

                            <div className='text-xl'>
                                <IoSearchOutline />
                            </div>


                            {user === 'Student' &&
                                <>
                                    <div className='text-2xl relative'>
                                        <IoCartOutline />
                                        <span className='font-semibold text-blue-500 h-4 rounded-full w-4 text-center bg-yellow-25 absolute bottom-[50%] text-xs left-2/4 '>5</span>
                                    </div>
                                </>
                            }
                            <div className='group relative cursor-pointer '>
                                <div className='h-7 w-7 rounded-full overflow-hidden'>

                                    <img className="w-full h-full" src={image} alt="" />
                                </div>
                                <div className={`group-hover:block !important text-base absolute top-8 rounded -right-7 hidden bg-richblack-700 `}>


                                    <p className='py-1 px-2'><Link to={`/user/${'dashboard'}`} className='flex items-center gap-1'> Dashboard</Link></p>
                                    <p onClick={()=>dispatch(logout(navigate))} className='py-1 px-2  flex items-center gap-1'> <TbLogout2 className='mt-1' /> Logout</p>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <Link to={`/auth/${'login'}`}>

                                <button className='rounded-md text-sm font-inter text-richblack-200 bg-richblack-700 px-3 py-1'>
                                    Login
                                </button>
                            </Link>
                            <Link to={`/auth/${'signup'}`}>

                                <button className='rounded-md text-sm font-inter text-richblack-200 bg-richblack-700 px-3 py-1'>
                                    Sign Up
                                </button>
                            </Link>


                        </>
                    }
                </div>

            </div>
        </header>
    )
}
export default Header