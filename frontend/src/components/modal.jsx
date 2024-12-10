import ModalBtn from "./modalbtn"

const Modal = ({ textOne, textTwo, btnOneText, btnTwoText, btnOneHandler, btnTwoHandler }) => {
    // console.log(textOne)

    return (
        <div className="bg-richblack-500 duration-500 bg-opacity-70 absolute top-0 bottom-0 left-0 right-0">
            <div className="-my-64 flex justify-center items-center h-full  w-full text-richblack-700">
                <div className="w-3/12 p-5 bg-richblack-800 text-richblack-50 rounded-md">

                    <div>
                        <p className="text-center text-2xl font-semibold">{textOne}</p>
                        <p className="text-center my-1">{textTwo}</p>
                    </div>
                    <div className="flex items-center justify-evenly  mt-7">
                        <ModalBtn className={'bg-yellow-50  px-3 py-1   text-richblack-600 rounded-md'} text={btnOneText} onClick={btnOneHandler}   ></ModalBtn>
                        <ModalBtn className={'bg-richblack-700 px-3 py-1  text-white rounded-md'} text={btnTwoText} onClick={btnTwoHandler}   ></ModalBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal