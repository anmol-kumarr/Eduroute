import { Link } from "react-router-dom"
import Header from "../components/header"
import { IoArrowForward } from "react-icons/io5";
import HomeBtn from "../components/home/btn";


const Home = () => {
    return (
        <div className="w-[100vw] bg-richblack-900 p-1">
            <div>

                <Header></Header>


                {/* section one */}
                <div className="w-11/12 mx-auto my-20 gap-5 flex flex-col justify-center items-center">
                    <Link to='/instrutor'>


                    <button  className="flex justify-center items-center gap-1 bg-richblack-800 text-richblack-200 px-3 py-2 rounded-2xl font-inter font-normal text-sm shadow-[1px_1px_1px_#585D69]  transition hover:scale-105">
                        Become an instrutor
                        <span>
                        <IoArrowForward />
                        </span>
                    </button>
                    </Link>

                    <div className="font-inter font-semibold  text-richblack-5">
                        <h1 className="text-2xl">Empower Your Future with <span className="bg-gradient-text bg-clip-text">Coding Skills</span></h1>
                    </div>

                    <p className="text-center text-richblack-200 max-w-[70%]">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                    </p>

                    <div className="flex gap-4">
                        <HomeBtn active={true} content={'Learn More'} render={'/learnMore'}></HomeBtn>
                        <HomeBtn  active={false} content={'Book a demo'} render={'/demo'}></HomeBtn>
                    </div>

                </div>

                {/* section two */}

                <div>

                </div>
            </div>
        </div>
    )
}

export default Home