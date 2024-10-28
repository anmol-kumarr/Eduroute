import Collapsible from "react-collapsible"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { PiMonitorPlayLight } from "react-icons/pi";
const Sidebar = ({ courseData }) => {
    return (
        <div className="bg-richblack-700 w-2/12">
            <div >
                <div>
                    {courseData?.courseName}

                </div>
                {
                    courseData?.courseContent?.map((content) => (
                        <Collapsible trigger={
                            <div className="p-2 flex justify-between items-center">
                                <p>{content?.sectionName}</p>

                                <p >

                                    <MdOutlineKeyboardArrowDown></MdOutlineKeyboardArrowDown>

                                </p>
                            </div>
                        }
                            transitionTime={200}
                            triggerWhenOpen={
                                <div className="p-2 flex justify-between items-center">
                                    <p>{content?.sectionName}</p>
                                    <p>
                                        <MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp>
                                    </p>
                                </div>
                            }
                        >
                            <div className="bg-richblack-800">
                                {
                                    content?.subSection.map((subSection) => (
                                        <div>
                                            <div>
                                                <label class="flex items-center space-x-2 cursor-pointer">
                                                    <input type="checkbox" class="peer appearance-none w-5 h-5 border-2 border-gray-500 checked:bg-green-500" />
                                                    
                                                </label>
                                            </div>
                                            {subSection?.title}
                                            <p><PiMonitorPlayLight></PiMonitorPlayLight></p>
                                        </div>
                                    ))
                                }
                            </div>

                        </Collapsible>
                    ))
                }
            </div>
        </div>
    )
}
export default Sidebar