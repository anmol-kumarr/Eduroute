import { useEffect, useState } from "react"

const Requirement = ({register,errors,handleSubmit,setValue,getValue}) => {
    const [requirement, setRequirement] = useState('')
    const [requirementList, setRequirementList] = useState([])

    useEffect(()=>{
        register('requirements',{
            required:true,
            validtae:(value)=>value.length>0
        })
    },[requirementList])

    const addList = (e) => {
        e.preventDefault()
        if (requirement && requirementList.length<10) {
            setRequirementList([...requirementList, requirement])
            setRequirement('')
        }
    }
    const removeList = (index) => {
        // e.preventDefault()
        const editList = [...requirementList]
        editList.splice(index, 1)
        console.log(editList)
        setRequirementList(editList)
    }
    return (
        <div>
            <div>
                <label htmlFor="requirement">Requirements/Instructions</label>
                <input value={requirement} onChange={(e) => setRequirement(e.target.value)} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" id="requirement" type="text" placeholder="Enter Requirement for course" />
            </div>
            <div>
                <button onClick={addList} className="border-none outline-none px-3 py-1 rounded-md text-yellow-50 font-bold">Add</button>
            </div>

            <div>
                <ul className="px-5 text-richblack-200">
                    {
                        requirementList.length > 0 && requirementList.map((list, index) => (
                            <li className="list-disc" key={index}>
                                <div className="text-richblack-100">
                                    {list}
                                    <span onClick={(index) => removeList(index)} className=" rounded-md mx-2 cursor-pointer text-[#ff0000] text-sm font-bold">remove</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                errors.requirement&&(
                    <span>
                        Please enter requirement for course
                    </span>
                ) 
            }
        </div>
    )
}
export default Requirement