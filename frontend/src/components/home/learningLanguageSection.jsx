import HighlightedText from "./highlighted"
import LearningOne from '../../assets/Images/Know_your_progress.png'
import CompareWithOthers from '../../assets/Images/Compare_with_others.png'
import PlanYourLessons from '../../assets/Images/Plan_your_lessons.png'
import HomeBtn from "./btn"


const LearningLanguageSection = () => {
    return (
        <div className="w-full mt-28" >
            <div className="w-4/6 mx-auto text-center">
                <h2 className=" font-inter font-semibold text-2xl text-richblack-900">Your swiss knife for <HighlightedText content={'learning any language'}></HighlightedText></h2>
                <p className="font-inter text-[#2C333F] text-base my-3">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>
            </div>



            <div className="flex justify-center items-center my-10 w-full">
                <div className="-mr-20 -16 w-[30%]">
                    <img className="w-full" src={LearningOne} alt="" />
                </div>
                <div className="w-[30%]">
                    <img className="w-full" src={CompareWithOthers} alt="" />
                </div>
                <div className="w-[30%] -ml-24">
                    <img className="w-full" src={PlanYourLessons} alt="" />
                </div>
            </div>
            <div className="flex justify-center pb-14 ">


                <HomeBtn active={true} content={'learn more'} render={'/learnmore'}></HomeBtn>
            </div>
        </div>
    )
}
export default LearningLanguageSection