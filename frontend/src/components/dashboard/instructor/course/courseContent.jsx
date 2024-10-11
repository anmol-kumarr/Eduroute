import { useDispatch, useSelector } from "react-redux"
import { MdEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import SubSectionModal from "./subSectionModal";
import Modal from "../../../modal";
import { deleteSection } from "../../../../services/operation/course";
import { IoArrowForward } from "react-icons/io5";
import { changeState } from "../../../../redux/slice/courseSlice";
import toast from "react-hot-toast";

const CourseContent = ({ editSectionHandler }) => {
    const dispatch = useDispatch()
    const course = useSelector(state => state?.course?.MyCourse)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [openSection, setOpenSection] = useState(false)
    const [createSubSection, setCreateSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [subSectionModal, setSubSectionModal] = useState(false)


    const handleOpener = (id) => {
        // setOpenSection(!openSection)
        setOpenSection((prev) => ({
            ...prev,
            [id]: !prev[id]

        }))
        // console.log(openSection)

    }


    const deleteSectionHandler = (sectionId) => {
        dispatch(deleteSection(course._id, sectionId))
        setConfirmationModal(null)
    }


    const deleteSubSectionHandler = (id) => {

    }

    const createSubSectionHandler = (id) => {
        // console.log(id)
        setSubSectionModal(true)


        setCreateSubSection({
            id: id,
            type: 'Create',
            setSubSectionModal,
            setEditSubSection,
            setCreateSubSection,
            setViewSubSection,
            create: true
        })
    }

    const viewSubSectionHandler = (sectionId, subSectionId) => {
        // console.log(sectionId,subSectionId)
        const data = course?.courseContent?.filter((section) => section._id === sectionId)
        const subSectionValue = data[0]?.subSection.filter((subSection) => subSection._id === subSectionId)[0]
        // console.log(subSectionValue)
        // console.log(subSectionValue.videoUrl)
        // console.log(subSectionValue.title)

        setViewSubSection({
            type: 'View',
            view: true,
            setSubSectionModal,
            setEditSubSection,
            setCreateSubSection,
            setViewSubSection,
            video: subSectionValue?.videoUrl,
            title: subSectionValue?.title,
            timeDuration: subSectionValue?.timeDuration,
            description: subSectionValue?.description
        })
        setSubSectionModal(true)

    }



    const editSubSectionHandler = (subSectionId, sectionId) => {
        const section = course.courseContent?.filter((section) => section._id === sectionId)
        const subSection = section[0]?.subSection?.filter((subSection) => subSection._id === subSectionId)[0]
        // .filter((section)=>section._id===sectionId)
        // console.log(subSection)
        setSubSectionModal(true)
        setEditSubSection({
            type: 'Edit',
            edit: true,
            setSubSectionModal,
            setEditSubSection,
            setCreateSubSection,
            setViewSubSection,
            video: subSection?.videoUrl,
            title: subSection?.title,
            timeDuration: subSection?.timeDuration,
            description: subSection?.description
        })
    }


    // useEffect(() => {
    //     if (!subSectionModal) {
    //         setEditSubSection({});
    //         setCreateSubSection({});
    //         setViewSubSection({});
    //     }
    // }, [subSectionModal]);
    // useEffect(()=>{
    //     console.log(viewSubSection)
    // },[viewSubSection])

    const nextHandler=()=>{
        if(course?.courseContent?.length>0 && course?.courseContent?.subSection?.length>0)
        {
            dispatch(changeState(3))
        }
        else{
            toast.error('Please add course content')
        }
    }


    return (
        <>
            {course?.courseContent.length > 0 &&
                <div className="bg-richblack-700 p-2 mt-4 rounded-md">{
                    course?.courseContent?.map((section, index) => (

                        < details className="" key={section._id} open={index === 0 ? true : openSection[section._id] ? true : false} onClick={() => handleOpener(section._id)}>
                            <summary className="flex justify-between border-b border-richblack-600 pb-2">
                                <div className="flex gap-1  items-center">
                                    <RxDropdownMenu></RxDropdownMenu>
                                    {section.sectionName}
                                </div>
                                <div className="flex  gap-1 px-2 items-center">
                                    <div className=" flex gap-1 text-lg">

                                        <button type="button" onClick={() => editSectionHandler(section.sectionName, section._id)} >
                                            <MdEdit></MdEdit>
                                        </button>
                                        <button onClick={() => setConfirmationModal({
                                            textOne: `Delete ${section.sectionName} section`,
                                            textTwo: 'All the lectures in this section will be deleted',
                                            btnOneText: 'Confirm delete',
                                            btnTwoText: 'Cancel',
                                            btnOneHandler: () => deleteSectionHandler(section._id),
                                            btnTwoHandler: () => setConfirmationModal(null)
                                        })} className="border-r-[1.5px] pr-2 border-richblack-600">
                                            <MdDelete></MdDelete>
                                        </button>

                                    </div>

                                    <div>
                                        {
                                            index === 0 ? (
                                                openSection[section._id] ? (

                                                    <IoIosArrowDown></IoIosArrowDown>

                                                ) : (
                                                    <IoIosArrowUp></IoIosArrowUp>

                                                )
                                            ) :
                                                openSection[section._id] ? (
                                                    <IoIosArrowDown></IoIosArrowDown>


                                                ) : (
                                                    <IoIosArrowUp></IoIosArrowUp>

                                                )
                                        }
                                    </div>

                                </div>
                            </summary>


                            <div className="px-3">
                                {
                                    section?.subSection && section?.subSection?.map((subSection) => (
                                        <div onClick={() => viewSubSectionHandler(section._id, subSection._id)}
                                            key={subSection._id} className="mb-5 border-b border-richblack-600 p-2 flex justify-between">


                                            <div className="flex items-center gap-1">
                                                <RxDropdownMenu className="-mb-[2px]"></RxDropdownMenu>
                                                {subSection.title}
                                            </div>
                                            <div onClick={(e)=>e.stopPropagation()} className="flex gap-1">
                                                <button onClick={() => editSubSectionHandler(subSection._id, section._id)} type="button">
                                                    <MdEdit></MdEdit>
                                                </button>
                                                <button type="button" onClick={() => setConfirmationModal({
                                                    textOne: `Delete ${subSection.title} Sub section`,
                                                    textTwo: 'The lectures in this section will be deleted',
                                                    btnOneText: 'Confirm delete',
                                                    btnTwoText: 'Cancel',
                                                    btnOneHandler: () => deleteSubSectionHandler(subSection._id),
                                                    btnTwoHandler: () => setConfirmationModal(null)
                                                })}>
                                                    <MdDelete></MdDelete>
                                                </button>
                                            </div>
                                        </div>

                                    ))
                                }
                                <button onClick={() => createSubSectionHandler(section._id)} type="button" className=" text-yellow-100 flex gap-1 items-center px-2 text-sm my-2 py-1 border border-yellow-100 rounded-md">Add lecture
                                    <IoAddCircleOutline className="-mb-[3px] text-lg"></IoAddCircleOutline>
                                </button>

                            </div>

                        </details>
                    ))

                }
                    {
                        subSectionModal && (

                            createSubSection
                                ? (<SubSectionModal
                                    {...createSubSection}
                                ></SubSectionModal>) :
                                editSubSection ? (<SubSectionModal {...editSubSection}></SubSectionModal>) :
                                    viewSubSection && (<SubSectionModal {...viewSubSection}></SubSectionModal>)

                        )
                    }
                    {
                        confirmationModal && <Modal {...confirmationModal}></Modal>

                    }

                    <div className="my-5 flex justify-center">
                        <button type="button" onClick={()=>nextHandler()} className="bg-yellow-100 flex items-center gap-1 text-black font-semibold rounded-md px-3 py-1">Next <IoArrowForward className="-mb-[2px]"></IoArrowForward></button>
                    </div>
                </div >
            }

        </>
    )
}
export default CourseContent

