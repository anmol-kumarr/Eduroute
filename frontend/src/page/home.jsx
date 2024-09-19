import { Link } from "react-router-dom"
import Header from "../components/header"
import { IoArrowForward } from "react-icons/io5";
import HomeBtn from "../components/home/btn";
import Banner from '../assets/Images/banner.mp4'
import HighlightedText from "../components/home/highlighted";
import CodeBlock from "../components/home/codeBlock";
import GirlImage from '../assets/Images/TimelineImage.png'
import TimeLine from "../components/home/timeline";
import LearningLanguageSection from "../components/home/learningLanguageSection";
import InstructorSection from "../components/home/instructorsection";
import Footer from "../components/footer";

const Home = () => {
    return (
        <div className="w-[100vw] bg-richblack-900 p-1">
            <Header></Header>
            <div className="w-11/12 mx-auto ">



                {/* section one */}
                <div className=" my-20 gap-5 flex flex-col justify-center items-center">
                    <Link to='/instrutor'>


                        <button className="flex justify-center items-center gap-1 bg-richblack-800 text-richblack-200 px-3 py-2 rounded-2xl font-inter font-normal text-sm shadow-[1px_1px_1px_#585D69]  transition hover:scale-105">
                            Become an instrutor
                            <span>
                                <IoArrowForward />
                            </span>
                        </button>
                    </Link>

                    <div className="font-inter font-semibold  text-richblack-5">
                        <h1 className="text-2xl">Empower Your Future with <HighlightedText content={'Coding Skills'}></HighlightedText></h1>
                    </div>

                    <p className="text-center text-richblack-200 max-w-[70%]">
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </p>

                    <div className="flex gap-4">
                        <HomeBtn active={true} content={'Learn More'} render={'/learnMore'}></HomeBtn>
                        <HomeBtn active={false} content={'Book a demo'} render={'/demo'}></HomeBtn>
                    </div>



                    <div className="w-4/5 overflow-y-hidden relative mx-auto my-10 shadow-[20px_20px_0px_#ffff] bg-gradient-to-t from-blue-300">
                        <video className="w-full " autoPlay muted loop src={Banner}></video>
                        <div className="absolute -top-80  left-[50%]  bg-white shadow-[-15px_-15px_15px_#0F7A9D]"></div>
                    </div>


                </div>

                {/* section two */}

                <div className="w-4/5 mx-auto">
                    <CodeBlock bg={'yellow'} position={''} btnOne={{ content: <>Try it Yourself <IoArrowForward /></>, active: true, render: '/course' }}
                        btnTwo={{ content: <>learn more</>, active: false, render: '/learnmore' }}

                        heading={<>Unlock your {<HighlightedText
                            content={'coding potential '}></HighlightedText>}
                            with our online courses.</>}


                        subHeading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}></CodeBlock>


                    <CodeBlock bg={'blue'} position={'flex-row-reverse'} btnOne={{ content: <>continue lesson <IoArrowForward /></>, active: true, render: '/lessons' }}
                        btnTwo={{ content: <>Learn More</>, active: false, render: '/learnmore' }}
                        heading={<>Start <HighlightedText content={'coding in seconds'}></HighlightedText></>}

                        subHeading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`} ></CodeBlock>

                </div>

                {/* seciton three */}

                <div>

                </div>


            </div>
            {/* section four */}
            <div className="bg-pure-greys-5 ">

                <div className="home_bg h-72 w-full bg-white">
                    <div className="w-11/12 h-full mx-auto flex gap-7 items-center justify-center">
                        <HomeBtn active={true} render={'/signup'} content={<>Explore Full Catalog <IoArrowForward /> </>}></HomeBtn>
                        <HomeBtn active={false} render={'/learnmore'} content={'learn more'}></HomeBtn>

                    </div>


                </div>

                <div className="w-11/12 mx-auto">

                    <div className="font-inter flex justify-around my-16">
                        <div className="w-2/5 text-3xl font-semibold ">
                            Get the skills you need for a <HighlightedText content={'job that is in demand.'}></HighlightedText>
                        </div>
                        <div className="w-2/5  text-[#2C333F] font-inter flex flex-col gap-5">
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.

                            <HomeBtn active={true} content={"Learn more"} render={'/learnmore'}></HomeBtn>
                        </div>

                    </div>


                    <div className="flex justify-around items-center my-10">
                        <div className="w-2/5">

                            <TimeLine></TimeLine>

                        </div>

                        <div className="w-2/5 relative">

                            <img className="w-full" src={GirlImage} alt="" />
                            <div className="px-3 py-4 absolute top-[90%] left-[10%] right-[50%] bg-caribbeangreen-700 w-4/5 flex justify-between">
                                <div className="uppercase flex items-center gap-3 ">
                                    <p className="text-white font-inter text-3xl">10</p>
                                    <p className="text-xs text-caribbeangreen-300 font-inter flex flex-col">
                                        <span className="">YEARS</span>
                                        <span>EXPERIENCES</span>

                                    </p>
                                </div>

                                <div className="bg-caribbeangreen-400 w-[1px]"></div>
                                <div className="uppercase flex items-center gap-3 ">
                                    <p className="text-white font-inter text-3xl">250</p>
                                    <p className=" text-xs text-caribbeangreen-300 font-inter flex flex-col">
                                        <span>types</span>
                                        <span>of courses</span>

                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                    <LearningLanguageSection></LearningLanguageSection>





                </div>
            </div>



            <div className=" w-11/12 mx-auto">

                <InstructorSection />
            </div>

            <div className="bg-richblack-700 w-full">

                <Footer></Footer>
            </div>

        </div>
    )
}

export default Home