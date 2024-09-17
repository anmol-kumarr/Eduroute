import { Link } from "react-router-dom"

const HomeBtn = ({ active, content, render }) => {
    return (
        <Link to={render}>
            <button className={`${active?'font-inter text-richblack-900 bg-yellow-50 px-3 py-2 rounded-full  shadow-[1.5px_1.5px_0px_#FFF970]':'font-inter px-3 py-2  rounded-full text-richblack-5 bg-richblack-700 shadow-[1.5px_1.5px_0px_#424854]'}`}>
                {content}
            </button>
        </Link>
    )
}

export default HomeBtn