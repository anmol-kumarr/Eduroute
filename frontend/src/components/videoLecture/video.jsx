import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { Player } from 'video-react';
import { setCompletedLecture } from "../../redux/slice/lecture";

const Video = ({ setSection, setPlayVideo, setSubSection, subSection, section, courseData, playVideo }) => {
    const videoPlayerRef = useRef(null)
    const [videoEnd, setVideoEnd] = useState(false)
    const dispatch = useDispatch()

    const completeHandler = () => {

        dispatch(setCompletedLecture({
            courseId: courseData._id,
            subSectionId: subSection._id
        }))

    }



    const isFirstVideo = () => {
        const sectionIndex = courseData?.courseContent.findIndex((data) => data._id === section._id)

        const subSectionIndex = courseData?.courseContent[sectionIndex].findIndex((data) => subSection._id === data._id)

        if (sectionIndex === 0 && subSectionIndex === 0) return true

    }

    const isLastVideo = () => {



        const sectionIndex = courseData?.courseContent.findIndex((data) => data._id === section._id)
        const subSectionLength = courseData?.courseContent[sectionIndex]?.length


        const subSectionIndex = courseData?.courseContent[sectionIndex].findIndex((data) => subSection._id === data._id)

        if (sectionIndex === section?.subSection?.length - 1 && subSectionIndex === subSectionLength - 1) { return true }
        else {
            return false
        }

    }

    const goNext = () => {

        const sectionIndex = courseData?.courseContent.findIndex((data) => data._id === section._id)
        const subSectionLength = courseData?.courseContent[sectionIndex]?.length


        const subSectionIndex = courseData?.courseContent[sectionIndex].findIndex((data) => subSection._id === data._id)

        if (subSectionLength !== subSectionIndex - 1) {
            const nextSubSection = courseData?.courseContent[sectionIndex].subSection[subSectionIndex + 1]
            setSubSection(nextSubSection)
            setPlayVideo(nextSubSection.videoUrl)
            setSection(courseData?.courseContent[sectionIndex])
        }
        else {
            const nextSubSection = courseData.courseContent[sectionIndex + 1].subSection[0]
            setSubSection(nextSubSection)
            setPlayVideo(nextSubSection.videoUrl)
            setSection(courseData.courseContent[sectionIndex + 1])
        }
    }

    const goPrev = () => {
        const sectionIndex = courseData?.courseContent.findIndex((data) => data._id === section._id)
        const subSectionLength = courseData?.courseContent[sectionIndex]?.length


        const subSectionIndex = courseData?.courseContent[sectionIndex].findIndex((data) => subSection._id === data._id)

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
        <div ref={videoPlayerRef} className="my-2 max-h-[calc(100vh-5rem)] w-9/12 mx-auto flex justify-center">
            <Player ref={videoPlayerRef} onEnded={() => completeHandler()} aspectRatio="16:9">
                <source src={playVideo} />
            </Player>
        </div>
    )
}

export default Video