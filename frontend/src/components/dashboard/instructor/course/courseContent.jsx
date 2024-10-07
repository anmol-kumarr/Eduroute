import { useSelector } from "react-redux"
import { MdEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
const CourseContent = () => {
    // const dropDown = useRef([])
    const course = useSelector(state => state.course.course)
    const [openSection, setOpenSection] = useState({})
    const handleOpener=(id)=>{  
        setOpenSection((prev)=>({
            ...prev,    
            [id]:!prev[id]

        }))
    }


    return (<>
        {course?.courseContent.length > 0 &&
            <div className="bg-richblack-700 p-2 rounded-md">{
                course?.courseContent?.map((section) => (

                    < details key={section._id} open={openSection[section._id] || false}  onClick={()=>handleOpener(section._id)}>
                        <summary className="flex justify-between">
                            <div className="flex gap-1  items-center">
                                <RxDropdownMenu></RxDropdownMenu>
                                {section.sectionName}
                            </div>
                            <div className="flex px-2">
                                <div className=" flex gap-1 text-lg">

                                    <button type="button">
                                        <MdEdit></MdEdit>
                                    </button>
                                    <button className="border-r-[1.5px] border-richblack-600">
                                        <MdDelete></MdDelete>
                                    </button>

                                </div>

                                <div>
                                    {
                                        openSection[section._id] ? (
                                            <IoIosArrowDown></IoIosArrowDown>

                                        ) : (
                                            <IoIosArrowUp></IoIosArrowUp>
                                        )
                                    }
                                </div>

                            </div>
                        </summary>


                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores consequuntur veritatis aliquid voluptatem deleniti, nostrum non totam quidem adipisci illo similique ipsa numquam saepe quod expedita. Eos, unde? Molestias, nesciunt accusantium labore voluptatum recusandae dicta?
                        </div>
                    </details>
                ))

            }
            </div >
        }
    </>
    )
}
export default CourseContent