import HighlightedText from "../components/home/highlighted"
import headingOne from '../assets/Images/aboutus1.webp'
import headingTwo from '../assets/Images/aboutus2.webp'
import headingThree from '../assets/Images/aboutus3.webp'
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import ColoredText from "../components/about/colorText";
import foundingStory from '../assets/Images/FoundingStory.png'
import Stats from "../components/about/stats";
import LearningGrid from "../components/about/learningGrid";
// import ColoredText from "../components/about/colorText";

const About = () => {
    return (

        <div className='w-full'>
            <div className="w-full">



                {/* section one */}



                <div className="w-full  text-richblack-100 bg-richblack-800">
                    <div className="w-11/12 items-center justify-start pt-16 mx-auto  flex flex-col ">
                        <div className="w-full  flex flex-col justify-center items-center text-center">

                            <p>About us</p>
                            <h1 className="text-white p-2 text-center font-inter text-2xl font-semibold w-2/3">Driving Innovation in Online Education for a <HighlightedText content={'Brighter Future'}></HighlightedText></h1>
                            <p className="w-2/3 text-center p-2">
                                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                            </p>
                        </div>


                        <div className="w-5/6 flex mt-5 -mb-24 justify-center items-center gap-5">
                            <div className="w-1/3">
                                <img src={headingOne} alt="" />
                            </div>
                            <div className="w-1/3">
                                <img src={headingTwo} alt="" />
                            </div>
                            <div className="w-1/3">
                                <img src={headingThree} alt="" />
                            </div>

                        </div>
                    </div>
                </div>



                {/* section two */}





                <div className="w-11/12 mx-auto my-10  text-white ">
                    <div className="py-20 mx-auto w-[75%]  text-center">


                        <h2 className="text-3xl  font-semibold">
                            <RiDoubleQuotesL className="inline -mt-6 text-richblack-600" /> We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightedText content={'combines technology,'}></HighlightedText> <ColoredText content={'expertise,'}></ColoredText> and community to create an <span className="text-brown-100">unparalleled educational experience.</span><RiDoubleQuotesR className="inline mb-4 text-richblack-600" />

                        </h2>
                    </div>
                    <hr className="text-richblack-700 w-full" />
                    <div className="w-full">
                        <div className="flex my-5 justify-around items-center flex-wrap">
                            <div className="w-2/5 min-w-[300px]">
                                <h2 className="text-2xl font-semibold"><ColoredText content={'Our Founding Story '}></ColoredText></h2>
                                <p className="text-richblack-200  my-3">
                                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                                </p>
                                <p className="text-richblack-200 my-3">
                                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                                </p>
                            </div>
                            <div className="w-1/3 min-w-[300px]">
                                <img className="w-full" src={foundingStory} alt="" />
                            </div>
                        </div>

                        <div className="flex my-5 justify-around items-center flex-wrap">
                            <div className="w-2/5  min-w-[300px]">
                                <h2 className="text-2xl"><HighlightedText content={'Our Vision'}></HighlightedText></h2>

                                <p className="text-richblack-200 my-3">
                                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                                </p>
                            </div>

                            <div className="w-1/3  min-w-[300px]">
                                <h2 className="text-2xl">
                                    <ColoredText content={'Our Mission'}></ColoredText>
                                </h2>
                                <p className="text-richblack-200 my-3">
                                    our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* section three */}


                <div className="bg-richblack-800">
                    <Stats></Stats>
                </div>

                {/* section four  */}

                <div>
                    <LearningGrid></LearningGrid>
                </div>














            </div>

        </div>
    )
}

export default About