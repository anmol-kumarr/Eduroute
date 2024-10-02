

const ModalBtn = ({text,onClick,disabled,children,className}) => {
    
    return (
        <button className={className} disabled={disabled} onClick={onClick}>
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