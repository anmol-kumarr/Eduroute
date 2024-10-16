import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { IoMdTime } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from '../../../modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
const CourseTable = ({ course, setCourse }) => {
    const [modal, setModal] = useState(null)
    const dispatch=useDispatch()


    const deleteCourseHandler = (id) => {
        // console.log('hello')
        dispatch()
    }
    return (
        <div>
            <div className='w-11/12 mx-auto'>
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
                            course.length === 0 ? (
                                <Tr>
                                    <Td>
                                        No course found
                                    </Td>
                                </Tr>
                            ) : (
                                course?.map((course) => (
                                    <Tr key={course._id} >
                                        <Td className='flex'>
                                            <img height={30} width={200} src={course?.thumbnail} alt="" />
                                            <div className='mx-7 flex flex-col justify-center'>
                                                <p className='font-semibold text-2xl'>{course?.courseName}</p>
                                                <p className=''>{course?.courseDescription}</p>
                                                <p>createdAt:</p>
                                                <p className='flex my-1'>
                                                    {
                                                        course?.status === "Draft" ? (
                                                            <span className=' bg-[#f84c4ccf] bg-opacity-50 px-2 py-[3px] rounded-md flex gap-1 items-center'>
                                                                <IoMdTime className='-mb-[2px]'></IoMdTime>
                                                                {

                                                                    course?.status
                                                                }
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline>
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
                                            <button className='mx-3 text-xl'>
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
                            )
                        }
                    </Tbody>
                </Table>
            </div>
                        {
                            modal&& <Modal {...modal}></Modal>
                        }

        </div>
    )
}
export default CourseTable