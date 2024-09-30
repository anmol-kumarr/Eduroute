import ModalBtn from "./modalbtn"

const Modal=({textOne,textTwo,btnOneText,btnTwoText,btnOneHandler,btnTwoHandler,})=>{
    console.log(textOne)
    return (
        <div className="bg-yellow-25 text-richblack-900">
            <div>
                <p>{textOne}</p>
                <p>{textTwo}</p>
            </div>
            <div>
                <ModalBtn text={btnOneText} onClick={btnOneHandler}   ></ModalBtn>
                <ModalBtn text={btnTwoText} onClick={btnTwoHandler}   ></ModalBtn>
            </div>
        </div>
    )
}
export default Modal