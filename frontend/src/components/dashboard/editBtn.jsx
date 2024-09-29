import { CiEdit } from 'react-icons/ci'

const EditBtn = ({onClick}) => {
    return (
        <button onClick={()=>onClick()} className="bg-yellow-50 rounded-md flex items-center text-sm font-medium text-richblack-700 py-1 px-3">Edit 
        <CiEdit className='-mb-[1px] font-semibold'/>  </button>
    )
}
export default EditBtn