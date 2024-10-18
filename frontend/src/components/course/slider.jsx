import { useRef } from "react";

import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import CourseCard from "./courseCard";

const Slider = ({course}) => {

    const carouselRef = useRef(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -250, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 250, behavior: 'smooth' });
        }
    };

    return (
        <div className="my-7 px-5 lg:max-w-[1200px] mx-auto relative">
            <div className="overflow-hidden">
                <button
                    onClick={scrollLeft}
                    className="bg-richblack-800 absolute left-[5px] top-[50%] transform -translate-y-1/2 text-sm p-2  text-gray-500 rounded-full"
                >
                    <MdArrowBackIosNew />
                </button>
                <div
                    ref={carouselRef}
                    className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
                >
                    {course.map((item, index) => (
                        <CourseCard key={item._id} course={item}></CourseCard>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    className=" shadow-custom-black absolute right-[5px] top-1/2 transform -translate-y-1/2 text-sm bg-richblack-800 text-gray-500 p-2 rounded-full"
                >
                    <MdOutlineArrowForwardIos />
                </button>
            </div>
        </div>
    );
}

export default Slider;