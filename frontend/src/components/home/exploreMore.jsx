import { useState } from "react"
import HighlightedText from "./highlighted"
import HomePageExplore from '../../data/homepageExplore'
import { MdPeopleAlt } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
const ExploreMore = () => {
    // console.log(typeof(HomePageExplore))
    const tabName = [
        'Free',
        'New to coding',
        'Most popular',
        'Career paths',

    ]
    const [activeTab, setActiveTab] = useState('Free')
    return (
        <div className="w-full flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col items-center">
                <h2 className="font-inter text-center font-bold text-3xl text-richblack-5">Unlock the <HighlightedText content={' Power of Code'}></HighlightedText></h2>
                <p className="font-inter text-richblack-200">Learn to Build Anything You Can Imagine</p>
            </div>

            <div className="my-5 max-[450px]:w-[100%] xl:w-1/2 lg:w-[60%] sm:max-w-maxContent      flex md:justify-between transition-all duration-700  p-1 rounded-3xl bg-richblack-700">
                {
                    tabName.map((item, index) => (
                        <button onClick={() => setActiveTab(item)} className={` text-xs sm:text-base sm:min-w-[100px] font-inter text-richblack-25 ${activeTab === item ? 'bg-richblack-800 transition-all duration-300 ease-in-out py-2 sm:px-4 px-4 rounded-3xl' : 'bg-transparent py-2 sm:px-4 px-4 rounded-3xl'}`} key={index} >{item}</button>
                    ))
                }
            </div>


            <div className="lg:relative w-4/5 mb-10">
                <div className="lg:absolute  w-full flex ">
                    {
                        HomePageExplore.map((item, index) => {
                            return item.tag === activeTab && <div className=" text-black flex lg:flex-nowrap flex-wrap justify-center w-full gap-5" key={index}>
                                {
                                    
                                    item.courses.map((value, index) => (
                                        <div key={index} className={`min-w-[280px] p-5 w-1/3 ${index===0?'text-richblack-700 bg-white shadow-[5px_5px_0px_#FFE83D]':'bg-richblack-700 text-richblack-400'}`}>
                                            <div>
                                                <p className={`font-semibold my-2 ${index===0?'text-richblack-800':'text-richblack-5'}`}>{value.heading}</p>
                                                <p className="text-richblack-400 ">{value.description}</p>
                                            </div>
                                            <div className={`${index===0 && 'text-blue-300'} flex border-dashed border-t-[1.4px] mt-5 pt-2 justify-between  px-1`}>
                                                <p className="flex items-center gap-1">
                                                    <MdPeopleAlt /> 
                                                    <span>{value.level}</span>
                                                </p>
                                                <p className="flex items-center gap-1">
                                                    <LuNetwork></LuNetwork>
                                                    <span>{value.lessionNumber}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default ExploreMore