import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/home";
import Footer from "./components/footer";
import Header from "./components/header";
import Auth from "./page/auth";
import ResetPassword from "./page/resetPassword";
import VerifyEmail from "./page/verifyEmail";
import OpenRoute from "./utils/openroute";
import Login from "./components/login";
import SignUp from "./components/signup";
import ContactPage from "./page/contact";
import PasswordResetForm from "./page/setpassword";
import Dashboard from "./page/user";
import User from "./page/user";
import About from "./page/about";

function App() {
  const location = useLocation().pathname
  return (
    <div className="overflow-x-hidden max-h-full bg-richblack-900">
      <Header></Header>




      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path='/aboutUs' element={<About></About>} />
        <Route path='/auth/:authValue' element={<Auth></Auth>} />
        <Route path='/contact' element={<ContactPage></ContactPage>} />



        <Route
          path="/auth/forget-password"
          element={
            <OpenRoute>
              <ResetPassword></ResetPassword>
            </OpenRoute>
          } />

        <Route
          path="/auth/login"
          element={
            <OpenRoute>
              <Login></Login>
            </OpenRoute>
          } />
        <Route
          path="/auth/:signup"
          element={
            <OpenRoute>
              <SignUp></SignUp>
            </OpenRoute>
          } />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <PasswordResetForm></PasswordResetForm>
            </OpenRoute>
          } />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail></VerifyEmail>
            </OpenRoute>
          } />
        <Route
          path="/user/:section"
          element={
            <OpenRoute>
              <User></User>
            </OpenRoute>
          } />












      </Routes>
      <div className="bg-richblack-700 w-full">
        {

          location.includes('/auth') ? "" : < Footer ></Footer>
        }
      </div>
    </div >
  );
}

export default App;
