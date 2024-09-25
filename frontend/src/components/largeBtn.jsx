const LargeBtn=({content,behaviour})=>{
    return(
        <button  className="bg-yellow-100 duration-150 ease-in-out active:scale-95 text-black font-medium py-2 w-full rounded-md font-inter  px-5 " onClick={()=>behaviour()}>
            {content}
        </button>
    )
}
export default LargeBtn