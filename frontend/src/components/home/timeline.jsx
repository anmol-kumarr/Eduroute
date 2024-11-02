import { TfiLineDotted } from "react-icons/tfi";
import TimeLineOne from '../../assets/TimeLineLogo/Logo1.svg'
import TimeLineTwo from '../../assets/TimeLineLogo/Logo2.svg'
import TimeLineThree from '../../assets/TimeLineLogo/Logo3.svg'
import TimeLineFour from '../../assets/TimeLineLogo/Logo4.svg'


const TimeLine = () => {

    const data = [
        {
            image: TimeLineOne,
            heading: 'Leadership',
            text: 'Fully committed to the success company'

        },
        {
            image: TimeLineTwo,
            heading: 'Responsiblity',
            text: 'Students will always be our top priority'
        },
        {
            image: TimeLineThree,
            heading: 'Flexibility',
            text: 'The ability to switch is an important skills'

        },
        {
            image: TimeLineFour,
            heading: 'Solve the Problem',
            text: 'Code your way to a solution'
        }

    ]


    return (
        <>{
            data.map((item ,index) => (
                <div  key={index} className="flex gap-2  ">
                    <div className=" flex flex-col justify-center items-center  ">
                        <div className="bg-white p-2 flex justify-center items-center h-11 w-11 rounded-full">
                            <img src={item.image} alt="" />
                        </div>
                        {
                            index!==data.length-1 && <TfiLineDotted className="rotate-90 my-2" />
                        }
                    </div>

                    <div className="font-inter text-[#161D29] ">
                        <p className="text-lg font-semibold">{item.heading}</p>
                        <p className="text-sm">{item.text}</p>
                    </div>
                </div>
            ))



        }
        </>
    )
}
export default TimeLine