const FormBtn = ({ type, fn, text, active }) => {
    return (
        <button type={type} className={` px-2 rounded-md font-medium py-1 flex items-center ${active === true ? 'bg-yellow-100 text-black' : 'bg-richblack-500'}`} >
            {text}
        </button>

    )
}
export default FormBtn