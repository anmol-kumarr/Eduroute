const DashBoardBtn=({classname,text,onclick})=>{
    // console.log(onclick)
    return (
        <button className={classname} onClick={()=>onclick()}>
            {text}
        </button>
    )
}
export default DashBoardBtn