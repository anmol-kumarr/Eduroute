import { Link } from "react-router-dom"

const HomeBtn = ({ active, content, render }) => {
    return (
        <Link to={render}>
            <button className={`${active?'flex justify-center items-center gap-1 font-inter text-sm text-richblack-900 bg-yellow-50 px-3 py-2 rounded-md  shadow-[1.5px_1.5px_0px_#FFF970] transition hover:scale-105':'text-sm font-inter px-3 py-2  rounded-md text-richblack-5 bg-richblack-700 shadow-[1.5px_1.5px_0px_#424854] transition hover:scale-105'}`}>
                {content}
            </button>
        </Link>
    )
}

export default HomeBtn