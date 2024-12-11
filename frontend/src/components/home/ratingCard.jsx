import { GoStar, GoStarFill } from "react-icons/go"
// import { BsStarHalf } from "react-icons/bs";
const RatingCard = ({ rating }) => {
    const words = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur molestiae iste labore reiciendis praesentium error sunt sequi cum sit, hic corporis quos tenetur! Id est labore nobis sed, debitis harum.'
    return (
        <div className='text-richblack-100 rounded-md p-3 bg-richblack-800 max-w-[max-content]'>
            <div className="flex gap-2 items-center">
                <div className="w-10 h-10 overflow-hidden rounded-full">

                    <img className="w-full h-full" src={rating?.user?.image} alt="user" />
                </div>
                <div className="">

                    <p>{rating?.user?.firstName} {rating?.user?.lastName}</p>
                    <p className="text-sm">{rating?.user?.email}</p>

                </div>
            </div>
            <div className="text-center mt-2 font-medium text-richblack-25">{rating.course.courseName}</div>
            <div className="max-w-60 text-sm p-1">

                {words.length > 33 ?
                    <>{words.slice(0, 33)}...</>
                    : words}
            </div>
            <div className="flex text-yellow-100 items-center gap-1 my-2">
                <p> {
                    rating.rating
                }.0</p>
                <p className="flex items-center text-center">
                    {[...Array(5)].map((_, i) => (
                        rating.rating >= i + 1 ? (
                            <GoStarFill key={i} />
                        ) : (
                            <GoStar key={i} />
                        )
                    ))}

                </p>

            </div>
        </div >
    )
}
export default RatingCard