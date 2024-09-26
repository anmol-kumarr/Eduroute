import { useEffect } from "react"

const Stats = () => {
    const data = [

        { count: "5K", label: "Active Students" },
        { count: "10+", label: "Mentors" },
        { count: "200+", label: "Courses" },
        { count: "50+", label: "Awards" },


    ]
    return (
        <div className="w-11/12 mx-auto">
            <div className="text-white flex justify-around py-10 ">
                {
                    data.map((item)=>(
                        <div className="text-center ">
                            <h2 className="text-2xl font-semibold">{item.count}</h2>
                            <p className="text-richblack-200">{item.label}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Stats