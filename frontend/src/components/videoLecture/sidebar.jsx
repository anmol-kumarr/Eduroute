import Collapsible from "react-collapsible"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { PiMonitorPlayLight } from "react-icons/pi";
const Sidebar = ({ courseData,setPlayVideo,setSubSection,setModal}) => {


    const lectureHandler=(subSectionId,sectionId)=>{
        console.log(courseData)
        const filterData=courseData?.courseContent?.map((section)=>{
            return section?.subSection?.filter((subSection)=>subSection._id===subSectionId)
        }).flat().filter(Boolean)
        console.log(filterData[0]._id,subSectionId)
        setSubSection(filterData[0])
        setPlayVideo(filterData[0].videoUrl)
        
    }
    return (
        <div className="bg-richblack-800 w-2/12 min-h-[calc(100vh-3rem)]">
            <div >
                <div className="p-2 flex flex-col items-center">
                    <p>{courseData?.courseName}</p>
                    <button onClick={()=>setModal(true)} className="bg-yellow-100 rounded-md px-2 py-1 text-black text-sm my-2">Rate course</button>
                </div>

                <div className="flex flex-col gap-1">

                    {
                        courseData?.courseContent?.map((content) => (
                            <Collapsible trigger={
                                <div className=" p-2 flex justify-between items-center">
                                    <p>{content?.sectionName}</p>

                                    <p >

                                        <MdOutlineKeyboardArrowDown></MdOutlineKeyboardArrowDown>

                                    </p>
                                </div>
                            }
                                transitionTime={200}
                                triggerWhenOpen={
                                    <div className=" p-2 flex justify-between items-center">
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
                                            <div onClick={()=>lectureHandler(subSection._id,content._id)} className="cursor-pointer flex gap-2 items-center p-2">

                                                <p className="text-sm">

                                                    {subSection?.title}
                                                </p>
                                                <p><PiMonitorPlayLight className="text-lg -mb-[2px]"></PiMonitorPlayLight></p>
                                            </div>
                                        ))
                                    }
                                </div>

                            </Collapsible>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Sidebar