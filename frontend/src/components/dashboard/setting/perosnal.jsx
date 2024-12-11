import { useEffect, useState } from "react";
import DashBoardBtn from "../dashboardbtn"
import { techProfessions } from "../../../data/professionData";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../../services/operation/updateDetails";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Personal = () => {
    // const [selectedGender, setSelectedGender] = useState('male');
    const dispatch = useDispatch()
    // Set the initial state to 'male'
    const navigate = useNavigate()
    const [details, setDetails] = useState({
        name: '',
        profession: 'Software Engineer',
        dateOfBirth: '',
        gender: 'male',
        mobileNumber: '',
        about: ''
    })
    const handleGenderChange = (e) => {
        setDetails({ ...details, gender: e.target.value })
    };
    // useEffect(() => {
    //     if (details) {
    //         // console.log(details)
    //         dispatch(updateUserDetails())

    //     }
    // }, [details])


    const submitDetails = () => {
        if (!details.name || details.about || details.dateOfBirth || !details.gender || !details.mobileNumber || !details.profession) {
            return toast.error('All fields are required')
        }
        dispatch(updateUserDetails(navigate, { ...details }))
    }

    return (
        <div className="bg-richblack-800  sm:p-5 350px:p-2 py-2 px-1 350px:px-0 350px:py-0 rounded-md border border-richblack-700 my-2">
            <h2 className="text-richblack-50 text-xl mb-5">Profile information</h2>
            <div className="sm:flex justify-between my-2 w-full text-richblack-100">
                <div className="sm:w-[45%] w-[95%]  mx-auto">

                    <label htmlFor="name">Display name</label>
                    <br />


                    <input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 " name="name" type="text" id="name" placeholder="Enter your name" />
                </div>

                <div className="sm:w-[45%] w-[95%] mx-auto">
                    <label htmlFor="profession">Profession</label><br />
                    <select value={details.profession} onChange={(e) => setDetails({ ...details, profession: e.target.value })} name="profession" id="profession" className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 ">
                        {
                            techProfessions.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
            </div>



            <div className="sm:flex justify-between items-center w-full">


                <div className="sm:w-[45%] w-[95%] mx-auto text-richblack-100">
                    <div className="">
                        <label htmlFor="dateOfBirth">Date of birth</label><br />
                        <input value={details.dateOfBirth} onChange={(e) => setDetails({ ...details, dateOfBirth: e.target.value })} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 " type="date" />
                    </div>
                </div>
                <div className="sm:w-[45%] w-[95%] mx-auto" >
                    <p>Gender</p>
                    <div className="bg-richblack-700 my-1 py-2 px-3 rounded-md flex justify-between shadow-richblack-400 shadow-sm ">
                        <div>

                            <input  checked={details.gender === 'male'} onChange={handleGenderChange} className="" type="radio" id="male" value='male' name="gender" />

                            <label htmlFor="male">Male</label>
                        </div>
                        <div>

                            <input className="border-yellow-50" checked={details.gender === 'female'} onChange={handleGenderChange} type="radio" id="female" value='female' name="gender" />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div>

                            <input checked={details.gender === 'others'} onChange={handleGenderChange} type="radio" id="others" value='others' name="gender" />
                            <label htmlFor="others">Others</label>
                        </div>
                    </div>
                </div>
            </div>


            <div className="sm:flex justify-between my-3 w-full text-richblack-100">
                <div className="sm:w-[45%] w-[95%] mx-auto">

                    <label htmlFor="mobile">Mobile number</label>
                    <br />
                    <input value={details.mobileNumber} onChange={(e) => setDetails({ ...details, mobileNumber: e.target.value })} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 " name="mobile" type="text" id="mobile" placeholder="1234567890" />
                </div>
                <div className="sm:w-[45%] w-[95%] mx-auto">

                    <label htmlFor="bio">About</label>
                    <br />
                    <input value={details.about} onChange={(e) => setDetails({ ...details, about: e.target.value })} className="w-full rounded-md shadow-richblack-400 shadow-sm outline-none border-none my-1 bg-richblack-700 py-2 px-2 " name="bio" type="text" id="bio" placeholder="Enter your bio" />
                </div>
            </div>

            <div className="flex justify-end items-center gap-2 py-2">
                <DashBoardBtn onclick={submitDetails} classname={'text-black bg-yellow-100 px-3 py-1 rounded-md'} text={'Submit'}></DashBoardBtn>
                <DashBoardBtn classname={'text-richblack-100 bg-richblack-700 px-3 py-1 rounded-md'} text={'Cancel'}></DashBoardBtn>
            </div>
        </div>
    )
}
export default Personal