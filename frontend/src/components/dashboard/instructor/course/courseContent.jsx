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


const CourseContent = ({ editSectionHandler}) => {
    const dispatch=useDispatch()
    const course = useSelector(state => state?.course?.MyCourse)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [openSection, setOpenSection] = useState(false)
    const [createSubSection, setCreateSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState('')
    const [viewSubSection, setViewSubSection] = useState('')
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
        console.log(id)
        setSubSectionModal(true)


        setCreateSubSection({
            id: id,
            type: 'Create',
            setSubSectionModal,
            create: true
        })
    }


    return (
        <>
            {course?.courseContent.length > 0 &&
                <div className="bg-richblack-700 p-2 mt-4 rounded-md">{
                    course?.courseContent?.map((section, index) => (

                        < details className="border-b border-richblack-600" key={section._id} open={index === 0 ? true : openSection[section._id] ? true : false} onClick={() => handleOpener(section._id)}>
                            <summary className="flex justify-between">
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


                            <div className="p-3">
                                {
                                    section?.subSection && section?.subSection?.map((subSection) => (
                                        <div key={subSection._id} className="p-2">


                                            <div>
                                                <RxDropdownMenu></RxDropdownMenu>
                                                {subSection.title}
                                            </div>
                                            <div>
                                                <button onClick={() => setEditSubSection(subSection._id)} type="button">
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
                                editSubSection ? <SubSectionModal subSectionModalData={editSubSection}></SubSectionModal> :
                                    viewSubSection && <SubSectionModal subSectionModalData={viewSubSection}></SubSectionModal>

                        )
                    }
                    {
                        confirmationModal && <Modal {...confirmationModal}></Modal>

                    }
                </div >
            }

        </>
    )
}
export default CourseContent

