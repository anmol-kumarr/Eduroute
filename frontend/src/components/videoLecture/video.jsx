import {  useRef } from "react"
import { useDispatch } from "react-redux";
// import { BigPlayButton, ForwardControl, Player } from 'video-react';
import { setCompletedLecture } from "../../redux/slice/lecture";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { enrolledCourse } from "../../services/api";
import { apiConnector } from '../../services/apiconnector'

const Video = ({ setSection, setPlayVideo, setSubSection, subSection, section, courseData, playVideo }) => {
    const videoPlayerRef = useRef(null)
    // const [videoEnd, setVideoEnd] = useState(false)

    const dispatch = useDispatch()

    const completeHandler = () => {

        dispatch(setCompletedLecture({
            courseId: courseData._id,
            subSectionId: subSection._id
        }))
        markedComplete()

    }
    const markedComplete = async () => {
        const api = enrolledCourse.completedLecture
        try {
            const response = await apiConnector('PUT', api, { courseId: courseData._id, subSectionId: subSection._id })
            // console.log(response)
        }
        catch (err) {
            // console.log(err)
        }
    }


    const isFirstVideo = () => {
        const sectionIndex = courseData?.courseContent.findIndex((data) => data._id === section._id)

        const subSectionIndex = courseData?.courseContent[sectionIndex].subSection.findIndex((data) => subSection._id === data._id)

        if (sectionIndex === 0 && subSectionIndex === 0) return true

    }

    const isLastVideo = () => {



        const sectionIndex = courseData?.courseContent.findIndex((data) => data._id === section._id)
        // console.log('sectionIndex', sectionIndex)
        const subSectionLength = courseData?.courseContent[sectionIndex]?.length

        // console.log('subSectionLength', subSectionLength)


        const subSectionIndex = courseData?.courseContent[sectionIndex].subSection.findIndex((data) => subSection._id === data._id)

        // console.log('subSectionIndex', subSectionIndex)

        if (sectionIndex === section?.subSection?.length - 1 && subSectionIndex === subSectionLength - 1) { return true }
        else {
            return false
        }

    }

    const goNext = () => {

        const sectionIndex = courseData?.courseContent.findIndex((data) => data._id === section._id)
        // console.log("sectionIndex", sectionIndex)
        const subSectionLength = courseData?.courseContent[sectionIndex]?.subSection?.length
        // console.log('subSectionLength', subSectionLength)


        const subSectionIndex = courseData?.courseContent[sectionIndex].subSection.findIndex((data) => subSection._id === data._id)

        // console.log('subSectionIndex', subSectionIndex)


        if (subSectionLength === subSectionIndex - 1 || subSectionIndex - 1 < 0) {

            const nextSubSection = courseData.courseContent[sectionIndex + 1].subSection[0]
            setSubSection(nextSubSection)
            setPlayVideo(nextSubSection.videoUrl)
            setSection(courseData.courseContent[sectionIndex + 1])

        }
        else {
            const nextSubSection = courseData?.courseContent[sectionIndex].subSection[subSectionIndex + 1]

            // console.log(courseData?.courseContent[sectionIndex].subSection[subSectionIndex + 1])
            // console.log('nextSubSection',)

            setSubSection(nextSubSection)
            setPlayVideo(nextSubSection.videoUrl)
            setSection(courseData?.courseContent[sectionIndex])
        }
    }

    const goPrev = () => {
        const sectionIndex = courseData?.courseContent.findIndex((data) => data._id === section._id)
        // console.log(sectionIndex)
        const subSectionLength = courseData?.courseContent[sectionIndex]?.subSection?.length



        const subSectionIndex = courseData?.courseContent[sectionIndex].subSection.findIndex((data) => subSection._id === data._id)

        if (subSectionIndex !== 0) {
            const nextSubSection = courseData?.courseContent[sectionIndex].subSection[subSectionIndex - 1]
            setSubSection(nextSubSection)
            setPlayVideo(nextSubSection.videoUrl)
            setSection(courseData?.courseContent[sectionIndex])
        }
        else {
            const nextSubSection = courseData.courseContent[sectionIndex - 1].subSection[0]
            setSubSection(nextSubSection)
            setPlayVideo(nextSubSection.videoUrl)
            setSection(courseData.courseContent[sectionIndex - 1])
        }
    }



    return (

        <div ref={videoPlayerRef} className="my-2 relative z-0   850px:w-9/12 w-full mx-auto flex flex-col items-center">
            <div className="max-h-[calc(100vh-5rem)] w-full">

                {/* <Player src={playVideo} ref={videoPlayerRef} onEnded={() => completeHandler()} aspectRatio="16:9">
                    <BigPlayButton position="center" />

                </Player> */}
                <video  controls controlsList="nodownload" className="aspect-video" onEnded={()=>completeHandler()}>
                    <source type="video/mp4" src={playVideo} />
                </video>
            </div>

            <div className="flex mt-5 justify-around 850px:w-1/4 sm:w-1/2 w-10/12">

                {/* { */}
                {/* isFirstVideo() &&  */}

                <button onClick={goPrev} className="flex items-center px-2 py-1 rounded-md bg-richblack-700 "><IoIosArrowBack className="-mb-[2px]"></IoIosArrowBack> Previous</button>
                {/* } */}
                {/* { isLastVideo() &&  */}

                <button onClick={goNext} className="bg-yellow-100 px-2 flex items-center py-1 rounded-md text-black">
                    Next
                    <IoIosArrowForward className="-mb-[2px]"></IoIosArrowForward>
                </button>
                {/* } */}
            </div>


        </div>
    )
}

export default Video