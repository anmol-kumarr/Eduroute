import { useSelector } from "react-redux"
import CourseBuilder from "./courseBuilder"
import CourseIntro from "./courseIntro"
import CoursePublish from "./coursePublish"
import Step from "./step"

const RenderSteps = () => {
    const { step } = useSelector(state => state.course)
    return (
        <div className="">
            <Step></Step>

            {
                step === 1 && <CourseIntro></CourseIntro>
            }
            {
                step === 2 && <CourseBuilder></CourseBuilder>
            }
            {
                step === 3 && <CoursePublish></CoursePublish>
            }

        </div>
    )
}
export default RenderSteps