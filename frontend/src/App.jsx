import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/home";
import Footer from "./components/footer";
import Header from "./components/header";
import Auth from "./page/auth";
import ResetPassword from "./page/resetPassword";
import VerifyEmail from "./page/verifyEmail";

function App() {
  const location = useLocation().pathname
  return (
    <div className="overflow-x-hidden">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path='/auth/:authValue' element={<Auth></Auth>} />
        <Route path='/auth/resetPassword' element={<ResetPassword></ResetPassword>}/>
        <Route path='/auth/verifyEmail' element={<VerifyEmail></VerifyEmail>}/>
      </Routes>
      <div className="bg-richblack-700 w-full">
        {

          location.includes('/auth') ? "":< Footer ></Footer>
        }
      </div>
    </div >
  );
}

export default App;
