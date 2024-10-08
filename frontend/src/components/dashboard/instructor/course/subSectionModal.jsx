import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import UploadVideo from "./uploadVideo";
const SubSectionModal = ({
    id,
    type,
    create = false,
    setSubSectionModal,
    video,
    title,
    description,
    view = false,
    edit = false
}) => {
    const { register, handleSubmit, setvalue, getValues, formState: { errors } } = useForm()
    const loading = useSelector(state => state.user.loading)
    const submitHandler = () => {

    }
    return (
        <div>
            <div>
                <div className="flex bg-richblack-800 text-richblack-25 p-2 justify-between items-center ">
                    <p>{type} lecture</p>
                    <button onClick={!loading &&(()=> setSubSectionModal(false))} type="button"><RxCross2></RxCross2></button>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitHandler)}>

                        <UploadVideo
                            name={'lectureVideo'}
                            label={'Lecture Video'}
                            register={register}
                            setValue={setvalue}
                            getValues={getValues}
                            errors={errors}
                            video={true}
                            viewData={view ? video : null}
                            editData={edit ? video : null}
                        ></UploadVideo>

                        <div>


                            <label htmlFor="lectureTitle">Lecture title</label><br />
                            <input type="text" id="lectureTitle" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter lecture title" {...register('lectureTitle', { required: true })} />
                            {
                                errors.lectureTitle && <span>Please lecture title</span>
                            }


                        </div>

                        <div>
                            <label htmlFor="lectureDescription">Lecture description</label><br />
                            <input type="text" id="lectureDescription" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 text-sm py-2 px-2" placeholder="Enter lecture title" {...register('lectureDescription', { required: true })} />
                            {
                                errors.lectureTitle && <span>Please lecture title</span>
                            }


                        </div>

                        <div>
                            {
                                view ? '' : (
                                    <button>
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
    )
}
export default SubSectionModal