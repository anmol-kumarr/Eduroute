import { useEffect, useState } from "react"
import { MdOutlineClear } from "react-icons/md";
const Tags = ({ register, errors, handleSubmit, setValue, getValue }) => {
    const [tag, setTag] = useState('')
    const [tagList, setTagList] = useState([])

    useEffect(()=>{
        setValue('tags',tagList)
    },[tagList,setValue])

    const tagSubmit = (e) => {
        e.preventDefault()
        if (tag.length > 2) {

            setTagList([...tagList, tag])
        }
        setTag('')
    }
    const removeTag = (index) => {
        const editedList = tagList.filter((list, i) => i !== index)
        setTagList(editedList)
    }

    return (
        <div>
            <div>
                <label htmlFor="tags">Tags</label>
                <input value={tag} onChange={(e) => setTag(e.target.value)} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" id="requirement" type="text" placeholder="Choose a tag" />
                <button onClick={tagSubmit} className="text-yellow-100 font-semibold my-2 border border-yellow-100 rounded-md px-3 py-[2px]">
                    Add
                </button>
            </div>
            <div className="flex gap-2 flex-wrap">
                {
                    tagList.length > 0 && (
                        tagList.map((list, index) => (
                            <div className="flex px-3 gap-[2px] py-1 rounded-md font-semibold items-center bg-yellow-100 text-richblack-900" key={index}>
                                {list}
                                <span onClick={() => removeTag(index)} className="cursor-pointer -mb-[2px] text-[#ff0000]">
                                    <MdOutlineClear className="font-bold" />
                                </span>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}
export default Tags