import HighlightedText from "./highlighted"
import LearningOne from '../../assets/Images/Know_your_progress.png'
import CompareWithOthers from '../../assets/Images/Compare_with_others.png'
import PlanYourLessons from '../../assets/Images/Plan_your_lessons.png'
import HomeBtn from "./btn"


const LearningLanguageSection = () => {
    return (
        <div className="w-full mt-28" >
            <div className="sm:w-4/6 w-full mx-auto text-center">
                <h2 className=" font-inter font-semibold text-2xl text-richblack-900">Your swiss knife for <HighlightedText content={'learning any language'}></HighlightedText></h2>
                <p className="font-inter text-[#2C333F] text-base my-3">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>
            </div>



            <div className="flex justify-center flex-wrap items-center my-10 w-full">
                <div className="min-w-[280px] sm:-mr-20 -16 w-[30%]">
                    <img className="w-full" src={LearningOne} alt="" />
                </div>
                <div className="min-w-[280px] -ml-24 sm:-ml-0 w-[30%]">
                    <img className="w-full" src={CompareWithOthers} alt="" />
                </div>
                <div className="min-w-[280px] w-[30%] sm:-ml-24">
                    <img className="w-full" src={PlanYourLessons} alt="" />
                </div>
            </div>
            <div className="flex justify-center pb-14 ">


                <HomeBtn active={true} content={'learn more'} render={'/auth/signup'}></HomeBtn>
            </div>
        </div>
    )
}
export default LearningLanguageSection