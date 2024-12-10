import { useEffect, useState } from "react";
import Collapsible from "react-collapsible"
import { MdArrowLeft, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { PiMonitorPlayLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ sectionData, setSection, subSectionData, courseData, setPlayVideo, setSubSection, setModal }) => {


    console.log(courseData)
    const navigate = useNavigate()

    const completedLecture = useSelector(state => state.lecture.completedLecture)
    const [lectureList, setLectureList] = useState([])
    const [collapsibleOpen, setCollapsibleOpen] = useState(false)


    useEffect(() => {
        setLectureList([...lectureList, ...completedLecture?.completedVideo])
    }, [completedLecture, courseData._id])








    const lectureHandler = (subSectionId, sectionId) => {
        console.log(courseData)
        const filterData = courseData?.courseContent?.map((section) => {
            return section?.subSection?.filter((subSection) => subSection._id === subSectionId)
        }).flat().filter(Boolean)
        console.log(filterData[0]._id, subSectionId)
        setSubSection(filterData[0])

        setPlayVideo(filterData[0].videoUrl)

        const filterSection = courseData?.courseContent?.filter((section) => {
            return section._id === sectionId
        }).flat()

        setSection(filterSection[0])

    }
    return (
        // <div className="bg-richblack-800 min-w-[200px] max-[850px]:my-5 max-[850px]:mx-auto max-[850px]:w-11/12   min-[850px]:w-2/12 min-[850px]:min-h-[calc(100vh-3rem)] ">
    
        < div className = "bg-richblack-800 min-w-[200px] max-850:my-5 max-850:mx-auto max-850:w-11/12 850px:w-2/12 850px:min-h-[calc(100vh-3rem)]" >



            <div >
                <p onClick={() => navigate(-1)} className="min-[850px]:hidden  p-2 flex items-center cursor-pointer"><MdArrowLeft className="-mb[1px]"></MdArrowLeft>Back</p>
                <div className="p-2 flex flex-col items-center">
                    <p>{courseData?.courseName}</p>
                    <button onClick={() => setModal(true)} className="bg-yellow-100 rounded-md px-2 py-1 text-black text-sm my-2">Rate course</button>
                </div>

                <div className="flex flex-col gap-1">

                    {
                        courseData?.courseContent?.map((content, index) => (
                            <Collapsible key={content._id} open={index === 0 ? true : false || content._id === sectionData._id} trigger={
                                <div className=" p-2 flex justify-between items-center">
                                    <p>{content?.sectionName}</p>

                                    <p>

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
                                            <div key={subSection._id} onClick={() => lectureHandler(subSection._id, content._id)} className={`cursor-pointer flex gap-2 items-center p-2 ${subSection._id === subSectionData._id ? 'bg-yellow-100 text-black' : ''}`}>
                                                {

                                                    lectureList.length > 0 && lectureList.includes(subSection._id) ? (
                                                        <strike className='flex items-center gap-1'>
                                                            <p className="text-sm flex items-center gap-1">
                                                                <input type="checkbox" checked disabled />
                                                                {subSection?.title}
                                                            </p>
                                                            <p><PiMonitorPlayLight className="text-lg -mb-[2px]"></PiMonitorPlayLight></p>
                                                        </strike>
                                                    ) : (
                                                        <>
                                                            <p className="text-sm flex items-center gap-1">
                                                                <input type="checkbox" />
                                                                {subSection?.title}
                                                            </p>
                                                            <p><PiMonitorPlayLight className="text-lg -mb-[2px]"></PiMonitorPlayLight></p>
                                                        </>
                                                    )
                                                }


                                            </div>

                                        ))

                                    }
                                </div>

                            </Collapsible>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}
export default Sidebar