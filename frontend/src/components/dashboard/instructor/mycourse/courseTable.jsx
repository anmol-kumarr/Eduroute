import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { IoMdTime } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from '../../../modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../../../services/operation/course';
import { useNavigate } from 'react-router-dom';
const CourseTable = ({ course, setCourse, getMyCourse }) => {
    const [modal, setModal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // console.log(course)
    const deleteCourseHandler = (id) => {
        // console.log('hello')
        dispatch(deleteCourse(id))
        getMyCourse()
        // setCourse(course => course.filter((course) => course._id !== id))

    }
    // console.log(course)
    // return (
    //     // <div>
    //     //     <div className='lg:w-11/12 w-[98%] mx-auto my-5'>
    //     //         {
    //     //             course.length === 0 ? (

    //     //                 <div className='h-[calc(100vh-15rem)] text-2xl font-medium text-richblack-500 flex justify-center items-center'>
    //     //                     No course found
    //     //                 </div>
    //     //             ) : (

    //     //                 <Table className='w-full  border-separate border-spacing-x-4'>
    //     //                     <Thead className='mb-10'>
    //     //                         <Tr>

    //     //                             <Th>
    //     //                                 Course
    //     //                             </Th>
    //     //                             <Th>
    //     //                                 Duration
    //     //                             </Th>
    //     //                             <Th>
    //     //                                 Price
    //     //                             </Th>
    //     //                             <Th>
    //     //                                 Action
    //     //                             </Th>
    //     //                         </Tr>
    //     //                     </Thead>
    //     //                     <Tbody className=''>
    //     //                         {

    //     //                             course?.map((course) => (
    //     //                                 <Tr className='py-5' key={course._id}>
    //     //                                     <Td className='flex'>
    //     //                                         <div className='h-32 w-52 min-w-[150px]'>

    //     //                                             <img className='w-full h-full' src={course?.thumbnail} alt="" />
    //     //                                         </div>
    //     //                                         <div className='min-w-[230px] w-[calc(100%-14rem)] mx-5 flex flex-col justify-center'>
    //     //                                             <p className='font-semibold text-2xl'>{course?.courseName}</p>
    //     //                                             <p className='text-sm'>{
    //     //                                                 course?.courseDescription?.length > 80 ?
    //     //                                                     (
    //     //                                                         <>{
    //     //                                                             course?.courseDescription?.slice(0, 80)
    //     //                                                         }...</>)


    //     //                                                     : (
    //     //                                                         <>
    //     //                                                             {

    //     //                                                                 course?.courseDescription
    //     //                                                             }
    //     //                                                         </>
    //     //                                                     )
    //     //                                             }
    //     //                                             </p>
    //     //                                             <p className='text-sm'>createdAt:</p>
    //     //                                             <p className='flex my-1'>
    //     //                                                 {
    //     //                                                     course?.status === "Draft" ? (
    //     //                                                         <span className=' bg-[#f84c4ccf]  px-2 py-[3px] rounded-md flex gap-1 items-center'>
    //     //                                                             <IoMdTime className='-mb-[2px]'></IoMdTime>
    //     //                                                             {

    //     //                                                                 course?.status
    //     //                                                             }
    //     //                                                         </span>
    //     //                                                     ) : (
    //     //                                                         <span className='bg-yellow-100 bg-opacity-100 px-2 py-[3px] rounded-md flex gap-1 items-center'>
    //     //                                                             <IoMdCheckmarkCircleOutline className='-mb-[2px]'></IoMdCheckmarkCircleOutline>
    //     //                                                             {
    //     //                                                                 course?.status
    //     //                                                             }
    //     //                                                         </span>
    //     //                                                     )
    //     //                                                 }
    //     //                                             </p>
    //     //                                         </div>
    //     //                                     </Td>


    //     //                                     <Td className='text-center min-w[30px]'>
    //     //                                         02:30min
    //     //                                     </Td>
    //     //                                     <Td className='text-center min-w-[30px]'>
    //     //                                         {
    //     //                                             course.price
    //     //                                         }
    //     //                                     </Td>
    //     //                                     <Td className='text-center min-w-[60px] align-middle'>

    //     //                                         <div className='flex '>

    //     //                                             <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)} className='mx-3 text-xl'>
    //     //                                                 <MdEdit></MdEdit>
    //     //                                             </button>

    //     //                                             <button onClick={() => setModal({
    //     //                                                 textOne: `Are you sure to delete ${course.courseName}`,
    //     //                                                 textTwo: 'On deleting all Section and subSection will deleted',
    //     //                                                 btnOneText: 'Delete',
    //     //                                                 btnTwoText: 'Cancel',
    //     //                                                 btnOneHandler: () => deleteCourseHandler(course._id),
    //     //                                                 btnTwoHandler: () => setModal(null)
    //     //                                             })} className='text-xl'>
    //     //                                                 <RiDeleteBin6Fill></RiDeleteBin6Fill>
    //     //                                             </button>
    //     //                                         </div>
    //     //                                     </Td>
    //     //                                 </Tr>
    //     //                             ))
    //     //                         }

    //     //                     </Tbody>
    //     //                 </Table>
    //     //             )
    //     //         }
    //     //     </div>
    //     //     {
    //     //         modal && <Modal {...modal}></Modal>
    //     //     }

    //     // </div>
    // )


    return (
        <div>
            <div className='hidden md:flex text-lg font-inter my-10 text-center lg:w-11/12 mx-auto md:w-[95%] w-[95%]'>
                <div className='md:w-[calc(100%-5rem)]'>
                    Course
                </div>
                <div className='md:w-1/3 flex justify-between'>
                    <div className='text-center'>
                        Duration
                    </div>
                    <div>
                        Price
                    </div>
                    <div>
                        Action
                    </div>
                </div>

            </div>
            <div className="lg:w-11/12 md:w-[95%] w-[95%] mx-auto my-5">
                {course.length === 0 ? (
                    <div className="h-[calc(100vh-15rem)] text-2xl font-medium text-richblack-500 flex justify-center items-center">
                        No course found
                    </div>
                ) : (
                    <div className="space-y-5">
                        {course.map((course) => (
                            <div
                                key={course._id}
                                className="flex flex-col md:flex-row items-start rounded-md shadow-md space-y-2 md:space-y-0 md:space-x-5"
                            >
                                {/* Left Section - Course Thumbnail and Info */}
                                <div className="flex items-center  md:w-[calc(100%-5rem)] space-x-5">
                                    <div className="h-32 w-56 min-w-[150px]">
                                        <img className="w-full h-full object-cover" src={course?.thumbnail} alt={course?.courseName} />
                                    </div>
                                    <div className="flex gap-1 flex-col justify-center w-full">
                                        <p className="font-semibold text-2xl">{course?.courseName}</p>
                                        <p className="text-sm">
                                            {course?.courseDescription?.length > 80 ? (
                                                <>
                                                    {course?.courseDescription?.slice(0, 80)}...
                                                </>
                                            ) : (
                                                <>{course?.courseDescription}</>
                                            )}
                                        </p>
                                        <p className="text-sm">Created At:</p>
                                        <p className="flex my-1">
                                            {course?.status === 'Draft' ? (
                                                <span className="bg-[#f84c4ccf] px-2 py-[3px] rounded-md flex gap-1 items-center">
                                                    <IoMdTime className="-mb-[2px]" />
                                                    {course?.status}
                                                </span>
                                            ) : (
                                                <span className="bg-yellow-100 px-2 py-[3px] rounded-md flex gap-1 items-center">
                                                    <IoMdCheckmarkCircleOutline className="-mb-[2px]" />
                                                    {course?.status}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Section - Duration, Price, and Actions */}
                                <div className="flex  md:flex-row items-center md:justify-between  md:w-1/3">
                                    <div className="text-center mb-4 md:mb-0">
                                        <p>02:30min</p>
                                    </div>
                                    <div className="text-center mb-4 md:mb-0">
                                        <p>{course.price}</p>
                                    </div>
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                            className="text-xl"
                                        >
                                            <MdEdit />
                                        </button>

                                        <button
                                            onClick={() =>
                                                setModal({
                                                    textOne: `Are you sure to delete ${course.courseName}`,
                                                    textTwo: 'On deleting, all sections and subsections will be deleted',
                                                    btnOneText: 'Delete',
                                                    btnTwoText: 'Cancel',
                                                    btnOneHandler: () => deleteCourseHandler(course._id),
                                                    btnTwoHandler: () => setModal(null),
                                                })
                                            }
                                            className="text-xl"
                                        >
                                            <RiDeleteBin6Fill />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {modal && <Modal {...modal} />}
        </div>
    )
}
export default CourseTable