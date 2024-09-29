import * as Icons from 'react-icons/vsc'
import { NavLink, useLocation } from 'react-router-dom'

const SideBarLinks = ({icon,name,path}) => {
    // const path=props.path
    const iconName=icon

    // console.log(icon)
    // console.log(name)
    // console.log(path)

    // const name=props.name
    const Icon =Icons[icon]
    const location=useLocation().pathname
    console.log(location)
        // console.log(path)
    // console.log(Icon)
    // console.log(name)
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

// import { NavLink } from 'react-router-dom';

// const SideBarLinks = ({ icon, name, path }) => {
//     return (
//         <div>
//             {/* NavLink will automatically apply 'active' class if the link is active */}
//             <NavLink 
//                 to={path}
//                 className={({ isActive }) => 
//                     isActive ? 'bg-yellow-200' : 'text-white'
//                 }
//             >
//                 <div className="flex gap-2 my-1 text-base items-center">
//                     {/* Optionally, you can render the icon if needed */}
//                     {/* {icon && <Icon name={icon} />} */}
//                     <span>{name}</span>
//                 </div>
//             </NavLink>
//         </div>
//     );
// };

// export default SideBarLinks;
