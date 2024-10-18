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
    return (
        <div>
            <div className='w-11/12 mx-auto'>
                {
                    course.length === 0 ? (

                        <div className='h-[calc(100vh-15rem)] text-2xl font-medium text-richblack-500 flex justify-center items-center'>
                            No course found
                        </div>
                    ) : (

                        <Table className='w-full'>
                            <Thead className='mb-10'>
                                <Tr>

                                    <Th>
                                        Course
                                    </Th>
                                    <Th>
                                        Duration
                                    </Th>
                                    <Th>
                                        Price
                                    </Th>
                                    <Th>
                                        Action
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody className=''>
                                {

                                    course?.map((course) => (
                                        <Tr className='py-5' key={course._id}>
                                            <Td className='flex'>
                                                <div className='h-32 w-52'>

                                                    <img className='w-full h-full' src={course?.thumbnail} alt="" />
                                                </div>
                                                <div className='mx-7 flex flex-col justify-center'>
                                                    <p className='font-semibold text-2xl'>{course?.courseName}</p>
                                                    <p className=''>{course?.courseDescription}</p>
                                                    <p>createdAt:</p>
                                                    <p className='flex my-1'>
                                                        {
                                                            course?.status === "Draft" ? (
                                                                <span className=' bg-[#f84c4ccf]  px-2 py-[3px] rounded-md flex gap-1 items-center'>
                                                                    <IoMdTime className='-mb-[2px]'></IoMdTime>
                                                                    {

                                                                        course?.status
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <span className='bg-yellow-100 bg-opacity-100 px-2 py-[3px] rounded-md flex gap-1 items-center'>
                                                                    <IoMdCheckmarkCircleOutline className='-mb-[2px]'></IoMdCheckmarkCircleOutline>
                                                                    {
                                                                        course?.status
                                                                    }
                                                                </span>
                                                            )
                                                        }
                                                    </p>
                                                </div>
                                            </Td>


                                            <Td className='text-center'>
                                                02:30min
                                            </Td>
                                            <Td className='text-center'>
                                                {
                                                    course.price
                                                }
                                            </Td>
                                            <Td className='text-center'>
                                                <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)} className='mx-3 text-xl'>
                                                    <MdEdit></MdEdit>
                                                </button>
                                                <button onClick={() => setModal({
                                                    textOne: `Are you sure to delete ${course.courseName}`,
                                                    textTwo: 'On deleting all Section and subSection will deleted',
                                                    btnOneText: 'Delete',
                                                    btnTwoText: 'Cancel',
                                                    btnOneHandler: () => deleteCourseHandler(course._id),
                                                    btnTwoHandler: () => setModal(null)
                                                })} className='text-xl'>
                                                    <RiDeleteBin6Fill></RiDeleteBin6Fill>
                                                </button>
                                            </Td>
                                        </Tr>
                                    ))
                                }

                            </Tbody>
                        </Table>
                    )
                }
            </div>
            {
                modal && <Modal {...modal}></Modal>
            }

        </div>
    )
}
export default CourseTable