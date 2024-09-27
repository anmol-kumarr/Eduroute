import HomeBtn from "../home/btn";
import HighlightedText from "../home/highlighted";

const LearningGrid = () => {
    const LearningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for ",
            highlightText: "Anyone, Anywhere",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "Learn More",
            BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description:
                "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 3,
            heading: "Certification",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 5,
            heading: "Ready to Work",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
    ];
    return (
        <div className="grid my-14 mx-auto grid-col-1 lg:grid-cols-4">
            {
                LearningGridArray.map((item, index) => (
                    <div key={index} className={`${index === 0 && 'lg:col-span-2 bg-transparent'} ${item.order % 2 === 1 ? 'bg-richblack-700' : 'bg-richblack-800'}  ${item.order === 3 && 'lg:col-start-2'}`}>
                        {
                            item.order < 0 ? (
                                <div className="w-11/12 text-richblack-100 bg-richblack-900 p-2">
                                    <h2 className="font-semibold text-xl my-4">
                                        {item.heading}
                                        <HighlightedText content={item.highlightText}></HighlightedText>
                                    </h2>
                                    <p className="text-richblack-300 mb-4 text-sm">
                                        {item.description}
                                    </p>
                                    <HomeBtn active={true} content={item.BtnText} render={item.BtnLink}></HomeBtn>
                                </div>
                            ) : (
                                <div className="text-richblack-100 py-4 px-6 h-[200px]">
                                    <h2 className="text-l font-semibold  ">{item.heading}</h2>
                                    <p className="text-richblack-300 mt-4 text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}
export default LearningGrid