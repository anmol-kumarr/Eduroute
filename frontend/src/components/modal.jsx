import ModalBtn from "./modalbtn"

const Modal=({textOne,textTwo,btnTextOne,btnTextTwo,btnOneHandler,btnTwoHandler,disabledOne,childrenOne,disabledTwo,childrenTwo})=>{
    return (
        <div>
            <div>
                <p>{textOne}</p>
                <p>{textTwo}</p>
            </div>
            <div>
                <ModalBtn text={btnTextOne} onClick={btnOneHandler} disabled={disabledOne} children={childrenOne} ></ModalBtn>
                <ModalBtn text={btnTextTwo} onClick={btnTwoHandler} disabled={disabledTwo} children={childrenTwo} ></ModalBtn>
            </div>
        </div>
    )
}
export default Modal