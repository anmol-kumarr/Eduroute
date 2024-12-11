
import { Navigate } from "react-router-dom"
import { useMediaQuery } from "usehooks-ts"

const MobileRoute = ({ children }) => {
    const width = useMediaQuery('(min-width: 850px)')
    // console.log(location.split('/').includes('course'))


    if (width) {
        return <Navigate to="/not-supported" />;
    }
    return <>{children}</>;

}

export default MobileRoute