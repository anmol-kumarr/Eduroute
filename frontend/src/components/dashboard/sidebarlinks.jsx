import * as Icons from 'react-icons/vsc'
import { NavLink } from 'react-router-dom'

const SideBarLinks = ({icon,name,path}) => {
    // const path=props.path
    // const iconName=icon

    console.log(icon)
    console.log(name)
    console.log(path)
    
    // const name=props.name
    const Icon =Icons[icon]
    // console.log(path)
    // console.log(Icon)
    // console.log(name)
    return (
        <div>
            <NavLink to={path} className={({ isActive }) => `${isActive ? '' : ''}}`}>
                <div>
                    {icon&& <Icon></Icon>}
                    <span>{name}</span>
                </div>
            </NavLink>
        </div>
    )
}
export default SideBarLinks