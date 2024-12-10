import { useEffect, useState } from "react"
import { courseDetailsApi } from "../services/api"
import { apiConnector } from "../services/apiconnector"
import { Link, useParams } from "react-router-dom"
import Header from "../components/header"
import { useSelector } from "react-redux"
import Slider from "../components/course/slider"
import CourseCard from "../components/course/courseCard"

const Catelog = () => {
    const { catelogId, catelogName } = useParams()
    const [categoryCourse, setCategoryCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const categories = useSelector(state => state.course.courseCategories)
    const [description, setDescription] = useState('')
    const [showCourse, setShowCourse] = useState('popular')
    const [courseData, setCourseData] = useState([])

    const fetchCategoryCourse = async () => {
        const api = `${courseDetailsApi.getCategoriesCourse}/${catelogId}`
        setLoading(true)
        try {
            const response = await apiConnector('GET', api)
            // console.log(response)
            setCourseData(response?.data?.data)

        } catch (err) {
            // console.log(err)
            setCourseData([])
            
        }
        setLoading(false)
    }
    useEffect(() => {
        // console.log(categories)
        categories?.filter((category) => {
            return category._id === catelogId &&
                setDescription(category.description)
        })
        fetchCategoryCourse()
    }, [catelogId, catelogName])


    useEffect(()=>{
        fetchCategoryCourse()
    },[])
    return (
        <div>
            <div className="bg-richblack-800">
                <Header></Header>
            </div>

            <div className="text-white  min-h-[calc(100vh-3rem)]">
                <div className=" bg-richblack-800  border-t-[1px] border-richblack-500  ">
                    <div className="w-10/12 mx-auto mt-10 pb-10  ">
                        <div className="flex flex-wrap gap-5 justify-between items-center">

                            <div className="min-w-[320px] ">

                                <p className="text-sm mb-2 text-richblack-300">
                                    <Link to='/'>
                                        <span className="px-[1px]">Home</span>
                                    </Link>
                                    /
                                    <span className="px-[1px]">Catelog</span>/
                                    <span className="text-yellow-100 px-[2px]">{catelogName}</span>
                                </p>
                                <h2 className="text-2xl font-inter">{catelogName}</h2>
                                <p className="text-richblack-200 text-sm font-inter">{description}</p>
                            </div>
                            <div className="min-w-[320px] text-sm sm:text-base px-3 sm:px-0">
                                <p>Related rourses</p>
                                <ul className="text-richblack-300 list-disc">
                                    <li>Doc {catelogName}</li>
                                    <li>Cheatsheets</li>
                                    <li>Articles</li>
                                    <li>Community Forums</li>
                                    <li>Projects</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                {
                    courseData.length>0?(
                    <>

                        <div className="w-10/12 mx-auto sm:my-5 my-10">
                            <h2 className="text-2xl mb-4 font-inter">Courses to get you started</h2>
                            <div className="flex gap-5 cursor-pointer border-b-[1.5px] border-richblack-500">
                                <p onClick={() => setShowCourse('popular')} className={`pb-1 px-3 ${showCourse === 'popular' ? 'text-yellow-100 border-b-[1.5px]  border-yellow-100 -mb-[1.3px]' : ''}`}>Most Popular</p>


                                <p onClick={() => setShowCourse('new')} className={`pb-1 px-3 ${showCourse === 'new' ? 'text-yellow-100 border-b-[1.5px]  border-yellow-100 -mb-[1.3px]' : ''}`}>New </p>



                                <p onClick={() => setShowCourse('trending')} className={`pb-1 px-3 ${showCourse === 'trending' ? 'text-yellow-100 border-b-[1.5px]  border-yellow-100 -mb-[1.3px]' : ''}`}>Trending</p>
                            </div>
                        </div>

                        <div className="w-full">
                            <Slider course={courseData}></Slider>
                        </div>
                    </>):(
                        <div className="h-[calc(50vh-3rem)] flex justify-center items-center text-2xl font-inter ">
                            404-Course not found 
                        </div>
                    )
                }

                <div className="w-11/12  mx-auto ">
                    <h2 className="text-2xl inline border-b-[1.5px] pb-1 border-richblack-600">Frequently brought together</h2>
                    <div className=" flex flex-wrap gap-5 my-5 justify-center">
                        {
                            courseData?.map((course) => (
                                <CourseCard catelogName={catelogName} width={'w-80'} height={'h-52'} course={course} key={course._id}></CourseCard>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Catelog