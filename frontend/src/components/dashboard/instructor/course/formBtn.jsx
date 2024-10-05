const FormBtn=({fn,text,active})=>{
    return(
        <button  className={` px-2 rounded-md font-medium py-1 flex items-center ${active===true?'bg-yellow-100 text-black':'bg-richblack-500'}`} onClick={fn}>
            {text}
        </button>
    )
}
export default FormBtn