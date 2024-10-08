import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { IoMdCloudUpload } from "react-icons/io";
import { useSelector } from "react-redux";
const UploadVideo = ({
    register,
    errors,
    handleSubmit,
    setValues,
    getValues,
    name,
    label,
    video,
    viewData,
    editData

}) => {
    const editCourse = useSelector(state => state.course.editCourse)
    const [file, setFile] = useState(null)

    const videoRef = useRef(null);

    const [preview, setPreview] = useState(null)

    // useEffect(() => {
    //     // console.log('hello')
    // }, [])

    const fileHandler = (e) => {
        const file = e.target.files[0]
        console.log(file)
        const supportedFileTypes = ["video/mp4"]
        if (!supportedFileTypes.includes(file.type)) {
            return toast.error('File type not supported');
        }
        // if (file.size > 1024 * 1024 * 2) {
        //     return toast.error('image size should be less than 2mb')
        // }
        setFile(file)
        setPreview(URL.createObjectURL(file))

        e.target.value = ''
    }
    const clearImage = () => {
        setFile(null)
        setPreview(null)
    }

    // useEffect(() => {
    //     setValue('thumbnail', file)
    // }, [file, setValue])
    // const fileHandler=()=>{
    //     const file=getValues('lectureVideo')
    //     console.log(file)
    //     setPreview(URL.createObjectURL(file))
    // }

    // Create a ref to access the video element

    // Function to play the video on click
    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };
    return (
        <div className="w-full">
            <div className="flex justify-between items-center">

                <label htmlFor={name}>{label}</label>


            </div>



            {
                preview ? (
                    <div className="w-full flex flex-col p-3 rounded-md bg-richblack-700 ">
                        <div className="w-full h-48 rounded-md overflow-hidden">

                            <video ref={videoRef} onClick={handlePlayVideo} className="w-full h-full" src={preview}></video>
                        </div>

                        <div onClick={clearImage} className="text-center my-2 cursor-pointer font-semibold text-richblack-500">
                            Cancel
                        </div>
                    </div>
                ) :

                    (


                        <div onClick={() => document.getElementById('lectureVideo').click()} className="w-full h-48 bg-richblack-700 gap-2 border border-dashed border-richblack-500 rounded-md p-5 flex flex-col justify-center items-center">
                            <div className="bg-yellow-100 text-2xl h-10 w-10 rounded-full flex justify-center items-center">

                                <IoMdCloudUpload></IoMdCloudUpload>
                                <input type="file" id={name} onChange={fileHandler} className="hidden" />
                            </div>
                            <p className="text-richblack-300">
                                Upload video lecture , or <span className="text-yellow-100 font-semibold">
                                    Browse
                                </span>
                            </p>
                        </div>
                    )

            }

        </div>
    )
}
export default UploadVideo