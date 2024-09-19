import { Link, NavLink } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categoriesApi } from '../services/api';
import axios from 'axios';

const Header = () => {
    const user = useSelector(state => state.auth.token)
    const [catelogData,setCatelogData]=useState([])


    const getCatelog=async()=>{
        try{
            const response=await apiConnector('GET',categoriesApi.getAllCategories)
            console.log(response)
            setCatelogData(response)
        }
        catch(err){
            console.log(err)
        }
    }



    useEffect(()=>{
        getCatelog()
    },[])

 
    // console.log(user)
    return (
        <header className='w-full  bg-richblack-900 border-b-[1.3px] border-richblack-700 '>
            <div className='w-11/12 py-2 mx-auto flex justify-between items-center'>
                <Link to='/'>
                    <div className="text-2xl font-bold font-edu-sa text-white">
                        eduroutes
                    </div>
                </Link>

                <div className='text-richblack-50  font-inter text-base flex gap-8'>
                    <NavLink to='/' className={({ isActive }) => `${isActive ? 'text-yellow-25' : ''}`}>
                        Home
                    </NavLink>

                    <NavLink to='/catelog' className={({ isActive }) => `${isActive ? 'text-yellow-25' : ''}`}>
                        Catelog
                    </NavLink>
                    <NavLink to='/aboutUs' className={({ isActive }) => `${isActive ? 'text-yellow-25' : ''}`}>About us</NavLink>
                    <NavLink to='/contactUs' className={({ isActive }) => `${isActive ? 'text-yellow-25' : ''}`}>Contact us</NavLink>
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
                            <div className='w-7 h-7 rounded-full overflow-hidden'>
                                <img className="w-full h-full" src='https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2024091418' alt="" />
                            </div>
                        </>
                        :
                        <>
                            <Link to='/login'>

                                <button className='rounded-md text-sm font-inter text-richblack-200 bg-richblack-700 px-3 py-1'>
                                    Login
                                </button>
                            </Link>
                            <Link to='/signup'>

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