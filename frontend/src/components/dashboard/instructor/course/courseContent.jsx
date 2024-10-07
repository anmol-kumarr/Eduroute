import { useSelector } from "react-redux"
import { MdEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
const CourseContent = () => {
    const dropDown = useRef(null)
    const course = useSelector(state => state.course.course)
    const [open, setOpen] = useState(false)

    const isDropDownOpen = () => {
        if (dropDown.current) {
            console.log(dropDown)
            return dropDown.current.open;
        }

        return false;
    }


    useEffect(() => {
        const handleToggle = () => {
            setOpen(isDropDownOpen());
        };

        const currentDropDown = dropDown.current;
        if (currentDropDown) {
            currentDropDown.addEventListener('toggle', handleToggle);

            // Clean up the event listener when the component unmounts
            return () => {
                currentDropDown.removeEventListener('toggle', handleToggle);
            };
        }
    }, []);

    return (
        <div className="bg-richblack-700 p-2 rounded-md">{
            course?.courseContent?.map((section) => (

                < details key={section._id} ref={dropDown}>
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
                                    open ? (
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
    )
}
export default CourseContent