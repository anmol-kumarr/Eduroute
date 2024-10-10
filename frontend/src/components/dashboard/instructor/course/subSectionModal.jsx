import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import UploadVideo from "./uploadVideo";
import { createSubSection } from "../../../../services/operation/course";
import { useEffect } from "react";
const SubSectionModal = ({
    id,
    type,
    create = false,
    setSubSectionModal,
    video,
    title,
    description,
    timeDuration,
    view = false,
    edit = false
}) => {
    const { register, handleSubmit, setValue,watch, getValues, formState: { errors } } = useForm()
    const loading = useSelector(state => state.course.loading)
    const course=useSelector(state=>state.course.MyCourse)


const dispatch=useDispatch()

    const submitHandler = (data) => {
        if(edit){

        }
        else{
            console.log(data)
            const formData=new FormData()
            formData.append('video',data.videoLecture)
            formData.append('title',data.lectureTitle)
            formData.append('description',data.lectureDescription)
            formData.append('sectionId',id)
            formData.append('courseId',course?._id)
            formData.append('timeDuration',data.timeDuration)


            dispatch(createSubSection(formData))


        }

    }
    useEffect(()=>{
        console.log('type',type)
        console.log(video)
        console.log(title)
        console.log(description)
        console.log(timeDuration)
        console.log(view)
        console.log('end')
        console.log(setSubSectionModal)
    
        if(edit||view){
            setValue('lectureTitle',title)
            setValue('timeDuration',timeDuration)
            setValue('lectureDescription',description)
            setValue('videoLecture',video)
        }
    },[])


    const lectureTitleValue = watch('lectureTitle');
    // console.log('title:',lectureTitleValue)


    return (
        <div className="absolute top-0 -bottom-[100%] right-0 left-0 bg-richblack-900 bg-opacity-80">

            <div className="w-1/2 rounded-md my-[10%] mx-auto bg-richblack-800  py-3 px-4">
                <div className="flex flex-col gap-2">
                    <div className="flex bg-richblack-800 rounded-md text-richblack-25 p-2 justify-between items-center ">
                        <p>{type} lecture</p>
                        <button onClick={!loading && (() => setSubSectionModal(false))} type="button"><RxCross2></RxCross2></button>
                    </div>
                    <hr className="text-richblack-600" />
                    <div>
                        <form onSubmit={handleSubmit(submitHandler)}>

                            <UploadVideo
                                name={'lectureVideo'}
                                label={'Lecture Video'}
                                register={register}
                                setValue={setValue}
                                getValues={getValues}
                                errors={errors}
                                video={video?video:null}
                                viewData={view ? video : null}
                                editData={edit ? video : null}
                            ></UploadVideo>

                            <div className="my-2">


                                <label htmlFor="lectureTitle">Lecture title</label><br />
                                <input type="text" id="lectureTitle" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter lecture title" {...register('lectureTitle', { required: true })} />
                                {
                                    errors.lectureTitle && <span>Please lecture title</span>
                                }


                            </div>
                            <div className="my-2">


                                <label htmlFor="timeDuration">Lecture duration</label><br />
                                <input type="text" id="timeDuration" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter time duration " {...register('timeDuration', { required: true,valueAsNumber: true, })} />
                                {
                                    errors.timeDuration && <span>Please enter valid lecture duration</span>
                                }


                            </div>

                            <div>
                                <label htmlFor="lectureDescription">Lecture description</label><br />
                                <input type="text" id="lectureDescription" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter lecture title" {...register('lectureDescription', { required: true })} />
                                {
                                    errors.lectureTitle && <span>Please lecture title</span>
                                }


                            </div>

                            <div className="flex justify-center my-3 ">
                                {
                                    view ? '' : (
                                        <button type="submit" className="bg-yellow-100 text-black text-semibold px-3 py-1 rounded-md">
                                            {
                                                edit ? 'Save changes' : 'Create lecture'
                                            }
                                        </button>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SubSectionModal