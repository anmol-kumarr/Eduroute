import { PiDotOutlineFill } from "react-icons/pi"
import Collapsible from 'react-collapsible';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineTv } from "react-icons/md";
const CourseContent = ({ course }) => {
    console.log(course)



    const lecture = course.courseContent?.reduce((total, section) => {
        return total + (section?.subSection?.length || 0)
    }, 0)

    const time = course?.courseContent?.reduce((totalDuration, section) => {

        const totalTime = section.subSection?.reduce((total, subSection) => {
            const intoNumber = Number(subSection?.timeDuration)
            return total + (intoNumber || 0)


        }, 0)
        return totalDuration + totalTime
    }, 0)
    // console.log(time)



    return (
        <div className="text-richblack-50">
            <h2 className="text-xl font-inter">Course content</h2>
            <p className="flex items-center">
                {course?.courseContent?.length} Section
                <span>
                    <PiDotOutlineFill className="text-2xl -mb-[2px]"></PiDotOutlineFill>
                </span>
                <span>{lecture} lecture</span>

                <span>
                    <PiDotOutlineFill className="text-2xl -mb-[2px]"></PiDotOutlineFill>
                </span>
                <span>
                    {time} hour total length
                </span>
            </p>

            <div className=" text-richblack-100 my-5">
                {
                    course?.courseContent?.map((section) => (
                        <Collapsible
                            transitionTime={200}
                            className="Collapsible " triggerWhenOpen={

                                <div className="flex items-center justify-between gap-1 p-2">
                                    <div className="flex items-center">

                                        <MdOutlineKeyboardArrowDown /> {section?.sectionName}</div>
                                    <div className="flex gap-3 justify-center items-center">
                                        <p className="text-yellow-100 text-center">

                                            {
                                                section?.subSection?.length
                                            }
                                            lecture
                                        </p>

                                        <p className="text-sm text-richblack-300 font-medium">
                                            {
                                                section?.subSection?.reduce((total, subSection) => {
                                                    return total + (subSection?.timeDuration || 0)
                                                }, 0)
                                            }
                                            min
                                        </p>
                                    </div>
                                </div>
                            }
                            key={section._id}
                            trigger={<div className="flex items-center justify-between gap-1 p-2">
                                <div className="flex items-center">

                                    <MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp> {section?.sectionName}</div>
                                <div className="flex gap-3 justify-center items-center">
                                    <p className="text-yellow-100 text-center">

                                        {
                                            section?.subSection?.length
                                        }
                                        lecture
                                    </p>

                                    <p className="text-sm text-richblack-300 font-medium">
                                        {
                                            section?.subSection?.reduce((total, subSection) => {
                                                return total + (subSection?.timeDuration || 0)
                                            }, 0)
                                        }
                                        min
                                    </p>
                                </div>
                            </div>

                            }
                        >
                            <div>
                                {
                                    section?.subSection?.map((subSection) => (
                                        <Collapsible key={subSection._id}
                                            trigger={
                                                <div className="p-3 bg-richblack-900 flex justify-between items-center">
                                                    <p className="flex items-center text-richblack-200  gap-1">
                                                        <MdOutlineTv></MdOutlineTv>
                                                        {subSection?.title}
                                                        <MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp>
                                                    </p>
                                                    <p className="text-sm text-richblack-300">
                                                        {subSection?.timeDuration} min
                                                    </p>

                                                </div>
                                            }
                                            triggerWhenOpen={
                                                <div className="p-3 bg-richblack-900 flex justify-between items-center">
                                                    <p className="flex items-center text-richblack-200  gap-1">
                                                        <MdOutlineTv></MdOutlineTv>
                                                        {subSection?.title}
                                                        <MdOutlineKeyboardArrowDown />
                                                    </p>
                                                    <p className="text-sm text-richblack-300">
                                                        {subSection?.timeDuration} min
                                                    </p>

                                                </div>
                                            }
                                        >
                                            <div className="bg-richblack-900 px-3 py-2 text-sm">
                                                {
                                                    subSection?.description
                                                }
                                            </div>
                                        </Collapsible>
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
export default CourseContent