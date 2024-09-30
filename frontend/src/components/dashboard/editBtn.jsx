import { FiEdit } from "react-icons/fi";

const EditBtn = ({onClick}) => {
    return (
        <button onClick={()=>onClick()} className="bg-yellow-50 rounded-md flex items-center text-sm  text-richblack-800 font-[400] gap-2 py-1 px-3">
        <FiEdit/> Edit  </button>
    )
}
export default EditBtn