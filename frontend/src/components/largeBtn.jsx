const LargeBtn=({content,behaviour})=>{
    return(
        <button  className="bg-yellow-100  py-2 w-full rounded-md font-inter  px-5 " onClick={()=>behaviour()}>
            {content}
        </button>
    )
}
export default LargeBtn