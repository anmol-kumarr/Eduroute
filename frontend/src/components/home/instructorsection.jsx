import Instructor from '../../assets/Images/Instructor.png'
import HomeBtn from './btn'
import HighlightedText from './highlighted'
import { IoArrowForward } from "react-icons/io5";
const InstructorSection = () => {
    return (
        <div className="my-16 flex items-center flex-wrap justify-evenly ">
            <div className='w-2/5 min-w-[300px]'>
                <img className='shadow-[-15px_-15px_0px_#ffff] w-11/12' src={Instructor} alt="" />
            </div>
            <div className='w-2/5 text-center sm:text-left min-w-[300px] my-5'>
                <h2 className=' font-semibold text-pure-greys-50 text-3xl'>Become an
                    <HighlightedText content={' instructor'}></HighlightedText></h2>

                <p className='text-richblack-500 my-5'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                <div className='flex justify-center'>


                    <HomeBtn active={true} content={<>Start teaching today <IoArrowForward></IoArrowForward> </>} render={'/signup'}></HomeBtn>
                </div>
            </div>
        </div>
    )
}
export default InstructorSection