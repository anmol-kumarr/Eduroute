const LargeBtn=({content,behaviour,active})=>{
    return(
        <button  className={`${!active?'bg-yellow-100 shadow-[1px_1px_0px_#FFD60A]':'bg-richblack-800 text-richblack-50'} duration-150 ease-in-out active:scale-95 text-black font-medium py-2 w-full rounded-md font-inter  px-5 `} onClick={()=>behaviour()}>
            {content}
        </button>
    )
}
export default LargeBtn