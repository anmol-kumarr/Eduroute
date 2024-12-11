import React from 'react'
import { sidebarLinks } from '../data/dashboard'
import { useSelector } from 'react-redux'

import * as Icons from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import {  IoSettingsSharp } from 'react-icons/io5'


function MobileNav() {

    const { loading: profileLoading, user } = useSelector(state => state.user)
    const navigate=useNavigate()
    return (
        <div className='850px:hidden  fixed left-0 right-0 -bottom-1 bg-richblack-800'>
            <div className='text-2xl flex justify-between p-3'>

                {
                    sidebarLinks.map((data, index) => {

                        if (data.type && user?.accountType !== data.type) return null
                        const Icon = Icons[data.icon]

                        return <div onClick={()=>navigate(`${data.path}`)} className='' key={index}>
                            <p className='flex justify-center'>

                                {data.icon && <Icon className='-mb-1'></Icon>}
                            </p>
                            {/* <span>{data.name}</span> */}
                        </div>
                    })
                }

                <Link to='/dashboard/setting'>
                    <div className="">
                        <p className='flex justify-center '>
                            <IoSettingsSharp></IoSettingsSharp>
                        </p>
                        {/* Setting */}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default MobileNav