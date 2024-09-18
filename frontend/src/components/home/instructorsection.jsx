import Instructor from '../../assets/Images/Instructor.png'
import HomeBtn from './btn'
import HighlightedText from './highlighted'
import { IoArrowForward } from "react-icons/io5";
const InstructorSection=()=>{
    return (
        <div className="my-16 flex items-center justify-evenly ">
            <div className='w-2/5'>
                <img className='shadow-[-15px_-15px_0px_#ffff] w-11/12' src={Instructor} alt="" />
            </div>
            <div className='w-2/5'>
                <h2 className= ' font-semibold text-pure-greys-50 text-3xl'>Become an 
                <HighlightedText content={' instructor'}></HighlightedText></h2>

                <p className='text-richblack-500 my-5'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                <HomeBtn active={true} content={<>Start teaching today <IoArrowForward></IoArrowForward> </>} render={'/signup'}></HomeBtn>
            </div>
        </div>
    )
}
export default InstructorSection