import * as Icons from 'react-icons/vsc'
import { NavLink, useLocation } from 'react-router-dom'

const SideBarLinks = ({icon,name,path}) => {



    // const name=props.name
    const Icon =Icons[icon]
    const location=useLocation().pathname
    console.log(location)

    return (
        <div className={`px-3  ${location===path? 'bg-yellow-100 bg-opacity-50 text-yellow-5 border-l-2 border-yellow-100 ':''}`} >
            <NavLink to={path} className={`active`}>
                <div className='flex gap-2 my-1 text-base items-center'>
                    {icon&& <Icon></Icon>}
                    <span>{name}</span>
                </div>
            </NavLink>
        </div>
    )
}
export default SideBarLinks
