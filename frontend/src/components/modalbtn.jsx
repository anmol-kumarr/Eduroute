

const ModalBtn = ({text,onClick,disabled,children}) => {
    
    return (
        <button disabled={disabled} onClick={onClick}>
            {
                children ? (
                    <>
                        <span>{text}</span>
                        {children}
                    </>
                ):(
                    <>{text}</>
                )
            }
        </button>
    )
}
export default ModalBtn